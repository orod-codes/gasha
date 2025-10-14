import React, { useState } from 'react';
import { Settings, Save, RefreshCw, Bell, Shield, Globe, Database, Mail } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface SettingsSectionProps {
  onSaveSettings: (settings: any) => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ onSaveSettings }) => {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: false,
      weeklyReports: true,
      requestUpdates: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordPolicy: 'strong',
      ipWhitelist: false
    },
    general: {
      timezone: 'UTC',
      language: 'en',
      theme: 'light',
      autoRefresh: true
    },
    integrations: {
      emailService: 'smtp',
      backupEnabled: true,
      analyticsEnabled: true,
      apiAccess: false
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveSettings(settings);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Settings & Configuration</h3>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save size={16} className="mr-2" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Settings */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Bell size={20} className="text-blue-600 mr-2" />
            <h4 className="text-lg font-semibold text-slate-900">Notifications</h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">Email Alerts</label>
              <input
                type="checkbox"
                checked={settings.notifications.emailAlerts}
                onChange={(e) => updateSetting('notifications', 'emailAlerts', e.target.checked)}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">Push Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications.pushNotifications}
                onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">Weekly Reports</label>
              <input
                type="checkbox"
                checked={settings.notifications.weeklyReports}
                onChange={(e) => updateSetting('notifications', 'weeklyReports', e.target.checked)}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">Request Updates</label>
              <input
                type="checkbox"
                checked={settings.notifications.requestUpdates}
                onChange={(e) => updateSetting('notifications', 'requestUpdates', e.target.checked)}
                className="rounded"
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Shield size={20} className="text-green-600 mr-2" />
            <h4 className="text-lg font-semibold text-slate-900">Security</h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">Two-Factor Authentication</label>
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">Session Timeout (minutes)</label>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                className="border border-slate-300 rounded px-2 py-1 text-sm"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={120}>120</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">Password Policy</label>
              <select
                value={settings.security.passwordPolicy}
                onChange={(e) => updateSetting('security', 'passwordPolicy', e.target.value)}
                className="border border-slate-300 rounded px-2 py-1 text-sm"
              >
                <option value="basic">Basic</option>
                <option value="strong">Strong</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">IP Whitelist</label>
              <input
                type="checkbox"
                checked={settings.security.ipWhitelist}
                onChange={(e) => updateSetting('security', 'ipWhitelist', e.target.checked)}
                className="rounded"
              />
            </div>
          </div>
        </Card>

        {/* General Settings */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Globe size={20} className="text-purple-600 mr-2" />
            <h4 className="text-lg font-semibold text-slate-900">General</h4>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-700 block mb-1">Timezone</label>
              <select
                value={settings.general.timezone}
                onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="CET">Central European Time</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-700 block mb-1">Language</label>
              <select
                value={settings.general.language}
                onChange={(e) => updateSetting('general', 'language', e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-700 block mb-1">Theme</label>
              <select
                value={settings.general.theme}
                onChange={(e) => updateSetting('general', 'theme', e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">Auto Refresh</label>
              <input
                type="checkbox"
                checked={settings.general.autoRefresh}
                onChange={(e) => updateSetting('general', 'autoRefresh', e.target.checked)}
                className="rounded"
              />
            </div>
          </div>
        </Card>

        {/* Integration Settings */}
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Database size={20} className="text-orange-600 mr-2" />
            <h4 className="text-lg font-semibold text-slate-900">Integrations</h4>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-700 block mb-1">Email Service</label>
              <select
                value={settings.integrations.emailService}
                onChange={(e) => updateSetting('integrations', 'emailService', e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
              >
                <option value="smtp">SMTP</option>
                <option value="sendgrid">SendGrid</option>
                <option value="mailgun">Mailgun</option>
                <option value="ses">AWS SES</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">Backup Enabled</label>
              <input
                type="checkbox"
                checked={settings.integrations.backupEnabled}
                onChange={(e) => updateSetting('integrations', 'backupEnabled', e.target.checked)}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">Analytics Enabled</label>
              <input
                type="checkbox"
                checked={settings.integrations.analyticsEnabled}
                onChange={(e) => updateSetting('integrations', 'analyticsEnabled', e.target.checked)}
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-700">API Access</label>
              <input
                type="checkbox"
                checked={settings.integrations.apiAccess}
                onChange={(e) => updateSetting('integrations', 'apiAccess', e.target.checked)}
                className="rounded"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* System Status */}
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <RefreshCw size={20} className="text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-slate-900">System Status</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
            <p className="text-sm text-slate-600">Uptime</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">2.3s</div>
            <p className="text-sm text-slate-600">Response Time</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">1.2GB</div>
            <p className="text-sm text-slate-600">Memory Usage</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsSection;


