import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle, 
  Clock, 
  Upload, 
  FileText, 
  AlertCircle,
  Play,
  Pause,
  Settings,
  Download
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { User } from '../../types';

interface TechnicalDashboardProps {
  user: User;
}

const TechnicalDashboard: React.FC<TechnicalDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('tasks');

  const assignedTasks = [
    {
      id: 'TASK-001',
      requestId: 'REQ-001',
      productName: 'GASHA Anti-Virus',
      companyName: 'TechCorp Solutions',
      taskType: 'Deployment',
      priority: 'high',
      status: 'in-progress',
      assignedDate: '2024-01-15',
      dueDate: '2024-01-20',
      progress: 65,
      description: 'Deploy GASHA Anti-Virus for 150 computers (120 Windows, 30 Linux)',
      requirements: {
        totalComputers: 150,
        windowsOS: 120,
        linuxOS: 30,
        contactPerson1: 'John Smith',
        contactPerson2: 'Jane Doe'
      },
      notes: 'Initial setup completed. Configuring group policies.'
    },
    {
      id: 'TASK-002',
      requestId: 'REQ-003',
      productName: 'NISIR SIEM',
      companyName: 'DataFlow Inc',
      taskType: 'Configuration',
      priority: 'medium',
      status: 'pending',
      assignedDate: '2024-01-16',
      dueDate: '2024-01-25',
      progress: 0,
      description: 'Configure NISIR SIEM for enterprise environment',
      requirements: {
        totalComputers: 200,
        windowsOS: 180,
        linuxOS: 20
      },
      notes: 'Waiting for network access credentials from client.'
    },
    {
      id: 'TASK-003',
      requestId: 'REQ-007',
      productName: 'GASHA WAF',
      companyName: 'WebSecure Ltd',
      taskType: 'Installation',
      priority: 'high',
      status: 'completed',
      assignedDate: '2024-01-10',
      dueDate: '2024-01-15',
      progress: 100,
      description: 'Install and configure GASHA WAF for web application protection',
      completedDate: '2024-01-14',
      notes: 'Successfully deployed. All security rules configured and tested.'
    }
  ];

  const completedTasks = [
    {
      id: 'TASK-004',
      requestId: 'REQ-008',
      productName: 'GASHA VPN',
      companyName: 'RemoteWork Corp',
      completedDate: '2024-01-12',
      deploymentNotes: 'VPN server configured for 50 concurrent users. All client certificates distributed.',
      documentsUploaded: ['deployment-guide.pdf', 'user-manual.pdf', 'configuration-backup.zip']
    },
    {
      id: 'TASK-005',
      requestId: 'REQ-009',
      productName: 'Biometrics ABIS',
      companyName: 'SecureAccess Inc',
      completedDate: '2024-01-08',
      deploymentNotes: 'Biometric system deployed for 500 users. Fingerprint and face recognition modules active.',
      documentsUploaded: ['system-config.pdf', 'user-database-backup.sql', 'api-documentation.pdf']
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'on-hold': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleStartTask = (taskId: string) => {
    console.log('Starting task:', taskId);
  };

  const handlePauseTask = (taskId: string) => {
    console.log('Pausing task:', taskId);
  };

  const handleCompleteTask = (taskId: string) => {
    console.log('Completing task:', taskId);
  };

  const handleUploadDocument = (taskId: string) => {
    console.log('Uploading document for task:', taskId);
  };

  const renderActiveTasks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Active Tasks</h3>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-orange-600">3</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <Wrench className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {assignedTasks.map((task) => (
          <Card key={task.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-slate-900">{task.id}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Product</p>
                    <p className="font-medium text-slate-900">{task.productName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Company</p>
                    <p className="font-medium text-slate-900">{task.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Task Type</p>
                    <p className="font-medium text-slate-900">{task.taskType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Due Date</p>
                    <p className="font-medium text-slate-900">{task.dueDate}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-2">Description</p>
                  <p className="text-slate-900">{task.description}</p>
                </div>

                {task.status === 'in-progress' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Progress</span>
                      <span className="text-sm font-medium text-slate-900">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 p-4 rounded-lg mb-4">
                  <h5 className="font-medium text-slate-900 mb-2">Requirements:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {task.requirements && Object.entries(task.requirements).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-slate-900 font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {task.notes && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Notes:</strong> {task.notes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                {task.status === 'pending' && (
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleStartTask(task.id)}
                  >
                    <Play size={16} className="mr-2" />
                    Start Task
                  </Button>
                )}
                
                {task.status === 'in-progress' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handlePauseTask(task.id)}
                    >
                      <Pause size={16} className="mr-2" />
                      Pause Task
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleCompleteTask(task.id)}
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Mark Complete
                    </Button>
                  </>
                )}

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleUploadDocument(task.id)}
                >
                  <Upload size={16} className="mr-2" />
                  Upload Files
                </Button>

                <Button variant="ghost" size="sm" className="w-full">
                  <Settings size={16} className="mr-2" />
                  Task Settings
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCompletedTasks = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-900">Completed Tasks</h3>
      
      <div className="space-y-4">
        {completedTasks.map((task) => (
          <Card key={task.id} className="p-6">
            <div className="flex justify-between items-start">
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
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDocumentation = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Documentation & Logs</h3>
        <Button>
          <Upload size={16} className="mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Recent Uploads</h4>
          <div className="space-y-3">
            {[
              { name: 'GASHA-AV-Deployment-Guide.pdf', date: '2024-01-15', size: '2.3 MB' },
              { name: 'NISIR-SIEM-Config-Backup.zip', date: '2024-01-14', size: '15.7 MB' },
              { name: 'WAF-Security-Rules.json', date: '2024-01-13', size: '456 KB' }
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-900">{doc.name}</p>
                    <p className="text-xs text-slate-500">{doc.date} • {doc.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Deployment Logs</h4>
          <div className="space-y-3">
            {[
              { task: 'TASK-001', action: 'Configuration updated', time: '2 hours ago', status: 'success' },
              { task: 'TASK-002', action: 'Network test completed', time: '4 hours ago', status: 'success' },
              { task: 'TASK-003', action: 'Security rules applied', time: '1 day ago', status: 'warning' }
            ].map((log, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className={`p-1 rounded-full ${
                  log.status === 'success' ? 'bg-green-100' :
                  log.status === 'warning' ? 'bg-orange-100' : 'bg-red-100'
                }`}>
                  {log.status === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {log.status === 'warning' && <AlertCircle className="h-4 w-4 text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{log.action}</p>
                  <p className="text-sm text-slate-600">{log.task} • {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Technical Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Task execution and deployment management • {user?.name}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'tasks', label: 'Active Tasks', icon: Wrench },
              { id: 'completed', label: 'Completed', icon: CheckCircle },
              { id: 'documentation', label: 'Documentation', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'tasks' && renderActiveTasks()}
        {activeTab === 'completed' && renderCompletedTasks()}
        {activeTab === 'documentation' && renderDocumentation()}
      </div>
    </div>
  );
};

export default TechnicalDashboard;