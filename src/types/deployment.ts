import { StateFrom } from 'xstate';
import { deploymentMachine } from '../machines/deploymentMachine';

export type DeploymentState = StateFrom<typeof deploymentMachine>;
export type DeploymentStatus = 'waiting' | 'active' | 'completed' | 'failed';

export interface DeploymentStepConfig {
  name: string;
  label: string;
  status: DeploymentStatus;
}

export interface DeploymentUrls {
  previewUrl: string | null;
  productionUrl: string | null;
}