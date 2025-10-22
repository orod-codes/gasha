import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Upload, Image } from 'lucide-react';
import Button from '../../../ui/Button';
import { uploadFile } from '../../../../services/uploadService';

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; type: string; logo: string }) => void;
  data: { name: string; description: string; type: string; logo: string };
  onChange: (data: { name: string; description: string; type: string; logo: string }) => void;
  selectedModule?: string;
}

const AddModuleModal: React.FC<AddModuleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
  onChange,
  selectedModule
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Update the logo field with the file name
      onChange({...data, logo: file.name});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔧 Form submitted with data:', data);
    
    if (selectedFile) {
      setIsUploading(true);
      try {
        console.log('🔧 Uploading file:', selectedFile.name);
        const uploadResult = await uploadFile(selectedFile);
        
        if (uploadResult.success && uploadResult.data) {
          console.log('✅ File uploaded successfully:', uploadResult.data);
          const uploadedData = {
            ...data,
            logo: uploadResult.data.path
          };
          onSubmit(uploadedData);
        } else {
          console.error('❌ Upload failed:', uploadResult.error);
          alert(`Upload failed: ${uploadResult.error}`);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
      } finally {
        setIsUploading(false);
      }
    } else {
      onSubmit(data);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {selectedModule ? `Edit ${selectedModule.toUpperCase()} Module` : 'Add New Module'}
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

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Module Name
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => onChange({...data, name: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter module name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={data.description}
                onChange={(e) => onChange({...data, description: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter module description"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Module Type
              </label>
              <select
                value={data.type}
                onChange={(e) => onChange({...data, type: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select type</option>
                <option value="security">Security</option>
                <option value="analytics">Analytics</option>
                <option value="management">Management</option>
                <option value="monitoring">Monitoring</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Module Logo
              </label>
              
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  {previewUrl ? (
                    <div className="space-y-2">
                      <img
                        src={previewUrl}
                        alt="Logo preview"
                        className="w-20 h-20 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-sm text-slate-600">Click to change logo</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto">
                        <Image className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">Upload Logo</p>
                        <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
              
              {/* Selected File Info */}
              {selectedFile && (
                <div className="mt-2 p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Upload className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700">{selectedFile.name}</span>
                    <span className="text-xs text-green-600">
                      ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                </div>
              )}
              
              {/* Alternative URL Input */}
              <div className="mt-3">
                <label className="block text-xs text-slate-500 mb-1">
                  Or enter logo URL:
                </label>
                <input
                  type="url"
                  value={data.logo}
                  onChange={(e) => onChange({...data, logo: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? 'Uploading...' : (selectedModule ? 'Update Module' : 'Add Module')}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddModuleModal;