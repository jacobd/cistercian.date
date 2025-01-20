import { rmSync, cpSync } from 'fs';
import esbuild from 'esbuild';
import fs from 'fs/promises';

export function build() {
  const outDir = 'dist';
  try {
    rmSync(outDir, { recursive: true, force: true });
    cpSync('src/imgs', 'dist/imgs', { recursive: true });
    esbuild
      .build({
        entryPoints: [
          './src/js/main.js',
          './src/index.html',
          './src/404.html',
          './src/css/main.css',
        ],
        bundle: true,
        minify: true,
        plugins: [],
        sourcemap: true,
        // target: 'chrome58,firefox57,safari11,edge16'.split(','),
        outdir: 'dist',
        loader: {
          '.html': 'copy',
          '.jpg': 'copy',
          '.jpeg': 'copy',
          '.png': 'copy',
          '.ico': 'copy',
          '.otf': 'copy',
        },
      })
      .then((r) => {
        console.log(
          `Build completed, ${r.errors.length} errors, ${r.warnings.length} warnings`,
        );
      })
      .catch((e) => {
        console.error(e.message);
        process.exit(1);
      });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

build();