import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
	server: {
		port: 5176,
		proxy: {
			'/api/v1': 'http://localhost:3009',
		},
	},
})
