import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  return defineConfig({
    plugins: [react()],
    base: process.env.VITE_BASE_URL,
    resolve: {
      alias: [
        { find: '@pages', replacement: '/src/pages' },
        { find: '@components', replacement: '/src/components' },
        { find: '@lib', replacement: '/src/lib' },
        { find: '@assets', replacement: '/src/assets' },
        { find: '@styles', replacement: '/src/styles' },
      ],
    },
  });
};
