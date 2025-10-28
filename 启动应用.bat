@echo off
REM 切换到批处理文件所在目录（项目根目录）
cd /d "%~dp0"

echo 正在启动 WritingBoard...
echo 当前目录: %CD%

if exist "release\win-unpacked\WritingBoard.exe" (
    start "" "release\win-unpacked\WritingBoard.exe"
    echo 应用已启动！
) else if exist "D:\WritingBoard\Release\win-unpacked\WritingBoard.exe" (
    start "" "D:\WritingBoard\Release\win-unpacked\WritingBoard.exe"
    echo 应用已启动！（从D盘）
) else (
    echo 错误：未找到应用程序！
    echo 请先运行打包脚本。
    pause
)
