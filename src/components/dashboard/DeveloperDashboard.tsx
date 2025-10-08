import React, { useState } from 'react';
import { FileText, Eye, CreditCard as Edit, Plus, Clock, CheckCircle, Send, Save, Image, Settings } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { User } from '../../types';

interface DeveloperDashboardProps {
  user: User;
}

const DeveloperDashboard: React.FC<DeveloperDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [isCreating, setIsCreating] = useState(false);

  const contentPosts = [
    {
      id: 'POST-001',
      title: 'GASHA Anti-Virus 2024.1 Release Notes',
      type: 'blog',
      status: 'draft',
      createdDate: '2024-01-16',
      lastModified: '2024-01-16',
      wordCount: 1250,
      content: 'We are excited to announce the latest version of GASHA Anti-Virus with enhanced threat detection capabilities...',
      tags: ['security', 'antivirus', 'release'],
      module: 'gasha-antivirus'
    },
    {
      id: 'POST-002',
      title: 'Best Practices for WAF Configuration',
      type: 'blog',
      status: 'pending',
      createdDate: '2024-01-15',
      lastModified: '2024-01-15',
      wordCount: 890,
      content: 'Configuring a Web Application Firewall requires careful consideration of your application architecture...',
      tags: ['waf', 'security', 'configuration'],
      module: 'gasha-waf',
      adminNotes: 'Please add more technical details about rule configuration.'
    },
    {
      id: 'POST-003',
      title: 'VPN Security Update - January 2024',
      type: 'news',
      status: 'published',
      createdDate: '2024-01-12',
      lastModified: '2024-01-13',
      publishedDate: '2024-01-13',
      wordCount: 650,
      content: 'Important security update for GASHA VPN users. This update includes patches for...',
      tags: ['vpn', 'security', 'update'],
      module: 'gasha-vpn'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'published': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'blog' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';
  };

  const handleCreatePost = () => {
    setIsCreating(true);
  };

  const handleSavePost = (postId: string) => {
    console.log('Saving post:', postId);
  };

  const handleSubmitForReview = (postId: string) => {
    console.log('Submitting post for review:', postId);
  };

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Content Management</h3>
        <Button onClick={handleCreatePost}>
          <Plus size={16} className="mr-2" />
          Create New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Draft Posts</p>
              <p className="text-2xl font-bold text-slate-600">3</p>
            </div>
            <Edit className="h-8 w-8 text-slate-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">2</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Published</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">2.4k</p>
            </div>
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {isCreating && (
        <Card className="p-6 mb-6">
          <h4 className="font-semibold text-slate-900 mb-4">Create New Post</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter post title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="blog">Blog Post</option>
                  <option value="news">News Article</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Module</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="gasha-antivirus">GASHA Anti-Virus</option>
                <option value="gasha-waf">GASHA WAF</option>
                <option value="gasha-vpn">GASHA VPN</option>
                <option value="nisir-siem">NISIR SIEM</option>
                <option value="enyuma-iam">ENYUMA IAM</option>
                <option value="codepro">CODEPRO Protection</option>
                <option value="biometrics">Biometrics ABIS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
              <textarea
                rows={8}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Write your content here..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter tags separated by commas..."
              />
            </div>
            <div className="flex space-x-3">
              <Button>
                <Save size={16} className="mr-2" />
                Save Draft
              </Button>
              <Button variant="secondary">
                <Send size={16} className="mr-2" />
                Submit for Review
              </Button>
              <Button variant="ghost" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {contentPosts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-slate-900">{post.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(post.status)}`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(post.type)}`}>
                    {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Module</p>
                    <p className="font-medium text-slate-900 capitalize">{post.module.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Created</p>
                    <p className="font-medium text-slate-900">{post.createdDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Word Count</p>
                    <p className="font-medium text-slate-900">{post.wordCount} words</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-slate-700 line-clamp-2">{post.content}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {post.adminNotes && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Admin Notes:</strong> {post.adminNotes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <Button variant="ghost" size="sm" className="w-full">
                  <Eye size={16} className="mr-2" />
                  Preview
                </Button>
                
                {(post.status === 'draft' || post.status === 'rejected') && (
                  <>
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit size={16} className="mr-2" />
                      Edit Post
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleSubmitForReview(post.id)}
                    >
                      <Send size={16} className="mr-2" />
                      Submit for Review
                    </Button>
                  </>
                )}

                {post.status === 'pending' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleSavePost(post.id)}
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                )}

                {post.status === 'published' && (
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">Published on {post.publishedDate}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBrandingManagement = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-900">Module Branding & Assets</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Visual Assets</h4>
          <div className="space-y-4">
            <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center">
              <Image className="h-12 w-12 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 mb-2">Module Logo</p>
              <Button variant="outline" size="sm">
                <Plus size={16} className="mr-2" />
                Upload Logo
              </Button>
            </div>
            <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center">
              <Image className="h-12 w-12 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 mb-2">Banner Image</p>
              <Button variant="outline" size="sm">
                <Plus size={16} className="mr-2" />
                Upload Banner
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Module Information</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Module Name</label>
              <input
                type="text"
                value={user?.module || 'GASHA Anti-Virus'}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Update module description..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contact Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="module-support@securityservice.com"
              />
            </div>
            <Button className="w-full">
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Announcements & Banners</h4>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium text-blue-900">Security Update Available</h5>
              <Button variant="ghost" size="sm">
                <Edit size={16} />
              </Button>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              Important security update for GASHA Anti-Virus. Please update to version 2024.1 for enhanced protection.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600">Active until: 2024-01-30</span>
              <Button variant="outline" size="sm">
                Deactivate
              </Button>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">
            <Plus size={16} className="mr-2" />
            Create New Announcement
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-900">Content Analytics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2.4k</div>
            <p className="text-sm text-slate-600">Total Views</p>
            <p className="text-xs text-green-600 mt-1">+15% this month</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">18</div>
            <p className="text-sm text-slate-600">Published Posts</p>
            <p className="text-xs text-green-600 mt-1">+3 this month</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
            <p className="text-sm text-slate-600">Avg. Engagement</p>
            <p className="text-xs text-green-600 mt-1">+8% this month</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.2</div>
            <p className="text-sm text-slate-600">Avg. Rating</p>
            <p className="text-xs text-slate-600 mt-1">Out of 5 stars</p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Popular Content</h4>
        <div className="space-y-4">
          {[
            { title: 'GASHA Anti-Virus Installation Guide', views: 892, engagement: 78 },
            { title: 'Security Best Practices 2024', views: 654, engagement: 65 },
            { title: 'Troubleshooting Common Issues', views: 543, engagement: 72 }
          ].map((post, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <h5 className="font-medium text-slate-900">{post.title}</h5>
                <p className="text-sm text-slate-600">{post.views} views • {post.engagement}% engagement</p>
              </div>
              <Button variant="ghost" size="sm">
                <Eye size={16} />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Developer Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Content creation and module management • {user?.name}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'content', label: 'Content', icon: FileText },
              { id: 'branding', label: 'Branding', icon: Settings },
              { id: 'analytics', label: 'Analytics', icon: Eye }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'content' && renderContentManagement()}
        {activeTab === 'branding' && renderBrandingManagement()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default DeveloperDashboard;