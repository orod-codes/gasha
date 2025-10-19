import React from 'react';
import { TrendingUp, Users, DollarSign, Activity, Target, CheckCircle } from 'lucide-react';
import Card from '../../ui/Card';
import { User } from '../../../types';

interface OverviewStatsProps {
  user: User;
  stats?: {
    totalRequests: number;
    activeUsers: number;
    systemHealth: number;
    revenue: string;
  };
}

const OverviewStats: React.FC<OverviewStatsProps> = ({ 
  user: _user, 
  stats = {
    totalRequests: 68,
    activeUsers: 24,
    systemHealth: 98,
    revenue: '12.4K birr'
  }
}) => {
  return (
    <div className="mb-8">
      {/* Header removed as requested */}
      
      {/* Professional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Requests Card */}
     

        {/* Active Users Card */}
       

        {/* System Health Card */}
        
        {/* Revenue Card */}
       
      </div>
    </div>
  );
};

export default OverviewStats;
