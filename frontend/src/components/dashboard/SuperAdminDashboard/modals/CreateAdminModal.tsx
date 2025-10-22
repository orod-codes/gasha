import React from 'react';
import { createPortal } from 'react-dom';
import { X, UserPlus } from 'lucide-react';
import Button from '../../../ui/Button';

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; password: string; role: string; module: string }) => void;
  data: { name: string; email: string; password: string; role: string; module: string };
  onChange: (data: { name: string; email: string; password: string; role: string; module: string }) => void;
  modules: Array<{ _id?: string; id?: string; name?: string; displayName?: string }>;
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
  onChange,
  modules
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modules.length === 0) {
      alert('Please create a module first before assigning an admin.');
      return;
    }
    onSubmit(data);
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Create New Admin</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Admin Name
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => onChange({...data, name: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter admin name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => onChange({...data, email: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => onChange({...data, password: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Role
              </label>
              <select
                value={data.role}
                onChange={(e) => onChange({...data, role: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="marketing">Marketing</option>
                <option value="technical">Technical</option>
                <option value="developer">Developer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Assign to Module
              </label>
              <select
                value={data.module}
                onChange={(e) => onChange({...data, module: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={modules.length === 0}
              >
                <option value="">
                  {modules.length === 0 ? 'No modules available - Create a module first' : 'Select module'}
                </option>
                {modules.map((module) => (
                  <option key={module._id || module.id} value={module._id || module.id}>
                    {module.displayName || module.name}
                  </option>
                ))}
              </select>
              {modules.length === 0 && (
                <p className="text-sm text-orange-600 mt-1">
                  You need to create a module first before assigning an admin.
                </p>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={modules.length === 0}>
              Create Admin
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateAdminModal;