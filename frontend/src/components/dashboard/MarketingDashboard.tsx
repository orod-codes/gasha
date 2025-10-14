import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Search,
  AlertCircle,
  CreditCard as Edit
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { User } from '../../types';

interface MarketingDashboardProps {
  user: User;
}

const MarketingDashboard: React.FC<MarketingDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const pendingRequests = [
    {
      id: 'REQ-004',
      productName: 'GASHA Anti-Virus',
      companyName: 'StartupTech Inc',
      contactEmail: 'admin@startuptech.com',
      contactPhone: '+1-555-0123',
      status: 'pending',
      submittedDate: '2024-01-16',
      formData: {
        totalComputers: 25,
        windowsOS: 20,
        linuxOS: 5,
        contactPerson1: 'Alice Johnson',
        contactPerson2: 'Bob Smith',
        website: 'www.startuptech.com',
        officeNumber: '+1-555-0100',
        jobTitle: 'IT Manager',
        department: 'Information Technology'
      },
      completeness: 95,
      missingFields: ['Linux OS version']
    },
    {
      id: 'REQ-005',
      productName: 'GASHA WAF',
      companyName: 'WebSolutions Ltd',
      contactEmail: 'security@websolutions.com',
      contactPhone: '+1-555-0456',
      status: 'incomplete',
      submittedDate: '2024-01-15',
      formData: {
        institutionName: 'WebSolutions Ltd',
        hasInternalWebsite: true,
        serverOS: 'Ubuntu',
        webServer: 'Apache'
      },
      completeness: 70,
      missingFields: ['OS Version', 'Contact Person 2', 'Office Number']
    },
    {
      id: 'REQ-006',
      productName: 'Biometrics ABIS',
      companyName: 'SecureID Corp',
      contactEmail: 'info@secureid.com',
      contactPhone: '+1-555-0789',
      status: 'pending',
      submittedDate: '2024-01-14',
      formData: {
        name: 'SecureID Corp',
        organization: 'Security Services',
        contactEmail: 'info@secureid.com',
        contactPhone: '+1-555-0789',
        serviceType: 'Identity Verification',
        purpose: 'Employee Access Control',
        numberOfUsers: 500,
        bioModalities: ['fingerprint', 'face']
      },
      completeness: 100,
      missingFields: []
    }
  ];

  const validatedRequests = [
    {
      id: 'REQ-001',
      productName: 'GASHA Anti-Virus',
      companyName: 'TechCorp Solutions',
      status: 'validated',
      validatedDate: '2024-01-15',
      adminStatus: 'approved'
    },
    {
      id: 'REQ-002',
      productName: 'GASHA WAF',
      companyName: 'SecureBank Ltd',
      status: 'validated',
      validatedDate: '2024-01-14',
      adminStatus: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'incomplete': return 'bg-red-100 text-red-700';
      case 'validated': return 'bg-blue-100 text-blue-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getCompletenessColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleValidateRequest = (requestId: string) => {
    console.log('Validating request:', requestId);
    // Implementation for validating request
  };

  const handleMarkIncomplete = (requestId: string) => {
    console.log('Marking request as incomplete:', requestId);
    // Implementation for marking request as incomplete
  };

  const handleContactUser = (email: string, phone: string) => {
    console.log('Contacting user:', email, phone);
    // Implementation for contacting user
  };

  const renderRequestValidation = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-semibold text-slate-900">Request Validation</h3>
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
            <option value="incomplete">Incomplete</option>
            <option value="validated">Validated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Incomplete</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Validated</p>
              <p className="text-2xl font-bold text-green-600">15</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {pendingRequests.map((request) => (
          <Card key={request.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-slate-900">{request.id}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">Completeness:</span>
                    <span className={`font-semibold ${getCompletenessColor(request.completeness)}`}>
                      {request.completeness}%
                    </span>
                  </div>
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
                    <p className="text-sm text-slate-600">Contact Phone</p>
                    <p className="font-medium text-slate-900">{request.contactPhone}</p>
                  </div>
                </div>

                {request.missingFields.length > 0 && (
                  <div className="bg-red-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-red-800 mb-2">
                      <strong>Missing Information:</strong>
                    </p>
                    <ul className="text-sm text-red-700 list-disc list-inside">
                      {request.missingFields.map((field, index) => (
                        <li key={index}>{field}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-slate-50 p-4 rounded-lg">
                  <h5 className="font-medium text-slate-900 mb-2">Form Data Summary:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {Object.entries(request.formData).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="text-slate-900 font-medium">
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <Button size="sm" className="w-full">
                  <Eye size={16} className="mr-2" />
                  View Full Details
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleContactUser(request.contactEmail, request.contactPhone)}
                    className="flex-1"
                  >
                    <Mail size={16} className="mr-1" />
                    Email
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleContactUser(request.contactEmail, request.contactPhone)}
                    className="flex-1"
                  >
                    <Phone size={16} className="mr-1" />
                    Call
                  </Button>
                </div>

                {request.completeness >= 90 ? (
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleValidateRequest(request.id)}
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Validate & Forward
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleMarkIncomplete(request.id)}
                  >
                    <XCircle size={16} className="mr-2" />
                    Mark Incomplete
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderValidatedRequests = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-900">Validated Requests Status</h3>
      
      <div className="space-y-4">
        {validatedRequests.map((request) => (
          <Card key={request.id} className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-slate-900">{request.id}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    Validated
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.adminStatus)}`}>
                    Admin: {request.adminStatus}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Product</p>
                    <p className="font-medium text-slate-900">{request.productName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Company</p>
                    <p className="font-medium text-slate-900">{request.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Validated Date</p>
                    <p className="font-medium text-slate-900">{request.validatedDate}</p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Eye size={16} className="mr-2" />
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCommunication = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-900">Communication Center</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Email Templates</h4>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg">
              <h5 className="font-medium text-slate-900">Request Acknowledgment</h5>
              <p className="text-sm text-slate-600 mt-1">Thank you for your request. We are reviewing...</p>
              <Button variant="ghost" size="sm" className="mt-2">
                <Edit size={16} className="mr-2" />
                Edit Template
              </Button>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <h5 className="font-medium text-slate-900">Additional Information Required</h5>
              <p className="text-sm text-slate-600 mt-1">We need additional information to process...</p>
              <Button variant="ghost" size="sm" className="mt-2">
                <Edit size={16} className="mr-2" />
                Edit Template
              </Button>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <h5 className="font-medium text-slate-900">Request Validated</h5>
              <p className="text-sm text-slate-600 mt-1">Your request has been validated and forwarded...</p>
              <Button variant="ghost" size="sm" className="mt-2">
                <Edit size={16} className="mr-2" />
                Edit Template
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Recent Communications</h4>
          <div className="space-y-3">
            <div className="p-3 border border-slate-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-slate-900">StartupTech Inc</h5>
                <span className="text-xs text-slate-500">2 hours ago</span>
              </div>
              <p className="text-sm text-slate-600">Sent acknowledgment email for REQ-004</p>
              <div className="flex items-center mt-2 text-xs text-slate-500">
                <Mail size={12} className="mr-1" />
                admin@startuptech.com
              </div>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-slate-900">WebSolutions Ltd</h5>
                <span className="text-xs text-slate-500">1 day ago</span>
              </div>
              <p className="text-sm text-slate-600">Requested additional server information</p>
              <div className="flex items-center mt-2 text-xs text-slate-500">
                <Phone size={12} className="mr-1" />
                +1-555-0456
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Marketing Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Request validation and customer communication • {user?.name}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'requests', label: 'Pending Requests', icon: Clock },
              { id: 'validated', label: 'Validated Requests', icon: CheckCircle },
              { id: 'communication', label: 'Communication', icon: Mail }
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
        {activeTab === 'requests' && renderRequestValidation()}
        {activeTab === 'validated' && renderValidatedRequests()}
        {activeTab === 'communication' && renderCommunication()}
      </div>
    </div>
  );
};

export default MarketingDashboard;