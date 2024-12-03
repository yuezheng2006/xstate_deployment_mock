import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useDeployment } from '../hooks/useDeployment';
import { DeploymentStep } from './DeploymentStep';
import { DeploymentControls } from './DeploymentControls';
import { StatusMessages } from './StatusMessages';
import { getStepStatus } from '../utils/deploymentStatus';

export const DeploymentVisualizer: React.FC = () => {
  const {
    state,
    startDeployment,
    simulateCI,
    simulateDeployment,
    checkPreview,
    promoteToProduction,
    simulateProduction,
  } = useDeployment();

  // 开始部署
  const handleStart = async () => {
    startDeployment();
    if (await simulateCI()) {
      if (await simulateDeployment()) {
        await checkPreview();
      }
    }
  };

  // 部署到生产环境
  const handlePromote = async () => {
    promoteToProduction();
    await simulateProduction();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Deployment Workflow
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-8">
            {/* CI pipeline */}
            <DeploymentStep
              name="runningCI"
              label="CI Pipeline"
              status={getStepStatus(state.value as string, 'runningCI')}
            />
            <ArrowRight className="w-6 h-6 text-gray-400" />
            {/* Deployment */}
            <DeploymentStep
              name="deploying"
              label="Deployment"
              status={getStepStatus(state.value as string, 'deploying')}
            />
            <ArrowRight className="w-6 h-6 text-gray-400" />
            {/* check preview */}
            <DeploymentStep
              name="checkingPreview"
              label="Preview Check"
              status={getStepStatus(state.value as string, 'checkingPreview')}
            />
            <ArrowRight className="w-6 h-6 text-gray-400" />
            {/* production  */}
            <DeploymentStep
              name="promoting"
              label="Production"
              status={getStepStatus(state.value as string, 'promoting')}
            />
          </div>

          {/* 控制按钮 */}
          <DeploymentControls
            state={state}
            onStart={handleStart}
            onPromote={handlePromote}
          />

          <StatusMessages context={state.context} />
        </div>
      </div>
    </div>
  );
};
