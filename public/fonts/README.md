# 项目字体文件

本项目使用以下两种字体：

## 英文字体：Code New Roman

- **用途**：英文内容、代码、数字
- **风格**：等宽字体，适合代码展示
- **来源**：https://github.com/tonsky/CodeNewRoman

### 需要放置的文件

- `code-new-roman.woff2` - 常规字重
- `code-new-roman.woff` - 常规字重（备用格式）
- `code-new-roman-bold.woff2` - 粗体字重
- `code-new-roman-bold.woff` - 粗体字重（备用格式）

## 中文字体：Resource Han Rounded CN

- **用途**：中文正文、标题
- **风格**：圆角黑体，现代友好
- **来源**：https://github.com/CyanoHao/Resource-Han-Rounded

### 需要放置的文件

- `resource-han-rounded-cn-regular.woff2` - 常规字重
- `resource-han-rounded-cn-regular.woff` - 常规字重（备用格式）
- `resource-han-rounded-cn-bold.woff2` - 粗体字重
- `resource-han-rounded-cn-bold.woff` - 粗体字重（备用格式）

## 字体转换指南

由于仓库不直接包含字体文件（版权原因），你需要自行下载并转换。

### 步骤 1：下载字体

#### Code New Roman
```bash
# 从 GitHub 下载
wget https://github.com/tonsky/CodeNewRoman/releases/download/v2.0/CodeNewRoman.zip
unzip CodeNewRoman.zip
```

#### Resource Han Rounded CN
```bash
# 从 GitHub 下载最新版本
wget https://github.com/CyanoHao/Resource-Han-Rounded/releases/latest/download/ResourceHanRoundedCN-OTF.zip
unzip ResourceHanRoundedCN-OTF.zip
```

### 步骤 2：转换为 Web 字体格式

使用 [transfonter.org](https://transfonter.org/) 进行转换：

1. 访问 https://transfonter.org/
2. 上传字体文件（.ttf 或 .otf）
3. 勾选 "WOFF2" 和 "WOFF" 格式
4. 点击 "Convert"
5. 下载转换后的文件

### 步骤 3：重命名并放置

将转换后的文件重命名为以下格式，并放入此目录：

```
public/fonts/
├── code-new-roman.woff
├── code-new-roman.woff2
├── code-new-roman-bold.woff
├── code-new-roman-bold.woff2
├── resource-han-rounded-cn-regular.woff
├── resource-han-rounded-cn-regular.woff2
├── resource-han-rounded-cn-bold.woff
├── resource-han-rounded-cn-bold.woff2
└── README.md
```

## 字体回退机制

如果自定义字体加载失败，系统会按以下顺序回退：

1. Resource Han Rounded CN（中文）
2. Code New Roman（英文）
3. Inter Variable / Inter（备用现代字体）
4. 系统默认字体

## 字体加载策略

CSS 中使用了 `font-display: swap`，这意味着：
- 首先使用系统字体立即显示文本
- 自定义字体加载完成后进行替换
- 确保内容始终可见，避免 FOIT（Flash of Invisible Text）

## 注意事项

- 字体文件较大（尤其是中文字体），建议仅加载需要的字重
- 如需优化加载性能，可以考虑使用字体子集化工具（如 [glyphhanger](https://github.com/filamentgroup/glyphhanger)）
- 确保遵守字体的开源许可证（Code New Roman: SIL Open Font License, Resource Han Rounded: OFL-1.1）
