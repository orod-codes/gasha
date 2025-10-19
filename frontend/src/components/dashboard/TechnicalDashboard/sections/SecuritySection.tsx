import React from 'react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Settings } from 'lucide-react';

const SecuritySection: React.FC = () => {
  const securityMetrics = [
    { name: 'Threats Blocked', value: '1,247', status: 'good', icon: Shield, color: 'green' },
    { name: 'Failed Logins', value: '23', status: 'warning', icon: Lock, color: 'orange' },
    { name: 'Active Sessions', value: '8', status: 'good', icon: Eye, color: 'blue' },
    { name: 'Security Score', value: '98%', status: 'good', icon: CheckCircle, color: 'green' }
  ];

  const securityEvents = [
    {
      id: 1,
      type: 'threat',
      description: 'Malicious IP blocked',
      severity: 'high',
      timestamp: '2 hours ago',
      source: 'WAF'
    },
    {
      id: 2,
      type: 'login',
      description: 'Failed login attempt',
      severity: 'medium',
      timestamp: '4 hours ago',
      source: 'Auth System'
    },
    {
      id: 3,
      type: 'config',
      description: 'Security policy updated',
      severity: 'low',
      timestamp: '1 day ago',
      source: 'Admin Panel'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Security Center</h2>
          <p className="text-slate-600">Monitor security events and system protection</p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Security Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
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
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Security Events</h3>
          <div className="space-y-3">
            {securityEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className={`p-1 rounded-full ${
                  event.severity === 'high' ? 'bg-red-100' :
                  event.severity === 'medium' ? 'bg-orange-100' : 'bg-green-100'
                }`}>
                  {event.severity === 'high' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                  {event.severity === 'medium' && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                  {event.severity === 'low' && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900">{event.description}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{event.source} • {event.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Security Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Firewall Active</span>
              </div>
              <span className="text-sm text-green-700">Protected</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Antivirus Updated</span>
              </div>
              <span className="text-sm text-green-700">Latest</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-900">SSL Certificate</span>
              </div>
              <span className="text-sm text-orange-700">Expires in 30 days</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SecuritySection;

