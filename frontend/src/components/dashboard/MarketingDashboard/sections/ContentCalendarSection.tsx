import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Eye, 
  Clock,
  Users,
  FileText,
  Image,
  Video,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  Edit,
  Trash2
} from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface ContentItem {
  id: string;
  title: string;
  type: 'social' | 'email' | 'blog' | 'video' | 'image';
  status: 'draft' | 'scheduled' | 'published' | 'review';
  scheduledDate: string;
  scheduledTime: string;
  author: string;
  platform: string[];
  description: string;
  tags: string[];
}

const ContentCalendarSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  
  // Form state for create/edit modal
  const [formData, setFormData] = useState({
    title: '',
    type: 'email' as 'social' | 'email' | 'blog' | 'video' | 'image',
    status: 'draft' as 'draft' | 'scheduled' | 'published' | 'review',
    scheduledDate: '',
    scheduledTime: '',
    description: '',
    author: 'Current User',
    platform: [] as string[],
    tags: [] as string[]
  });
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: 'CONT-002',
      title: 'Weekly Newsletter',
      type: 'email',
      status: 'scheduled',
      scheduledDate: '2024-02-20',
      scheduledTime: '08:00',
      author: 'Content Team',
      platform: ['Email'],
      description: 'Weekly update on security trends and company news',
      tags: ['newsletter', 'weekly', 'security']
    },
    {
      id: 'CONT-003',
      title: 'LinkedIn Security Tips Post',
      type: 'social',
      status: 'draft',
      scheduledDate: '2024-02-18',
      scheduledTime: '14:00',
      author: 'Social Media Manager',
      platform: ['LinkedIn'],
      description: 'Educational post about cybersecurity best practices',
      tags: ['education', 'cybersecurity', 'linkedin']
    },
    {
      id: 'CONT-004',
      title: 'GASHA VPN Tutorial Video',
      type: 'video',
      status: 'review',
      scheduledDate: '2024-02-25',
      scheduledTime: '10:00',
      author: 'Video Team',
      platform: ['YouTube', 'Website'],
      description: 'Step-by-step tutorial for setting up GASHA VPN',
      tags: ['tutorial', 'vpn', 'video']
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'social': return <Users size={16} />;
      case 'email': return <FileText size={16} />;
      case 'blog': return <FileText size={16} />;
      case 'video': return <Video size={16} />;
      case 'image': return <Image size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'published': return 'bg-green-100 text-green-700';
      case 'review': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'social': return 'bg-blue-100 text-blue-700';
      case 'email': return 'bg-green-100 text-green-700';
      case 'blog': return 'bg-orange-100 text-orange-700';
      case 'video': return 'bg-red-100 text-red-700';
      case 'image': return 'bg-pink-100 text-pink-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const upcomingContent = contentItems
    .filter(item => new Date(item.scheduledDate) >= new Date())
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 5);

  // Calendar helper functions
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    
    const days = [];
    const today = new Date();
    
    // Add days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        dayNumber: date.getDate(),
        date: date.toISOString().split('T')[0],
        isCurrentMonth: false,
        isToday: date.toDateString() === today.toDateString()
      });
    }
    
    // Add days from current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        dayNumber: day,
        date: date.toISOString().split('T')[0],
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString()
      });
    }
    
    // Add days from next month to fill the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        dayNumber: day,
        date: date.toISOString().split('T')[0],
        isCurrentMonth: false,
        isToday: date.toDateString() === today.toDateString()
      });
    }
    
    return days;
  };

  const getContentForDay = (date: string) => {
    return contentItems.filter(item => item.scheduledDate === date);
  };

  const handleDayClick = (date: string) => {
    setFormData(prev => ({
      ...prev,
      scheduledDate: date
    }));
    setEditingItem(null);
    setShowCreateModal(true);
  };

  // Function handlers
  const handleViewDetails = (item: ContentItem) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };


  const handleDeleteItem = (itemId: string) => {
    setContentItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      type: 'email',
      status: 'draft',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '09:00',
      description: '',
      author: 'Current User',
      platform: [],
      tags: []
    });
    setShowCreateModal(true);
  };

  const handleEditItem = (item: ContentItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      type: item.type,
      status: item.status,
      scheduledDate: item.scheduledDate,
      scheduledTime: item.scheduledTime,
      description: item.description,
      author: item.author,
      platform: item.platform,
      tags: item.tags
    });
    setShowCreateModal(true);
  };

  const handleQuickAction = (action: string) => {
    const typeMap: { [key: string]: 'social' | 'email' | 'blog' | 'video' | 'image' } = {
      'Email Template': 'email',
      'Social Post': 'social',
      'Video Content': 'video',
      'Blog Post': 'blog'
    };
    
    setEditingItem(null);
    setFormData({
      title: `New ${action}`,
      type: typeMap[action] || 'email',
      status: 'draft',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '09:00',
      description: '',
      author: 'Current User',
      platform: [],
      tags: []
    });
    setShowCreateModal(true);
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveItem = () => {
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    const newItem: ContentItem = {
      id: editingItem?.id || `CONT-${Date.now()}`,
      title: formData.title,
      type: formData.type,
      status: formData.status,
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      description: formData.description,
      author: formData.author,
      platform: formData.platform,
      tags: formData.tags
    };

    if (editingItem) {
      setContentItems(prev => prev.map(i => i.id === editingItem.id ? newItem : i));
    } else {
      setContentItems(prev => [...prev, newItem]);
    }
    
    setShowCreateModal(false);
    setEditingItem(null);
    setFormData({
      title: '',
      type: 'email',
      status: 'draft',
      scheduledDate: '',
      scheduledTime: '',
      description: '',
      author: 'Current User',
      platform: [],
      tags: []
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Content Calendar</h3>
          <p className="text-slate-600">Plan and schedule your marketing content</p>
        </div>
        <div className="flex gap-2">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'month' | 'week' | 'day')}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="month">Month View</option>
            <option value="week">Week View</option>
            <option value="day">Day View</option>
          </select>
          <Button onClick={handleCreateNew}>
            <Plus size={16} className="mr-2" />
            Schedule Content
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h4 className="text-lg font-semibold text-slate-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg">
              <Calendar size={16} />
              <span className="text-sm font-medium">12 Scheduled</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg">
              <Clock size={16} />
              <span className="text-sm font-medium">8 Published</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        {viewMode === 'month' && (
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-slate-600 py-2">
                {day}
              </div>
            ))}
            {getCalendarDays().map((day, i) => (
              <div 
                key={i} 
                className={`h-20 border border-slate-200 rounded-lg p-2 hover:bg-slate-50 cursor-pointer ${
                  day.isCurrentMonth ? 'bg-white' : 'bg-slate-50'
                } ${day.isToday ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleDayClick(day.date)}
              >
                <div className={`text-sm font-medium ${day.isCurrentMonth ? 'text-slate-900' : 'text-slate-400'}`}>
                  {day.dayNumber}
                </div>
                <div className="mt-1 space-y-1">
                  {getContentForDay(day.date).slice(0, 2).map((item) => (
                    <div 
                      key={item.id}
                      className={`text-xs px-1 py-0.5 rounded truncate ${getTypeColor(item.type)}`}
                      title={item.title}
                    >
                      {item.title}
                    </div>
                  ))}
                  {getContentForDay(day.date).length > 2 && (
                    <div className="text-xs text-slate-500">
                      +{getContentForDay(day.date).length - 2} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'week' && (
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-slate-600 py-2">
                {day}
              </div>
            ))}
            {getWeekDays().map((day, i) => (
              <div 
                key={i} 
                className={`h-32 border border-slate-200 rounded-lg p-3 hover:bg-slate-50 cursor-pointer ${
                  day.isCurrentMonth ? 'bg-white' : 'bg-slate-50'
                } ${day.isToday ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleDayClick(day.date)}
              >
                <div className={`text-sm font-medium ${day.isCurrentMonth ? 'text-slate-900' : 'text-slate-400'}`}>
                  {day.dayNumber}
                </div>
                <div className="mt-2 space-y-1">
                  {getContentForDay(day.date).map((item) => (
                    <div 
                      key={item.id}
                      className={`text-xs px-2 py-1 rounded truncate ${getTypeColor(item.type)}`}
                      title={item.title}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'day' && (
          <div className="mb-4">
            <div className="h-96 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-slate-900">
                  {currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h4>
                <button
                  onClick={() => handleDayClick(currentDate.toISOString().split('T')[0])}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} className="inline mr-1" />
                  Add Content
                </button>
              </div>
              <div className="space-y-3">
                {getContentForDay(currentDate.toISOString().split('T')[0]).map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer"
                    onClick={() => handleViewDetails(item)}
                  >
                    <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-slate-900">{item.title}</h5>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={14} />
                        <span>{item.scheduledTime}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(item);
                    }}>
                      <Eye size={14} />
                    </Button>
                  </div>
                ))}
                {getContentForDay(currentDate.toISOString().split('T')[0]).length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <Calendar size={48} className="mx-auto mb-2 text-slate-300" />
                    <p>No content scheduled for this day</p>
                    <p className="text-sm">Click "Add Content" to schedule something</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Upcoming Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-900">Upcoming Content</h4>
            <span className="text-sm text-slate-600">{upcomingContent.length} items</span>
          </div>
          <div className="space-y-3">
            {upcomingContent.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-slate-900">{item.title}</h5>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock size={14} />
                    <span>{formatDate(item.scheduledDate)} at {item.scheduledTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(item)}>
                    <Eye size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-900">Content Performance</h4>
            <span className="text-sm text-slate-600">This Month</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Published Content</p>
                  <p className="text-sm text-slate-600">Posts & Content</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">24</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Users size={16} />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Total Reach</p>
                  <p className="text-sm text-slate-600">Across all platforms</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">45.2K</p>
                <p className="text-sm text-blue-600">+8% from last month</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Engagement Rate</p>
                  <p className="text-sm text-slate-600">Average across content</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">6.8%</p>
                <p className="text-sm text-purple-600">+2.1% from last month</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Content Library Quick Access */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-slate-900">Quick Actions</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={() => handleQuickAction('Email Template')}>
            <FileText size={24} className="text-green-600" />
            <span className="text-sm">Email Template</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={() => handleQuickAction('Social Post')}>
            <Users size={24} className="text-blue-600" />
            <span className="text-sm">Social Post</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={() => handleQuickAction('Video Content')}>
            <Video size={24} className="text-red-600" />
            <span className="text-sm">Video Content</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={() => handleQuickAction('Blog Post')}>
            <FileText size={24} className="text-orange-600" />
            <span className="text-sm">Blog Post</span>
          </Button>
        </div>
      </Card>

      {/* Create/Edit Content Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingItem ? 'Edit Content' : 'Schedule New Content'}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter content title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => handleFormChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="email">Email</option>
                    <option value="social">Social Media</option>
                    <option value="blog">Blog Post</option>
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => handleFormChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published</option>
                    <option value="review">Review</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Scheduled Date</label>
                  <input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => handleFormChange('scheduledDate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Scheduled Time</label>
                  <input
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) => handleFormChange('scheduledTime', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter content description"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveItem}>
                <Save size={16} className="mr-2" />
                {editingItem ? 'Update' : 'Create'} Content
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Content Details Modal */}
      {showViewModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Content Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getTypeColor(selectedItem.type)}`}>
                  {getTypeIcon(selectedItem.type)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{selectedItem.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedItem.status)}`}>
                    {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Author</p>
                  <p className="font-medium text-slate-900">{selectedItem.author}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Scheduled</p>
                  <p className="font-medium text-slate-900">
                    {formatDate(selectedItem.scheduledDate)} at {selectedItem.scheduledTime}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-slate-600">Platforms</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedItem.platform.map((platform, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-slate-600">Description</p>
                <p className="text-slate-900 mt-1">{selectedItem.description}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-600">Tags</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedItem.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
              <Button onClick={() => handleEditItem(selectedItem)}>
                <Edit size={16} className="mr-2" />
                Edit Content
              </Button>
              <Button variant="outline" onClick={() => handleDeleteItem(selectedItem.id)}>
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentCalendarSection;
