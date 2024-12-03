import { createMachine, assign } from 'xstate';

export type DeploymentContext = {
  deploymentId: string | null;
  error: string | null;
  previewUrl: string | null;
  productionUrl: string | null;
};

/**
 * 部署对应事件
 */
export type DeploymentEvent =
  | { type: 'COMMIT' }
  | { type: 'CI_SUCCESS' }
  | { type: 'CI_FAILURE'; error: string }
  | { type: 'DEPLOY' }
  | { type: 'DEPLOYMENT_SUCCESS'; previewUrl: string }
  | { type: 'DEPLOYMENT_FAILURE'; error: string }
  | { type: 'PREVIEW_CHECK_SUCCESS' }
  | { type: 'PREVIEW_CHECK_FAILURE'; error: string }
  | { type: 'PROMOTE_TO_PRODUCTION' }
  | { type: 'PRODUCTION_SUCCESS'; productionUrl: string }
  | { type: 'PRODUCTION_FAILURE'; error: string };

// 初始context数据内容
const initialContext: DeploymentContext = {
  deploymentId: '',
  error: null,
  previewUrl: '',
  productionUrl: '',
};

/**
 * 部署状态机
 * createMachine 创建状态机
 * id 状态机唯一标识
 * initial 初始状态
 * context 状态机上下文
 * types 状态机类型
 * states 状态机状态
 */
export const deploymentMachine = createMachine({
  id: 'deployment',
  initial: 'idle',
  // 状态机上下文
  context: initialContext,
  // 状态机类型
  types: {
    context: {} as DeploymentContext,
    events: {} as DeploymentEvent,
  },
  states: {
    // 初始态
    idle: {
      entry: assign(initialContext),
      on: {
        COMMIT: {
          target: 'runningCI',
          actions: assign({ error: null }),
        },
      },
    },
    runningCI: {
      on: {
        CI_SUCCESS: {
          target: 'deploying',
        },
        CI_FAILURE: {
          target: 'failed',
          actions: assign({
            error: ({ event }) => event.error ?? 'CI pipeline failed',
          }),
        },
      },
    },
    deploying: {
      on: {
        // 部署成功
        DEPLOYMENT_SUCCESS: {
          target: 'checkingPreview',
          actions: assign({
            previewUrl: ({ event }) => {
              return event.previewUrl ?? '';
            },
            error: null,
          }),
        },
        // 部署失败
        DEPLOYMENT_FAILURE: {
          target: 'failed',
          actions: assign({
            error: ({ event }) => event.error ?? 'Deployment failed',
          }),
        },
      },
    },
    checkingPreview: {
      on: {
        PREVIEW_CHECK_SUCCESS: {
          target: 'readyForProduction',
          actions: assign({ error: null }),
        },
        PREVIEW_CHECK_FAILURE: {
          target: 'failed',
          actions: assign({
            error: ({ event }) => event.error ?? 'Preview check failed',
          }),
        },
      },
    },
    readyForProduction: {
      on: {
        PROMOTE_TO_PRODUCTION: {
          target: 'promoting',
          actions: assign({ error: null }),
        },
      },
    },
    promoting: {
      on: {
        PRODUCTION_SUCCESS: {
          target: 'success',
          actions: assign({
            productionUrl: ({ event }) => event.productionUrl,
            error: null,
          }),
        },
        PRODUCTION_FAILURE: {
          target: 'failed',
          actions: assign({
            error: ({ event }) => event.error ?? 'Production deployment failed',
          }),
        },
      },
    },
    success: {
      type: 'final',
    },
    failed: {
      on: {
        COMMIT: {
          target: 'runningCI',
          actions: assign(initialContext),
        },
      },
    },
  },
});
