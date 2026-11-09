/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH is set by the GitHub Actions workflow from the Pages settings:
// "/ankurpawar.github.io/" while the site lives at ankursingh16.github.io/ankurpawar.github.io/,
// and "/" once a custom domain is connected. Locally it defaults to "/".
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
