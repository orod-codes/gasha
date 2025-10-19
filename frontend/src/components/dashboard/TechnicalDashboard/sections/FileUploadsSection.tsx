import React from 'react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { Upload, FileText, Download, Trash2, Eye, Calendar, User } from 'lucide-react';

interface FileUploadsSectionProps {
  onUploadFile: () => void;
  onDownloadFile: (fileId: string) => void;
  onDeleteFile: (fileId: string) => void;
  onViewFile: (fileId: string) => void;
}

const FileUploadsSection: React.FC<FileUploadsSectionProps> = ({
  onUploadFile,
  onDownloadFile,
  onDeleteFile,
  onViewFile
}) => {
  const uploadedFiles = [
    {
      id: 'FILE-001',
      name: 'GASHA-AV-Deployment-Guide.pdf',
      size: '2.3 MB',
      type: 'PDF',
      uploadedBy: 'John Smith',
      uploadedDate: '2024-01-15',
      category: 'Deployment',
      taskId: 'TASK-001'
    },
    {
      id: 'FILE-002',
      name: 'NISIR-SIEM-Config-Backup.zip',
      size: '15.7 MB',
      type: 'ZIP',
      uploadedBy: 'Sarah Johnson',
      uploadedDate: '2024-01-14',
      category: 'Configuration',
      taskId: 'TASK-002'
    },
    {
      id: 'FILE-003',
      name: 'WAF-Security-Rules.json',
      size: '456 KB',
      type: 'JSON',
      uploadedBy: 'Mike Chen',
      uploadedDate: '2024-01-13',
      category: 'Configuration',
      taskId: 'TASK-003'
    },
    {
      id: 'FILE-004',
      name: 'VPN-Client-Setup.png',
      size: '1.2 MB',
      type: 'PNG',
      uploadedBy: 'Emma Wilson',
      uploadedDate: '2024-01-12',
      category: 'Screenshot',
      taskId: 'TASK-004'
    }
  ];

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-700';
      case 'ZIP': return 'bg-blue-100 text-blue-700';
      case 'JSON': return 'bg-green-100 text-green-700';
      case 'PNG': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Deployment': return 'bg-blue-100 text-blue-700';
      case 'Configuration': return 'bg-green-100 text-green-700';
      case 'Screenshot': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">File Management</h2>
          <p className="text-slate-600">Upload, organize, and manage technical files</p>
        </div>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Categories</option>
            <option value="deployment">Deployment</option>
            <option value="configuration">Configuration</option>
            <option value="screenshot">Screenshot</option>
          </select>
          <Button onClick={onUploadFile}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Files</p>
              <p className="text-2xl font-bold text-blue-600">{uploadedFiles.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Size</p>
              <p className="text-2xl font-bold text-green-600">19.7 MB</p>
            </div>
            <Upload className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">This Week</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Downloads</p>
              <p className="text-2xl font-bold text-purple-600">42</p>
            </div>
            <Download className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* File List */}
      <div className="space-y-4">
        {uploadedFiles.map((file) => (
          <Card key={file.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <FileText className="h-6 w-6 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-slate-900">{file.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(file.type)}`}>
                      {file.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(file.category)}`}>
                      {file.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>Task: {file.taskId}</span>
                    <span>•</span>
                    <span>by {file.uploadedBy}</span>
                    <span>•</span>
                    <span>{file.uploadedDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewFile(file.id)}
                >
                  <Eye size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDownloadFile(file.id)}
                >
                  <Download size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDeleteFile(file.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Guidelines */}
      <Card className="p-6 bg-blue-50">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Upload Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">File Types Supported:</h4>
            <ul className="space-y-1">
              <li>• Documents: PDF, DOC, DOCX, TXT</li>
              <li>• Images: PNG, JPG, JPEG, GIF</li>
              <li>• Archives: ZIP, RAR, 7Z</li>
              <li>• Config: JSON, XML, YAML</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Size Limits:</h4>
            <ul className="space-y-1">
              <li>• Maximum file size: 50MB</li>
              <li>• Maximum files per upload: 10</li>
              <li>• Total storage limit: 1GB per user</li>
              <li>• Auto-cleanup after 90 days</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FileUploadsSection;

