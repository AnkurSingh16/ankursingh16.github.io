// Writes public/knowledge from src/content/site.ts. Vite loads the content module so the same
// import.meta.env handling applies as in the site build.
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createServer } from 'vite';

const root = resolve(import.meta.dirname, '..');
const server = await createServer({
  root,
  configFile: join(root, 'vite.config.ts'),
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { site } = await server.ssrLoadModule('/src/content/site.ts');
  const { buildKnowledge } = await server.ssrLoadModule('/src/lib/knowledge.ts');
  const { files, index } = buildKnowledge(site);
  const out = join(root, 'public', 'knowledge');
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  for (const file of files) await writeFile(join(out, file.path), file.content);
  await writeFile(join(out, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
  process.stdout.write(`Wrote ${files.length} knowledge files to public/knowledge\n`);
} finally {
  await server.close();
}
