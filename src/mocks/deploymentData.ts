/**
 * 
 */
export const MOCK_DEPLOYMENT_DATA = {
  PREVIEW_URL: 'https://preview-env-123.example.com',
  PRODUCTION_URL: 'https://production-123.example.com',
  DEPLOYMENT_IDS: {
    PREVIEW: 'preview-123',
    PRODUCTION: 'prod-123',
  },
  ERROR_MESSAGES: {
    CI_FAILURE: 'CI pipeline failed: Tests did not pass',
    DEPLOYMENT_FAILURE: 'Deployment failed: Unable to provision resources',
    PREVIEW_CHECK_FAILURE: 'Preview checks failed: Application health check failed',
    PRODUCTION_FAILURE: 'Production deployment failed: Configuration validation error',
  },
  SUCCESS_RATE: {
    CI: 0.8,
    DEPLOYMENT: 0.9,
    PREVIEW: 0.9,
    PRODUCTION: 0.95,
  },
  DELAYS: {
    CI: 2000,
    DEPLOYMENT: 3000,
    PREVIEW: 2000,
    PRODUCTION: 3000,
  },
} as const;