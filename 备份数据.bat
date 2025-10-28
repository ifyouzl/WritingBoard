@echo off
echo ========================================
echo WritingBoard 数据备份工具
echo ========================================
echo.

set SOURCE=D:\WritingBoard\Data\writingboard-data.json
set BACKUP_DIR=%~dp0备份
set TIMESTAMP=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%

if not exist "%SOURCE%" (
    echo 错误：找不到数据文件！
    echo 位置：%SOURCE%
    echo.
    echo 请确保已重新打包应用并运行过。
    pause
    exit /b 1
)

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo 正在备份数据...
copy "%SOURCE%" "%BACKUP_DIR%\writingboard-data_%TIMESTAMP%.json"

if errorlevel 1 (
    echo 备份失败！
) else (
    echo.
    echo ========================================
    echo 备份成功！
    echo ========================================
    echo.
    echo 备份位置：
    echo %BACKUP_DIR%\writingboard-data_%TIMESTAMP%.json
    echo.
    echo 数据源：D:\WritingBoard\Data\
    echo.
    explorer "%BACKUP_DIR%"
)

pause

