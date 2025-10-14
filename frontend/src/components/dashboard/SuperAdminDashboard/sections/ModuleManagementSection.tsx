import React from 'react';
import { Plus, Edit, Trash2, Settings, Users } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { products } from '../../../../data/products';

interface ModuleManagementSectionProps {
  moduleStats: Array<{
    name: string;
    requests: number;
    downloads: number;
    color: string;
  }>;
  onAddModule: () => void;
  onEditModule: (moduleId: string, moduleData: any) => void;
  onDeleteModule: (moduleId: string) => void;
  onManageProducts: (moduleId: string) => void;
  onViewAdmins: (moduleId: string) => void;
}

const ModuleManagementSection: React.FC<ModuleManagementSectionProps> = ({
  moduleStats = [],
  onAddModule = () => {},
  onEditModule = () => {},
  onDeleteModule = () => {},
  onManageProducts = () => {},
  onViewAdmins = () => {}
}) => {
  const modules = [
    { id: 'gasha', name: 'GASHA', logo: '/gasha antivirus.png' },
    { id: 'nisir', name: 'NISIR', logo: '/Nisir.png' },
    { id: 'enyuma', name: 'ENYUMA', logo: '/Enyuma IAM.png' },
    { id: 'codepro', name: 'CODEPRO', logo: '/code protection .png' },
    { id: 'biometrics', name: 'BIOMETRICS', logo: '/Biometric.png' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Security Modules</h3>
        <Button onClick={onAddModule}>
          <Plus size={16} className="mr-2" />
          Add Module
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const moduleProducts = products.filter(p => p.module === module.id);
          const currentModuleStats = moduleStats.find((m: any) => m.name.includes(module.name)) || { requests: 0, downloads: 0 };
          
          return (
            <Card key={module.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img src={module.logo} alt={`${module.name} Logo`} className="w-12 h-12 object-contain" />
                  <div>
                    <h4 className="font-bold text-slate-900">{module.name} Module</h4>
                    <p className="text-sm text-slate-600">Security Module</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    onClick={() => onEditModule(module.id, { 
                      name: module.name, 
                      description: `${module.name} Security Module`, 
                      type: 'security', 
                      logo: module.logo 
                    })}
                  >
                    <Edit size={16} className="text-slate-600" />
                  </button>
                  <button 
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete the ${module.name} module?`)) {
                        onDeleteModule(module.id);
                      }
                    }}
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Products</span>
                  <span className="font-bold text-slate-900">{moduleProducts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Requests</span>
                  <span className="font-bold text-slate-900">{currentModuleStats.requests.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Downloads</span>
                  <span className="font-bold text-slate-900">{currentModuleStats.downloads.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onManageProducts(module.id)}
                >
                  <Settings size={14} className="mr-2" />
                  Manage Products
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onViewAdmins(module.id)}
                >
                  <Users size={14} className="mr-2" />
                  View Admins
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleManagementSection;
