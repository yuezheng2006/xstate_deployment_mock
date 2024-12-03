import React from 'react';
import { DeploymentState } from '../types/deployment';

interface DeploymentControlsProps {
  state: DeploymentState;
  onStart: () => void;
  onPromote: () => void;
}

export const DeploymentControls: React.FC<DeploymentControlsProps> = ({
  state,
  onStart,
  onPromote,
}) => {
  return (
    <div className="flex justify-center gap-4">
      {state.value === 'idle' && (
        <button
          onClick={onStart}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Start Deployment
        </button>
      )}
      
      {state.value === 'readyForProduction' && (
        <button
          onClick={onPromote}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Promote to Production
        </button>
      )}

      {state.value === 'failed' && (
        <button
          onClick={onStart}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Retry Deployment
        </button>
      )}
    </div>
  );
};