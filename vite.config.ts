import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'node:path'

import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

import browserslist from 'browserslist';
import {browserslistToTargets} from 'lightningcss';

const projectDir = dirname(new URL(import.meta.url).pathname)

const getNormalizedDir = (relativeDir: string) => fileURLToPath(new URL(relativeDir, import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: getNormalizedDir('./src'),
      },
    ],
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%'))
    }
  },
  build: {
    cssMinify: 'lightningcss',
    lib: {
      name: 'so-lib',
      entry: resolve(projectDir, 'src', 'index.ts'),
    },
    rollupOptions: {
      output: {
        exports: 'named',
        dir: 'dist',
        assetFileNames: (v) => 'so-lib' + v.name?.replace(/[^.]+\./, '.'),
      },
    },
  },
})
