import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  saveData: (data: { todos: any[]; notes: any[]; quickNote: string }) => 
    ipcRenderer.invoke('save-data', data),
  loadData: () => 
    ipcRenderer.invoke('load-data'),
  toggleWidget: (show: boolean) => 
    ipcRenderer.invoke('toggle-widget', show),
  restoreMainWindow: () => 
    ipcRenderer.invoke('restore-main-window'),
  onDataUpdate: (callback: (data: any) => void) => {
    ipcRenderer.on('data-update', (event, data) => callback(data));
    return () => ipcRenderer.removeAllListeners('data-update');
  }
});

