import React from 'react';
import { X } from 'lucide-react';
import Button from '../../../ui/Button';

interface Request {
  id: string;
  productName: string;
  companyName: string;
  contactEmail: string;
  status: string;
  submittedDate: string;
  marketingNotes?: string;
  adminNotes?: string;
  assignedTo?: string;
  formData?: any;
}

interface ViewRequestDetailsModalProps {
  request: Request | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewRequestDetailsModal: React.FC<ViewRequestDetailsModalProps> = ({
  request,
  isOpen,
  onClose
}) => {
  if (!isOpen || !request) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'validated': return 'bg-blue-100 text-blue-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-slate-900">Request Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-900">{request.id}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Product Information</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-slate-600">Product Name</p>
                  <p className="font-medium">{request.productName}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Company Information</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-slate-600">Company Name</p>
                  <p className="font-medium">{request.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Contact Email</p>
                  <p className="font-medium">{request.contactEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Data */}
          {request.formData && (
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Form Data</h4>
              <div className="bg-slate-50 p-4 rounded-lg">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap">
                  {JSON.stringify(request.formData, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Notes */}
          {request.marketingNotes && (
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Marketing Notes</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">{request.marketingNotes}</p>
              </div>
            </div>
          )}

          {request.adminNotes && (
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Admin Notes</h4>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800">{request.adminNotes}</p>
              </div>
            </div>
          )}

          {/* Assignment */}
          {request.assignedTo && (
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Assignment</h4>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-purple-800">Assigned to: {request.assignedTo}</p>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h4 className="font-medium text-slate-900 mb-2">Timeline</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-sm text-slate-600">Submitted</span>
                <span className="font-medium">{request.submittedDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewRequestDetailsModal;
