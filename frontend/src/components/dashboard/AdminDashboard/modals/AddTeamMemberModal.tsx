import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../../../ui/Button';

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (memberData: {
    name: string;
    email: string;
    role: string;
    department: string;
  }) => void;
}

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({
  isOpen,
  onClose,
  onAddMember
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.role && formData.department) {
      onAddMember(formData);
      setFormData({ name: '', email: '', role: '', department: '' });
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-slate-900">Add Team Member</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a role</option>
              <option value="Marketing Lead">Marketing Lead</option>
              <option value="Marketing Specialist">Marketing Specialist</option>
              
              <option value="Developer">Developer</option>
              <option value="Content Creator">Content Creator</option>
              <option value="Support Specialist">Support Specialist</option>
            </select>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a department</option>
              <option value="Marketing">Marketing</option>
              <option value="Technical">Technical</option>
              <option value="Content">Content</option>
              <option value="Support">Support</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMemberModal;
