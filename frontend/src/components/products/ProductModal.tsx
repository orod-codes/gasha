import React from 'react';
import { X, Shield, Download, Send, Eye } from 'lucide-react';
import Button from '../ui/Button';
import { Product } from '../../types';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'gasha': return 'text-blue-600 bg-blue-100';
      case 'nisir': return 'text-green-600 bg-green-100';
      case 'enyuma': return 'text-purple-600 bg-purple-100';
      case 'codepro': return 'text-orange-600 bg-orange-100';
      case 'biometrics': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="fixed top-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-slate-100 rounded-xl">
                <Shield className="h-8 w-8 text-slate-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{product.name}</h2>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(product.category)}`}>
                  {product.category.toUpperCase()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-slate-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Description</h3>
            <p className="text-slate-700 leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Features</h3>
            <div className="space-y-3">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Available Actions</h3>
            <div className="flex flex-wrap gap-3">
              {product.hasRequest && (
                <Button className="flex items-center space-x-2">
                  <Send size={16} />
                  <span>Send Request</span>
                </Button>
              )}
              {product.hasDownload && (
                <Button variant="secondary" className="flex items-center space-x-2">
                  <Download size={16} />
                  <span>Download</span>
                </Button>
              )}
              {product.hasShowProducts && (
                <Button variant="outline" className="flex items-center space-x-2">
                  <Eye size={16} />
                  <span>Show Products</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;