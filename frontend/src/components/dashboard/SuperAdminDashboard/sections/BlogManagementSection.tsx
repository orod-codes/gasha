import React from 'react';
import { Plus, FileText, Globe, Eye } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface BlogManagementSectionProps {
  onCreateBlog: () => void;
  onCreateNews: () => void;
  onManageBlogs: () => void;
  onManageNews: () => void;
  onReviewDrafts: () => void;
}

const BlogManagementSection: React.FC<BlogManagementSectionProps> = ({
  onCreateBlog = () => {},
  onCreateNews = () => {},
  onManageBlogs = () => {},
  onManageNews = () => {},
  onReviewDrafts = () => {}
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Blog & News Management</h3>
        <div className="flex space-x-3">
          <Button onClick={onCreateBlog}>
            <Plus size={16} className="mr-2" />
            Create Blog Post
          </Button>
          <Button variant="outline" onClick={onCreateNews}>
            <Plus size={16} className="mr-2" />
            Create News Article
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-slate-900">Blog Posts</h4>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
          <p className="text-slate-600">No published articles</p>
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full" onClick={onManageBlogs}>
              Manage Blog Posts
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-slate-900">News Articles</h4>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">0</div>
          <p className="text-slate-600">No news articles</p>
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full" onClick={onManageNews}>
              Manage News
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Eye className="h-6 w-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-slate-900">Draft Posts</h4>
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
          <p className="text-slate-600">No draft posts</p>
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full" onClick={onReviewDrafts}>
              Review Drafts
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BlogManagementSection;

