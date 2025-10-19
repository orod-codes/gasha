import React from 'react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { Wrench, Play, Pause, CheckCircle, Clock, AlertCircle, Upload, Settings } from 'lucide-react';

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

interface TaskManagementSectionProps {
  tasks: Task[];
  onStartTask: (taskId: string) => void;
  onPauseTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onUploadDocument: (taskId: string) => void;
  onViewTaskDetails: (task: Task) => void;
}

const TaskManagementSection: React.FC<TaskManagementSectionProps> = ({
  tasks,
  onStartTask,
  onPauseTask,
  onCompleteTask,
  onUploadDocument,
  onViewTaskDetails
}) => {
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

  const activeTasks = tasks.filter(task => task.status !== 'completed');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Task Management</h2>
          <p className="text-slate-600">Manage and track your technical tasks</p>
        </div>
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-orange-600">
                {tasks.filter(t => t.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {tasks.filter(t => t.status === 'in-progress').length}
              </p>
            </div>
            <Wrench className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {completedTasks.length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">On Hold</p>
              <p className="text-2xl font-bold text-red-600">
                {tasks.filter(t => t.status === 'on-hold').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Active Tasks */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-900">Active Tasks</h3>
        {activeTasks.map((task) => (
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
                    onClick={() => onStartTask(task.id)}
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
                      onClick={() => onPauseTask(task.id)}
                    >
                      <Pause size={16} className="mr-2" />
                      Pause Task
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => onCompleteTask(task.id)}
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
                  onClick={() => onUploadDocument(task.id)}
                >
                  <Upload size={16} className="mr-2" />
                  Upload Files
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onViewTaskDetails(task)}
                >
                  <Settings size={16} className="mr-2" />
                  Task Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskManagementSection;

