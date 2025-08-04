import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths'; // <-- novo

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react(),
      svgr(),
      tsconfigPaths(), // <-- novo aqui
   ],
   server: {
      proxy: {
         '/login/authentic': 'http://localhost:8080',
      },
   },
});
