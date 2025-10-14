import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Users, UserPlus } from 'lucide-react';
import Button from '../../../ui/Button';
import Card from '../../../ui/Card';

interface ViewAdminsModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string;
}

const ViewAdminsModal: React.FC<ViewAdminsModalProps> = ({
  isOpen,
  onClose,
  moduleId
}) => {
  if (!isOpen) return null;

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: '' });

  // Mock admins data
  const [admins, setAdmins] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Module Admin', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Module Manager', status: 'Active' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'Module Admin', status: 'Pending' }
  ]);

  const handleAssignAdmin = () => {
    if (newAdmin.name && newAdmin.email && newAdmin.role) {
      const newId = Math.max(...admins.map(a => a.id)) + 1;
      setAdmins([...admins, { 
        id: newId, 
        name: newAdmin.name, 
        email: newAdmin.email, 
        role: newAdmin.role, 
        status: 'Active' 
      }]);
      setNewAdmin({ name: '', email: '', role: '' });
      setShowAddForm(false);
    }
  };

  const handleEditAdmin = (adminId: number) => {
    const admin = admins.find(a => a.id === adminId);
    if (admin) {
      const newName = prompt('Edit admin name:', admin.name);
      const newEmail = prompt('Edit admin email:', admin.email);
      const newRole = prompt('Edit admin role:', admin.role);
      if (newName && newEmail && newRole) {
        setAdmins(admins.map(a => 
          a.id === adminId 
            ? { ...a, name: newName, email: newEmail, role: newRole }
            : a
        ));
      }
    }
  };

  const handleRemoveAdmin = (adminId: number) => {
    if (confirm('Are you sure you want to remove this admin?')) {
      setAdmins(admins.filter(a => a.id !== adminId));
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                View Admins - {moduleId.toUpperCase()} Module
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

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Module Admins</h3>
            <Button onClick={() => setShowAddForm(true)}>
              <UserPlus size={16} className="mr-2" />
              Assign Admin
            </Button>
          </div>

          {showAddForm && (
            <div className="mb-6 p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-3">Assign New Admin</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Admin Name"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="">Select Role</option>
                  <option value="Module Admin">Module Admin</option>
                  <option value="Module Manager">Module Manager</option>
                  <option value="Module User">Module User</option>
                </select>
                <div className="flex space-x-2">
                  <Button onClick={handleAssignAdmin}>
                    Assign Admin
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {admins.map((admin) => (
              <Card key={admin.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{admin.name}</h4>
                      <p className="text-sm text-slate-600">{admin.email}</p>
                      <p className="text-sm text-slate-500">{admin.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      admin.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {admin.status}
                    </span>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditAdmin(admin.id)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRemoveAdmin(admin.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ViewAdminsModal;
