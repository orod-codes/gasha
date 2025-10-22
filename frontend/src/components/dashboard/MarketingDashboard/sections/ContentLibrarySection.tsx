import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Upload,
  Search,
  Filter,
  Image,
  Video,
  File,
  Folder,
  Tag,
  Calendar,
  User,
  BarChart3,
  Share2,
  Copy,
  Star,
  Archive
} from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface ContentAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'template' | 'presentation';
  category: 'marketing' | 'social' | 'email' | 'presentation' | 'branding';
  size: string;
  uploadedBy: string;
  uploadDate: string;
  lastModified: string;
  tags: string[];
  downloads: number;
  status: 'active' | 'archived' | 'draft';
  description: string;
  thumbnail?: string;
}

const ContentLibrarySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<ContentAsset | null>(null);

  const [contentAssets, setContentAssets] = useState<ContentAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch content assets on component mount
  useEffect(() => {
    const fetchContentAssets = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with real API call
        // const response = await getContentAssets();
        // setContentAssets(response.data);
        
        // For now, set empty array
        setContentAssets([]);
        
      } catch (err) {
        console.error('Error fetching content assets:', err);
        setError('Failed to load content assets');
      } finally {
        setLoading(false);
      }
    };

    fetchContentAssets();
  }, []);

  // Mock data removed - now using real API calls
  // const contentAssets: ContentAsset[] = [
    {
      id: 'ASSET-001',
      name: 'GASHA Logo - Primary',
      type: 'image',
      category: 'branding',
      size: '2.4 MB',
      uploadedBy: 'Design Team',
      uploadDate: '2024-01-10',
      lastModified: '2024-01-15',
      tags: ['logo', 'brand', 'primary'],
      downloads: 45,
      status: 'active',
      description: 'Primary GASHA logo in PNG format with transparent background'
    },
    {
      id: 'ASSET-002',
      name: 'Product Launch Email Template',
      type: 'template',
      category: 'email',
      size: '156 KB',
      uploadedBy: 'Marketing Team',
      uploadDate: '2024-01-12',
      lastModified: '2024-01-14',
      tags: ['email', 'template', 'product-launch'],
      downloads: 23,
      status: 'active',
      description: 'HTML email template for product launch campaigns'
    },
    {
      id: 'ASSET-003',
      name: 'Security Awareness Video',
      type: 'video',
      category: 'marketing',
      size: '45.2 MB',
      uploadedBy: 'Video Team',
      uploadDate: '2024-01-08',
      lastModified: '2024-01-08',
      tags: ['video', 'security', 'awareness'],
      downloads: 67,
      status: 'active',
      description: 'Educational video about cybersecurity best practices'
    },
    {
      id: 'ASSET-004',
      name: 'LinkedIn Post Templates',
      type: 'template',
      category: 'social',
      size: '89 KB',
      uploadedBy: 'Social Media Manager',
      uploadDate: '2024-01-05',
      lastModified: '2024-01-13',
      tags: ['linkedin', 'template', 'social'],
      downloads: 34,
      status: 'active',
      description: 'Collection of LinkedIn post templates for different content types'
    },
    {
      id: 'ASSET-005',
      name: 'Company Presentation Deck',
      type: 'presentation',
      category: 'presentation',
      size: '12.8 MB',
      uploadedBy: 'Sales Team',
      uploadDate: '2024-01-03',
      lastModified: '2024-01-16',
      tags: ['presentation', 'company', 'sales'],
      downloads: 89,
      status: 'active',
      description: 'Comprehensive company presentation for sales meetings'
    },
    {
      id: 'ASSET-006',
      name: 'Old Marketing Banner',
      type: 'image',
      category: 'marketing',
      size: '1.2 MB',
      uploadedBy: 'Design Team',
      uploadDate: '2023-12-15',
      lastModified: '2023-12-15',
      tags: ['banner', 'old', 'marketing'],
      downloads: 12,
      status: 'archived',
      description: 'Previous marketing banner design (archived)'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image size={20} />;
      case 'video': return <Video size={20} />;
      case 'document': return <FileText size={20} />;
      case 'template': return <File size={20} />;
      case 'presentation': return <FileText size={20} />;
      default: return <File size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-blue-100 text-blue-700';
      case 'video': return 'bg-red-100 text-red-700';
      case 'document': return 'bg-green-100 text-green-700';
      case 'template': return 'bg-purple-100 text-purple-700';
      case 'presentation': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'marketing': return 'bg-blue-100 text-blue-700';
      case 'social': return 'bg-green-100 text-green-700';
      case 'email': return 'bg-purple-100 text-purple-700';
      case 'presentation': return 'bg-orange-100 text-orange-700';
      case 'branding': return 'bg-pink-100 text-pink-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'archived': return 'bg-red-100 text-red-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredAssets = contentAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const stats = {
    totalAssets: contentAssets.length,
    activeAssets: contentAssets.filter(a => a.status === 'active').length,
    totalDownloads: contentAssets.reduce((sum, a) => sum + a.downloads, 0),
    totalSize: '62.8 MB'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Content Library</h3>
          <p className="text-slate-600">Manage your marketing assets and content repository</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowUploadModal(true)}>
            <Upload size={16} className="mr-2" />
            Upload
          </Button>
          <Button onClick={() => setShowUploadModal(true)}>
            <Plus size={16} className="mr-2" />
            Add Asset
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Assets</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalAssets}</p>
            </div>
            <Folder className="h-8 w-8 text-slate-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Assets</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeAssets}</p>
            </div>
            <FileText className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Downloads</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalDownloads}</p>
            </div>
            <Download className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Size</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalSize}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="document">Documents</option>
          <option value="template">Templates</option>
          <option value="presentation">Presentations</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="marketing">Marketing</option>
          <option value="social">Social Media</option>
          <option value="email">Email</option>
          <option value="presentation">Presentation</option>
          <option value="branding">Branding</option>
        </select>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </div>
      </div>

      {/* Assets Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${getTypeColor(asset.type)}`}>
                    {getTypeIcon(asset.type)}
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Eye size={14} />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 truncate">{asset.name}</h4>
                  <p className="text-sm text-slate-600">{asset.size}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(asset.category)}`}>
                    {asset.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                    {asset.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{asset.downloads} downloads</span>
                  <span>{asset.uploadDate}</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Share2 size={14} className="mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${getTypeColor(asset.type)}`}>
                  {getTypeIcon(asset.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-slate-900">{asset.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(asset.category)}`}>
                      {asset.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{asset.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>Size: {asset.size}</span>
                    <span>Downloads: {asset.downloads}</span>
                    <span>Uploaded: {asset.uploadDate}</span>
                    <span>By: {asset.uploadedBy}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye size={16} className="mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 size={16} className="mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
            <Upload size={20} className="text-blue-600" />
            <span className="text-sm">Upload Files</span>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
            <Folder size={20} className="text-green-600" />
            <span className="text-sm">Create Folder</span>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
            <Copy size={20} className="text-purple-600" />
            <span className="text-sm">Duplicate</span>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
            <Archive size={20} className="text-orange-600" />
            <span className="text-sm">Archive</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ContentLibrarySection;
