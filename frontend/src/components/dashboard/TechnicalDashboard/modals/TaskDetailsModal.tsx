import React, { useState } from 'react';
import { X, Upload, FileText, Download } from 'lucide-react';
import Button from '../../../ui/Button';

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

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task,
  isOpen,
  onClose,
  onUpdateTask
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  React.useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    if (editedTask) {
      onUpdateTask(task.id, editedTask);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Task Details</h2>
            <p className="text-sm text-slate-600">{task.id} - {task.productName}</p>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Task
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Task ID
              </label>
              <input
                type="text"
                value={editedTask?.id || ''}
                disabled
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Request ID
              </label>
              <input
                type="text"
                value={editedTask?.requestId || ''}
                disabled
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={editedTask?.productName || ''}
                disabled={!isEditing}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, productName: e.target.value } : null)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={editedTask?.companyName || ''}
                disabled={!isEditing}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, companyName: e.target.value } : null)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Priority
              </label>
              <select
                value={editedTask?.priority || ''}
                disabled={!isEditing}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, priority: e.target.value as any } : null)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                value={editedTask?.status || ''}
                disabled={!isEditing}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, status: e.target.value as any } : null)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={editedTask?.dueDate || ''}
                disabled={!isEditing}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, dueDate: e.target.value } : null)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Progress (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={editedTask?.progress || 0}
                disabled={!isEditing}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, progress: parseInt(e.target.value) } : null)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={editedTask?.description || ''}
              disabled={!isEditing}
              onChange={(e) => setEditedTask(prev => prev ? { ...prev, description: e.target.value } : null)}
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notes
            </label>
            <textarea
              value={editedTask?.notes || ''}
              disabled={!isEditing}
              onChange={(e) => setEditedTask(prev => prev ? { ...prev, notes: e.target.value } : null)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              placeholder="Add notes about this task..."
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Requirements
            </label>
            <div className="bg-slate-50 p-4 rounded-lg">
              <pre className="text-sm text-slate-700 whitespace-pre-wrap">
                {JSON.stringify(editedTask?.requirements || {}, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;



