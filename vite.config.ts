/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    projects: [
      {
        test: {
          name: 'front-end',
          environment: 'jsdom',
          root: './src',
          setupFiles: './src/main/config/vitest-setup.js',
          globals: true
        },
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./src"),
          }
        }
      }
    ]
  }
})
