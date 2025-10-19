import React, { useState } from 'react';
import { X, Upload, FileText, Download, Trash2 } from 'lucide-react';
import Button from '../../../ui/Button';

interface FileUploadModalProps {
  taskId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onUploadFiles: (taskId: string, files: File[]) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
  taskId,
  isOpen,
  onClose,
  onUploadFiles
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!taskId || selectedFiles.length === 0) return;

    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      
      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
      }
    }

    // Call the upload handler
    onUploadFiles(taskId, selectedFiles);
    
    // Reset state
    setSelectedFiles([]);
    setUploadProgress({});
    setIsUploading(false);
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Upload Files</h2>
            <p className="text-sm text-slate-600">Task ID: {taskId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* File Upload Area */}
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Support for documents, images, and configuration files
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.txt,.json,.xml,.zip,.rar,.png,.jpg,.jpeg,.gif"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </label>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                Selected Files ({selectedFiles.length})
              </h3>
              <div className="space-y-3">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{file.name}</p>
                        <p className="text-xs text-slate-600">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {uploadProgress[file.name] !== undefined && (
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[file.name]}%` }}
                          ></div>
                        </div>
                      )}
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="p-1 hover:bg-slate-200 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Guidelines */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Upload Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Maximum file size: 50MB per file</li>
              <li>• Supported formats: PDF, DOC, TXT, JSON, XML, ZIP, Images</li>
              <li>• Configuration files should be clearly named</li>
              <li>• Screenshots should be in PNG or JPG format</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200">
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={selectedFiles.length === 0 || isUploading}
          >
            {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Files`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;



