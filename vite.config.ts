import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
	server: {
		port: 5176,
		proxy: {
			'/api/v1': 'http://localhost:3009',
		},
	},
	resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
