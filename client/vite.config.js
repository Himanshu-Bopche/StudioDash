import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function spaFallbackPlugin() {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET') return next();
        if (req.url?.startsWith('/api') || req.url?.startsWith('/@') || req.url?.includes('.')) {
          return next();
        }

        req.url = '/index.html';
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET') return next();
        if (req.url?.startsWith('/api') || req.url?.includes('.')) {
          return next();
        }

        req.url = '/index.html';
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallbackPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
  },
})
