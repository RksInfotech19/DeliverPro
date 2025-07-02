import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    host: '0.0.0.0',   // Accept all incoming network requests
    port: 5173         // Or any port you prefer
  }
})
