import React from 'react';
import { CheckCircle, XCircle, Eye, CreditCard as Edit } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface BlogPost {
  id: number;
  title: string;
  author: string;
  status: string;
  type: string;
  createdDate: string;
  content: string;
}

interface ContentManagementSectionProps {
  blogPosts: BlogPost[];
  onCreatePost: () => void;
  onViewPost: (postId: number) => void;
  onEditPost: (postId: number) => void;
  onApprovePost: (postId: number) => void;
  onRejectPost: (postId: number) => void;
}

const ContentManagementSection: React.FC<ContentManagementSectionProps> = ({
  blogPosts,
  onCreatePost,
  onViewPost,
  onEditPost,
  onApprovePost,
  onRejectPost
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const publishedCount = blogPosts.filter(post => post.status === 'published').length;
  const pendingCount = blogPosts.filter(post => post.status === 'pending').length;
  const draftCount = blogPosts.filter(post => post.status === 'draft').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Content Management</h3>
        <Button onClick={onCreatePost}>
          <Edit size={16} className="mr-2" />
          Create Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{publishedCount}</div>
            <p className="text-sm text-slate-600">Published Posts</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{pendingCount}</div>
            <p className="text-sm text-slate-600">Pending Review</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{draftCount}</div>
            <p className="text-sm text-slate-600">Draft Posts</p>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-slate-900">{post.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.type === 'blog' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {post.type}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">By {post.author} • {post.createdDate}</p>
                <p className="text-slate-700">{post.content}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewPost(post.id)}
                >
                  <Eye size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEditPost(post.id)}
                >
                  <Edit size={16} />
                </Button>
                {post.status === 'pending' && (
                  <>
                    <Button 
                      size="sm"
                      onClick={() => onApprovePost(post.id)}
                    >
                      <CheckCircle size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onRejectPost(post.id)}
                    >
                      <XCircle size={16} />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentManagementSection;
