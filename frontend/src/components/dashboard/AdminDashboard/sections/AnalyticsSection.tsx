import React from 'react';
import { FileText, Download } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface AnalyticsSectionProps {
  totalRequests: number;
  completedRequests: number;
  inProgressRequests: number;
  contentPosts: number;
  onExportReport: () => void;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  totalRequests,
  completedRequests,
  inProgressRequests,
  contentPosts,
  onExportReport
}) => {
  const completionRate = totalRequests > 0 ? Math.round((completedRequests / totalRequests) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Module Analytics</h3>
        <Button onClick={onExportReport}>
          <Download size={16} className="mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalRequests}</div>
            <p className="text-sm text-slate-600">Total Requests</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{completedRequests}</div>
            <p className="text-sm text-slate-600">Completed</p>
            <p className="text-xs text-green-600 mt-1">{completionRate}% completion rate</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{inProgressRequests}</div>
            <p className="text-sm text-slate-600">In Progress</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{contentPosts}</div>
            <p className="text-sm text-slate-600">Content Posts</p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Request Trends</h4>
        <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">Request analytics chart will be displayed here</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
