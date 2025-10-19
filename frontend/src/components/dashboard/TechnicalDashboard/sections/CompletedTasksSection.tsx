import React from 'react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { CheckCircle, Download, FileText, Calendar, Clock } from 'lucide-react';

interface CompletedTask {
  id: string;
  requestId: string;
  productName: string;
  companyName: string;
  completedDate: string;
  deploymentNotes: string;
  documentsUploaded: string[];
  completedBy: string;
  duration: string;
}

interface CompletedTasksSectionProps {
  completedTasks: CompletedTask[];
  onDownloadDocument: (taskId: string, document: string) => void;
  onViewTaskDetails: (task: CompletedTask) => void;
}

const CompletedTasksSection: React.FC<CompletedTasksSectionProps> = ({
  completedTasks,
  onDownloadDocument,
  onViewTaskDetails
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Completed Tasks</h2>
          <p className="text-slate-600">View completed deployments and documentation</p>
        </div>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Products</option>
            <option value="gasha-av">GASHA Anti-Virus</option>
            <option value="gasha-waf">GASHA WAF</option>
            <option value="nisir">NISIR SIEM</option>
            <option value="gasha-vpn">GASHA VPN</option>
          </select>
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="recent">Recent</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">This Week</p>
              <p className="text-2xl font-bold text-blue-600">
                {completedTasks.filter(t => {
                  const taskDate = new Date(t.completedDate);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return taskDate >= weekAgo;
                }).length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Duration</p>
              <p className="text-2xl font-bold text-orange-600">3.2 days</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Documents</p>
              <p className="text-2xl font-bold text-purple-600">
                {completedTasks.reduce((total, task) => total + task.documentsUploaded.length, 0)}
              </p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Completed Tasks List */}
      <div className="space-y-4">
        {completedTasks.map((task) => (
          <Card key={task.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-slate-900">{task.id}</h4>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    Completed
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Product</p>
                    <p className="font-medium text-slate-900">{task.productName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Company</p>
                    <p className="font-medium text-slate-900">{task.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Completed Date</p>
                    <p className="font-medium text-slate-900">{task.completedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Completed By</p>
                    <p className="font-medium text-slate-900">{task.completedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Duration</p>
                    <p className="font-medium text-slate-900">{task.duration}</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h5 className="font-medium text-green-900 mb-2">Deployment Notes:</h5>
                  <p className="text-sm text-green-800">{task.deploymentNotes}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <h5 className="font-medium text-slate-900 mb-3">Uploaded Documents:</h5>
                  <div className="space-y-2">
                    {task.documentsUploaded.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-slate-600" />
                          <span className="text-sm text-slate-900">{doc}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onDownloadDocument(task.id, doc)}
                        >
                          <Download size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onViewTaskDetails(task)}
                >
                  <FileText size={16} className="mr-2" />
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  <Download size={16} className="mr-2" />
                  Download All
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompletedTasksSection;

