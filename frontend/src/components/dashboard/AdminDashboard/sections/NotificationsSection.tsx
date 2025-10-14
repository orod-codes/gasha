import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, XCircle, Clock, Filter, Search } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'system' | 'request' | 'team' | 'security';
}

interface NotificationsSectionProps {
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (notificationId: string) => void;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'warning',
      title: 'High Server Load Detected',
      message: 'Server CPU usage has exceeded 85% for the past 10 minutes',
      timestamp: '2024-01-15 14:30:00',
      read: false,
      priority: 'high',
      category: 'system'
    },
    {
      id: '2',
      type: 'info',
      title: 'New Request Submitted',
      message: 'TechCorp Solutions submitted a request for GASHA Anti-Virus',
      timestamp: '2024-01-15 13:45:00',
      read: false,
      priority: 'medium',
      category: 'request'
    },
    {
      id: '3',
      type: 'success',
      title: 'Backup Completed Successfully',
      message: 'Daily backup completed successfully. 2.3GB of data backed up.',
      timestamp: '2024-01-15 12:00:00',
      read: true,
      priority: 'low',
      category: 'system'
    },
    {
      id: '4',
      type: 'error',
      title: 'Failed Login Attempt',
      message: 'Multiple failed login attempts detected from IP 192.168.1.100',
      timestamp: '2024-01-15 11:15:00',
      read: false,
      priority: 'high',
      category: 'security'
    },
    {
      id: '5',
      type: 'info',
      title: 'Team Member Added',
      message: 'Sarah Johnson has been added to the marketing team',
      timestamp: '2024-01-15 10:30:00',
      read: true,
      priority: 'low',
      category: 'team'
    },
    {
      id: '6',
      type: 'warning',
      title: 'Storage Space Low',
      message: 'Available storage space is below 20%. Consider cleaning up old files.',
      timestamp: '2024-01-15 09:45:00',
      read: false,
      priority: 'medium',
      category: 'system'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle size={16} className="text-orange-500" />;
      case 'error': return <XCircle size={16} className="text-red-500" />;
      case 'success': return <CheckCircle size={16} className="text-green-500" />;
      default: return <Bell size={16} className="text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-l-orange-500 bg-orange-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) ||
      (filter === 'high' && notification.priority === 'high');
    
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Notifications & Alerts</h3>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onMarkAllAsRead}>
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{unreadCount}</div>
            <p className="text-sm text-slate-600">Unread Notifications</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{highPriorityCount}</div>
            <p className="text-sm text-slate-600">High Priority</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{notifications.length}</div>
            <p className="text-sm text-slate-600">Total Notifications</p>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search notifications..."
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
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="p-8 text-center">
            <Bell size={48} className="mx-auto text-slate-400 mb-4" />
            <h4 className="text-lg font-semibold text-slate-900 mb-2">No notifications found</h4>
            <p className="text-slate-600">Try adjusting your filters or search terms.</p>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card key={notification.id} className={`p-4 border-l-4 ${getTypeColor(notification.type)} ${
              !notification.read ? 'bg-white shadow-md' : 'bg-slate-50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-1">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-semibold ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                        {notification.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {notification.category}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock size={12} className="mr-1" />
                      {notification.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteNotification(notification.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="justify-start">
            <Bell size={16} className="mr-2" />
            Test Notification
          </Button>
          <Button variant="outline" className="justify-start">
            <AlertTriangle size={16} className="mr-2" />
            Create Alert Rule
          </Button>
          <Button variant="outline" className="justify-start">
            <Filter size={16} className="mr-2" />
            Manage Filters
          </Button>
          <Button variant="outline" className="justify-start">
            <CheckCircle size={16} className="mr-2" />
            Notification Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotificationsSection;


