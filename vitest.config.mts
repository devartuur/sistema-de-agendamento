import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    coverage: {
      provider: 'v8',
      enabled: true,
      ignoreEmptyLines: true,
      reporter: ['text'],
      extension: ['use-case.ts'],
    },
  },
  plugins: [tsConfigPaths(), swc.vite()],
})
