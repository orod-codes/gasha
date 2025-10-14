import React, { useState } from 'react';
import { User } from '../../types';
import AdminDashboard from './AdminDashboard';
import TechnicalDashboard from './TechnicalDashboard';

interface CombinedAdminTechnicalDashboardProps {
  user: User;
}

const CombinedAdminTechnicalDashboard: React.FC<CombinedAdminTechnicalDashboardProps> = ({ user }) => {
  const [activeView, setActiveView] = useState<'admin' | 'technical'>(user.role === 'technical' ? 'technical' : 'admin');

  return (
    <div className="min-h-screen">
      <div className="w-full border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <button
            onClick={() => setActiveView('admin')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeView === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Admin View
          </button>
          <button
            onClick={() => setActiveView('technical')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeView === 'technical' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Technical View
          </button>
        </div>
      </div>

      {activeView === 'admin' ? (
        <AdminDashboard user={user} />
      ) : (
        <TechnicalDashboard user={user} />
      )}
    </div>
  );
};

export default CombinedAdminTechnicalDashboard;


