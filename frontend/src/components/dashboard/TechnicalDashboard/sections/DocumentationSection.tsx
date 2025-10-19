import React from 'react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { FileText, Upload, Search, Download, BookOpen, Code, Settings } from 'lucide-react';

interface DocumentationSectionProps {
  onUploadDocument: () => void;
  onSearchDocument: (query: string) => void;
}

const DocumentationSection: React.FC<DocumentationSectionProps> = ({
  onUploadDocument,
  onSearchDocument
}) => {
  const documentationCategories = [
    {
      id: 'deployment',
      title: 'Deployment Guides',
      icon: Settings,
      color: 'blue',
      documents: [
        { name: 'GASHA Anti-Virus Deployment Guide v2.1', size: '2.3 MB', date: '2024-01-15' },
        { name: 'NISIR SIEM Installation Manual', size: '4.1 MB', date: '2024-01-12' },
        { name: 'GASHA WAF Configuration Guide', size: '1.8 MB', date: '2024-01-10' }
      ]
    },
    {
      id: 'api',
      title: 'API Documentation',
      icon: Code,
      color: 'green',
      documents: [
        { name: 'REST API Reference v3.0', size: '3.2 MB', date: '2024-01-14' },
        { name: 'SDK Integration Guide', size: '2.1 MB', date: '2024-01-11' },
        { name: 'Webhook Configuration', size: '856 KB', date: '2024-01-08' }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: BookOpen,
      color: 'orange',
      documents: [
        { name: 'Common Issues & Solutions', size: '1.5 MB', date: '2024-01-13' },
        { name: 'Performance Optimization', size: '2.8 MB', date: '2024-01-09' },
        { name: 'Error Code Reference', size: '1.2 MB', date: '2024-01-07' }
      ]
    }
  ];

  const recentUploads = [
    { name: 'VPN Client Configuration.pdf', uploadedBy: 'John Smith', date: '2 hours ago' },
    { name: 'Security Audit Report.docx', uploadedBy: 'Sarah Johnson', date: '4 hours ago' },
    { name: 'Network Diagram.png', uploadedBy: 'Mike Chen', date: '1 day ago' }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Documentation Center</h2>
          <p className="text-slate-600">Technical guides, manuals, and reference materials</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => onSearchDocument(e.target.value)}
            />
          </div>
          <Button onClick={onUploadDocument}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Documents</p>
              <p className="text-2xl font-bold text-blue-600">47</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">This Month</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <Upload className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Categories</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <BookOpen className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Downloads</p>
              <p className="text-2xl font-bold text-purple-600">234</p>
            </div>
            <Download className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Documentation Categories */}
      <div className="space-y-6">
        {documentationCategories.map((category) => (
          <Card key={category.id} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${getColorClasses(category.color)}`}>
                <category.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{category.title}</h3>
            </div>
            
            <div className="space-y-3">
              {category.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Uploads */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Uploads</h3>
        <div className="space-y-3">
          {recentUploads.map((upload, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium text-slate-900">{upload.name}</p>
                  <p className="text-xs text-slate-500">by {upload.uploadedBy} • {upload.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download size={16} />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DocumentationSection;

