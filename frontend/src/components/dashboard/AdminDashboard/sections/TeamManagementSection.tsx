import React from 'react';
import { Users, Eye, CreditCard as Edit } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: string;
  requests?: number;
  tasks?: number;
  content?: number;
}

interface TeamManagementSectionProps {
  teamMembers: TeamMember[];
  onAddMember: () => void;
  onEditMember: (memberId: number) => void;
  onViewMember: (memberId: number) => void;
}

const TeamManagementSection: React.FC<TeamManagementSectionProps> = ({
  teamMembers,
  onAddMember,
  onEditMember,
  onViewMember
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-slate-900">Team Management</h3>
        <Button onClick={onAddMember}>
          <Users size={16} className="mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{member.name}</h4>
                  <p className="text-sm text-slate-600">{member.role}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {member.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {member.requests && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Requests Handled</span>
                  <span className="font-medium">{member.requests}</span>
                </div>
              )}
              {member.tasks && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Active Tasks</span>
                  <span className="font-medium">{member.tasks}</span>
                </div>
              )}
              {member.content && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Content Created</span>
                  <span className="font-medium">{member.content}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onEditMember(member.id)}
              >
                <Edit size={16} className="mr-1" />
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1"
                onClick={() => onViewMember(member.id)}
              >
                <Eye size={16} className="mr-1" />
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManagementSection;
