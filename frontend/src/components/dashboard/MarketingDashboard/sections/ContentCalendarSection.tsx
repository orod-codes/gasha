import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Clock,
  Users,
  Megaphone,
  FileText,
  Image,
  Video,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface ContentItem {
  id: string;
  title: string;
  type: 'campaign' | 'social' | 'email' | 'blog' | 'video' | 'image';
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
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const contentItems: ContentItem[] = [
    {
      id: 'CONT-001',
      title: 'Q1 Product Launch Campaign',
      type: 'campaign',
      status: 'scheduled',
      scheduledDate: '2024-02-15',
      scheduledTime: '09:00',
      author: 'Marketing Team',
      platform: ['Email', 'Social Media', 'Website'],
      description: 'Launch campaign for new GASHA Anti-Virus features',
      tags: ['product-launch', 'q1', 'antivirus']
    },
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
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'campaign': return <Megaphone size={16} />;
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
      case 'campaign': return 'bg-purple-100 text-purple-700';
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
          <Button onClick={() => setShowCreateModal(true)}>
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
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-slate-600 py-2">
              {day}
            </div>
          ))}
          {/* Calendar days would go here - simplified for now */}
          {Array.from({ length: 35 }, (_, i) => (
            <div key={i} className="h-20 border border-slate-200 rounded-lg p-2 hover:bg-slate-50 cursor-pointer">
              <div className="text-sm font-medium text-slate-900">{i + 1}</div>
              {/* Content items for each day would be rendered here */}
            </div>
          ))}
        </div>
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
                  <Button size="sm" variant="outline">
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
                  <Megaphone size={16} />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Published Content</p>
                  <p className="text-sm text-slate-600">Campaigns & Posts</p>
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
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <Megaphone size={24} className="text-purple-600" />
            <span className="text-sm">New Campaign</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <FileText size={24} className="text-green-600" />
            <span className="text-sm">Email Template</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <Users size={24} className="text-blue-600" />
            <span className="text-sm">Social Post</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
            <Video size={24} className="text-red-600" />
            <span className="text-sm">Video Content</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ContentCalendarSection;
