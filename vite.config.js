import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0', // allows access from LAN IP
    port: 3000       // or any port you like
  }
});
