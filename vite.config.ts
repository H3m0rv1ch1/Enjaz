import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const host = process.env.TAURI_DEV_HOST;
    
    return {
      publicDir: 'Public',
      server: {
        port: 3000,
        host: host || '0.0.0.0',
        strictPort: false,
        hmr: host ? { port: 3001 } : undefined,
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // rollupOptions: {
        //   external: (id) => {
        //     // Externalize Tauri plugins for web builds
        //     if (id.startsWith('@tauri-apps/plugin-')) {
        //       return true;
        //     }
        //     return false;
        //   }
        // }
      }
    };
});
