import React from 'react';
import { Activity, CheckCircle2, CircleDot, XCircle } from 'lucide-react';
import { DeploymentStatus } from '../types/deployment';

interface DeploymentStepProps {
  name: string;
  label: string;
  status: DeploymentStatus;
}

/**
 * 部署步骤
 * @param name 步骤名称
 * @param label 步骤标签
 * @param status 步骤状态
 * @returns 
 */
export const DeploymentStep: React.FC<DeploymentStepProps> = ({  label, status }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center
        ${status === 'waiting' ? 'bg-gray-100 text-gray-400' : ''}
        ${status === 'active' ? 'bg-blue-100 text-blue-600 animate-pulse' : ''}
        ${status === 'completed' ? 'bg-green-100 text-green-600' : ''}
        ${status === 'failed' ? 'bg-red-100 text-red-600' : ''}
      `}>
        {status === 'waiting' && <CircleDot className="w-6 h-6" />}
        {status === 'active' && <Activity className="w-6 h-6" />}
        {status === 'completed' && <CheckCircle2 className="w-6 h-6" />}
        {status === 'failed' && <XCircle className="w-6 h-6" />}
      </div>
      <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};