import React, { useState } from 'react';
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  lastContact: string;
  notes: string;
  assignedTo: string;
}

const LeadsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const leads: Lead[] = [
    {
      id: 'LEAD-001',
      name: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1-555-0123',
      source: 'Website',
      status: 'qualified',
      score: 85,
      lastContact: '2024-01-15',
      notes: 'Interested in GASHA Anti-Virus for 50+ workstations',
      assignedTo: 'Marketing Team'
    },
    {
      id: 'LEAD-002',
      name: 'Michael Chen',
      company: 'SecureBank Ltd',
      email: 'm.chen@securebank.com',
      phone: '+1-555-0456',
      source: 'Referral',
      status: 'contacted',
      score: 72,
      lastContact: '2024-01-14',
      notes: 'Looking for WAF solution, budget approved',
      assignedTo: 'Marketing Team'
    },
    {
      id: 'LEAD-003',
      name: 'Emily Rodriguez',
      company: 'StartupTech Inc',
      email: 'emily@startuptech.com',
      phone: '+1-555-0789',
      source: 'Social Media',
      status: 'new',
      score: 45,
      lastContact: '2024-01-16',
      notes: 'Small team, interested in VPN solution',
      assignedTo: 'Marketing Team'
    },
    {
      id: 'LEAD-004',
      name: 'David Kim',
      company: 'Enterprise Corp',
      email: 'david.kim@enterprise.com',
      phone: '+1-555-0321',
      source: 'Trade Show',
      status: 'converted',
      score: 95,
      lastContact: '2024-01-10',
      notes: 'Converted to customer - GASHA Anti-Virus license',
      assignedTo: 'Sales Team'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'qualified': return 'bg-green-100 text-green-700';
      case 'converted': return 'bg-purple-100 text-purple-700';
      case 'lost': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock size={16} />;
      case 'contacted': return <Mail size={16} />;
      case 'qualified': return <CheckCircle size={16} />;
      case 'converted': return <CheckCircle size={16} />;
      case 'lost': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Lead Management</h3>
          <p className="text-slate-600">Track and manage your marketing leads</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={16} className="mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Leads</p>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-slate-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">New</p>
              <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Contacted</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.contacted}</p>
            </div>
            <Mail className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Qualified</p>
              <p className="text-2xl font-bold text-green-600">{stats.qualified}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Converted</p>
              <p className="text-2xl font-bold text-purple-600">{stats.converted}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads..."
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
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Sources</option>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Social Media">Social Media</option>
          <option value="Trade Show">Trade Show</option>
          <option value="Email Campaign">Email Campaign</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-slate-900">{lead.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(lead.status)}`}>
                    {getStatusIcon(lead.status)}
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">Score:</span>
                    <span className={`font-semibold ${getScoreColor(lead.score)}`}>
                      {lead.score}/100
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Company</p>
                    <p className="font-medium text-slate-900">{lead.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Source</p>
                    <p className="font-medium text-slate-900">{lead.source}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="font-medium text-slate-900">{lead.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Phone</p>
                    <p className="font-medium text-slate-900">{lead.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Last Contact</p>
                    <p className="font-medium text-slate-900">{lead.lastContact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Assigned To</p>
                    <p className="font-medium text-slate-900">{lead.assignedTo}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <h5 className="font-medium text-slate-900 mb-2">Notes:</h5>
                  <p className="text-sm text-slate-600">{lead.notes}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <Button size="sm" className="w-full">
                  <Eye size={16} className="mr-2" />
                  View Details
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Mail size={16} className="mr-1" />
                    Email
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Phone size={16} className="mr-1" />
                    Call
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
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

export default LeadsSection;





