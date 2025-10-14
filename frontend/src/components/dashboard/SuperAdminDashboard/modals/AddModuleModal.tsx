import React from 'react';
import { createPortal } from 'react-dom';
import { X, Plus } from 'lucide-react';
import Button from '../../../ui/Button';

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; type: string; logo: string }) => void;
  data: { name: string; description: string; type: string; logo: string };
  onChange: (data: { name: string; description: string; type: string; logo: string }) => void;
  selectedModule?: string;
}

const AddModuleModal: React.FC<AddModuleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
  onChange,
  selectedModule
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {selectedModule ? `Edit ${selectedModule.toUpperCase()} Module` : 'Add New Module'}
              </h2>
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
                Module Name
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => onChange({...data, name: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter module name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={data.description}
                onChange={(e) => onChange({...data, description: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter module description"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Module Type
              </label>
              <select
                value={data.type}
                onChange={(e) => onChange({...data, type: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select type</option>
                <option value="security">Security</option>
                <option value="analytics">Analytics</option>
                <option value="management">Management</option>
                <option value="monitoring">Monitoring</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Logo URL
              </label>
              <input
                type="url"
                value={data.logo}
                onChange={(e) => onChange({...data, logo: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter logo URL"
                required
              />
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {selectedModule ? 'Update Module' : 'Add Module'}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddModuleModal;