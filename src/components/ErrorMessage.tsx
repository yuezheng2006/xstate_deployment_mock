import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200 flex items-start">
    <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
    <div>
      <p className="font-medium">Error</p>
      <p className="mt-1">{error}</p>
    </div>
  </div>
);