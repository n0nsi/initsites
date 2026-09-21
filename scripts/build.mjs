import { lstat, mkdir, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const copies = [
  'index.html',
  'assets/css/style.css',
  'assets/js/base.js',
  'assets/img/logo.svg',
  'assets/img/logo-light.svg',
  'assets/img/icon.svg',
  'assets/img/favicon.svg',
  'assets/img/apple-touch-icon.png'
];
export const publicFiles = ['_headers', 'robots.txt', 'sitemap.xml'];
export const outputFiles = [...copies, ...publicFiles].sort();

export async function build(source = root) {
  source = await realpath(source);
  const output = resolve(source, 'dist');
  try {
    if ((await lstat(output)).isSymbolicLink()) throw new Error('dist must not be a symlink');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  async function readSafe(name) {
    const path = resolve(source, name);
    const actual = await realpath(path);
    if (actual !== path || relative(source, actual).startsWith('..')) throw new Error(`Unsafe source path: ${name}`);
    if (!(await lstat(path)).isFile()) throw new Error(`Not a file: ${name}`);
    return readFile(path);
  }

  const files = new Map();
  for (const name of copies) files.set(name, await readSafe(name));
  for (const name of publicFiles) files.set(name, await readSafe(`public/${name}`));

  await rm(output, { recursive: true, force: true });
  for (const [name, content] of files) {
    await mkdir(dirname(resolve(output, name)), { recursive: true });
    await writeFile(resolve(output, name), content);
  }
  return output;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await build();
  console.log(`Built dist: ${outputFiles.length} allowlisted files.`);
}
