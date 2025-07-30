import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), svgr()],
   server: {
      proxy: {
         '/login/authentic': 'http://localhost:8080',
      },
   },
});
