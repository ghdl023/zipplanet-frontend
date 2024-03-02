import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  return defineConfig({
    plugins: [react()],
    base: '/zipplanet-frontend/',
    resolve: {
      alias: [
        { find: '@pages', replacement: '/src/pages' },
        { find: '@components', replacement: '/src/components' },
        { find: '@lib', replacement: '/src/lib' },
        { find: '@assets', replacement: '/src/assets' },
        { find: '@styles', replacement: '/src/styles' },
        { find: '@api', replacement: '/src/apis/api' },
        { find: '@contexts', replacement: '/src/contexts' },
      ],
    },
  });
};
