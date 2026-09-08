import { defineConfig } from 'vite'
import {nodePolyfills} from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'

// if using HashRouter, repo basename not needed
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // global buffer for md tag parsing
      globals: { Buffer: true }
    })
  ],

  base: repoName ? `/${repoName}/` : '/',
})
