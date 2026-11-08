#!/usr/bin/env node
/**
 * 校验字体子集是否覆盖当前站点内容。
 *
 * public/fonts/*.woff2 是 `scripts/subset-fonts.py` 按站点实际字符裁剪出来的
 * 子集（完整字体在 assets/fonts/）。内容更新后若忘记重新生成，新增的汉字会
 * 退回系统字体。本脚本复用与 Python 脚本相同的字符来源，对照
 * scripts/fonts/subset-charset.json 找出缺失字符。
 *
 * 用法：node scripts/checks/check-font-coverage.mjs
 * 退出码 0 = 通过，1 = 清单过期或缺失。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const SOURCE_DIRS = [path.join(ROOT, 'src')];
const SOURCE_SUFFIXES = new Set([
  '.astro',
  '.css',
  '.js',
  '.json',
  '.md',
  '.mdx',
  '.mjs',
  '.ts',
  '.tsx',
  '.yaml',
  '.yml',
]);
const STARLIGHT_LOCALES = [
  path.join(ROOT, 'node_modules/@astrojs/starlight/translations/en.json'),
  path.join(ROOT, 'node_modules/@astrojs/starlight/translations/zh-CN.json'),
];
const MANIFEST = path.join(ROOT, 'scripts/fonts/subset-charset.json');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (SOURCE_SUFFIXES.has(path.extname(entry.name))) files.push(fullPath);
  }
  return files;
}

function isPrintable(ch) {
  // 与 Python 的 str.isprintable() 对齐：排除控制字符与代理对。
  const code = ch.codePointAt(0);
  if (code === 0x20) return true;
  if (code < 0x20 || (code >= 0x7f && code <= 0x9f)) return false;
  if (code >= 0xd800 && code <= 0xdfff) return false;
  return true;
}

function collectChars() {
  const chars = new Set();
  const files = SOURCE_DIRS.flatMap((dir) => walk(dir));
  for (const file of files) {
    for (const ch of fs.readFileSync(file, 'utf8')) {
      if (isPrintable(ch)) chars.add(ch);
    }
  }
  for (const file of STARLIGHT_LOCALES) {
    if (!fs.existsSync(file)) continue;
    for (const ch of fs.readFileSync(file, 'utf8')) {
      if (isPrintable(ch)) chars.add(ch);
    }
  }
  return chars;
}

function main() {
  if (!fs.existsSync(MANIFEST)) {
    console.error(
      '缺少 scripts/fonts/subset-charset.json。\n' +
        '请运行 `python3 scripts/subset-fonts.py` 生成字体子集。',
    );
    return 1;
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const covered = new Set(manifest.chars ?? '');
  const missing = [...collectChars()].filter((ch) => !covered.has(ch));
  if (missing.length > 0) {
    const sample = missing.slice(0, 40).join('');
    console.error(
      `字体子集已过期：${missing.length} 个字符不在清单中：\n  ${sample}` +
        `${missing.length > 40 ? ' ...' : ''}\n` +
        '请运行 `python3 scripts/subset-fonts.py` 重新生成。',
    );
    return 1;
  }
  console.log(`字体子集覆盖检查通过：${covered.size} 个字符。`);
  return 0;
}

process.exitCode = main();
