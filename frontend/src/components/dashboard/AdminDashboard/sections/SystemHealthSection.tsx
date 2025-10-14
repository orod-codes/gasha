import React, { useState, useEffect } from 'react';
import { Server, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface ServiceStatus {
  name: string;
  status: 'running' | 'stopped' | 'error';
  uptime: string;
  lastCheck: string;
}

interface SystemHealthSectionProps {
  onRefreshMetrics: () => void;
  onRestartService: (serviceName: string) => void;
}

const SystemHealthSection: React.FC<SystemHealthSectionProps> = ({
  onRefreshMetrics,
  onRestartService
}) => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadSystemData();
    const interval = setInterval(loadSystemData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadSystemData = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics([
        { name: 'CPU Usage', value: 45, unit: '%', status: 'healthy', trend: 'stable' },
        { name: 'Memory Usage', value: 78, unit: '%', status: 'warning', trend: 'up' },
        { name: 'Disk Usage', value: 62, unit: '%', status: 'healthy', trend: 'stable' },
        { name: 'Network I/O', value: 23, unit: 'Mbps', status: 'healthy', trend: 'down' },
        { name: 'Database Connections', value: 12, unit: 'active', status: 'healthy', trend: 'stable' },
        { name: 'Response Time', value: 245, unit: 'ms', status: 'healthy', trend: 'down' }
      ]);

      setServices([
        { name: 'Web Server', status: 'running', uptime: '15d 8h 32m', lastCheck: '2024-01-15 14:30:00' },
        { name: 'Database', status: 'running', uptime: '15d 8h 32m', lastCheck: '2024-01-15 14:30:00' },
        { name: 'Email Service', status: 'running', uptime: '12d 4h 15m', lastCheck: '2024-01-15 14:30:00' },
        { name: 'Backup Service', status: 'stopped', uptime: '0d 0h 0m', lastCheck: '2024-01-15 14:30:00' },
        { name: 'Monitoring Agent', status: 'running', uptime: '15d 8h 32m', lastCheck: '2024-01-15 14:30:00' },
        { name: 'API Gateway', status: 'error', uptime: '0d 0h 0m', lastCheck: '2024-01-15 14:30:00' }
      ]);
    } catch (error) {
      console.error('Failed to load system data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'running': return 'text-green-600 bg-green-100';
      case 'stopped': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'running':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'critical':
      case 'error':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'stopped':
        return <AlertTriangle size={16} className="text-gray-500" />;
      default:
        return <AlertTriangle size={16} className="text-slate-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '➡️';
    }
  };

  const overallHealth = services.filter(s => s.status === 'running').length / services.length * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">System Health & Monitoring</h3>
        <Button onClick={onRefreshMetrics} disabled={isRefreshing}>
          <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Overall Health Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-slate-900">Overall System Health</h4>
          <div className="flex items-center space-x-2">
            {getStatusIcon(overallHealth > 80 ? 'healthy' : overallHealth > 50 ? 'warning' : 'critical')}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              overallHealth > 80 ? 'text-green-600 bg-green-100' : 
              overallHealth > 50 ? 'text-yellow-600 bg-yellow-100' : 
              'text-red-600 bg-red-100'
            }`}>
              {overallHealth > 80 ? 'Healthy' : overallHealth > 50 ? 'Warning' : 'Critical'}
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              overallHealth > 80 ? 'bg-green-500' : 
              overallHealth > 50 ? 'bg-yellow-500' : 
              'bg-red-500'
            }`}
            style={{ width: `${overallHealth}%` }}
          ></div>
        </div>
        <p className="text-sm text-slate-600 mt-2">
          {Math.round(overallHealth)}% of services are running normally
        </p>
      </Card>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-semibold text-slate-900">{metric.name}</h5>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                {metric.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-slate-900">
                {metric.value} {metric.unit}
              </div>
              <div className="text-lg">
                {getTrendIcon(metric.trend)}
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  metric.status === 'healthy' ? 'bg-green-500' : 
                  metric.status === 'warning' ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${Math.min(metric.value, 100)}%` }}
              ></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Service Status */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">Service Status</h4>
        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Server size={16} className="text-slate-400" />
                <div>
                  <h5 className="font-medium text-slate-900">{service.name}</h5>
                  <p className="text-sm text-slate-600">Uptime: {service.uptime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(service.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
                {service.status !== 'running' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRestartService(service.name)}
                  >
                    Restart
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Resource Usage</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-slate-600">CPU</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-slate-600">Memory</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-slate-600">Disk</span>
                <span className="text-sm font-medium">62%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-slate-600">Network</span>
                <span className="text-sm font-medium">23%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Recent Alerts</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle size={16} className="text-red-500 mt-1" />
              <div>
                <p className="text-sm font-medium text-red-900">High Memory Usage</p>
                <p className="text-xs text-red-700">Memory usage exceeded 75%</p>
                <p className="text-xs text-red-600">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle size={16} className="text-yellow-500 mt-1" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Backup Service Down</p>
                <p className="text-xs text-yellow-700">Backup service stopped unexpectedly</p>
                <p className="text-xs text-yellow-600">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle size={16} className="text-green-500 mt-1" />
              <div>
                <p className="text-sm font-medium text-green-900">System Recovery</p>
                <p className="text-xs text-green-700">All services restored to normal</p>
                <p className="text-xs text-green-600">1 hour ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemHealthSection;


