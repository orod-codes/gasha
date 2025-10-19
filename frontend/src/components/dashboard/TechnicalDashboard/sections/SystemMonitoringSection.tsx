import React from 'react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { BarChart3, Server, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle } from 'lucide-react';

const SystemMonitoringSection: React.FC = () => {
  const systemMetrics = [
    { name: 'CPU Usage', value: '45%', status: 'good', icon: Cpu, color: 'green' },
    { name: 'Memory Usage', value: '78%', status: 'warning', icon: HardDrive, color: 'orange' },
    { name: 'Disk Space', value: '62%', status: 'good', icon: HardDrive, color: 'green' },
    { name: 'Network I/O', value: '23%', status: 'good', icon: Wifi, color: 'green' }
  ];

  const services = [
    { name: 'GASHA Anti-Virus Service', status: 'running', uptime: '15 days' },
    { name: 'NISIR SIEM Engine', status: 'running', uptime: '8 days' },
    { name: 'WAF Proxy Service', status: 'stopped', uptime: '0 days' },
    { name: 'VPN Gateway', status: 'running', uptime: '22 days' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">System Monitoring</h2>
          <p className="text-slate-600">Real-time system health and performance metrics</p>
        </div>
        <Button>
          <BarChart3 className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{metric.name}</p>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              </div>
              <metric.icon className={`h-8 w-8 text-${metric.color}-600`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Service Status</h3>
          <div className="space-y-3">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">{service.name}</p>
                  <p className="text-sm text-slate-600">Uptime: {service.uptime}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {service.status === 'running' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    service.status === 'running' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-sm font-medium text-orange-900">High Memory Usage</p>
              <p className="text-xs text-orange-700">2 hours ago</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900">Service Restarted</p>
              <p className="text-xs text-green-700">4 hours ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemMonitoringSection;

