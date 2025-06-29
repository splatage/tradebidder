import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests
      '/api': {
        target: 'http://192.168.1.200:3000', // <-- your backend IP and port
        changeOrigin: true,
        secure: false, // if backend uses HTTP (not HTTPS)
        // Rewrite /api if needed:
        // rewrite: path => path.replace(/^\/api/, '')
      },
    },
  },
});
