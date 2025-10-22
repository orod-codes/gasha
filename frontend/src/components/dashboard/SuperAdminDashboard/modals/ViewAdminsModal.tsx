import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Users } from 'lucide-react';
import Button from '../../../ui/Button';
import Card from '../../../ui/Card';
import { getAllUsers } from '../../../../services/userService';
import { getModules } from '../../../../services/moduleService';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

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


  // Admins data
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch admins for the specific module
  useEffect(() => {
    if (isOpen && moduleId) {
      fetchModuleAdmins();
    }
  }, [isOpen, moduleId]);

  const fetchModuleAdmins = async () => {
    try {
      setLoading(true);
      console.log('🔧 Fetching admins for module:', moduleId);
      
      // First, get the module name from the module ID
      const modulesResponse = await getModules();
      let moduleName = moduleId; // fallback to moduleId if not found
      
      if (modulesResponse.success && modulesResponse.data) {
        const modules = Array.isArray(modulesResponse.data) ? modulesResponse.data : [modulesResponse.data];
        const module = modules.find((m: any) => m.id === moduleId || m._id === moduleId);
        if (module) {
          moduleName = module.name;
          console.log('✅ Found module name:', moduleName);
        }
      }
      
      const response = await getAllUsers();
      
      if (response.success && response.data) {
        console.log('✅ All users fetched:', response.data);
        
        // Filter users who have this module assigned
        const moduleAdmins = response.data.filter((user: any) => {
          // Check if user is not super-admin
          const isNotSuperAdmin = user.role !== 'super-admin';
          
          // Check if user has this module in their modules array
          let hasModule = false;
          if (user.modules && user.modules.length > 0) {
            // Check if any of the user's modules match the module name
            hasModule = user.modules.some((module: string) => {
              return module === moduleName || module.toLowerCase() === moduleName.toLowerCase();
            });
          }
          
          return hasModule && isNotSuperAdmin;
        });
        
        console.log('✅ Module admins found:', moduleAdmins);
        
        // Transform the data to match the expected format
        const transformedAdmins = moduleAdmins.map((user: any) => ({
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status === 'active' ? 'Active' : 'Inactive'
        }));
        
        setAdmins(transformedAdmins);
      } else {
        console.error('❌ Failed to fetch admins:', response.error);
      }
    } catch (error) {
      console.error('❌ Error fetching module admins:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleEditAdmin = (adminId: string) => {
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

  const handleRemoveAdmin = (adminId: string) => {
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
          </div>


          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-slate-600">Loading admins...</div>
            </div>
          ) : admins.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-slate-400" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">No admins assigned</h4>
              <p className="text-slate-600">This module doesn't have any admins assigned yet</p>
            </div>
          ) : (
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
          )}
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
