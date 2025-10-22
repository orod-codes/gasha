import React from 'react';
import { Calendar, Download, PieChart } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface ReportsSectionProps {
  onDateRangeChange?: () => void;
  onExportReport?: () => void;
}

const ReportsSection: React.FC<ReportsSectionProps> = ({
  onDateRangeChange = () => {},
  onExportReport = () => {}
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Analytics & Reports</h3>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onDateRangeChange}>
            <Calendar size={16} className="mr-2" />
            Date Range
          </Button>
          <Button onClick={onExportReport}>
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Request Analytics</h4>
          <div className="text-center py-8">
            <p className="text-slate-600">No analytics data available</p>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">User Activity</h4>
          <div className="text-center py-8">
            <p className="text-slate-600">No activity data available</p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Monthly Trends</h4>
        <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">Interactive charts will be implemented here</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportsSection;

