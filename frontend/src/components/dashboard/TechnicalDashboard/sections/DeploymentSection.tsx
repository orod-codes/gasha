import React from 'react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { Server, CheckCircle, Clock, AlertCircle, Download, Eye, Play } from 'lucide-react';

interface Deployment {
  id: string;
  taskId: string;
  productName: string;
  companyName: string;
  environment: 'production' | 'staging' | 'development';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  startTime?: string;
  endTime?: string;
  progress: number;
  logs: string[];
  configuration: Record<string, any>;
}

interface DeploymentSectionProps {
  deployments: Deployment[];
  onStartDeployment: (deploymentId: string) => void;
  onViewLogs: (deployment: Deployment) => void;
  onDownloadConfig: (deploymentId: string) => void;
  onRetryDeployment: (deploymentId: string) => void;
}

const DeploymentSection: React.FC<DeploymentSectionProps> = ({
  deployments,
  onStartDeployment,
  onViewLogs,
  onDownloadConfig,
  onRetryDeployment
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'production': return 'bg-red-100 text-red-700';
      case 'staging': return 'bg-yellow-100 text-yellow-700';
      case 'development': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Deployment Management</h2>
          <p className="text-slate-600">Monitor and manage system deployments</p>
        </div>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Environments</option>
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Deployments</p>
              <p className="text-2xl font-bold text-blue-600">
                {deployments.filter(d => d.status === 'in-progress').length}
              </p>
            </div>
            <Server className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Completed Today</p>
              <p className="text-2xl font-bold text-green-600">
                {deployments.filter(d => d.status === 'completed').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">
                {deployments.filter(d => d.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">
                {deployments.filter(d => d.status === 'failed').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Deployments List */}
      <div className="space-y-4">
        {deployments.map((deployment) => (
          <Card key={deployment.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-slate-900">{deployment.id}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(deployment.status)}`}>
                    {deployment.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEnvironmentColor(deployment.environment)}`}>
                    {deployment.environment.charAt(0).toUpperCase() + deployment.environment.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Product</p>
                    <p className="font-medium text-slate-900">{deployment.productName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Company</p>
                    <p className="font-medium text-slate-900">{deployment.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Start Time</p>
                    <p className="font-medium text-slate-900">{deployment.startTime || 'Not started'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">End Time</p>
                    <p className="font-medium text-slate-900">{deployment.endTime || 'In progress'}</p>
                  </div>
                </div>

                {deployment.status === 'in-progress' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Progress</span>
                      <span className="text-sm font-medium text-slate-900">{deployment.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${deployment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Recent Logs */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h5 className="font-medium text-slate-900 mb-2">Recent Logs:</h5>
                  <div className="space-y-1">
                    {deployment.logs.slice(-3).map((log, index) => (
                      <p key={index} className="text-sm text-slate-700 font-mono">
                        {log}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                {deployment.status === 'pending' && (
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => onStartDeployment(deployment.id)}
                  >
                    <Play size={16} className="mr-2" />
                    Start Deployment
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onViewLogs(deployment)}
                >
                  <Eye size={16} className="mr-2" />
                  View Logs
                </Button>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onDownloadConfig(deployment.id)}
                >
                  <Download size={16} className="mr-2" />
                  Download Config
                </Button>

                {deployment.status === 'failed' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onRetryDeployment(deployment.id)}
                  >
                    <AlertCircle size={16} className="mr-2" />
                    Retry Deployment
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeploymentSection;

