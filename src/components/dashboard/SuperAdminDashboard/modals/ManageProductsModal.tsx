import React from 'react';
import { createPortal } from 'react-dom';
import { X, Settings, Plus } from 'lucide-react';
import Button from '../../../ui/Button';
import Card from '../../../ui/Card';

interface ManageProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string;
}

const ManageProductsModal: React.FC<ManageProductsModalProps> = ({
  isOpen,
  onClose,
  moduleId
}) => {
  if (!isOpen) return null;

  // Mock products data
  const products = [
    { id: 1, name: 'Anti-Virus Scanner', description: 'Real-time virus protection', status: 'Active' },
    { id: 2, name: 'Firewall Manager', description: 'Network security management', status: 'Active' },
    { id: 3, name: 'Threat Detection', description: 'Advanced threat analysis', status: 'Pending' }
  ];

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Manage Products - {moduleId.toUpperCase()} Module
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
            <h3 className="text-lg font-semibold text-slate-900">Products</h3>
            <Button>
              <Plus size={16} className="mr-2" />
              Add Product
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-900">{product.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-4">{product.description}</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Delete
                  </Button>
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

export default ManageProductsModal;
