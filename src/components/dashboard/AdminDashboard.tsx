import React, { useState } from 'react';
import { FileText, Users, CheckCircle, XCircle, Clock, Send, Eye, CreditCard as Edit, Plus, Search, Download } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { User } from '../../types';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const moduleRequests = [
    {
      id: 'REQ-001',
      productName: 'GASHA Anti-Virus',
      companyName: 'TechCorp Solutions',
      contactEmail: 'admin@techcorp.com',
      status: 'validated',
      submittedDate: '2024-01-15',
      marketingNotes: 'All information verified, company has 150 computers',
      formData: {
        totalComputers: 150,
        windowsOS: 120,
        linuxOS: 30,
        contactPerson1: 'John Smith',
        contactPerson2: 'Jane Doe'
      }
    },
    {
      id: 'REQ-002',
      productName: 'GASHA WAF',
      companyName: 'SecureBank Ltd',
      contactEmail: 'security@securebank.com',
      status: 'pending',
      submittedDate: '2024-01-14',
      marketingNotes: 'Waiting for additional server information',
      formData: {
        hasInternalWebsite: true,
        serverOS: 'Ubuntu 20.04',
        webServer: 'Nginx'
      }
    },
    {
      id: 'REQ-003',
      productName: 'NISIR SIEM',
      companyName: 'DataFlow Inc',
      contactEmail: 'it@dataflow.com',
      status: 'approved',
      submittedDate: '2024-01-13',
      adminNotes: 'Approved for enterprise deployment',
      assignedTo: 'Technical Team Alpha'
    }
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Marketing Lead', status: 'active', requests: 23 },
    { id: 2, name: 'Mike Chen', role: 'Marketing Specialist', status: 'active', requests: 18 },
    { id: 3, name: 'Alex Rodriguez', role: 'Technical Lead', status: 'active', tasks: 12 },
    { id: 4, name: 'Emma Wilson', role: 'Developer', status: 'active', content: 8 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'GASHA Anti-Virus Update 2024.1',
      author: 'Emma Wilson',
      status: 'pending',
      type: 'blog',
      createdDate: '2024-01-15',
      content: 'New features and security improvements...'
    },
    {
      id: 2,
      title: 'Security Best Practices Guide',
      author: 'Alex Rodriguez',
      status: 'published',
      type: 'news',
      createdDate: '2024-01-12',
      content: 'Essential security practices for enterprises...'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'validated': return 'bg-blue-100 text-blue-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleApproveRequest = (requestId: string) => {
    console.log('Approving request:', requestId);
    // Implementation for approving request
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejecting request:', requestId);
    // Implementation for rejecting request
  };

  const renderRequestManagement = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-semibold text-slate-900">Request Management</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="validated">Validated</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">12</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Validated</p>
              <p className="text-2xl font-bold text-blue-600">8</p>
            </div>
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">45</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {moduleRequests.map((request) => (
          <Card key={request.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-slate-900">{request.id}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Product</p>
                    <p className="font-medium text-slate-900">{request.productName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Company</p>
                    <p className="font-medium text-slate-900">{request.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Contact Email</p>
                    <p className="font-medium text-slate-900">{request.contactEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Submitted</p>
                    <p className="font-medium text-slate-900">{request.submittedDate}</p>
                  </div>
                </div>

                {request.marketingNotes && (
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Marketing Notes:</strong> {request.marketingNotes}
                    </p>
                  </div>
                )}

                {request.adminNotes && (
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-green-800">
                      <strong>Admin Notes:</strong> {request.adminNotes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <Button size="sm" className="w-full">
                  <Eye size={16} className="mr-2" />
                  View Details
                </Button>
                
                {request.status === 'validated' && (
                  <>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleApproveRequest(request.id)}
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </Button>
                  </>
                )}

                {request.status === 'approved' && (
                  <Button variant="secondary" size="sm" className="w-full">
                    <Send size={16} className="mr-2" />
                    Assign to Tech
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTeamManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Team Management</h3>
        <Button>
          <Plus size={16} className="mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{member.name}</h4>
                  <p className="text-sm text-slate-600">{member.role}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {member.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {member.requests && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Requests Handled</span>
                  <span className="font-medium">{member.requests}</span>
                </div>
              )}
              {member.tasks && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Active Tasks</span>
                  <span className="font-medium">{member.tasks}</span>
                </div>
              )}
              {member.content && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Content Created</span>
                  <span className="font-medium">{member.content}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit size={16} className="mr-1" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Eye size={16} className="mr-1" />
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Content Management</h3>
        <Button>
          <Plus size={16} className="mr-2" />
          Create Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
            <p className="text-sm text-slate-600">Published Posts</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">5</div>
            <p className="text-sm text-slate-600">Pending Review</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">3</div>
            <p className="text-sm text-slate-600">Draft Posts</p>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-slate-900">{post.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.type === 'blog' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {post.type}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">By {post.author} • {post.createdDate}</p>
                <p className="text-slate-700">{post.content}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <Button variant="ghost" size="sm">
                  <Eye size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit size={16} />
                </Button>
                {post.status === 'pending' && (
                  <>
                    <Button size="sm">
                      <CheckCircle size={16} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <XCircle size={16} />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Module Analytics</h3>
        <Button>
          <Download size={16} className="mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">68</div>
            <p className="text-sm text-slate-600">Total Requests</p>
            <p className="text-xs text-green-600 mt-1">+12% this month</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">45</div>
            <p className="text-sm text-slate-600">Completed</p>
            <p className="text-xs text-green-600 mt-1">66% completion rate</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">20</div>
            <p className="text-sm text-slate-600">In Progress</p>
            <p className="text-xs text-slate-600 mt-1">Average: 3 days</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
            <p className="text-sm text-slate-600">Content Posts</p>
            <p className="text-xs text-green-600 mt-1">+5 this week</p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Request Trends</h4>
        <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">Request analytics chart will be displayed here</p>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Managing {user?.module || 'GASHA'} module • {user?.name}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'requests', label: 'Requests', icon: FileText },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'content', label: 'Content', icon: Edit },
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
        {activeTab === 'requests' && renderRequestManagement()}
        {activeTab === 'team' && renderTeamManagement()}
        {activeTab === 'content' && renderContentManagement()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default AdminDashboard;