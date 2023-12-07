import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

const e2e = nxE2EPreset(__filename, { cypressDir: 'src' });
export default defineConfig({
  projectId: '7rhpeb',
  e2e: {
    ...e2e,
    baseUrl: 'http://localhost:4200',
  },
  retries: 2,
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: true,
});
