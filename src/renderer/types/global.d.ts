// Electron API类型定义
interface ElectronAPI {
  saveData: (data: { todos: any[]; notes: any[]; quickNote: string }) => Promise<{ success: boolean }>;
  loadData: () => Promise<{ todos: any[]; notes: any[]; quickNote: string }>;
  toggleWidget: (show: boolean) => Promise<{ success: boolean }>;
  restoreMainWindow: () => Promise<{ success: boolean }>;
  onDataUpdate: (callback: (data: any) => void) => () => void;
}

// 扩展Window接口
declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};

