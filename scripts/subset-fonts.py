#!/usr/bin/env python3
"""按站点实际用到的字符子集化 Web 字体。

完整字体放在 `assets/fonts/`（不参与站点发布），本脚本扫描 `src/` 与
Starlight 的中英文界面文案，用 pyftsubset 生成 `public/fonts/*.woff2`，
并写入字符清单 `scripts/fonts/subset-charset.json` 供 CI 检查子集是否过期。

用法：
    python3 scripts/subset-fonts.py          # 重新生成子集与清单
    python3 scripts/subset-fonts.py --check  # 只检查清单是否覆盖当前内容

依赖：fonttools（提供 pyftsubset）。CI 若未安装 fonttools，可跳过本脚本，
仅运行 `node scripts/checks/check-font-coverage.mjs` 检查清单是否过期。
"""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIRS = [ROOT / "src"]
SOURCE_SUFFIXES = {
    ".astro",
    ".css",
    ".js",
    ".json",
    ".md",
    ".mdx",
    ".mjs",
    ".ts",
    ".tsx",
    ".yaml",
    ".yml",
}
# Starlight 的界面文案来自依赖包，不在 src/ 中；构建时会渲染到页面，
# 子集里必须包含，否则中文界面会退回到系统字体。
STARLIGHT_LOCALES = [
    ROOT / "node_modules/@astrojs/starlight/translations/en.json",
    ROOT / "node_modules/@astrojs/starlight/translations/zh-CN.json",
]
MANIFEST = ROOT / "scripts/fonts/subset-charset.json"
FONTS_DIR = ROOT / "public/fonts"
SOURCE_FONTS = {
    "ResourceHanRoundedCN-Regular.woff2": "assets/fonts/ResourceHanRoundedCN-Regular.woff2",
    "CodeNewRomanNerdFontMono-Regular.woff2": "assets/fonts/CodeNewRomanNerdFontMono-Regular.woff2",
}


def collect_chars() -> set[str]:
    """收集站点内容与界面文案中出现的字符。"""
    chars: set[str] = set()
    for directory in SOURCE_DIRS:
        for path in directory.rglob("*"):
            if path.suffix not in SOURCE_SUFFIXES:
                continue
            chars.update(path.read_text(encoding="utf-8", errors="ignore"))
    for path in STARLIGHT_LOCALES:
        if path.exists():
            chars.update(path.read_text(encoding="utf-8", errors="ignore"))
    # 控制字符与代理对不可打印，也没有字形，跳过以免干扰子集。
    return {c for c in chars if c.isprintable() or c == " "}


def load_manifest() -> set[str]:
    if not MANIFEST.exists():
        return set()
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    return set(data.get("chars", ""))


def check() -> int:
    used = collect_chars()
    covered = load_manifest()
    missing = sorted(used - covered)
    if missing:
        sample = "".join(missing[:40])
        print(
            "字体子集已过期：以下字符不在 scripts/fonts/subset-charset.json 中：\n"
            f"  {sample}{' ...' if len(missing) > 40 else ''}\n"
            "请运行 `python3 scripts/subset-fonts.py` 重新生成字体子集。",
            file=sys.stderr,
        )
        return 1
    print(f"字体子集覆盖检查通过：{len(used)} 个字符。")
    return 0


def subset() -> int:
    if shutil.which("pyftsubset") is None:
        print("未找到 pyftsubset，请先安装 fonttools（pip install fonttools brotli）。", file=sys.stderr)
        return 1

    used = collect_chars()
    # 空白字符需要保留，避免子集把空格字形裁掉。
    text = "".join(sorted(used | {" ", "\t", "\n", "\r"}))
    FONTS_DIR.mkdir(parents=True, exist_ok=True)

    with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".txt", delete=False) as handle:
        handle.write(text)
        text_file = Path(handle.name)

    try:
        for output_name, source_rel in SOURCE_FONTS.items():
            source = ROOT / source_rel
            output = FONTS_DIR / output_name
            cmd = [
                "pyftsubset",
                str(source),
                f"--text-file={text_file}",
                "--flavor=woff2",
                "--layout-features=*",
                "--no-hinting",
                f"--output-file={output}",
            ]
            subprocess.run(cmd, check=True)
            print(f"已生成 {output.relative_to(ROOT)}（{output.stat().st_size / 1024:.0f} KiB）")
    finally:
        text_file.unlink(missing_ok=True)

    MANIFEST.write_text(
        json.dumps({"chars": text}, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    print(f"已写入 {MANIFEST.relative_to(ROOT)}（{len(used)} 个字符）。")
    return 0


def main() -> int:
    if "--check" in sys.argv[1:]:
        return check()
    return subset()


if __name__ == "__main__":
    raise SystemExit(main())
