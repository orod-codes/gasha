import React, { useState } from 'react';
import { Book, Plus, Eye, Edit, Download, Search, FileText, Image, Video, Link, Calendar, User } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

const DocumentationSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documentation = [
    {
      id: 'DOC-001',
      title: 'GASHA Anti-Virus API Reference',
      category: 'api',
      type: 'technical',
      status: 'published',
      lastUpdated: '2024-01-15',
      author: 'John Developer',
      views: 1247,
      description: 'Complete API documentation for GASHA Anti-Virus integration and configuration.',
      tags: ['api', 'antivirus', 'integration'],
      module: 'gasha-antivirus'
    },
    {
      id: 'DOC-002',
      title: 'WAF Configuration Guide',
      category: 'guide',
      type: 'user',
      status: 'published',
      lastUpdated: '2024-01-12',
      author: 'Sarah Engineer',
      views: 892,
      description: 'Step-by-step guide for configuring GASHA WAF rules and policies.',
      tags: ['waf', 'configuration', 'security'],
      module: 'gasha-waf'
    },
    {
      id: 'DOC-003',
      title: 'VPN Setup Instructions',
      category: 'tutorial',
      type: 'user',
      status: 'draft',
      lastUpdated: '2024-01-10',
      author: 'Mike Writer',
      views: 0,
      description: 'Detailed instructions for setting up GASHA VPN on different platforms.',
      tags: ['vpn', 'setup', 'tutorial'],
      module: 'gasha-vpn'
    },
    {
      id: 'DOC-004',
      title: 'SIEM Integration Manual',
      category: 'manual',
      type: 'technical',
      status: 'review',
      lastUpdated: '2024-01-08',
      author: 'Alex Admin',
      views: 0,
      description: 'Technical manual for integrating NISIR SIEM with existing infrastructure.',
      tags: ['siem', 'integration', 'security'],
      module: 'nisir-siem'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Documents', count: documentation.length },
    { id: 'api', label: 'API Reference', count: documentation.filter(doc => doc.category === 'api').length },
    { id: 'guide', label: 'User Guides', count: documentation.filter(doc => doc.category === 'guide').length },
    { id: 'tutorial', label: 'Tutorials', count: documentation.filter(doc => doc.category === 'tutorial').length },
    { id: 'manual', label: 'Technical Manuals', count: documentation.filter(doc => doc.category === 'manual').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-slate-100 text-slate-700';
      case 'review': return 'bg-orange-100 text-orange-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'technical' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'api': return <FileText size={16} />;
      case 'guide': return <Book size={16} />;
      case 'tutorial': return <Video size={16} />;
      case 'manual': return <FileText size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const filteredDocs = documentation.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Documentation</h3>
        <Button>
          <Plus size={16} className="mr-2" />
          Create Document
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Documentation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Documents</p>
              <p className="text-2xl font-bold text-slate-600">{documentation.length}</p>
            </div>
            <Book className="h-8 w-8 text-slate-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Published</p>
              <p className="text-2xl font-bold text-green-600">
                {documentation.filter(doc => doc.status === 'published').length}
              </p>
            </div>
            <Eye className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">In Review</p>
              <p className="text-2xl font-bold text-orange-600">
                {documentation.filter(doc => doc.status === 'review').length}
              </p>
            </div>
            <Edit className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">
                {documentation.reduce((sum, doc) => sum + doc.views, 0)}
              </p>
            </div>
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Documentation List */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    {getCategoryIcon(doc.category)}
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900">{doc.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(doc.type)}`}>
                    {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                  </span>
                </div>
                
                <p className="text-slate-600 mb-4">{doc.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Module</p>
                    <p className="font-medium text-slate-900 capitalize">{doc.module.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Author</p>
                    <p className="font-medium text-slate-900">{doc.author}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Last Updated</p>
                    <p className="font-medium text-slate-900">{doc.lastUpdated}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Views</p>
                    <p className="font-medium text-slate-900">{doc.views}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {doc.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <Button variant="ghost" size="sm" className="w-full">
                  <Eye size={16} className="mr-2" />
                  View Document
                </Button>
                
                {doc.status === 'draft' && (
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit size={16} className="mr-2" />
                    Edit Document
                  </Button>
                )}

                {doc.status === 'review' && (
                  <Button size="sm" className="w-full">
                    <Edit size={16} className="mr-2" />
                    Review & Approve
                  </Button>
                )}

                <Button variant="outline" size="sm" className="w-full">
                  <Download size={16} className="mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">
            <FileText size={16} className="mr-2" />
            Create API Doc
          </Button>
          <Button variant="outline" className="w-full">
            <Book size={16} className="mr-2" />
            Create User Guide
          </Button>
          <Button variant="outline" className="w-full">
            <Video size={16} className="mr-2" />
            Create Tutorial
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DocumentationSection;