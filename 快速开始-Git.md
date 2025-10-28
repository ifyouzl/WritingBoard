# 🚀 Git 快速开始（3分钟搞定）

## ✅ 准备工作（只需一次）

### 1. 安装 Git

**下载地址：** https://git-scm.com/download/win

**验证安装：**
```bash
git --version
```

### 2. 配置 Git

```bash
# 设置你的名字
git config --global user.name "你的名字"

# 设置你的邮箱（建议用 GitHub 的邮箱）
git config --global user.email "your.email@example.com"
```

**示例：**
```bash
git config --global user.name "Zhang San"
git config --global user.email "zhangsan@gmail.com"
```

---

## 📂 初始化本地项目

打开 PowerShell，执行以下命令：

```bash
# 1. 进入项目目录
cd D:\MyworkSpace\WritingBoard

# 2. 初始化 Git
git init

# 3. 查看状态
git status

# 4. 添加所有文件
git add .

# 5. 第一次提交
git commit -m "Initial commit: WritingBoard v1.0.0"

# 完成！✓
```

**现在你的项目已经被 Git 管理了！**

---

## 🌐 发布到 GitHub（5分钟）

### 步骤 1：注册 GitHub

1. 访问：https://github.com
2. 点击 "Sign up"
3. 填写邮箱、密码、用户名
4. 验证邮箱

### 步骤 2：创建仓库

1. 登录后，点击右上角 "+" → "New repository"
2. 填写：
   ```
   Repository name: WritingBoard
   Description: 一款轻量级的 Windows 桌面笔记应用
   ```
3. 选择 **Public**（公开）或 **Private**（私有）
4. ⬜ **不要勾选** "Add a README file"（我们已经有了）
5. 点击 "Create repository"

### 步骤 3：连接并推送

GitHub 会显示一些命令，复制并执行：

```bash
# 添加远程仓库（替换成你的用户名）
git remote add origin https://github.com/你的用户名/WritingBoard.git

# 重命名分支为 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```

**第一次推送会要求登录 GitHub 账号。**

### 步骤 4：验证

刷新 GitHub 页面，应该能看到所有文件了！

---

## 📝 日常使用（三步走）

修改代码后，执行这三个命令：

```bash
# 1. 添加修改
git add .

# 2. 提交到本地
git commit -m "描述你做了什么修改"

# 3. 推送到 GitHub
git push
```

**示例：**
```bash
git add .
git commit -m "Add search feature"
git push
```

---

## 🎯 实战演练

### 练习1：第一次提交

```bash
cd D:\MyworkSpace\WritingBoard
git init
git add .
git commit -m "Initial commit: WritingBoard v1.0.0"
```

### 练习2：修改 README 并提交

```bash
# 1. 用编辑器打开 README.md，添加一些内容

# 2. 查看修改
git status

# 3. 提交
git add README.md
git commit -m "Update README.md"

# 4. 如果已经连接 GitHub
git push
```

---

## 🔧 推荐工具

### 方式1：命令行（Git Bash）
- Git 自带
- 功能最全
- 适合学习

### 方式2：GitHub Desktop
- 下载：https://desktop.github.com/
- 图形界面
- 适合新手
- **推荐！**

### 方式3：VS Code 内置
- 打开 VS Code
- 左侧"源代码管理"图标
- 点点鼠标就能用
- **也推荐！**

---

## ❓ 常见问题

### Q1: 推送时要求输入密码？

**A:** 现在 GitHub 不支持密码登录，需要：

**方法1（推荐）：** 使用 GitHub Desktop
- 它会自动处理认证

**方法2：** 创建 Personal Access Token
1. GitHub → Settings → Developer settings
2. Personal access tokens → Generate new token
3. 勾选 `repo` 权限
4. 复制 token（只显示一次！）
5. 推送时用 token 作为密码

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

### Q3: 怎么查看提交历史？

**A:**
```bash
git log --oneline
```

---

## 📦 发布版本（可选）

如果想让不懂编程的人使用你的应用：

### 使用 GitHub Releases

1. GitHub 仓库 → **Releases** → **Create a new release**

2. 填写信息：
   ```
   Tag: v1.0.0
   Release title: WritingBoard v1.0.0
   Description: 第一个正式版本
   ```

3. 上传打包文件：
   - 将 `D:\WritingBoard\Release\WritingBoard Setup.exe` 上传
   - 或者上传压缩包

4. 点击 **Publish release**

**别人就可以直接下载安装程序使用了！**

---

## ✅ 应该上传什么？

### ✅ 上传这些（源代码）

```
src/                  ← 源代码
package.json          ← 依赖配置
tsconfig.json         ← TypeScript 配置
README.md             ← 文档
.gitignore            ← Git 配置
D盘打包.bat           ← 工具脚本
```

### ❌ 不要上传（已在 .gitignore 中）

```
node_modules/         ← 依赖包（太大）
dist/                 ← 编译输出（可以重新编译）
release/              ← 打包文件（用 Releases 发布）
D:\WritingBoard/      ← 用户数据
*.log                 ← 日志文件
```

---

## 🎓 进阶学习

### 学完基础后，可以学习：

1. **分支（Branch）**
   - 创建功能分支
   - 合并分支
   - 解决冲突

2. **协作**
   - Fork 别人的项目
   - Pull Request
   - Code Review

3. **高级命令**
   - git rebase
   - git cherry-pick
   - git stash

### 推荐资源

- 📖 廖雪峰 Git 教程：https://www.liaoxuefeng.com/wiki/896043488029600
- 🎮 交互式学习：https://learngitbranching.js.org/?locale=zh_CN
- 📺 B站：搜索 "Git 入门教程"

---

## 🎯 现在就开始！

### 第1步：初始化 Git
```bash
cd D:\MyworkSpace\WritingBoard
git init
git add .
git commit -m "Initial commit: WritingBoard v1.0.0"
```

### 第2步：注册 GitHub
访问：https://github.com/signup

### 第3步：创建仓库并推送
按照上面的步骤操作

### 第4步：查看你的项目
访问：https://github.com/你的用户名/WritingBoard

---

**恭喜！你已经掌握了 Git 和 GitHub 的基本使用！** 🎉

有问题？查看完整指南：`Git和GitHub使用指南.md`

