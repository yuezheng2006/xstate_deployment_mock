import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';

interface EnvironmentUrlProps {
  url: string | null;
  type: 'preview' | 'production';
}

export const EnvironmentUrl: React.FC<EnvironmentUrlProps> = ({ url, type }) => {
  if (!url) return null;

  const config = {
    preview: {
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:text-blue-800',
      title: 'Preview Environment',
    },
    production: {
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      hoverColor: 'hover:text-green-800',
      title: 'Production Environment',
    },
  };

  const { bgColor, textColor, borderColor, hoverColor, title } = config[type];

  return (
    <div className={`p-4 ${bgColor} ${textColor} rounded-md border ${borderColor} flex items-start`}>
      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-medium">{title}</p>
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-1 flex items-center ${hoverColor} underline`}
        >
          {url}
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
};