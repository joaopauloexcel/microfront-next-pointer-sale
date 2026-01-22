/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
// @ts-ignore: module resolution differs; types exist in node_modules
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['apps/**/src/**'],
      exclude: [
        '**/domain/**',
        '**/index.ts',
        '**/*.styles.ts',
        '**/*.mock.ts',
        '**/*.types.ts',
        '**/layout.tsx',
        '**/page.tsx',
        '**/*.definitions.ts',
        '**/env.d.ts'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'apps/host/src')
    }
  }
})
