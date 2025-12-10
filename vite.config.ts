import path from 'node:path';
import { reactRouter } from '@react-router/dev/vite';
import { reactRouterHonoServer } from 'react-router-hono-server/dev';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import tsconfigPaths from 'vite-tsconfig-paths';
import { addRenderIds } from './plugins/addRenderIds';
import { aliases } from './plugins/aliases';
import consoleToParent from './plugins/console-to-parent';
import { layoutWrapperPlugin } from './plugins/layouts';
import { loadFontsFromTailwindSource } from './plugins/loadFontsFromTailwindSource';
import { nextPublicProcessEnv } from './plugins/nextPublicProcessEnv';
import { restart } from './plugins/restart';
import { restartEnvFileChange } from './plugins/restartEnvFileChange';

export default defineConfig(() => ({
  envPrefix: 'NEXT_PUBLIC_',
  optimizeDeps: {
    include: ['fast-glob'],
    exclude: [
      '@hono/auth-js/react',
      '@hono/auth-js',
      '@auth/core',
      'hono/context-storage',
      '@auth/core/errors',
      'fsevents',
      'lightningcss',
      'lucide-react'
    ]
  },
  logLevel: 'info',
  plugins: [
    nextPublicProcessEnv(),
    restartEnvFileChange(),
    reactRouterHonoServer({
      serverEntryPoint: './__create/index.ts',
      runtime: 'node'
    }),
    babel({
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: /node_modules/,
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ['styled-jsx/babel']
      }
    }),
    restart({
      restart: [
        'src/**/page.jsx',
        'src/**/page.tsx',
        'src/**/layout.jsx',
        'src/**/layout.tsx',
        'src/**/route.js',
        'src/**/route.ts'
      ]
    }),
    consoleToParent(),
    loadFontsFromTailwindSource(),
    addRenderIds(),
    reactRouter(),
    tsconfigPaths({
      ignoreConfigErrors: true,
      projects: [path.resolve(__dirname, 'tsconfig.json')]
    }),
    aliases(),
    layoutWrapperPlugin()
  ],
  resolve: {
    alias: {
      lodash: 'lodash-es',
      '@': path.resolve(__dirname, 'src')
    },
    dedupe: ['react', 'react-dom']
  },
  ssr: {
    external: ['lucide-react']
  },
  clearScreen: false,
  server: {
    allowedHosts: true,
    host: '0.0.0.0',
    port: 4000,
    hmr: {
      overlay: false
    },
    warmup: {
      clientFiles: ['./src/app/**/*', './src/app/root.tsx', './src/app/routes.ts']
    }
  }
}));
