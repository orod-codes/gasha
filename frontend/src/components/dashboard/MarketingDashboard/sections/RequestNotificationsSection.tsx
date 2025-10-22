import React, { useState, useEffect } from 'react';
import { Bell, Eye, CheckCircle, Clock, User, Building, Mail, Phone, AlertCircle } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { getNotifications, markNotificationAsRead } from '../../../../services/notificationService';
import { Notification } from '../../../../types';

const RequestNotificationsSection: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    fetchNotifications();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const allNotifications = await getNotifications();
      const requestNotifications = allNotifications.filter(n => n.type === 'request');
      setNotifications(requestNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'request': return <Bell className="h-5 w-5 text-blue-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Request Notifications</h3>
          <div className="animate-pulse bg-slate-200 h-8 w-20 rounded"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-slate-100 h-20 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Request Notifications</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-600">
            {notifications.filter(n => !n.isRead).length} unread
          </span>
          <Button 
            size="sm" 
            variant="outline"
            onClick={fetchNotifications}
          >
            Refresh
          </Button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card className="p-8 text-center">
          <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-slate-900 mb-2">No notifications</h4>
          <p className="text-slate-600">You'll receive notifications when customers submit requests.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'
              }`}
              onClick={() => {
                setSelectedNotification(notification);
                if (!notification.isRead) {
                  handleMarkAsRead(notification.id);
                }
              }}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-slate-900 truncate">
                      {notification.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-500">
                        {formatTime(notification.createdAt)}
                      </span>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    {notification.message}
                  </p>
                  
                  {notification.data && (
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      {notification.data.companyName && (
                        <div className="flex items-center space-x-1">
                          <Building className="h-3 w-3" />
                          <span>{notification.data.companyName}</span>
                        </div>
                      )}
                      {notification.data.contactPerson && (
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{notification.data.contactPerson}</span>
                        </div>
                      )}
                      {notification.data.priority && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notification.data.priority)}`}>
                          {notification.data.priority}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  Request Details
                </h3>
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company Name
                  </label>
                  <p className="text-sm text-slate-900">
                    {selectedNotification.data?.companyName || 'Not provided'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Contact Person
                  </label>
                  <p className="text-sm text-slate-900">
                    {selectedNotification.data?.contactPerson || 'Not provided'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <p className="text-sm text-slate-900">
                    {selectedNotification.data?.email || 'Not provided'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Priority
                  </label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedNotification.data?.priority || 'medium')}`}>
                    {selectedNotification.data?.priority || 'medium'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Product Requested
                </label>
                <p className="text-sm text-slate-900">
                  {selectedNotification.data?.productName || 'Unknown Product'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Request Message
                </label>
                <p className="text-sm text-slate-900">
                  {selectedNotification.message}
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setSelectedNotification(null)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  // Navigate to request management
                  console.log('Navigate to request:', selectedNotification.data?.requestId);
                  setSelectedNotification(null);
                }}
              >
                View Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestNotificationsSection;

