import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, Send, Search } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface Request {
  id: string;
  productName: string;
  companyName: string;
  contactEmail: string;
  status: string;
  submittedDate: string;
  marketingNotes?: string;
  adminNotes?: string;
  assignedTo?: string;
  formData?: any;
}

interface RequestManagementSectionProps {
  requests: Request[];
  onApproveRequest: (requestId: string) => void;
  onRejectRequest: (requestId: string) => void;
  onViewRequest: (request: Request) => void;
  onAssignToTech: (requestId: string) => void;
}

const RequestManagementSection: React.FC<RequestManagementSectionProps> = ({
  requests,
  onApproveRequest,
  onRejectRequest,
  onViewRequest,
  onAssignToTech
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
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
              <p className="text-2xl font-bold text-orange-600">
                {requests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Validated</p>
              <p className="text-2xl font-bold text-blue-600">
                {requests.filter(r => r.status === 'validated').length}
              </p>
            </div>
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {requests.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {requests.filter(r => r.status === 'rejected').length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((request) => (
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
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => onViewRequest(request)}
                >
                  <Eye size={16} className="mr-2" />
                  View Details
                </Button>
                
                {request.status === 'validated' && (
                  <>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => onApproveRequest(request.id)}
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => onRejectRequest(request.id)}
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </Button>
                  </>
                )}

                {request.status === 'approved' && (
                  <Button variant="secondary" size="sm" className="w-full" onClick={() => onAssignToTech(request.id)}>
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
};

export default RequestManagementSection;
