import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mock from './mock.plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mock()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/v1'),
      },
    },
  },
});
