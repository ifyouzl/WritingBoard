# 📚 Git 和 GitHub 使用指南（零基础）

## 目录
1. [Git 和 GitHub 是什么？](#git-和-github-是什么)
2. [安装 Git](#安装-git)
3. [基本概念](#基本概念)
4. [对 WritingBoard 项目使用 Git](#对-writingboard-项目使用-git)
5. [发布到 GitHub](#发布到-github)
6. [日常使用](#日常使用)

---

## Git 和 GitHub 是什么？

### Git（版本控制工具）
想象你在写论文，每次修改都另存为一个版本：
```
论文v1.docx
论文v2.docx
论文最终版.docx
论文真正最终版.docx
论文真的最终版2.docx
```

Git 就是一个自动帮你管理这些版本的工具，但是：
- ✅ 不用手动复制文件
- ✅ 可以随时回到任何历史版本
- ✅ 知道谁改了什么、什么时候改的
- ✅ 多人协作不会冲突

### GitHub（代码托管平台）
- 相当于代码的"网盘"
- 可以把 Git 管理的代码上传到这里
- 其他人可以看到、下载、参与你的项目
- 程序员的"朋友圈"，展示你的作品

**简单理解：**
```
Git = 本地版本管理工具
GitHub = 在线代码仓库
```

---

## 安装 Git

### Windows 系统安装

#### 方法1：下载安装（推荐）

1. **访问官网**
   ```
   https://git-scm.com/download/win
   ```

2. **下载安装包**
   - 自动下载最新版本
   - 文件名类似：`Git-2.42.0-64-bit.exe`

3. **安装步骤**
   - 双击安装包
   - 一路 "Next"（使用默认选项即可）
   - 特别注意：
     - ✅ 选择 "Git Bash Here"（方便使用）
     - ✅ 选择 "Git from the command line and also from 3rd-party software"

4. **验证安装**
   ```bash
   # 打开命令提示符（CMD）或 PowerShell
   git --version
   
   # 应该显示类似：
   # git version 2.42.0.windows.1
   ```

#### 方法2：使用 Scoop（高级用户）
```powershell
scoop install git
```

### 配置 Git（首次使用必须）

```bash
# 设置你的名字（用于记录谁做的修改）
git config --global user.name "你的名字"

# 设置你的邮箱（最好用 GitHub 注册邮箱）
git config --global user.email "your.email@example.com"

# 验证配置
git config --list
```

**示例：**
```bash
git config --global user.name "Zhang San"
git config --global user.email "zhangsan@gmail.com"
```

---

## 基本概念

### Git 的三个区域

```
工作区 (Working Directory)
    ↓ git add
暂存区 (Staging Area)
    ↓ git commit
本地仓库 (Local Repository)
    ↓ git push
远程仓库 (Remote Repository - GitHub)
```

**通俗理解：**

1. **工作区** - 你编辑代码的地方
   - 就是你的项目文件夹
   
2. **暂存区** - 准备提交的内容
   - 相当于"购物车"，先把要买的东西放进去
   
3. **本地仓库** - 你电脑上的版本记录
   - 相当于"已下单"，保存了完整历史
   
4. **远程仓库** - GitHub 上的版本
   - 相当于"云盘"，其他人可以看到

### 常用命令速查

| 命令 | 作用 | 通俗理解 |
|------|------|---------|
| `git init` | 初始化仓库 | 告诉 Git："开始管理这个文件夹" |
| `git add .` | 添加所有文件到暂存区 | "把所有修改放进购物车" |
| `git commit -m "说明"` | 提交到本地仓库 | "下单，记录这次修改" |
| `git status` | 查看状态 | "看看哪些文件被修改了" |
| `git log` | 查看历史 | "看看之前买了什么" |
| `git push` | 推送到远程 | "上传到 GitHub" |
| `git pull` | 从远程拉取 | "从 GitHub 下载最新版本" |

---

## 对 WritingBoard 项目使用 Git

### 第一步：初始化 Git 仓库

```bash
# 1. 打开 PowerShell 或 Git Bash
# 2. 进入项目目录
cd D:\MyworkSpace\WritingBoard

# 3. 初始化 Git
git init

# 应该看到：
# Initialized empty Git repository in D:/MyworkSpace/WritingBoard/.git/
```

**发生了什么？**
- 创建了一个隐藏的 `.git` 文件夹
- 这个文件夹存储所有版本信息
- 现在 Git 开始监控这个项目了

### 第二步：创建 .gitignore 文件

在项目根目录创建 `.gitignore` 文件，告诉 Git 哪些文件不需要上传。

**文件内容：**
```gitignore
# 依赖
node_modules/

# 编译输出
dist/
release/

# 日志
*.log
npm-debug.log*

# 系统文件
.DS_Store
Thumbs.db
desktop.ini

# IDE 配置
.vscode/
.idea/

# D盘数据（不要上传用户数据）
D:\WritingBoard/

# 临时文件
*.tmp
*.temp

# 构建缓存
.cache/
```

**为什么需要 .gitignore？**
- ❌ `node_modules/` - 有几万个文件，太大了，别人可以自己 `npm install`
- ❌ `dist/` - 编译后的文件，别人可以自己编译
- ❌ `D:\WritingBoard/` - 这是用户数据，不应该上传
- ✅ 只上传源代码和配置文件

### 第三步：添加文件到暂存区

```bash
# 查看当前状态
git status

# 应该看到很多红色的文件（未跟踪的文件）

# 添加所有文件到暂存区
git add .

# 再次查看状态
git status

# 现在文件应该变成绿色（已暂存）
```

### 第四步：提交到本地仓库

```bash
# 提交，并写上说明
git commit -m "Initial commit: WritingBoard v1.0.0"

# 应该看到类似输出：
# [main (root-commit) abc1234] Initial commit: WritingBoard v1.0.0
# 27 files changed, 4600 insertions(+)
```

**提交说明（commit message）怎么写？**

好的例子：
- ✅ `"Initial commit: WritingBoard v1.0.0"`
- ✅ `"Add QuickNote component"`
- ✅ `"Fix: data saving issue"`
- ✅ `"Update README.md"`

不好的例子：
- ❌ `"update"`
- ❌ `"修改"`
- ❌ `"aaa"`

### 第五步：查看历史记录

```bash
# 查看提交历史
git log

# 简洁查看
git log --oneline

# 查看图形化历史
git log --graph --oneline --all
```

---

## 发布到 GitHub

### 第一步：注册 GitHub 账号

1. **访问 GitHub**
   ```
   https://github.com
   ```

2. **点击 Sign up（注册）**
   - 填写邮箱
   - 创建密码
   - 选择用户名（这个很重要，会出现在你的项目链接中）

3. **验证邮箱**
   - 查收邮件
   - 点击验证链接

### 第二步：创建新仓库

1. **登录 GitHub 后，点击右上角的 "+"**
   - 选择 "New repository"

2. **填写仓库信息**
   ```
   Repository name: WritingBoard
   Description: 一款轻量级的 Windows 桌面笔记应用
   
   选择：
   ⚪ Public（公开）- 所有人可见
   ⚫ Private（私有）- 只有你可见
   
   ⬜ Add a README file（不要勾选，我们已经有了）
   ⬜ Add .gitignore（不要勾选，我们已经有了）
   ⬜ Choose a license（可以选 MIT License）
   ```

3. **点击 "Create repository"**

### 第三步：连接本地仓库和 GitHub

创建仓库后，GitHub 会显示一些命令，照着做：

```bash
# 1. 添加远程仓库地址
git remote add origin https://github.com/你的用户名/WritingBoard.git

# 例如：
# git remote add origin https://github.com/zhangsan/WritingBoard.git

# 2. 重命名主分支为 main（GitHub 的默认分支名）
git branch -M main

# 3. 推送代码到 GitHub
git push -u origin main
```

**第一次推送需要登录：**

**方法1：使用 GitHub Desktop（推荐新手）**
- 下载：https://desktop.github.com/
- 登录你的 GitHub 账号
- 会自动处理认证

**方法2：使用 Personal Access Token**
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. 勾选 `repo` 权限
5. 生成后复制 token（只显示一次！）
6. 推送时用 token 作为密码

### 第四步：验证上传成功

1. **刷新 GitHub 仓库页面**
   - 应该能看到你的所有文件

2. **检查 README.md**
   - GitHub 会自动显示 README.md 的内容
   - 这是你的项目主页

---

## 应该发布什么？

### ✅ 应该发布（源代码）

```
WritingBoard/
├── src/                      ✅ 源代码
├── package.json             ✅ 配置文件
├── tsconfig.json            ✅ TypeScript 配置
├── webpack.renderer.config.js ✅ 构建配置
├── README.md                ✅ 文档
├── 使用指南.md               ✅ 文档
├── D盘打包.bat               ✅ 工具脚本
├── .gitignore               ✅ Git 配置
└── LICENSE                  ✅ 开源协议
```

### ❌ 不应该发布（生成的文件）

```
❌ node_modules/         # 依赖包（太大，别人可以 npm install）
❌ dist/                 # 编译输出（别人可以自己编译）
❌ release/              # 打包文件（太大）
❌ D:\WritingBoard/      # 用户数据
❌ *.log                 # 日志文件
```

### 📦 发布打包版本（可选）

如果想让不懂编程的人使用，可以使用 GitHub Releases：

1. **GitHub 仓库 → Releases → Create a new release**

2. **填写信息**
   ```
   Tag version: v1.0.0
   Release title: WritingBoard v1.0.0
   Description: 第一个正式版本
   ```

3. **上传打包文件**
   - 将 `D:\WritingBoard\Release\` 下的文件压缩
   - 上传 `WritingBoard-v1.0.0.zip`
   - 或上传 `.exe` 安装程序

4. **发布**
   - 别人可以直接下载使用，无需编译

---

## 日常使用

### 场景1：修改了代码，想保存版本

```bash
# 1. 查看哪些文件被修改了
git status

# 2. 添加修改的文件
git add .

# 3. 提交
git commit -m "Add search feature"

# 4. 推送到 GitHub
git push
```

### 场景2：想看修改了什么

```bash
# 查看修改内容
git diff

# 查看某个文件的修改
git diff src/renderer/App.tsx
```

### 场景3：想回到之前的版本

```bash
# 1. 查看历史
git log --oneline

# 2. 回到某个版本（谨慎！）
git reset --hard 提交ID

# 例如：
# git reset --hard abc1234
```

### 场景4：想在 GitHub 上展示项目

1. **完善 README.md**
   - 添加项目介绍
   - 添加截图
   - 添加使用说明

2. **添加 LICENSE**
   ```bash
   # 选择 MIT License（最常用的开源协议）
   # GitHub 创建仓库时可以自动添加
   ```

3. **添加 Topics（标签）**
   - GitHub 仓库 → Settings → Topics
   - 添加：`electron`, `react`, `typescript`, `desktop-app`

### 场景5：别人想使用你的项目

他们需要：

```bash
# 1. 克隆你的项目
git clone https://github.com/你的用户名/WritingBoard.git

# 2. 进入目录
cd WritingBoard

# 3. 安装依赖
npm install

# 4. 启动项目
npm start

# 5. 打包
# 右键 D盘打包.bat → 以管理员身份运行
```

---

## 常见问题

### Q1: 推送时提示 "Permission denied"？

**A:** 认证问题，使用 GitHub Desktop 或设置 Personal Access Token。

---

### Q2: 不小心提交了不该提交的文件？

**A:** 
```bash
# 从 Git 中删除，但保留本地文件
git rm --cached 文件名

# 更新 .gitignore
echo "文件名" >> .gitignore

# 提交
git commit -m "Remove unwanted file"
git push
```

---

### Q3: 怎么删除远程仓库的文件夹？

**A:**
```bash
# 从 Git 中删除文件夹
git rm -r --cached node_modules/

# 提交
git commit -m "Remove node_modules"
git push
```

---

### Q4: 想改仓库名字？

**A:**
1. GitHub 仓库 → Settings → Repository name
2. 修改后，更新本地远程地址：
```bash
git remote set-url origin https://github.com/你的用户名/新名字.git
```

---

### Q5: 多个人协作怎么办？

**A:**
```bash
# 别人修改了代码，你要先拉取
git pull

# 再修改
# 修改后提交并推送
git add .
git commit -m "Your changes"
git push
```

---

## Git 工作流程图

```
修改代码
    ↓
git status          # 查看修改了什么
    ↓
git add .           # 添加到暂存区
    ↓
git commit -m "说明" # 提交到本地仓库
    ↓
git push            # 推送到 GitHub
    ↓
完成！✓
```

---

## 推荐的 Git 工具

### 1. Git Bash（命令行）
- Git 自带
- 功能最全

### 2. GitHub Desktop（图形界面）
- 下载：https://desktop.github.com/
- 适合新手
- 点点鼠标就能用

### 3. VS Code 内置 Git
- 左侧源代码管理
- 可视化操作
- 推荐！

### 4. GitKraken（高级）
- 图形化
- 功能强大
- 免费版够用

---

## 实战练习

### 练习1：初始化项目

```bash
cd D:\MyworkSpace\WritingBoard
git init
git add .
git commit -m "Initial commit: WritingBoard v1.0.0"
```

### 练习2：创建 GitHub 仓库并推送

```bash
# 在 GitHub 上创建仓库后
git remote add origin https://github.com/你的用户名/WritingBoard.git
git branch -M main
git push -u origin main
```

### 练习3：修改代码并提交

```bash
# 修改 README.md，添加一些内容
git status
git add README.md
git commit -m "Update README.md"
git push
```

---

## 学习资源

### 官方文档
- Git 官网：https://git-scm.com/
- GitHub 文档：https://docs.github.com/

### 中文教程
- 廖雪峰 Git 教程：https://www.liaoxuefeng.com/wiki/896043488029600
- GitHub 漫游指南：https://github.phodal.com/

### 视频教程
- B站搜索："Git 入门教程"
- YouTube: "Git and GitHub for Beginners"

### 练习平台
- Learn Git Branching：https://learngitbranching.js.org/?locale=zh_CN

---

## 总结

### Git 三步走
```bash
1. git add .                 # 添加修改
2. git commit -m "说明"       # 提交到本地
3. git push                   # 推送到 GitHub
```

### 记住这几个命令就够用了

```bash
git init              # 初始化（只用一次）
git add .             # 添加所有修改
git commit -m "说明"  # 提交
git push              # 推送到 GitHub
git pull              # 从 GitHub 拉取
git status            # 查看状态
git log               # 查看历史
```

### 应该发布什么？

**✅ 发布源代码：**
- src/
- package.json
- 配置文件
- 文档

**❌ 不要发布：**
- node_modules/
- dist/
- 打包文件
- 用户数据

### 下一步

1. **现在就试试！**
   - 打开 PowerShell
   - 执行 `git init`
   - 开始你的 Git 之旅

2. **创建 GitHub 账号**
   - 注册
   - 创建仓库
   - 上传你的项目

3. **展示你的作品**
   - 完善 README
   - 添加截图
   - 分享给朋友

---

**开始你的开源之旅吧！** 🚀

