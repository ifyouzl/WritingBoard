@echo off
chcp 65001 >nul
echo ========================================
echo    WritingBoard - D盘打包脚本
echo ========================================
echo.

echo [0/7] 切换到项目目录...
cd /d "%~dp0"
echo 当前目录: %CD%
echo ✓ 目录切换完成

echo.
echo [1/7] 设置环境变量...
set ELECTRON_BUILDER_CACHE=D:\WritingBoard\BuildCache\electron-builder
set ELECTRON_CACHE=D:\WritingBoard\BuildCache\electron
set npm_config_cache=D:\WritingBoard\BuildCache\npm
echo ✓ 缓存目录已设置到D盘

echo.
echo [2/7] 创建必要的目录...
if not exist "D:\WritingBoard\Data" mkdir "D:\WritingBoard\Data"
if not exist "D:\WritingBoard\Release" mkdir "D:\WritingBoard\Release"
if not exist "D:\WritingBoard\BuildCache" mkdir "D:\WritingBoard\BuildCache"
if not exist "D:\WritingBoard\BuildCache\electron-builder" mkdir "D:\WritingBoard\BuildCache\electron-builder"
if not exist "D:\WritingBoard\BuildCache\electron" mkdir "D:\WritingBoard\BuildCache\electron"
if not exist "D:\WritingBoard\BuildCache\npm" mkdir "D:\WritingBoard\BuildCache\npm"
echo ✓ 目录创建完成

echo.
echo [3/7] 停止所有相关进程...
taskkill /F /IM WritingBoard.exe 2>nul
taskkill /F /IM electron.exe 2>nul
echo ✓ 进程已停止

echo.
echo [4/7] 清理旧的构建文件...
if exist "dist" rmdir /S /Q "dist"
if exist "release" rmdir /S /Q "release"
echo ✓ 清理完成

echo.
echo [5/7] 编译项目...
call npm run build
if errorlevel 1 (
    echo ✗ 编译失败！
    pause
    exit /b 1
)
echo ✓ 编译成功

echo.
echo [6/7] 开始打包...
call npm run package
if errorlevel 1 (
    echo ✗ 打包失败！
    pause
    exit /b 1
)
echo ✓ 打包成功

echo.
echo [7/7] 检查输出文件...
if exist "D:\WritingBoard\Release" (
    echo ✓ 打包文件已保存到: D:\WritingBoard\Release
    explorer "D:\WritingBoard\Release"
) else (
    echo ✗ 未找到输出目录
)

echo.
echo ========================================
echo    打包完成！
echo ========================================
echo.
echo 数据存储位置: D:\WritingBoard\Data
echo 打包输出位置: D:\WritingBoard\Release
echo 构建缓存位置: D:\WritingBoard\BuildCache
echo.
pause

