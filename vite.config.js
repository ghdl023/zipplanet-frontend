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
        { find: '@reocil', replacement: '/src/recoil' },
        { find: '@utils', replacement: '/src/utils' },
      ],
    },
    server: {
      proxy: { // server.proxy는 localhost 개발환경에서만 동작함..
        // "/zipplanet-proxy": {
        //   target: "http://zipplanet.duckdns.org:8080", 
        //   target: "http://localhost:8080",
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/zipplanet-proxy/, ""),
        //   secure: false,      
        //   ws: true,
        // },
      },
    },
  });
};
