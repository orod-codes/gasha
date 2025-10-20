import React from 'react';
import { Users, Target, TrendingUp, BarChart3 } from 'lucide-react';
import Card from '../../../ui/Card';

const CustomerSegmentationSection: React.FC = () => {
  const segments = [
    {
      name: 'Enterprise',
      count: 45,
      revenue: 85000,
      growth: 12.5,
      color: 'bg-blue-500'
    },
    {
      name: 'SMB',
      count: 120,
      revenue: 45000,
      growth: 8.2,
      color: 'bg-green-500'
    },
    {
      name: 'Startup',
      count: 85,
      revenue: 25000,
      growth: 15.3,
      color: 'bg-purple-500'
    },
    {
      name: 'Individual',
      count: 200,
      revenue: 15000,
      growth: 5.1,
      color: 'bg-orange-500'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('et-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Segmentation</h2>
        <BarChart3 className="h-6 w-6 text-slate-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {segments.map((segment) => (
          <Card key={segment.name} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
              <span className="text-sm text-slate-500">{segment.count} customers</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{segment.name}</h3>
            <p className="text-2xl font-bold text-slate-800 mb-1">
              {formatCurrency(segment.revenue)}
            </p>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp size={12} className="mr-1" />
              +{segment.growth}%
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerSegmentationSection;
