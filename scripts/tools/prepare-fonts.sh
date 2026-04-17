#!/bin/bash
# 字体准备脚本
# 下载并转换项目所需的字体文件

set -e

FONTS_DIR="public/fonts"
TEMP_DIR="/tmp/font-downloads"

echo "🚀 准备项目字体..."

# 创建目录
mkdir -p "$FONTS_DIR"
mkdir -p "$TEMP_DIR"

# 检查必要的工具
command -v wget >/dev/null 2>&1 || { echo "❌ 需要安装 wget"; exit 1; }
command -v unzip >/dev/null 2>&1 || { echo "❌ 需要安装 unzip"; exit 1; }

# ====================
# Code New Roman
# ====================
echo "📥 下载 Code New Roman..."
cd "$TEMP_DIR"

if [ ! -f "CodeNewRoman.zip" ]; then
    wget -q --show-progress "https://github.com/tonsky/CodeNewRoman/releases/download/v2.0/CodeNewRoman.zip" -O CodeNewRoman.zip || {
        echo "⚠️  下载失败，请手动下载: https://github.com/tonsky/CodeNewRoman/releases"
    }
fi

if [ -f "CodeNewRoman.zip" ]; then
    unzip -q -o CodeNewRoman.zip -d code-new-roman 2>/dev/null || true
    echo "✅ Code New Roman 下载完成"
else
    echo "⚠️  请手动下载 Code New Roman 到 $TEMP_DIR/CodeNewRoman.zip"
fi

# ====================
# Resource Han Rounded CN
# ====================
echo "📥 下载 Resource Han Rounded CN..."

# 获取最新版本
LATEST_URL=$(wget -q -O - "https://api.github.com/repos/CyanoHao/Resource-Han-Rounded/releases/latest" | grep -o '"browser_download_url": "[^"]*OTF[^"]*"' | cut -d'"' -f4 | head -1)

if [ -n "$LATEST_URL" ]; then
    wget -q --show-progress "$LATEST_URL" -O ResourceHanRoundedCN.zip || {
        echo "⚠️  下载失败"
    }
    
    if [ -f "ResourceHanRoundedCN.zip" ]; then
        unzip -q -o ResourceHanRoundedCN.zip -d resource-han-rounded 2>/dev/null || true
        echo "✅ Resource Han Rounded CN 下载完成"
    fi
else
    echo "⚠️  请手动下载 Resource Han Rounded CN: https://github.com/CyanoHao/Resource-Han-Rounded/releases"
fi

# ====================
# 说明
# ====================
echo ""
echo "📋 下一步："
echo ""
echo "1. 字体文件已下载到: $TEMP_DIR"
echo ""
echo "2. 请访问 https://transfonter.org/ 转换字体格式:"
echo "   - 上传 .ttf 或 .otf 文件"
echo "   - 勾选 WOFF2 和 WOFF 格式"
echo "   - 点击 Convert"
echo ""
echo "3. 重命名并放置到 $FONTS_DIR:"
echo "   - code-new-roman.woff2 / .woff"
echo "   - code-new-roman-bold.woff2 / .woff"
echo "   - resource-han-rounded-cn-regular.woff2 / .woff"
echo "   - resource-han-rounded-cn-bold.woff2 / .woff"
echo ""
echo "💡 提示: 你可以通过以下命令打开字体目录:"
echo "   xdg-open $TEMP_DIR  # Linux"
echo "   open $TEMP_DIR      # macOS"
echo ""
