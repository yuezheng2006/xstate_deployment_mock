import React from 'react';
import { DeploymentContext } from '../machines/deploymentMachine';
import { EnvironmentUrl } from './EnvironmentUrl';
import { ErrorMessage } from './ErrorMessage';

interface StatusMessagesProps {
  context: DeploymentContext;
}

export const StatusMessages: React.FC<StatusMessagesProps> = ({ context }) => {
  const { error, previewUrl, productionUrl } = context;

  return (
    <div className="space-y-4 mt-6">
      {error && <ErrorMessage error={error} />}
      <EnvironmentUrl url={previewUrl} type="preview" />
      <EnvironmentUrl url={productionUrl} type="production" />
    </div>
  );
};