import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Settings, Users } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { getProductsByModule } from '../../../../services/productService';
import { Product } from '../../../../types';

interface ModuleManagementSectionProps {
  modules: Array<{
    id: string;
    name: string;
    logo?: string;
  }>;
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
  loading?: boolean;
}

// Helper function to get the correct logo URL
const getLogoUrl = (logoPath: string, moduleName: string): string => {
  // If it's already a full URL, return as is
  if (logoPath.startsWith('http')) {
    return logoPath;
  }
  
  // If it's a backend upload path, use backend URL
  if (logoPath.startsWith('/uploads/')) {
    return `http://localhost:3000${logoPath}`;
  }
  
  // If it's an old /images/ path, map to frontend public images
  if (logoPath.startsWith('/images/')) {
    const logoName = logoPath.split('/').pop();
    return `/images/${logoName}`;
  }
  
  // Default fallback - try to map module name to known images
  const moduleImageMap: { [key: string]: string } = {
    'biometrics': '/Biometric.png',
    'codepro': '/code protection .png',
    'enyuma': '/Enyuma IAM.png',
    'nisir': '/Nisir.png',
    'gasha': '/gasha antivirus.png'
  };
  
  return moduleImageMap[moduleName.toLowerCase()] || logoPath;
};

const ModuleManagementSection: React.FC<ModuleManagementSectionProps> = ({
  modules = [],
  moduleStats = [],
  onAddModule = () => {},
  onEditModule = () => {},
  onDeleteModule = () => {},
  onManageProducts = () => {},
  onViewAdmins = () => {},
  loading: modulesLoading = false
}) => {
  const [moduleProducts, setModuleProducts] = useState<{[key: string]: Product[]}>({});

  useEffect(() => {
    const fetchModuleProducts = async () => {
      try {
        const productsByModule: {[key: string]: Product[]} = {};
        
        for (const module of modules) {
          const products = await getProductsByModule(module.id);
          productsByModule[module.id] = products;
        }
        
        setModuleProducts(productsByModule);
      } catch (error) {
        console.error('Error fetching module products:', error);
      } finally {
        // Loading completed
      }
    };

    if (modules.length > 0) {
      fetchModuleProducts();
    } else {
      // No modules to load
    }
  }, [modules]);

  if (modulesLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-slate-900">Security Modules</h3>
          <Button onClick={onAddModule}>
            <Plus size={16} className="mr-2" />
            Add Module
          </Button>
        </div>
        <div className="flex justify-center items-center py-8">
          <div className="text-slate-600">Loading modules...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Security Modules</h3>
        <Button onClick={onAddModule}>
          <Plus size={16} className="mr-2" />
          Add Module
        </Button>
      </div>

      {modules.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-slate-400" />
          </div>
          <h4 className="text-lg font-semibold text-slate-900 mb-2">No modules created yet</h4>
          <p className="text-slate-600 mb-6">Create your first security module to get started</p>
          <Button onClick={onAddModule}>
            <Plus size={16} className="mr-2" />
            Create First Module
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const products = moduleProducts[module.id] || [];
          const currentModuleStats = moduleStats.find((m: any) => m.name.includes(module.name)) || { requests: 0, downloads: 0 };
          
          return (
            <Card key={module.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {module.logo ? (
                      <img 
                        src={getLogoUrl(module.logo, module.name)} 
                        alt={`${module.name} Logo`} 
                        className="w-8 h-8 object-contain" 
                        onError={(e) => {
                          console.error('Failed to load logo:', module.logo);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-blue-600 font-bold text-lg">{module.name.charAt(0)}</span>
                    )}
                  </div>
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
                  <span className="font-bold text-slate-900">{products.length}</span>
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
      )}
    </div>
  );
};

export default ModuleManagementSection;
