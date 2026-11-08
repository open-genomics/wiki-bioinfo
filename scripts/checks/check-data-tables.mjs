#!/usr/bin/env node
/**
 * 校验 MDX 中 <DataTable> 的行键与组件契约一致。
 *
 * DataTable.astro 按 variant 固定读取行键：
 *   comparison      -> aspect / left / right
 *   decision-matrix -> scenario / recommendation / rationale
 * 键名写错时组件不会报错，只会渲染出空表格（静默丢内容）。本脚本扫描
 * src/content 下的 MDX，提前失败。
 *
 * 用法：node scripts/checks/check-data-tables.mjs
 * 退出码 0 = 通过，1 = 存在键名不匹配。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const CONTENT_DIR = path.join(ROOT, 'src/content');
const REQUIRED_KEYS = {
  comparison: ['aspect', 'left', 'right'],
  'decision-matrix': ['scenario', 'recommendation', 'rationale'],
};

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (entry.name.endsWith('.mdx')) files.push(fullPath);
  }
  return files;
}

function main() {
  const problems = [];
  for (const file of walk(CONTENT_DIR)) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(/<DataTable([\s\S]*?)\/>/g)) {
      const block = match[1];
      const variant = block.match(/variant="(comparison|decision-matrix)"/)?.[1];
      if (!variant) continue;
      const keys = new Set([...block.matchAll(/([A-Za-z_]\w*)\s*:/g)].map((m) => m[1]));
      const missing = REQUIRED_KEYS[variant].filter((key) => !keys.has(key));
      if (missing.length > 0) {
        problems.push(
          `${path.relative(ROOT, file)}: variant="${variant}" 缺少行键 ${missing.join(', ')}` +
            `（实际使用: ${[...keys].sort().join(', ')}）`,
        );
      }
    }
  }

  if (problems.length > 0) {
    console.error('DataTable 行键与组件契约不一致：');
    for (const problem of problems) console.error(`  - ${problem}`);
    return 1;
  }
  console.log('DataTable 行键检查通过。');
  return 0;
}

process.exitCode = main();
