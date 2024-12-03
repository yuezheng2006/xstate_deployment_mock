import { useMachine } from '@xstate/react';
import { deploymentMachine } from '../machines/deploymentMachine';
import { MOCK_DEPLOYMENT_DATA } from '../mocks/deploymentData';

/**
 * 模拟步骤
 * @param delay 延迟时间
 * @param successRate 成功率
 * @param successCallback 成功回调
 * @param failureCallback 失败回调
 * @param errorMessage 错误信息
 */
const simulateStep = async (
  delay: number,
  successRate: number,
  successCallback: () => void,
  failureCallback: (error: string) => void,
  errorMessage: string
): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, delay));
  const success = Math.random() < successRate;
  
  if (success) {
    successCallback();
    return true;
  } else {
    failureCallback(errorMessage);
    return false;
  }
};

export const useDeployment = () => {
  // 使用状态机
  const [state, send] = useMachine(deploymentMachine);

  const startDeployment = () => {
    send({ type: 'COMMIT' });
  };

  const simulateCI = async () => {
    return simulateStep(
      MOCK_DEPLOYMENT_DATA.DELAYS.CI,
      MOCK_DEPLOYMENT_DATA.SUCCESS_RATE.CI,
      () => send({ type: 'CI_SUCCESS' }),
      (error) => send({ type: 'CI_FAILURE', error }),
      MOCK_DEPLOYMENT_DATA.ERROR_MESSAGES.CI_FAILURE
    );
  };

  const simulateDeployment = async () => {
    return simulateStep(
      MOCK_DEPLOYMENT_DATA.DELAYS.DEPLOYMENT,
      MOCK_DEPLOYMENT_DATA.SUCCESS_RATE.DEPLOYMENT,
      () => send({ 
        type: 'DEPLOYMENT_SUCCESS',
        previewUrl: MOCK_DEPLOYMENT_DATA.PREVIEW_URL
      }),
      (error) => send({ type: 'DEPLOYMENT_FAILURE', error }),
      MOCK_DEPLOYMENT_DATA.ERROR_MESSAGES.DEPLOYMENT_FAILURE
    );
  };

  const checkPreview = async () => {
    return simulateStep(
      MOCK_DEPLOYMENT_DATA.DELAYS.PREVIEW,
      MOCK_DEPLOYMENT_DATA.SUCCESS_RATE.PREVIEW,
      () => send({ type: 'PREVIEW_CHECK_SUCCESS' }),
      (error) => send({ type: 'PREVIEW_CHECK_FAILURE', error }),
      MOCK_DEPLOYMENT_DATA.ERROR_MESSAGES.PREVIEW_CHECK_FAILURE
    );
  };

  const promoteToProduction = () => {
    send({ type: 'PROMOTE_TO_PRODUCTION' });
  };

  const simulateProduction = async () => {
    return simulateStep(
      MOCK_DEPLOYMENT_DATA.DELAYS.PRODUCTION,
      MOCK_DEPLOYMENT_DATA.SUCCESS_RATE.PRODUCTION,
      () => send({ 
        type: 'PRODUCTION_SUCCESS',
        productionUrl: MOCK_DEPLOYMENT_DATA.PRODUCTION_URL
      }),
      (error) => send({ type: 'PRODUCTION_FAILURE', error }),
      MOCK_DEPLOYMENT_DATA.ERROR_MESSAGES.PRODUCTION_FAILURE
    );
  };

  return {
    state,
    startDeployment,
    simulateCI,
    simulateDeployment,
    checkPreview,
    promoteToProduction,
    simulateProduction,
  };
};