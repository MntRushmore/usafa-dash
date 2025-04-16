import { defineConfig } from 'vite';

export default defineConfig({
  root: './',  // Make sure the root is correct
  build: {
    outDir: 'dist',  // This is the output directory for the build
  },
  server: {
    port: 3000,  // Ensure the correct port if needed
  },
});