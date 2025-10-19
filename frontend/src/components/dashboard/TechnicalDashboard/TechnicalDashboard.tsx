import React, { useState } from 'react';
import { User } from '../../../types';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import AlertBanner from './components/AlertBanner';
import DashboardSection from './sections/DashboardSection';
import TaskManagementSection from './sections/TaskManagementSection';
import DeploymentSection from './sections/DeploymentSection';
import CompletedTasksSection from './sections/CompletedTasksSection';
import DocumentationSection from './sections/DocumentationSection';
import FileUploadsSection from './sections/FileUploadsSection';
import SystemMonitoringSection from './sections/SystemMonitoringSection';
import ActivityLogsSection from './sections/ActivityLogsSection';
import SecuritySection from './sections/SecuritySection';
import SettingsSection from './sections/SettingsSection';
import TaskDetailsModal from './modals/TaskDetailsModal';
import FileUploadModal from './modals/FileUploadModal';

interface TechnicalDashboardProps {
  user: User;
}

interface Task {
  id: string;
  requestId: string;
  productName: string;
  companyName: string;
  taskType: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold';
  assignedDate: string;
  dueDate: string;
  progress: number;
  description: string;
  requirements: Record<string, any>;
  notes?: string;
}

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

const TechnicalDashboard: React.FC<TechnicalDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal states
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
  const [uploadTaskId, setUploadTaskId] = useState<string | null>(null);

  // Sample data
  const [tasks, setTasks] = useState<Task[]>([
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
      requirements: {
        hasInternalWebsite: true,
        serverOS: 'Ubuntu 20.04',
        webServer: 'Nginx'
      },
      notes: 'Successfully deployed. All security rules configured and tested.'
    }
  ]);

  const [completedTasks] = useState([
    {
      id: 'TASK-004',
      requestId: 'REQ-008',
      productName: 'GASHA VPN',
      companyName: 'RemoteWork Corp',
      completedDate: '2024-01-12',
      deploymentNotes: 'VPN server configured for 50 concurrent users. All client certificates distributed.',
      documentsUploaded: ['deployment-guide.pdf', 'user-manual.pdf', 'configuration-backup.zip'],
      completedBy: 'John Smith',
      duration: '2 days'
    },
    {
      id: 'TASK-005',
      requestId: 'REQ-009',
      productName: 'Biometrics ABIS',
      companyName: 'SecureAccess Inc',
      completedDate: '2024-01-08',
      deploymentNotes: 'Biometric system deployed for 500 users. Fingerprint and face recognition modules active.',
      documentsUploaded: ['system-config.pdf', 'user-database-backup.sql', 'api-documentation.pdf'],
      completedBy: 'Sarah Johnson',
      duration: '3 days'
    }
  ]);

  const [deployments] = useState<Deployment[]>([
    {
      id: 'DEP-001',
      taskId: 'TASK-001',
      productName: 'GASHA Anti-Virus',
      companyName: 'TechCorp Solutions',
      environment: 'production',
      status: 'in-progress',
      startTime: '2024-01-15 09:00:00',
      progress: 75,
      logs: [
        'Starting deployment process...',
        'Validating system requirements...',
        'Installing core components...',
        'Configuring security policies...',
        'Running system tests...'
      ],
      configuration: {
        serverCount: 150,
        osDistribution: { windows: 120, linux: 30 },
        securityLevel: 'high'
      }
    },
    {
      id: 'DEP-002',
      taskId: 'TASK-003',
      productName: 'GASHA WAF',
      companyName: 'WebSecure Ltd',
      environment: 'production',
      status: 'completed',
      startTime: '2024-01-10 14:00:00',
      endTime: '2024-01-14 16:30:00',
      progress: 100,
      logs: [
        'Deployment completed successfully',
        'All security rules applied',
        'Performance tests passed',
        'Client approval received'
      ],
      configuration: {
        webServer: 'Nginx',
        sslEnabled: true,
        securityRules: 25
      }
    }
  ]);

  // Handler functions
  const handleRefreshData = () => {
    console.log('Refreshing technical dashboard data...');
    // Implementation for refreshing data
  };

  const handleViewDashboardDetails = (type: string) => {
    console.log('Viewing dashboard details for:', type);
    // Implementation for viewing details
  };

  const handleStartTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'in-progress', progress: 10 }
        : task
    ));
  };

  const handlePauseTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'on-hold' }
        : task
    ));
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'completed', progress: 100 }
        : task
    ));
  };

  const handleUploadDocument = (taskId: string) => {
    setUploadTaskId(taskId);
    setIsFileUploadModalOpen(true);
  };

  const handleViewTaskDetails = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailsModalOpen(true);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates }
        : task
    ));
  };

  const handleUploadFiles = (taskId: string, files: File[]) => {
    console.log('Uploading files for task:', taskId, files);
    // Implementation for file upload
  };

  const handleStartDeployment = (deploymentId: string) => {
    console.log('Starting deployment:', deploymentId);
    // Implementation for starting deployment
  };

  const handleViewLogs = (deployment: Deployment) => {
    console.log('Viewing logs for deployment:', deployment.id);
    // Implementation for viewing logs
  };

  const handleDownloadConfig = (deploymentId: string) => {
    console.log('Downloading config for deployment:', deploymentId);
    // Implementation for downloading config
  };

  const handleRetryDeployment = (deploymentId: string) => {
    console.log('Retrying deployment:', deploymentId);
    // Implementation for retrying deployment
  };

  const handleAlertDismiss = () => {
    console.log('Alert dismissed');
    // Implementation for dismissing alert
  };

  const handleDownloadDocument = (taskId: string, document: string) => {
    console.log('Downloading document:', taskId, document);
    // Implementation for downloading document
  };

  const handleUploadDocumentAction = () => {
    console.log('Uploading document');
    // Implementation for uploading document
  };

  const handleSearchDocument = (query: string) => {
    console.log('Searching documents:', query);
    // Implementation for searching documents
  };

  const handleUploadFile = () => {
    console.log('Uploading file');
    // Implementation for uploading file
  };

  const handleDownloadFile = (fileId: string) => {
    console.log('Downloading file:', fileId);
    // Implementation for downloading file
  };

  const handleDeleteFile = (fileId: string) => {
    console.log('Deleting file:', fileId);
    // Implementation for deleting file
  };

  const handleViewFile = (fileId: string) => {
    console.log('Viewing file:', fileId);
    // Implementation for viewing file
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardSection
            user={user}
            onRefreshData={handleRefreshData}
            onViewDetails={handleViewDashboardDetails}
          />
        );
      case 'tasks':
        return (
          <TaskManagementSection
            tasks={tasks}
            onStartTask={handleStartTask}
            onPauseTask={handlePauseTask}
            onCompleteTask={handleCompleteTask}
            onUploadDocument={handleUploadDocument}
            onViewTaskDetails={handleViewTaskDetails}
          />
        );
      case 'deployments':
        return (
          <DeploymentSection
            deployments={deployments}
            onStartDeployment={handleStartDeployment}
            onViewLogs={handleViewLogs}
            onDownloadConfig={handleDownloadConfig}
            onRetryDeployment={handleRetryDeployment}
          />
        );
      case 'completed':
        return (
          <CompletedTasksSection
            completedTasks={completedTasks}
            onDownloadDocument={handleDownloadDocument}
            onViewTaskDetails={handleViewTaskDetails}
          />
        );
      case 'documentation':
        return (
          <DocumentationSection
            onUploadDocument={handleUploadDocumentAction}
            onSearchDocument={handleSearchDocument}
          />
        );
      case 'uploads':
        return (
          <FileUploadsSection
            onUploadFile={handleUploadFile}
            onDownloadFile={handleDownloadFile}
            onDeleteFile={handleDeleteFile}
            onViewFile={handleViewFile}
          />
        );
      case 'monitoring':
        return <SystemMonitoringSection />;
      case 'logs':
        return <ActivityLogsSection />;
      case 'security':
        return <SecuritySection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-slate-600">Section coming soon...</p>
          </div>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Real-time Alert Banner */}
          <AlertBanner onDismiss={handleAlertDismiss} />
          
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Modals */}
        <TaskDetailsModal
          task={selectedTask}
          isOpen={isTaskDetailsModalOpen}
          onClose={() => setIsTaskDetailsModalOpen(false)}
          onUpdateTask={handleUpdateTask}
        />
        
        <FileUploadModal
          taskId={uploadTaskId}
          isOpen={isFileUploadModalOpen}
          onClose={() => setIsFileUploadModalOpen(false)}
          onUploadFiles={handleUploadFiles}
        />
      </div>
    </ErrorBoundary>
  );
};

export default TechnicalDashboard;
