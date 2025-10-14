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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Total Requests</span>
              <span className="font-semibold">3,456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Pending</span>
              <span className="font-semibold text-orange-600">234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Approved</span>
              <span className="font-semibold text-green-600">2,891</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Rejected</span>
              <span className="font-semibold text-red-600">331</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">User Activity</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Active Users</span>
              <span className="font-semibold">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">New Registrations</span>
              <span className="font-semibold text-blue-600">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Downloads</span>
              <span className="font-semibold text-purple-600">2,126</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Support Tickets</span>
              <span className="font-semibold text-orange-600">45</span>
            </div>
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

