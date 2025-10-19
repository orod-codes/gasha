import React from 'react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { Settings, User, Bell, Palette, Save } from 'lucide-react';

const SettingsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
          <p className="text-slate-600">Configure your technical dashboard preferences</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="John Smith"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="john.smith@company.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="technical">Technical Specialist</option>
                <option value="senior-technical">Senior Technical Specialist</option>
                <option value="technical-lead">Technical Lead</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">Task Assignments</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">Deployment Updates</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">System Alerts</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">Security Events</span>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Dashboard Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Default View</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="dashboard">Dashboard</option>
                <option value="tasks">Task Management</option>
                <option value="deployments">Deployments</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Refresh Interval</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
                <option value="600">10 minutes</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Palette className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">Dark Mode</span>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">System Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Auto-save Interval</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Log Retention</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">Debug Mode</span>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsSection;

