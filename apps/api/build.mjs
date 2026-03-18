import { build } from 'esbuild'

await build({
  entryPoints: ['src/main/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  sourcemap: true,
  minify: true,
  packages: 'external',
  external: [
    '@shopping-list/domain'
  ]
})