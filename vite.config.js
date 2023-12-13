import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@stripe/stripe-js': '/node_modules/@stripe/stripe-js/dist/stripe.esm.js',
    },
  },
})
