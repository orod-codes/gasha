import React, { useState } from 'react';
import { GitBranch, Plus, Eye, Download, Upload, Code, Clock, CheckCircle, AlertCircle, Users, Star, GitCommit } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

const CodeRepositorySection: React.FC = () => {
  const [activeRepo, setActiveRepo] = useState('gasha-antivirus');

  const repositories = [
    {
      id: 'gasha-antivirus',
      name: 'GASHA Anti-Virus',
      description: 'Core antivirus engine and threat detection system',
      language: 'C++',
      lastCommit: '2 hours ago',
      commits: 1247,
      stars: 89,
      contributors: 12,
      status: 'active',
      branch: 'main',
      size: '45.2 MB'
    },
    {
      id: 'gasha-waf',
      name: 'GASHA WAF',
      description: 'Web Application Firewall with advanced rule engine',
      language: 'Python',
      lastCommit: '5 hours ago',
      commits: 892,
      stars: 67,
      contributors: 8,
      status: 'active',
      branch: 'develop',
      size: '23.1 MB'
    },
    {
      id: 'gasha-vpn',
      name: 'GASHA VPN',
      description: 'Secure VPN solution with encryption protocols',
      language: 'Go',
      lastCommit: '1 day ago',
      commits: 654,
      stars: 45,
      contributors: 6,
      status: 'maintenance',
      branch: 'main',
      size: '18.7 MB'
    }
  ];

  const recentCommits = [
    {
      id: 'abc123',
      message: 'Fix memory leak in threat detection engine',
      author: 'John Developer',
      time: '2 hours ago',
      branch: 'main',
      filesChanged: 3,
      additions: 45,
      deletions: 12
    },
    {
      id: 'def456',
      message: 'Add support for new malware signatures',
      author: 'Sarah Engineer',
      time: '4 hours ago',
      branch: 'develop',
      filesChanged: 7,
      additions: 234,
      deletions: 8
    },
    {
      id: 'ghi789',
      message: 'Update documentation for API endpoints',
      author: 'Mike Writer',
      time: '6 hours ago',
      branch: 'docs',
      filesChanged: 2,
      additions: 156,
      deletions: 23
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      case 'deprecated': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'C++': return 'bg-blue-100 text-blue-700';
      case 'Python': return 'bg-yellow-100 text-yellow-700';
      case 'Go': return 'bg-cyan-100 text-cyan-700';
      case 'JavaScript': return 'bg-yellow-100 text-yellow-700';
      case 'TypeScript': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Code Repository</h3>
        <Button>
          <Plus size={16} className="mr-2" />
          New Repository
        </Button>
      </div>

      {/* Repository Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Repositories</p>
              <p className="text-2xl font-bold text-slate-600">12</p>
            </div>
            <GitBranch className="h-8 w-8 text-slate-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Branches</p>
              <p className="text-2xl font-bold text-green-600">28</p>
            </div>
            <GitCommit className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Commits</p>
              <p className="text-2xl font-bold text-blue-600">2.8k</p>
            </div>
            <Code className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Repository List */}
      <div className="space-y-4 mb-6">
        {repositories.map((repo) => (
          <Card key={repo.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-slate-900">{repo.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(repo.status)}`}>
                    {repo.status.charAt(0).toUpperCase() + repo.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLanguageColor(repo.language)}`}>
                    {repo.language}
                  </span>
                </div>
                
                <p className="text-slate-600 mb-4">{repo.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Branch</p>
                    <p className="font-medium text-slate-900">{repo.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Commits</p>
                    <p className="font-medium text-slate-900">{repo.commits}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Stars</p>
                    <p className="font-medium text-slate-900">{repo.stars}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Size</p>
                    <p className="font-medium text-slate-900">{repo.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{repo.contributors} contributors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>Last commit: {repo.lastCommit}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <Button variant="ghost" size="sm" className="w-full">
                  <Eye size={16} className="mr-2" />
                  View Code
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Download size={16} className="mr-2" />
                  Clone
                </Button>
                <Button size="sm" className="w-full">
                  <Upload size={16} className="mr-2" />
                  Push Changes
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Commits */}
      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Recent Commits</h4>
        <div className="space-y-4">
          {recentCommits.map((commit) => (
            <div key={commit.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h5 className="font-medium text-slate-900">{commit.message}</h5>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {commit.branch}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span>{commit.author}</span>
                  <span>{commit.time}</span>
                  <span>{commit.filesChanged} files changed</span>
                  <span className="text-green-600">+{commit.additions}</span>
                  <span className="text-red-600">-{commit.deletions}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Eye size={16} />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">
            <GitBranch size={16} className="mr-2" />
            Create Branch
          </Button>
          <Button variant="outline" className="w-full">
            <Code size={16} className="mr-2" />
            Run Tests
          </Button>
          <Button variant="outline" className="w-full">
            <CheckCircle size={16} className="mr-2" />
            Deploy
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CodeRepositorySection;