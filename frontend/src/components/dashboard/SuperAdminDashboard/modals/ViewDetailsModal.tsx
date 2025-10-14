import React from 'react';
import { createPortal } from 'react-dom';
import { X, User, Mail, Shield, Users, Calendar } from 'lucide-react';
import Button from '../../../ui/Button';
import Card from '../../../ui/Card';

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  employees: number;
}

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: Admin | null;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({
  isOpen,
  onClose,
  admin
}) => {
  if (!isOpen || !admin) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Admin Details
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
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Full Name</p>
                    <p className="font-semibold text-slate-900">{admin.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Email Address</p>
                    <p className="font-semibold text-slate-900">{admin.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Role</p>
                    <p className="font-semibold text-slate-900">{admin.role}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Status & Statistics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Status & Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${admin.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <div>
                    <p className="text-sm text-slate-600">Status</p>
                    <p className={`font-semibold ${admin.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {admin.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Managed Employees</p>
                    <p className="font-semibold text-slate-900">{admin.employees}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Admin ID</p>
                    <p className="font-semibold text-slate-900">#{admin.id}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Additional Information</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Last Login</p>
                    <p className="font-semibold text-slate-900">2 hours ago</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Account Created</p>
                    <p className="font-semibold text-slate-900">Jan 15, 2024</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Permissions</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">User Management</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Content Access</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Reports</span>
                  </div>
                </div>
              </div>
            </Card>
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

export default ViewDetailsModal;


