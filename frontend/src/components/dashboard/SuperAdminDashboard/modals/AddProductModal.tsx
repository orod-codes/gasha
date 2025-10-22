import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Package } from 'lucide-react';
import Button from '../../../ui/Button';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: any) => void;
  moduleId: string;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  moduleId
}) => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    description: '',
    features: [''],
    module: moduleId,
    hasDownload: false,
    hasRequest: false,
    hasShowProducts: false,
    status: 'active'
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Filter out empty features
      const filteredFeatures = productData.features.filter(feature => feature.trim() !== '');
      
      const submitData = {
        ...productData,
        features: filteredFeatures
      };

      await onSubmit(submitData);
      onClose();
      
      // Reset form
      setProductData({
        name: '',
        category: '',
        description: '',
        features: [''],
        module: moduleId,
        hasDownload: false,
        hasRequest: false,
        hasShowProducts: false,
        status: 'active'
      });
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    setProductData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setProductData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setProductData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 10000 }}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Add Product to {moduleId.toUpperCase()} Module
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

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={productData.name}
                onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category *
              </label>
              <select
                value={productData.category}
                onChange={(e) => setProductData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select category</option>
                <option value="gasha">GASHA</option>
                <option value="nisir">NISIR</option>
                <option value="enyuma">ENYUMA</option>
                <option value="codepro">Code Protection</option>
                <option value="biometrics">Biometrics</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description *
              </label>
              <textarea
                value={productData.description}
                onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product description"
                rows={4}
                required
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Features
              </label>
              <div className="space-y-2">
                {productData.features.map((feature, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Feature ${index + 1}`}
                    />
                    {productData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Feature</span>
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="hasDownload"
                  checked={productData.hasDownload}
                  onChange={(e) => setProductData(prev => ({ ...prev, hasDownload: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="hasDownload" className="text-sm font-medium text-slate-700">
                  Has Download
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="hasRequest"
                  checked={productData.hasRequest}
                  onChange={(e) => setProductData(prev => ({ ...prev, hasRequest: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="hasRequest" className="text-sm font-medium text-slate-700">
                  Has Request
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="hasShowProducts"
                  checked={productData.hasShowProducts}
                  onChange={(e) => setProductData(prev => ({ ...prev, hasShowProducts: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="hasShowProducts" className="text-sm font-medium text-slate-700">
                  Show Products
                </label>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                value={productData.status}
                onChange={(e) => setProductData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddProductModal;

