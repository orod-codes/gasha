import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Settings, Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../../../ui/Button';
import Card from '../../../ui/Card';
import AddProductModal from './AddProductModal';
import { getProductsByModule, createProduct, deleteProduct } from '../../../../services/productService';
import { Product } from '../../../../types';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && moduleId) {
      fetchProducts();
    }
  }, [isOpen, moduleId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const moduleProducts = await getProductsByModule(moduleId);
      setProducts(moduleProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData: any) => {
    try {
      const result = await createProduct(productData);
      if (result.success) {
        await fetchProducts(); // Refresh the list
      } else {
        setError(result.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const result = await deleteProduct(productId);
        if (result.success) {
          await fetchProducts(); // Refresh the list
        } else {
          setError(result.error || 'Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product');
      }
    }
  };

  if (!isOpen) return null;

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
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Products ({products.length})
            </h3>
            <Button onClick={() => setShowAddProductModal(true)}>
              <Plus size={16} className="mr-2" />
              Add Product
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-slate-600">Loading products...</div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-500 mb-4">No products found for this module</div>
              <Button onClick={() => setShowAddProductModal(true)}>
                <Plus size={16} className="mr-2" />
                Add First Product
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">{product.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : product.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{product.description}</p>
                  <div className="text-xs text-slate-500 mb-4">
                    Category: <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 size={14} className="mr-1" />
                      Delete
                    </Button>
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

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onSubmit={handleAddProduct}
        moduleId={moduleId}
      />
    </div>,
    document.body
  );
};

export default ManageProductsModal;
