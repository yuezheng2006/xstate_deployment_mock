import { DeploymentStatus } from '../types/deployment';

/**
 * 获取步骤状态
 * @param currentState 当前状态
 * @param stepName 步骤名称
 * @returns 步骤状态
 */
export const getStepStatus = (currentState: string, stepName: string): DeploymentStatus => {
  const isActive = currentState === stepName;
  const isCompleted = 
    (stepName === 'runningCI' && ['deploying', 'checkingPreview', 'readyForProduction', 'promoting', 'success'].includes(currentState)) ||
    (stepName === 'deploying' && ['checkingPreview', 'readyForProduction', 'promoting', 'success'].includes(currentState)) ||
    (stepName === 'checkingPreview' && ['readyForProduction', 'promoting', 'success'].includes(currentState)) ||
    (stepName === 'promoting' && ['success'].includes(currentState));
  
  if (currentState === 'failed') return 'failed';
  if (isActive) return 'active';
  if (isCompleted) return 'completed';
  return 'waiting';
};