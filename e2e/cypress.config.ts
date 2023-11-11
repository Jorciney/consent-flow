import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: nxE2EPreset(__filename, { cypressDir: 'src' }),
  viewportWidth: 1920,
  viewportHeight: 1080,
  projectId: 'e2e'
});
