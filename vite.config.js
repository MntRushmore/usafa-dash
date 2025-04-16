import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['firebase', 'react', 'react-dom']
  }
});