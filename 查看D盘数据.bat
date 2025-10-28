@echo off
echo ========================================
echo WritingBoard D盘数据文件位置
echo ========================================
echo.
echo 数据文件位置：
echo D:\WritingBoard\Data\writingboard-data.json
echo.

if not exist "D:\WritingBoard\Data\" (
    echo 注意：D盘数据文件夹还不存在！
    echo 请先重新打包并运行应用，数据文件夹会自动创建。
    echo.
    pause
    exit /b 1
)

if not exist "D:\WritingBoard\Data\writingboard-data.json" (
    echo 注意：数据文件还不存在！
    echo 请先运行应用并添加一些数据。
    echo.
    pause
    exit /b 1
)

echo 正在打开数据文件夹...
explorer "D:\WritingBoard\Data"
