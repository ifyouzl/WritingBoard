# 📝 WritingBoard

一款轻量级的 Windows 桌面笔记应用，支持快速笔记、待办事项和便签功能，并提供桌面小组件模式。

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 项目概述

WritingBoard 是一个基于 Electron + React + TypeScript 构建的桌面应用，旨在提供简洁高效的笔记管理体验。

### 核心功能
- 💡 **快速笔记** - 随时记录灵感，支持多行文本
- ✅ **待办事项** - 任务管理，支持标记完成
- 📌 **便签** - 多彩便签，分类管理
- 🎯 **桌面小组件** - 最小化到桌面，常驻显示待办事项

---

## 🛠 技术栈

### 前端技术
- **React 18.2** - UI 框架
- **TypeScript 5.1** - 类型安全
- **CSS3** - 样式设计

### 桌面框架
- **Electron 27.0** - 跨平台桌面应用框架
- **Electron Builder** - 应用打包工具

### 构建工具
- **Webpack 5** - 模块打包
- **TypeScript Compiler** - TS 编译
- **Webpack Dev Server** - 开发服务器

---

## 📂 项目结构

```
WritingBoard/
├── src/                          # 源代码目录
│   ├── main/                     # Electron 主进程
│   │   ├── main.ts              # 主进程入口，窗口管理
│   │   └── preload.ts           # 预加载脚本，IPC通信桥梁
│   │
│   └── renderer/                # React 渲染进程
│       ├── App.tsx              # 主应用组件
│       ├── index.tsx            # 渲染进程入口
│       ├── index.html           # HTML 模板
│       │
│       ├── components/          # React 组件
│       │   ├── QuickNote.tsx   # 快速笔记组件
│       │   ├── TodoList.tsx    # 待办列表组件
│       │   ├── NotesList.tsx   # 便签列表组件
│       │   └── Widget.tsx      # 桌面小组件
│       │
│       ├── styles/              # 样式文件
│       │   ├── global.css      # 全局样式
│       │   ├── App.css         # 应用主样式
│       │   ├── QuickNote.css   # 快速笔记样式
│       │   ├── TodoList.css    # 待办列表样式
│       │   ├── NotesList.css   # 便签样式
│       │   └── Widget.css      # 小组件样式
│       │
│       └── types/               # TypeScript 类型定义
│           └── global.d.ts     # 全局类型声明
│
├── dist/                         # 编译输出目录
│   ├── main.js                  # 主进程编译文件
│   ├── preload.js               # 预加载脚本编译文件
│   └── renderer/                # 渲染进程编译文件
│
├── release/                      # 本地打包输出（已弃用）
│
├── D:\WritingBoard/             # D盘数据目录
│   ├── Data/                    # 用户数据
│   │   ├── writingboard-data.json  # 数据文件
│   │   ├── logs/                # 应用日志
│   │   ├── temp/                # 临时文件
│   │   └── sessionData/         # 会话数据
│   │
│   ├── Release/                 # 打包输出
│   │   ├── win-unpacked/        # 未打包的应用
│   │   └── *.exe                # 安装程序
│   │
│   └── BuildCache/              # 构建缓存
│       ├── electron-builder/
│       ├── electron/
│       └── npm/
│
├── package.json                  # 项目配置
├── tsconfig.json                # TypeScript 配置
├── webpack.renderer.config.js   # Webpack 配置
├── electron-builder.env         # 构建环境变量
│
└── D盘打包.bat                  # 打包脚本
```

---

## 🎯 技术路线

### 1️⃣ 技术选型思路

#### 为什么选择 Electron？
- ✅ **跨平台** - 一次开发，Windows/Mac/Linux 都能运行
- ✅ **Web 技术** - 使用熟悉的 HTML/CSS/JavaScript
- ✅ **丰富的 API** - 可以访问系统功能（文件、通知等）
- ✅ **活跃社区** - 大量成熟的工具和库

#### 为什么选择 React？
- ✅ **组件化** - 代码复用，易于维护
- ✅ **状态管理** - 自带的 useState/useEffect 足够简单应用使用
- ✅ **虚拟 DOM** - 高效的 UI 更新
- ✅ **生态丰富** - 大量第三方组件库

#### 为什么选择 TypeScript？
- ✅ **类型安全** - 编译时发现错误
- ✅ **智能提示** - 更好的开发体验
- ✅ **代码可维护性** - 自文档化的代码

---

## 🔧 核心实现原理

### 架构设计

```
┌─────────────────────────────────────────┐
│          Electron 应用架构              │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐    ┌──────────────┐  │
│  │  主进程       │◄──►│  渲染进程     │  │
│  │  (Node.js)   │IPC │  (React)     │  │
│  └──────────────┘    └──────────────┘  │
│         │                    │         │
│         │                    │         │
│    ┌────▼─────┐        ┌────▼────┐    │
│    │ 窗口管理  │        │  UI组件  │    │
│    │ 文件IO   │        │  状态管理 │    │
│    │ 系统API  │        │  用户交互 │    │
│    └──────────┘        └─────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

### 1. 主进程 (main.ts)

**职责：**
- 创建和管理窗口（主窗口、小组件窗口）
- 处理文件系统操作（读写数据）
- 管理应用生命周期
- 设置应用路径（D盘存储）

**关键代码：**
```typescript
// 设置D盘数据路径
const customDataPath = 'D:\\WritingBoard\\Data';
app.setPath('userData', customDataPath);

// 创建主窗口
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
}

// 处理数据保存
ipcMain.handle('save-data', async (event, data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data));
});
```

### 2. 预加载脚本 (preload.ts)

**职责：**
- 安全地暴露主进程 API 给渲染进程
- 作为主进程和渲染进程的桥梁

**关键代码：**
```typescript
contextBridge.exposeInMainWorld('electronAPI', {
  saveData: (data: any) => ipcRenderer.invoke('save-data', data),
  loadData: () => ipcRenderer.invoke('load-data'),
  toggleWidget: (show: boolean) => ipcRenderer.invoke('toggle-widget', show)
});
```

### 3. 渲染进程 (React 组件)

**职责：**
- 渲染用户界面
- 处理用户交互
- 管理应用状态

**数据流：**
```
用户操作 → setState → React重新渲染 → useEffect触发 → 保存到文件
```

**关键代码：**
```typescript
// App.tsx - 状态管理
const [todos, setTodos] = useState<Todo[]>([]);
const [notes, setNotes] = useState<Note[]>([]);

// 自动保存
useEffect(() => {
  if (!isInitialLoad) {
    saveData(); // 调用 Electron API 保存
  }
}, [todos, notes]);
```

### 4. 数据持久化

**存储方式：**
- 使用 JSON 文件存储数据
- 路径：`D:\WritingBoard\Data\writingboard-data.json`
- 自动保存机制

**数据结构：**
```json
{
  "todos": [
    {
      "id": "1698123456789",
      "text": "完成项目文档",
      "completed": false,
      "createdAt": 1698123456789
    }
  ],
  "notes": [
    {
      "id": "1698123456790",
      "title": "会议记录",
      "content": "今天讨论了...",
      "color": "#fff59d",
      "createdAt": 1698123456790
    }
  ],
  "quickNote": "这是快速笔记的内容"
}
```

---

## 🚀 开发流程

### 第一步：环境准备

```bash
# 安装依赖
npm install
```

**需要的工具：**
- Node.js (v16+)
- npm (v7+)
- Git (可选)

### 第二步：开发模式

```bash
# 启动开发服务器
npm start
```

**发生了什么？**
1. Webpack Dev Server 启动在 `http://localhost:3000`
2. 自动编译 TypeScript 和 React 代码
3. Electron 窗口自动打开并加载应用
4. 支持热重载（代码改动自动刷新）

### 第三步：编译代码

```bash
# 编译所有代码
npm run build
```

**编译流程：**
```
TypeScript 源码 → TSC 编译 → JavaScript
    ↓
React + CSS → Webpack 打包 → 打包后的文件
    ↓
输出到 dist/ 目录
```

### 第四步：打包应用

```bash
# 使用批处理脚本（推荐）
右键 "D盘打包.bat" → 以管理员身份运行

# 或使用 npm 命令
npm run package
```

**打包流程：**
```
1. 清理旧文件
2. 编译 TypeScript
3. 打包 React 代码
4. Electron Builder 打包
5. 生成可执行文件
```

---

## 💻 IPC 通信机制

Electron 的核心是主进程和渲染进程之间的通信（IPC）。

### 通信流程

```
┌─────────────┐                    ┌─────────────┐
│   渲染进程   │                    │   主进程     │
│  (React)    │                    │  (Node.js)  │
└─────────────┘                    └─────────────┘
       │                                  │
       │  1. 调用 electronAPI.saveData() │
       ├─────────────────────────────────►│
       │                                  │
       │     2. 通过 preload.ts 转发      │
       │     ipcRenderer.invoke()        │
       │                                  │
       │  3. 主进程处理 ipcMain.handle()  │
       │     写入文件系统                 │
       │                                  │
       │  4. 返回结果                     │
       │◄─────────────────────────────────┤
       │                                  │
```

### 安全性设计

- ✅ 启用 `contextIsolation` - 隔离渲染进程
- ✅ 禁用 `nodeIntegration` - 不直接暴露 Node.js API
- ✅ 使用 `preload.ts` - 白名单方式暴露 API

---

## 📦 打包配置

### Electron Builder 配置

```json
{
  "build": {
    "appId": "com.writingboard.app",
    "productName": "WritingBoard",
    "directories": {
      "output": "D:\\WritingBoard\\Release"
    },
    "win": {
      "target": ["nsis", "portable"]
    }
  }
}
```

**输出文件：**
- `WritingBoard Setup.exe` - NSIS 安装程序
- `WritingBoard-Portable.exe` - 便携版（无需安装）
- `win-unpacked/` - 解压版（开发测试用）

---

## 🎨 UI 设计思路

### 设计原则
1. **简洁** - 去除不必要的装饰
2. **高效** - 快速访问常用功能
3. **美观** - 现代化的设计语言

### 色彩方案
- **快速笔记** - 紫色渐变（#667eea → #764ba2）
- **待办事项** - 蓝色系（#2196F3）
- **便签** - 多彩便签（黄/粉/蓝/绿）

### 交互设计
- 标签页切换 - 快速切换不同功能
- 小组件模式 - 一键最小化到桌面
- 自动保存 - 无需手动保存按钮

---

## 📚 学习路径建议

如果你想深入学习这类应用的开发，建议按以下顺序：

### 1. 基础知识（2-4周）
- **HTML/CSS/JavaScript** - Web 基础
- **ES6+** - 现代 JavaScript 特性
- **TypeScript** - 类型系统

### 2. React 框架（2-3周）
- **组件基础** - 函数组件、JSX
- **Hooks** - useState, useEffect
- **状态管理** - Props、State

### 3. Electron 框架（1-2周）
- **主进程与渲染进程** - 架构理解
- **IPC 通信** - 进程间通信
- **打包发布** - Electron Builder

### 4. 工程化工具（1周）
- **Webpack** - 模块打包
- **npm/package.json** - 依赖管理
- **TypeScript 配置** - tsconfig.json

### 推荐资源
- [Electron 官方文档](https://www.electronjs.org/docs)
- [React 官方教程](https://react.dev/learn)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

---

## 🔍 核心文件详解

### package.json - 项目配置文件

```json
{
  "scripts": {
    "start": "开发模式，启动 Webpack + Electron",
    "build": "编译 TypeScript 和 React",
    "package": "打包成可执行文件"
  },
  "dependencies": {
    "react": "UI 框架",
    "react-dom": "React DOM 渲染"
  },
  "devDependencies": {
    "electron": "桌面框架",
    "typescript": "类型检查",
    "webpack": "打包工具"
  }
}
```

### tsconfig.json - TypeScript 配置

```json
{
  "compilerOptions": {
    "target": "ES2020",        // 编译目标
    "module": "commonjs",      // 模块系统
    "jsx": "react",            // JSX 支持
    "strict": true             // 严格模式
  }
}
```

### webpack.renderer.config.js - 打包配置

```javascript
module.exports = {
  entry: './src/renderer/index.tsx',  // 入口文件
  output: {
    path: path.join(__dirname, 'dist/renderer'),  // 输出路径
    filename: 'bundle.js'  // 输出文件名
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },  // 处理 TypeScript
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }  // 处理 CSS
    ]
  }
};
```

---

## 🚀 快速开始

### 开发模式

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm start

# 应用会自动打开，修改代码会自动刷新
```

### 打包发布

```bash
# 方式1：使用批处理脚本（推荐）
右键 "D盘打包.bat" → 以管理员身份运行

# 方式2：使用 npm 命令
npm run build
npm run package

# 打包完成后，应用在：
# D:\WritingBoard\Release\win-unpacked\WritingBoard.exe
```

---

## 📖 使用说明

### 功能介绍

#### 1. 快速笔记
- 随时记录灵感和想法
- 支持多行文本
- 自动保存
- 显示字符计数

#### 2. 待办事项
- 添加待办任务
- 标记完成/未完成
- 删除任务
- 任务按创建时间排序

#### 3. 便签
- 创建多彩便签
- 支持标题和内容
- 6种颜色可选
- 编辑和删除

#### 4. 桌面小组件
- 点击 "⊟" 按钮最小化到桌面
- 显示待办事项
- 点击 "✕" 返回主窗口
- 保持在最前端

### 数据存储

所有数据自动保存在：
```
D:\WritingBoard\Data\writingboard-data.json
```

### 数据备份

运行批处理脚本：
```
备份数据.bat
```

或手动复制数据文件到其他位置。

---

## 🛠 故障排除

### 打包失败

**问题：** 找不到 package.json

**解决：** 确保以管理员身份运行 `D盘打包.bat`

---

### 数据丢失

**问题：** 找不到之前的数据

**解决：** 检查 `D:\WritingBoard\Data\writingboard-data.json` 是否存在

---

### 应用无法启动

**问题：** 双击没反应

**解决：** 
1. 重新打包
2. 检查是否被杀毒软件拦截
3. 查看日志：`D:\WritingBoard\Data\logs\`

---

## 🤝 贡献

这是一个学习项目，欢迎提出建议和改进！

---

## 📄 开源协议

MIT License

---

## 🙏 致谢

感谢以下开源项目：
- [Electron](https://www.electronjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)

---

**开发时间：** 2025年10月

**项目类型：** 个人学习项目

**适合人群：** Electron 初学者、桌面应用开发爱好者
