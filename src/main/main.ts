import { app, BrowserWindow, ipcMain, Menu, screen } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let mainWindow: BrowserWindow | null = null;
let widgetWindow: BrowserWindow | null = null;

// 数据存储路径 - 统一使用D盘
const customDataPath = 'D:\\WritingBoard\\Data';
const dataFilePath = path.join(customDataPath, 'writingboard-data.json');

// 在应用启动前设置所有路径到D盘
app.setPath('userData', customDataPath);
app.setPath('logs', path.join(customDataPath, 'logs'));
app.setPath('temp', path.join(customDataPath, 'temp'));
app.setPath('crashDumps', path.join(customDataPath, 'crashDumps'));
app.setPath('sessionData', path.join(customDataPath, 'sessionData'));

// 确保D盘数据目录存在
if (!fs.existsSync(customDataPath)) {
  fs.mkdirSync(customDataPath, { recursive: true });
  console.log('已创建D盘数据目录:', customDataPath);
}

// 创建子目录
const subdirs = ['logs', 'temp', 'crashDumps', 'sessionData'];
subdirs.forEach(dir => {
  const dirPath = path.join(customDataPath, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

console.log('=== D盘路径配置 ===');
console.log('数据目录:', customDataPath);
console.log('用户数据:', app.getPath('userData'));
console.log('日志目录:', app.getPath('logs'));
console.log('临时文件:', app.getPath('temp'));
console.log('崩溃转储:', app.getPath('crashDumps'));
console.log('会话数据:', app.getPath('sessionData'));
console.log('==================');

function createWindow() {
  // 创建自定义中文菜单
  const template: any = [
    {
      label: '文件',
      submenu: [
        {
          label: '退出',
          accelerator: 'Alt+F4',
          role: 'quit'
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { label: '撤销', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: '重做', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: '复制', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: '粘贴', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: '全选', accelerator: 'CmdOrCtrl+A', role: 'selectAll' }
      ]
    },
    {
      label: '视图',
      submenu: [
        { label: '刷新', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        { label: '开发者工具', accelerator: 'F12', role: 'toggleDevTools' },
        { type: 'separator' },
        { label: '实际大小', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
        { label: '放大', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
        { label: '缩小', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' }
      ]
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于 WritingBoard',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow!, {
              type: 'info',
              title: '关于',
              message: 'WritingBoard v1.0.0',
              detail: '一款轻量级的桌面笔记和待办事项应用\n\n开发框架：Electron + React + TypeScript'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: true,
    transparent: false,
    alwaysOnTop: true,
    resizable: true,
    show: false, // 先不显示，等页面加载完成
    title: 'WritingBoard - 笔记与待办', // 设置主窗口标题
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 页面加载完成后再显示窗口，避免空白
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // 开发环境加载本地服务器
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // 生产环境加载打包后的文件
    mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (widgetWindow) {
      widgetWindow.close();
    }
  });
}

// 创建桌面小组件窗口
function createWidgetWindow() {
  // 如果窗口已存在且未销毁，直接显示
  if (widgetWindow && !widgetWindow.isDestroyed()) {
    widgetWindow.show();
    widgetWindow.focus();
    return;
  }

  // 重置为 null，重新创建
  widgetWindow = null;

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  widgetWindow = new BrowserWindow({
    width: 280,
    height: 400,
    x: width - 300,
    y: height - 420,
    frame: false,
    transparent: true,
    alwaysOnTop: false,  // 改为 false，允许其他窗口覆盖
    skipTaskbar: false,  // 改为 false，在任务栏显示图标
    resizable: false,
    show: false,
    title: 'WritingBoard - 桌面小组件',
    backgroundColor: '#00000000',
    hasShadow: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 开发环境加载带参数的URL
  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    widgetWindow.loadURL('http://localhost:3000?widget=true');
  } else {
    widgetWindow.loadFile(path.join(__dirname, 'renderer/index.html'), {
      query: { widget: 'true' }
    });
  }

  // 页面加载完成后显示窗口
  widgetWindow.once('ready-to-show', () => {
    if (widgetWindow) {
      widgetWindow.show();
    }
  });

  widgetWindow.on('closed', () => {
    widgetWindow = null;
  });

  // 设置窗口可拖动
  widgetWindow.setIgnoreMouseEvents(false);
}

// 向小组件发送数据更新
function sendDataToWidget(data: any) {
  if (widgetWindow && !widgetWindow.isDestroyed()) {
    // 等待小组件准备就绪
    if (widgetWindow.webContents.isLoading()) {
      widgetWindow.webContents.once('did-finish-load', () => {
        widgetWindow!.webContents.send('data-update', data);
      });
    } else {
      widgetWindow.webContents.send('data-update', data);
    }
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 保存数据到文件
ipcMain.handle('save-data', async (event, data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('数据已保存到:', dataFilePath);
    
    // 通知小组件更新数据
    sendDataToWidget(data);
    
    return { success: true };
  } catch (error) {
    console.error('保存数据失败:', error);
    return { success: false, error: String(error) };
  }
});

// 从文件加载数据
ipcMain.handle('load-data', async () => {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf-8');
      const parsedData = JSON.parse(data);
      console.log('数据已加载:', dataFilePath);
      return parsedData;
    } else {
      console.log('数据文件不存在，返回默认数据');
      return { todos: [], notes: [], quickNote: '' };
    }
  } catch (error) {
    console.error('加载数据失败:', error);
    return { todos: [], notes: [], quickNote: '' };
  }
});

// 显示/隐藏桌面小组件
ipcMain.handle('toggle-widget', async (event, show: boolean) => {
  try {
    if (show) {
      // 先创建小组件
      createWidgetWindow();
      
      // 加载当前数据并发送给小组件
      if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        const parsedData = JSON.parse(data);
        setTimeout(() => {
          sendDataToWidget(parsedData);
        }, 200);
      }
      
      // 隐藏主窗口
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.hide();
        console.log('主窗口已隐藏，小组件已显示');
      }
    } else {
      // 先显示主窗口
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show();
        mainWindow.focus();
      }
      // 再关闭小组件
      if (widgetWindow && !widgetWindow.isDestroyed()) {
        widgetWindow.close();
        widgetWindow = null;
      }
    }
    return { success: true };
  } catch (error) {
    console.error('切换小组件失败:', error);
    return { success: false, error: String(error) };
  }
});

// 恢复主窗口
ipcMain.handle('restore-main-window', async () => {
  try {
    console.log('恢复主窗口请求');
    
    // 先关闭小组件
    if (widgetWindow && !widgetWindow.isDestroyed()) {
      widgetWindow.close();
      widgetWindow = null;
    }
    
    // 再显示并聚焦主窗口
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.show();
      mainWindow.focus();
      console.log('主窗口已恢复');
      return { success: true };
    }
    
    return { success: false };
  } catch (error) {
    console.error('恢复主窗口失败:', error);
    return { success: false, error: String(error) };
  }
});


