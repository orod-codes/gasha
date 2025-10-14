import React from 'react';
import { UserPlus, Users, Eye, Edit, Trash2 } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  employees: number;
}

interface AdminManagementSectionProps {
  adminList: Admin[];
  onCreateAdmin: () => void;
  onViewDetails: (admin: Admin) => void;
  onEditAdmin: (admin: Admin) => void;
  onToggleStatus: (adminId: number) => void;
}

const AdminManagementSection: React.FC<AdminManagementSectionProps> = ({
  adminList = [],
  onCreateAdmin = () => {},
  onViewDetails = () => {},
  onEditAdmin = () => {},
  onToggleStatus = () => {}
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Admin Management</h3>
        <Button onClick={onCreateAdmin}>
          <UserPlus size={16} className="mr-2" />
          Create Admin
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminList.map((admin, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{admin.name}</h4>
                <p className="text-sm text-slate-600">{admin.email}</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Role</span>
                <span className="font-semibold text-slate-900">{admin.role}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Employees</span>
                <span className="font-semibold text-slate-900">{admin.employees}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Status</span>
                <span className={`font-semibold ${admin.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {admin.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onViewDetails(admin)}
              >
                <Eye size={14} className="mr-2" />
                View Details
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onEditAdmin(admin)}
              >
                <Edit size={14} className="mr-2" />
                Edit Admin
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`w-full ${admin.status === 'Active' ? 'text-red-600 hover:bg-red-50 hover:border-red-200' : 'text-green-600 hover:bg-green-50 hover:border-green-200'}`}
                onClick={() => onToggleStatus(admin.id)}
              >
                {admin.status === 'Active' ? (
                  <>
                    <Trash2 size={14} className="mr-2" />
                    Disable
                  </>
                ) : (
                  <>
                    <Users size={14} className="mr-2" />
                    Activate
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminManagementSection;
