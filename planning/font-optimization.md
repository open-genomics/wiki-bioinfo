# GitHub Pages 字体优化方案

## 问题

本地字体文件占用 23MB，导致：
- 部署时间长
- 带宽消耗大
- 首次访问加载慢

## 解决方案

### 方案 1: 系统字体（已实施）

使用系统自带字体，**零下载成本**。

字体栈：
```css
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
"Helvetica Neue", Arial, "Noto Sans SC", "PingFang SC", 
"Microsoft YaHei", sans-serif
```

**优点:**
- 加载速度最快
- 无额外带宽消耗
- 与操作系统风格一致

### 方案 2: Google Fonts CDN（可选）

如需统一视觉风格，可启用 Google Fonts：

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap');
```

大小：~200KB（对比 23MB 本地字体）

### 方案 3: 部署时剔除字体

已在 `.github/workflows/deploy-pages.yml` 中实施：

```yaml
- name: Optimize deployment
  run: rm -rf dist/fonts/*.otf dist/fonts/*.ttf
```

## 使用

### 标准部署（推荐，无本地字体）
```bash
git push origin master
```

### 完整部署（含本地字体）
在 GitHub Actions 页面手动触发 workflow，勾选 "Deploy with local fonts"。

## 测试结果

| 方案 | 部署大小 | 字体加载 | 推荐度 |
|------|---------|---------|--------|
| 系统字体 | ~70MB | 瞬时 | ⭐⭐⭐⭐⭐ |
| Google Fonts | ~70MB + 200KB | <100ms | ⭐⭐⭐⭐ |
| 本地字体 | ~97MB | 2-5s | ⭐⭐⭐ |

## 未来优化

1. **字体子集化**: 使用 `fonttools` 提取常用字符
2. **CDN 分发**: 字体文件上传至阿里云 OSS/又拍云
3. **预加载优化**: 关键字体优先加载
