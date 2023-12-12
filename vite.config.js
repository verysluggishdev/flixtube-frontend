import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Change this to your desired IP address
    port: 8000, 
    watch: {
      usePolling: true,
    },
  },
})