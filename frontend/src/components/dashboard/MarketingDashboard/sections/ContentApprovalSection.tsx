import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock,
  Users,
  FileText,
  Image,
  Video,
  Megaphone,
  Mail,
  Calendar,
  Tag,
  Filter,
  Search,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface ApprovalItem {
  id: string;
  title: string;
  type: 'campaign' | 'email' | 'social' | 'blog' | 'video' | 'image';
  author: string;
  submittedDate: string;
  scheduledDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs-revision';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  tags: string[];
  reviewer?: string;
  reviewDate?: string;
  comments?: string;
  rejectionReason?: string;
}

const ContentApprovalSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const approvalItems: ApprovalItem[] = [
    {
      id: 'APP-001',
      title: 'Q1 Product Launch Email Campaign',
      type: 'email',
      author: 'Sarah Johnson',
      submittedDate: '2024-01-15',
      scheduledDate: '2024-02-01',
      status: 'pending',
      priority: 'high',
      description: 'Email campaign announcing new GASHA Anti-Virus features and pricing',
      tags: ['product-launch', 'email', 'q1'],
      reviewer: 'Marketing Manager'
    },
    {
      id: 'APP-002',
      title: 'LinkedIn Security Tips Post',
      type: 'social',
      author: 'Mike Chen',
      submittedDate: '2024-01-14',
      scheduledDate: '2024-01-20',
      status: 'needs-revision',
      priority: 'medium',
      description: 'Educational LinkedIn post about cybersecurity best practices for small businesses',
      tags: ['education', 'linkedin', 'security'],
      reviewer: 'Social Media Manager',
      reviewDate: '2024-01-16',
      comments: 'Please add more specific examples and include a call-to-action'
    },
    {
      id: 'APP-003',
      title: 'GASHA VPN Tutorial Video',
      type: 'video',
      author: 'Alex Rodriguez',
      submittedDate: '2024-01-12',
      scheduledDate: '2024-01-25',
      status: 'approved',
      priority: 'medium',
      description: 'Step-by-step video tutorial for setting up GASHA VPN on Windows',
      tags: ['tutorial', 'vpn', 'video'],
      reviewer: 'Content Manager',
      reviewDate: '2024-01-13',
      comments: 'Great content! Approved for publishing.'
    },
    {
      id: 'APP-004',
      title: 'Blog: 2024 Cybersecurity Trends',
      type: 'blog',
      author: 'Emma Wilson',
      submittedDate: '2024-01-10',
      scheduledDate: '2024-01-18',
      status: 'rejected',
      priority: 'low',
      description: 'Comprehensive blog post about emerging cybersecurity threats and trends',
      tags: ['blog', 'trends', 'cybersecurity'],
      reviewer: 'Editor-in-Chief',
      reviewDate: '2024-01-11',
      rejectionReason: 'Content needs more original research and updated statistics'
    },
    {
      id: 'APP-005',
      title: 'Instagram Security Awareness Campaign',
      type: 'social',
      author: 'David Kim',
      submittedDate: '2024-01-16',
      scheduledDate: '2024-01-22',
      status: 'pending',
      priority: 'urgent',
      description: 'Instagram stories and posts for National Cybersecurity Awareness Month',
      tags: ['instagram', 'awareness', 'campaign']
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'campaign': return <Megaphone size={16} />;
      case 'email': return <Mail size={16} />;
      case 'social': return <Users size={16} />;
      case 'blog': return <FileText size={16} />;
      case 'video': return <Video size={16} />;
      case 'image': return <Image size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'needs-revision': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredItems = approvalItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    pending: approvalItems.filter(i => i.status === 'pending').length,
    approved: approvalItems.filter(i => i.status === 'approved').length,
    rejected: approvalItems.filter(i => i.status === 'rejected').length,
    needsRevision: approvalItems.filter(i => i.status === 'needs-revision').length,
    urgent: approvalItems.filter(i => i.priority === 'urgent').length
  };

  const handleApprove = (itemId: string) => {
    console.log('Approving item:', itemId);
    // Handle approval logic here
  };

  const handleReject = (itemId: string) => {
    console.log('Rejecting item:', itemId);
    // Handle rejection logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Content Approval</h3>
          <p className="text-slate-600">Review and approve marketing content before publication</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">{stats.urgent} Urgent</span>
          </div>
          <Button onClick={() => setShowReviewModal(true)}>
            <Eye size={16} className="mr-2" />
            Review Queue
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Needs Revision</p>
              <p className="text-2xl font-bold text-orange-600">{stats.needsRevision}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Urgent</p>
              <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="needs-revision">Needs Revision</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Approval Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-slate-100`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Author</p>
                    <p className="font-medium text-slate-900">{item.author}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Submitted</p>
                    <p className="font-medium text-slate-900">{item.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Scheduled</p>
                    <p className="font-medium text-slate-900">{item.scheduledDate}</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-4">{item.description}</p>

                {item.comments && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h5 className="font-medium text-blue-900 mb-2">Reviewer Comments:</h5>
                    <p className="text-sm text-blue-800">{item.comments}</p>
                  </div>
                )}

                {item.rejectionReason && (
                  <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <h5 className="font-medium text-red-900 mb-2">Rejection Reason:</h5>
                    <p className="text-sm text-red-800">{item.rejectionReason}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full flex items-center gap-1">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <Button size="sm" className="w-full">
                  <Eye size={16} className="mr-2" />
                  Review
                </Button>
                
                {item.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(item.id)}
                    >
                      <ThumbsUp size={16} className="mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 text-red-600 hover:text-red-700"
                      onClick={() => handleReject(item.id)}
                    >
                      <ThumbsDown size={16} className="mr-1" />
                      Reject
                    </Button>
                  </div>
                )}

                {item.status === 'needs-revision' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Add Comments
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Calendar size={16} className="mr-1" />
                    Reschedule
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <FileText size={16} className="mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      
    </div>
  );
};

export default ContentApprovalSection;