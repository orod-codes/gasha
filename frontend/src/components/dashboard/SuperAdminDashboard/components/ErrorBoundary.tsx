import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in ${this.props.sectionName || 'dashboard section'}:`, error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="p-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {this.props.sectionName ? `${this.props.sectionName} Error` : 'Section Error'}
            </h3>
            <p className="text-slate-600 mb-4">
              Something went wrong in this section. The rest of the dashboard continues to work normally.
            </p>
            <div className="space-y-2">
              <Button onClick={this.handleRetry} className="w-full">
                <RefreshCw size={16} className="mr-2" />
                Try Again
              </Button>
              <p className="text-xs text-slate-500">
                Error: {this.state.error?.message || 'Unknown error'}
              </p>
            </div>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

