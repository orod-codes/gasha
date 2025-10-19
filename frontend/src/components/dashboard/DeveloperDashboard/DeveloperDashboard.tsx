import React, { useState } from 'react';
import { User } from '../../../../types';
import Sidebar from './components/Sidebar';
import ContentManagementSection from './sections/ContentManagementSection';
import CodeRepositorySection from './sections/CodeRepositorySection';
import DocumentationSection from './sections/DocumentationSection';

interface DeveloperDashboardProps {
  user: User;
}

const DeveloperDashboard: React.FC<DeveloperDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('content-management');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Developer Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Code, content, and documentation management • {user?.name}
          </p>
        </div>

        {activeTab === 'content-management' && <ContentManagementSection />}
        {activeTab === 'code-repository' && <CodeRepositorySection />}
        {activeTab === 'documentation' && <DocumentationSection />}
        {activeTab === 'testing' && (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-slate-900">Testing & QA</h2>
            <p className="text-slate-600 mt-2">Coming soon: Tools for managing tests, bug reports, and quality assurance.</p>
          </div>
        )}
        {activeTab === 'deployment' && (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-slate-900">Deployment</h2>
            <p className="text-slate-600 mt-2">Coming soon: Manage your CI/CD pipelines and deployments.</p>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-slate-900">Developer Analytics</h2>
            <p className="text-slate-600 mt-2">Coming soon: Track code metrics, performance, and team productivity.</p>
          </div>
        )}
        {activeTab === 'terminal' && (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-slate-900">Integrated Terminal</h2>
            <p className="text-slate-600 mt-2">Coming soon: Run commands directly from your dashboard.</p>
          </div>
        )}
        {activeTab === 'database' && (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-slate-900">Database Management</h2>
            <p className="text-slate-600 mt-2">Coming soon: Tools for managing database schemas and data.</p>
          </div>
        )}
        {activeTab === 'security' && (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-slate-900">Security Scanning</h2>
            <p className="text-slate-600 mt-2">Coming soon: Integrate security scanning and vulnerability management.</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-slate-900">Settings</h2>
            <p className="text-slate-600 mt-2">Coming soon: Configure your developer dashboard preferences.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperDashboard;