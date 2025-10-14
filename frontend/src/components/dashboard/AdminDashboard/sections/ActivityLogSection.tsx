import React, { useState } from 'react';
import { Activity, User, Clock, Filter, Download, Search, Eye } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface ActivityLog {
  id: string;
  user: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed' | 'warning';
  category: 'login' | 'request' | 'content' | 'settings' | 'system';
}

interface ActivityLogSectionProps {
  onExportLogs: () => void;
  onViewDetails: (logId: string) => void;
}

const ActivityLogSection: React.FC<ActivityLogSectionProps> = ({
  onExportLogs,
  onViewDetails
}) => {
  const [filter, setFilter] = useState<'all' | 'login' | 'request' | 'content' | 'settings' | 'system'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failed' | 'warning'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      user: 'admin@securityservice.com',
      action: 'User Login',
      details: 'Successful login from Chrome browser',
      timestamp: '2024-01-15 14:30:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      category: 'login'
    },
    {
      id: '2',
      user: 'admin@securityservice.com',
      action: 'Request Approved',
      details: 'Approved REQ-001 for TechCorp Solutions',
      timestamp: '2024-01-15 14:25:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      category: 'request'
    },
    {
      id: '3',
      user: 'marketing@securityservice.com',
      action: 'Content Created',
      details: 'Created new blog post: "Security Best Practices Guide"',
      timestamp: '2024-01-15 14:20:00',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      status: 'success',
      category: 'content'
    },
    {
      id: '4',
      user: 'admin@securityservice.com',
      action: 'Settings Updated',
      details: 'Updated notification preferences',
      timestamp: '2024-01-15 14:15:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      category: 'settings'
    },
    {
      id: '5',
      user: 'unknown@external.com',
      action: 'Failed Login Attempt',
      details: 'Invalid credentials provided',
      timestamp: '2024-01-15 14:10:00',
      ipAddress: '203.0.113.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'failed',
      category: 'login'
    },
    {
      id: '6',
      user: 'admin@securityservice.com',
      action: 'System Backup',
      details: 'Daily backup completed successfully',
      timestamp: '2024-01-15 12:00:00',
      ipAddress: '192.168.1.100',
      userAgent: 'System Process',
      status: 'success',
      category: 'system'
    },
    {
      id: '7',
      user: 'admin@securityservice.com',
      action: 'Team Member Added',
      details: 'Added Sarah Johnson to marketing team',
      timestamp: '2024-01-15 10:30:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      category: 'settings'
    },
    {
      id: '8',
      user: 'admin@securityservice.com',
      action: 'Request Rejected',
      details: 'Rejected REQ-002 due to incomplete information',
      timestamp: '2024-01-15 09:45:00',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'warning',
      category: 'request'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'login': return 'bg-blue-100 text-blue-700';
      case 'request': return 'bg-purple-100 text-purple-700';
      case 'content': return 'bg-green-100 text-green-700';
      case 'settings': return 'bg-orange-100 text-orange-700';
      case 'system': return 'bg-gray-100 text-gray-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredLogs = activityLogs.filter(log => {
    const matchesCategory = filter === 'all' || log.category === filter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const stats = {
    total: activityLogs.length,
    success: activityLogs.filter(log => log.status === 'success').length,
    failed: activityLogs.filter(log => log.status === 'failed').length,
    warning: activityLogs.filter(log => log.status === 'warning').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">User Activity Log</h3>
        <Button onClick={onExportLogs}>
          <Download size={16} className="mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.total}</div>
            <p className="text-sm text-slate-600">Total Activities</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.success}</div>
            <p className="text-sm text-slate-600">Successful</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{stats.failed}</div>
            <p className="text-sm text-slate-600">Failed</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{stats.warning}</div>
            <p className="text-sm text-slate-600">Warnings</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="login">Login</option>
              <option value="request">Request</option>
              <option value="content">Content</option>
              <option value="settings">Settings</option>
              <option value="system">System</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="warning">Warning</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Activity Logs */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <Card className="p-8 text-center">
            <Activity size={48} className="mx-auto text-slate-400 mb-4" />
            <h4 className="text-lg font-semibold text-slate-900 mb-2">No activities found</h4>
            <p className="text-slate-600">Try adjusting your filters or search terms.</p>
          </Card>
        ) : (
          filteredLogs.map((log) => (
            <Card key={log.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-1">
                    <User size={16} className="text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{log.action}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(log.category)}`}>
                        {log.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{log.details}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <div className="flex items-center">
                        <User size={12} className="mr-1" />
                        {log.user}
                      </div>
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {log.timestamp}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">IP:</span>
                        {log.ipAddress}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(log.id)}
                  >
                    <Eye size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Activity Summary */}
      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Activity Summary (Last 24 Hours)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600 mb-1">12</div>
            <p className="text-sm text-slate-600">Login Attempts</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600 mb-1">8</div>
            <p className="text-sm text-slate-600">Request Actions</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600 mb-1">5</div>
            <p className="text-sm text-slate-600">Content Updates</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600 mb-1">3</div>
            <p className="text-sm text-slate-600">Settings Changes</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ActivityLogSection;


