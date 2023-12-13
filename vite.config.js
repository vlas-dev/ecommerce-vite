import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@stripe/react-stripe-js', '@stripe/stripe-js']
    }
  }
});
