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
  MessageSquare,
  Send,
  User,
  Building,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface CustomerRequest {
  id: string;
  customerName: string;
  company: string;
  requestType: 'content' | 'campaign' | 'social' | 'email' | 'video' | 'design';
  title: string;
  description: string;
  submittedDate: string;
  deadline: string;
  status: 'pending' | 'approved' | 'rejected' | 'rescheduled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget: number;
  tags: string[];
  reviewer?: string;
  reviewDate?: string;
  comments?: string;
  rejectionReason?: string;
  newScheduleDate?: string;
  // Detailed customer information
  customerDetails: {
    companyName: string;
    totalComputers: number;
    windowsOS: number;
    linuxOS: number;
    bit32Systems: number;
    bit64Systems: number;
    contactPerson1: string;
    contactPerson2?: string;
    contactEmail: string;
    website?: string;
    officeNumber?: string;
    jobTitle?: string;
    department?: string;
  };
}

const ContentApprovalSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<CustomerRequest | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [newScheduleDate, setNewScheduleDate] = useState('');
  const [commentText, setCommentText] = useState('');
  const [requests, setRequests] = useState<CustomerRequest[]>([]);

  // Initialize requests state
  React.useEffect(() => {
    setRequests(customerRequests);
  }, []);

  const customerRequests: CustomerRequest[] = [
    {
      id: 'REQ-001',
      customerName: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      requestType: 'campaign',
      title: 'Q1 Product Launch Email Campaign',
      description: 'Need email campaign for GASHA Anti-Virus product launch targeting enterprise customers',
      submittedDate: '2024-01-15',
      deadline: '2024-02-01',
      status: 'pending',
      priority: 'high',
      budget: 5000,
      tags: ['product-launch', 'email', 'enterprise'],
      reviewer: 'Marketing Manager',
      customerDetails: {
        companyName: 'TechCorp Solutions',
        totalComputers: 150,
        windowsOS: 120,
        linuxOS: 30,
        bit32Systems: 25,
        bit64Systems: 125,
        contactPerson1: 'Sarah Johnson',
        contactPerson2: 'Mike Chen',
        contactEmail: 'sarah.johnson@techcorp.com',
        website: 'www.techcorp.com',
        officeNumber: '+251-11-123-4567',
        jobTitle: 'IT Director',
        department: 'Information Technology'
      }
    },
    {
      id: 'REQ-002',
      customerName: 'Mike Chen',
      company: 'SecureBiz Inc',
      requestType: 'social',
      title: 'LinkedIn Security Awareness Posts',
      description: 'Educational LinkedIn content about cybersecurity best practices for small businesses',
      submittedDate: '2024-01-14',
      deadline: '2024-01-20',
      status: 'rescheduled',
      priority: 'medium',
      budget: 2000,
      tags: ['education', 'linkedin', 'security'],
      reviewer: 'Social Media Manager',
      reviewDate: '2024-01-16',
      comments: 'Content approved, rescheduled for better timing',
      newScheduleDate: '2024-01-25',
      customerDetails: {
        companyName: 'SecureBiz Inc',
        totalComputers: 75,
        windowsOS: 60,
        linuxOS: 15,
        bit32Systems: 10,
        bit64Systems: 65,
        contactPerson1: 'Mike Chen',
        contactPerson2: 'Emma Wilson',
        contactEmail: 'mike.chen@securebiz.com',
        website: 'www.securebiz.com',
        officeNumber: '+251-11-234-5678',
        jobTitle: 'Marketing Manager',
        department: 'Marketing'
      }
    },
    {
      id: 'REQ-003',
      customerName: 'Alex Rodriguez',
      company: 'CyberGuard Ltd',
      requestType: 'video',
      title: 'GASHA VPN Setup Tutorial',
      description: 'Step-by-step video tutorial for setting up GASHA VPN on Windows systems',
      submittedDate: '2024-01-12',
      deadline: '2024-01-25',
      status: 'approved',
      priority: 'medium',
      budget: 3000,
      tags: ['tutorial', 'vpn', 'video'],
      reviewer: 'Content Manager',
      reviewDate: '2024-01-13',
      comments: 'Excellent content! Forwarded to admin dashboard for production.',
      customerDetails: {
        companyName: 'CyberGuard Ltd',
        totalComputers: 200,
        windowsOS: 150,
        linuxOS: 50,
        bit32Systems: 30,
        bit64Systems: 170,
        contactPerson1: 'Alex Rodriguez',
        contactPerson2: 'David Kim',
        contactEmail: 'alex.rodriguez@cyberguard.com',
        website: 'www.cyberguard.com',
        officeNumber: '+251-11-345-6789',
        jobTitle: 'Content Manager',
        department: 'Content Creation'
      }
    },
    {
      id: 'REQ-004',
      customerName: 'Emma Wilson',
      company: 'DataSecure Corp',
      requestType: 'content',
      title: 'Cybersecurity Trends Blog Series',
      description: 'Comprehensive blog post about emerging cybersecurity threats and trends for 2024',
      submittedDate: '2024-01-10',
      deadline: '2024-01-18',
      status: 'rejected',
      priority: 'low',
      budget: 1500,
      tags: ['blog', 'trends', 'cybersecurity'],
      reviewer: 'Editor-in-Chief',
      reviewDate: '2024-01-11',
      rejectionReason: 'Content needs more original research and updated statistics. Please revise and resubmit.',
      customerDetails: {
        companyName: 'DataSecure Corp',
        totalComputers: 100,
        windowsOS: 80,
        linuxOS: 20,
        bit32Systems: 15,
        bit64Systems: 85,
        contactPerson1: 'Emma Wilson',
        contactPerson2: 'Sarah Johnson',
        contactEmail: 'emma.wilson@datasecure.com',
        website: 'www.datasecure.com',
        officeNumber: '+251-11-456-7890',
        jobTitle: 'Editor-in-Chief',
        department: 'Content Strategy'
      }
    },
    {
      id: 'REQ-005',
      customerName: 'David Kim',
      company: 'SafeNet Technologies',
      requestType: 'design',
      title: 'Security Awareness Month Graphics',
      description: 'Instagram stories and posts for National Cybersecurity Awareness Month campaign',
      submittedDate: '2024-01-16',
      deadline: '2024-01-22',
      status: 'pending',
      priority: 'urgent',
      budget: 2500,
      tags: ['instagram', 'awareness', 'graphics'],
      customerDetails: {
        companyName: 'SafeNet Technologies',
        totalComputers: 300,
        windowsOS: 250,
        linuxOS: 50,
        bit32Systems: 40,
        bit64Systems: 260,
        contactPerson1: 'David Kim',
        contactPerson2: 'Mike Chen',
        contactEmail: 'david.kim@safenet.com',
        website: 'www.safenet.com',
        officeNumber: '+251-11-567-8901',
        jobTitle: 'Design Director',
        department: 'Creative Design'
      }
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'campaign': return <Megaphone size={18} className="text-blue-600" />;
      case 'email': return <Mail size={18} className="text-purple-600" />;
      case 'social': return <Users size={18} className="text-green-600" />;
      case 'content': return <FileText size={18} className="text-orange-600" />;
      case 'video': return <Video size={18} className="text-red-600" />;
      case 'design': return <Image size={18} className="text-pink-600" />;
      default: return <FileText size={18} className="text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    rescheduled: requests.filter(r => r.status === 'rescheduled').length,
    urgent: requests.filter(r => r.priority === 'urgent').length,
    totalBudget: requests.reduce((sum, r) => sum + r.budget, 0)
  };

  const handleApprove = (requestId: string) => {
    console.log('Approving request:', requestId);
    const updatedRequests = requests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'approved' as const, 
            reviewDate: new Date().toISOString().split('T')[0], 
            comments: 'Approved by Marketing Team - Ready for Admin Dashboard',
            reviewer: 'Marketing Manager'
          }
        : request
    );
    setRequests(updatedRequests);
    alert(`Request ${requestId} approved and forwarded to Admin Dashboard Request Management!`);
    console.log('Request forwarded to Admin Dashboard Request Management:', requestId);
  };

  const handleReject = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setShowCommentModal(true);
    }
  };

  const confirmReject = () => {
    if (selectedRequest && commentText) {
      const updatedRequests = requests.map(request => 
        request.id === selectedRequest.id 
          ? { 
              ...request, 
              status: 'rejected' as const, 
              reviewDate: new Date().toISOString().split('T')[0], 
              rejectionReason: commentText,
              reviewer: 'Marketing Manager'
            }
          : request
      );
      setRequests(updatedRequests);
      setShowCommentModal(false);
      setCommentText('');
      setSelectedRequest(null);
      alert(`Request ${selectedRequest.id} rejected with reason: ${commentText}`);
    }
  };

  const handleReschedule = (requestId: string) => {
    setSelectedRequest(requests.find(r => r.id === requestId) || null);
    setShowRescheduleModal(true);
  };

  const confirmReschedule = () => {
    if (selectedRequest && newScheduleDate) {
      const updatedRequests = requests.map(request => 
        request.id === selectedRequest.id 
          ? { 
              ...request, 
              status: 'rescheduled' as const, 
              newScheduleDate: newScheduleDate,
              reviewDate: new Date().toISOString().split('T')[0],
              comments: `Rescheduled from ${selectedRequest.deadline} to ${newScheduleDate}`,
              reviewer: 'Marketing Manager'
            }
          : request
      );
      setRequests(updatedRequests);
      setShowRescheduleModal(false);
      setNewScheduleDate('');
      setSelectedRequest(null);
      alert(`Request ${selectedRequest.id} rescheduled to ${newScheduleDate}`);
    }
  };

  const handleForwardAllApproved = () => {
    const approvedRequests = requests.filter(r => r.status === 'approved');
    if (approvedRequests.length === 0) {
      alert('No approved requests to forward.');
      return;
    }
    
    console.log('Forwarding all approved requests to Admin Dashboard Request Management:', approvedRequests.map(r => r.id));
    alert(`${approvedRequests.length} approved request(s) forwarded to Admin Dashboard Request Management!`);
  };

  const handleReviewDetails = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setShowReviewModal(true);
    }
  };

  const handleAddComment = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setSelectedRequest(request);
      setShowCommentModal(true);
    }
  };

  const confirmComment = () => {
    if (selectedRequest && commentText) {
      const updatedRequests = requests.map(request => 
        request.id === selectedRequest.id 
          ? { 
              ...request, 
              comments: commentText,
              reviewDate: new Date().toISOString().split('T')[0],
              reviewer: 'Marketing Manager'
            }
          : request
      );
      setRequests(updatedRequests);
      setShowCommentModal(false);
      setCommentText('');
      setSelectedRequest(null);
      alert(`Comment added to request ${selectedRequest.id}`);
    }
  };

  return (
    <div className="space-y-6">

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-gradient-to-br from-white-50 to-white-50 border-white-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-balck-700 font-medium">Pending Review</p>
              <p className="text-2xl font-bold text-black-800">{stats.pending}</p>
              <p className="text-xs text-black-600">Awaiting approval</p>
            </div>
            <div className="p-3 bg-yellow-200 rounded-xl">
              <Clock className="h-6 w-6 text-yellow-700" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-white-50 to-emerald-50 border-white-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black-700 font-medium">Approved</p>
              <p className="text-2xl font-bold text-black-800">{stats.approved}</p>
              <p className="text-xs text-black-600">Ready for Admin Dashboard</p>
            </div>
            <div className="p-3 bg-green-200 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-700" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-white-50 to-rose-50 border-white-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black-700 font-medium">Rejected</p>
              <p className="text-2xl font-bold text-white-800">{stats.rejected}</p>
              <p className="text-xs text-black-600">Needs revision</p>
            </div>
            <div className="p-3 bg-red-200 rounded-xl">
              <XCircle className="h-6 w-6 text-red-700" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-white-50 to-cyan-50 border-white-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black-700 font-medium">Rescheduled</p>
              <p className="text-2xl font-bold text-black-800">{stats.rescheduled}</p>
              <p className="text-xs text-black-600">Timeline adjusted</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-xl">
              <Calendar className="h-6 w-6 text-blue-700" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-white-50 to-violet-50 border-white-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white-700 font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-b-800">{stats.totalBudget.toLocaleString()}</p>
              <p className="text-xs text-black-600">birr allocated</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-xl">
              <Star className="h-6 w-6 text-purple-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
              placeholder="Search by customer, company, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
            <option value="rescheduled">Rescheduled</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        </div>
      </div>

      {/* Customer Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-200">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                {/* Header with Customer Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    {getTypeIcon(request.requestType)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-slate-900">{request.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(request.priority)}`}>
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                  </span>
                    </div>
                    
                    {/* Customer Information */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-slate-500" />
                        <span className="font-medium text-slate-700">{request.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-slate-500" />
                        <span className="text-slate-600">{request.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-500" />
                        <span className="font-medium text-slate-700">{request.budget.toLocaleString()} birr</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Request Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600 font-medium">Submitted</p>
                    <p className="font-semibold text-slate-900">{request.submittedDate}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600 font-medium">Deadline</p>
                    <p className="font-semibold text-slate-900">{request.deadline}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600 font-medium">Budget</p>
                    <p className="font-semibold text-slate-900">{request.budget.toLocaleString()} birr</p>
                  </div>
                </div>

                <p className="text-slate-600 mb-4 leading-relaxed">{request.description}</p>

                {/* Review Comments */}
                {request.comments && (
                  <div className="bg-green-50 p-4 rounded-lg mb-4 border border-green-200">
                    <h5 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <MessageSquare size={16} />
                      Reviewer Comments:
                    </h5>
                    <p className="text-sm text-green-800">{request.comments}</p>
                  </div>
                )}

                {request.rejectionReason && (
                  <div className="bg-red-50 p-4 rounded-lg mb-4 border border-red-200">
                    <h5 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                      <XCircle size={16} />
                      Rejection Reason:
                    </h5>
                    <p className="text-sm text-red-800">{request.rejectionReason}</p>
                  </div>
                )}

                {request.newScheduleDate && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Calendar size={16} />
                      Rescheduled to:
                    </h5>
                    <p className="text-sm text-blue-800">{request.newScheduleDate}</p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {request.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-1 border border-blue-200">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 min-w-[220px]">
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleReviewDetails(request.id)}
                >
                  <Eye size={16} className="mr-2" />
                  Review Details
                </Button>
                
                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(request.id)}
                    >
                      <ThumbsUp size={16} className="mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 text-red-600 hover:text-red-700 border-red-300"
                      onClick={() => handleReject(request.id)}
                    >
                      <ThumbsDown size={16} className="mr-1" />
                      Reject
                    </Button>
                  </div>
                )}

                {request.status === 'approved' && (
                  <Button 
                    size="sm" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      alert(`Request ${request.id} forwarded to Admin Dashboard Request Management!`);
                      console.log('Forwarding approved request to Admin Dashboard Request Management:', request.id);
                    }}
                  >
                    <ArrowRight size={16} className="mr-2" />
                    Forward to Admin
                  </Button>
                )}

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
                    onClick={() => handleReschedule(request.id)}
                  >
                    <Calendar size={16} className="mr-1" />
                    Reschedule
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                    onClick={() => handleAddComment(request.id)}
                  >
                    <MessageSquare size={16} className="mr-1" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modals */}
      {/* Review Modal */}
      {showReviewModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">Review Request Details</h3>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Customer Information - Detailed Form */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <User size={24} className="text-blue-600" />
                  Customer Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">Company Name *</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.companyName}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">Total Computers *</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.totalComputers}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">Windows OS *</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.windowsOS}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">Linux OS *</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.linuxOS}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">32-bit Systems</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.bit32Systems}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">64-bit Systems</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.bit64Systems}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">Contact Person 1 *</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.contactPerson1}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">Contact Person 2</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.contactPerson2 || 'N/A'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">Contact Email *</label>
                    <p className="font-bold text-blue-600 text-lg mt-1">{selectedRequest.customerDetails.contactEmail}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">Website</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.website || 'N/A'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">Office Number</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.officeNumber || 'N/A'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">Job Title</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.jobTitle || 'N/A'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <label className="text-sm text-slate-600 font-medium">Department</label>
                    <p className="font-bold text-slate-900 text-lg mt-1">{selectedRequest.customerDetails.department || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <FileText size={20} className="text-slate-600" />
                  Request Details
                </h4>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-slate-900 mb-2">{selectedRequest.title}</h5>
                  <p className="text-slate-600 leading-relaxed">{selectedRequest.description}</p>
                </div>
              </div>

              {/* Timeline Information */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Calendar size={20} className="text-slate-600" />
                  Timeline & Status
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600 font-medium">Submitted</p>
                    <p className="font-semibold text-slate-900">{selectedRequest.submittedDate}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600 font-medium">Deadline</p>
                    <p className="font-semibold text-slate-900">{selectedRequest.deadline}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600 font-medium">Priority</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(selectedRequest.priority)}`}>
                      {selectedRequest.priority.charAt(0).toUpperCase() + selectedRequest.priority.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Information */}
              {selectedRequest.reviewer && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <MessageSquare size={20} className="text-slate-600" />
                    Review Information
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-slate-600 font-medium">Reviewer</p>
                        <p className="font-semibold text-slate-900">{selectedRequest.reviewer}</p>
                      </div>
                      {selectedRequest.reviewDate && (
                        <div>
                          <p className="text-sm text-slate-600 font-medium">Review Date</p>
                          <p className="font-semibold text-slate-900">{selectedRequest.reviewDate}</p>
                        </div>
                      )}
                    </div>
                    {selectedRequest.comments && (
                      <div>
                        <p className="text-sm text-slate-600 font-medium mb-2">Comments</p>
                        <p className="text-slate-800 bg-white p-3 rounded border">{selectedRequest.comments}</p>
                      </div>
                    )}
                    {selectedRequest.rejectionReason && (
                      <div>
                        <p className="text-sm text-red-600 font-medium mb-2">Rejection Reason</p>
                        <p className="text-red-800 bg-red-50 p-3 rounded border border-red-200">{selectedRequest.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Tag size={20} className="text-slate-600" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full border border-blue-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowReviewModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">Reschedule Request</h3>
              <button 
                onClick={() => setShowRescheduleModal(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 mb-2">Current Deadline: {selectedRequest.deadline}</p>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Deadline
                </label>
                <input
                  type="date"
                  value={newScheduleDate}
                  onChange={(e) => setNewScheduleDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowRescheduleModal(false)}>
                Cancel
              </Button>
              <Button onClick={confirmReschedule} disabled={!newScheduleDate}>
                Reschedule
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900">
                {selectedRequest.status === 'pending' ? 'Reject Request' : 'Add Comment'}
              </h3>
              <button 
                onClick={() => setShowCommentModal(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 mb-2">Request: {selectedRequest.title}</p>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {selectedRequest.status === 'pending' ? 'Rejection Reason' : 'Comment'}
                </label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={selectedRequest.status === 'pending' ? 'Please provide reason for rejection...' : 'Add your comment...'}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowCommentModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={selectedRequest.status === 'pending' ? confirmReject : confirmComment} 
                disabled={!commentText}
                className={selectedRequest.status === 'pending' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
              >
                {selectedRequest.status === 'pending' ? 'Reject' : 'Add Comment'}
              </Button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ContentApprovalSection;