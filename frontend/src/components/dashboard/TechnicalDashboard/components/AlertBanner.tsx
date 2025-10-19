import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface AlertBannerProps {
  onDismiss: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ onDismiss }) => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-orange-400 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-orange-800">
              System Alert
            </h3>
            <p className="text-sm text-orange-700 mt-1">
              High priority deployment task requires immediate attention. Check Task Management for details.
            </p>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-orange-400 hover:text-orange-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;



