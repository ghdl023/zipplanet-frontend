import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/zipplanet-frontend/", // https://<USERNAME>.github.io/<REPO>/ 형태로 배포하기위해
})
