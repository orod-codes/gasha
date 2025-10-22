import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, CheckCircle, Info, AlertCircle, Bell, Wifi, WifiOff } from 'lucide-react';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dismissible: boolean;
  autoHide?: boolean;
  duration?: number;
}

interface AlertBannerProps {
  alerts?: Alert[];
  onDismiss?: (alertId: string) => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ alerts = [], onDismiss }) => {
  const [currentAlerts, setCurrentAlerts] = useState<Alert[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Real-time alert handling - no mock data generation

  useEffect(() => {
    // Use provided alerts or show empty state
    setCurrentAlerts(alerts);

    // No mock alert simulation - alerts come from real sources
  }, [alerts, isConnected]);

  useEffect(() => {
    // Auto-hide alerts with autoHide enabled
    currentAlerts.forEach(alert => {
      if (alert.autoHide && alert.duration) {
        setTimeout(() => {
          handleDismiss(alert.id);
        }, alert.duration);
      }
    });
  }, [currentAlerts]);

  const handleDismiss = (alertId: string) => {
    setCurrentAlerts(prev => prev.filter(alert => alert.id !== alertId));
    onDismiss?.(alertId);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-500" />;
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'info':
        return <Info size={20} className="text-blue-500" />;
      default:
        return <Bell size={20} className="text-slate-500" />;
    }
  };

  const getAlertStyles = (type: string, priority: string) => {
    const baseStyles = "border-l-4 p-4 rounded-r-lg shadow-sm transition-all duration-300";
    
    switch (type) {
      case 'error':
        return `${baseStyles} bg-red-50 border-red-500 text-red-900 hover:bg-red-100`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 border-yellow-500 text-yellow-900 hover:bg-yellow-100`;
      case 'success':
        return `${baseStyles} bg-green-50 border-green-500 text-green-900 hover:bg-green-100`;
      case 'info':
        return `${baseStyles} bg-blue-50 border-blue-500 text-blue-900 hover:bg-blue-100`;
      default:
        return `${baseStyles} bg-slate-50 border-slate-500 text-slate-900 hover:bg-slate-100`;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse">CRITICAL</span>;
      case 'high':
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">HIGH</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">MEDIUM</span>;
      case 'low':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">LOW</span>;
      default:
        return null;
    }
  };

  if (currentAlerts.length === 0 || !isVisible) {
    return null;
  }

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="px-8 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Bell size={16} className="text-slate-600" />
              <span className="text-sm font-semibold text-slate-700">Real-time System Alerts</span>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                {currentAlerts.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <>
                  <Wifi size={14} className="text-green-500" />
                  <span className="text-xs text-green-600 font-medium">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff size={14} className="text-red-500" />
                  <span className="text-xs text-red-600 font-medium">Disconnected</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-xs text-slate-500">
              Last update: {lastUpdate.toLocaleTimeString()}
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {currentAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`${getAlertStyles(alert.type, alert.priority)} hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-sm">{alert.title}</h4>
                      {getPriorityBadge(alert.priority)}
                    </div>
                    <p className="text-sm opacity-90 mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-xs opacity-75">
                      <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                      <span>•</span>
                      <span>{alert.type.toUpperCase()}</span>
                      <span>•</span>
                      <span>ID: {alert.id.split('-')[1]}</span>
                    </div>
                  </div>
                </div>
                {alert.dismissible && (
                  <button
                    onClick={() => handleDismiss(alert.id)}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Alert Actions */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200">
          <div className="flex items-center space-x-4">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View All Alerts
            </button>
            <button className="text-sm text-slate-600 hover:text-slate-700 font-medium transition-colors">
              Alert Settings
            </button>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
              Test Alert
            </button>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span>Real-time monitoring {isConnected ? 'active' : 'inactive'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;