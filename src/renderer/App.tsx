import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import NotesList from './components/NotesList';
import QuickNote from './components/QuickNote';
import Widget from './components/Widget';
import './styles/App.css';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: number;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quick' | 'todos' | 'notes'>('quick');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [quickNoteText, setQuickNoteText] = useState<string>('');
  
  // 检查是否为小组件模式
  const isWidget = new URLSearchParams(window.location.search).get('widget') === 'true';

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // 加载保存的数据
    loadData().then(() => {
      setIsInitialLoad(false);
    });

    // 小组件模式：监听数据更新
    if (isWidget && window.electronAPI && window.electronAPI.onDataUpdate) {
      const cleanup = window.electronAPI.onDataUpdate((data) => {
        console.log('小组件收到数据更新:', data);
        if (data.todos) setTodos(data.todos);
        if (data.notes) setNotes(data.notes);
        if (data.quickNote !== undefined) setQuickNoteText(data.quickNote);
      });
      return cleanup;
    }
  }, [isWidget]);

  useEffect(() => {
    // 自动保存数据（跳过初始加载）
    if (!isInitialLoad && !isWidget) {
      saveData();
    }
  }, [todos, notes, quickNoteText, isInitialLoad, isWidget]);

  const loadData = async () => {
    try {
      if (window.electronAPI) {
        const data: any = await window.electronAPI.loadData();
        console.log('从Electron加载数据:', data);
        if (data.todos) setTodos(data.todos);
        if (data.notes) setNotes(data.notes);
        if (data.quickNote !== undefined) setQuickNoteText(data.quickNote);
      }
      
      // 同时从localStorage加载（开发模式备份）
      const savedTodos = localStorage.getItem('todos');
      const savedNotes = localStorage.getItem('notes');
      const savedQuickNote = localStorage.getItem('quickNote');
      
      if (savedTodos) setTodos(JSON.parse(savedTodos));
      if (savedNotes) setNotes(JSON.parse(savedNotes));
      if (savedQuickNote) setQuickNoteText(savedQuickNote);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const saveData = async () => {
    try {
      const dataToSave = {
        todos,
        notes,
        quickNote: quickNoteText
      };
      
      // 保存到Electron文件系统（仅主窗口）
      if (window.electronAPI && !isWidget) {
        await window.electronAPI.saveData(dataToSave);
      }
      
      // 同时保存到localStorage（开发模式备份）
      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.setItem('notes', JSON.stringify(notes));
      localStorage.setItem('quickNote', quickNoteText);
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now()
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addNote = (title: string, content: string, color: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      color,
      createdAt: Date.now()
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, title: string, content: string, color: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, title, content, color } : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleRestoreWindow = async () => {
    if (window.electronAPI) {
      await window.electronAPI.restoreMainWindow();
    }
  };

  const handleShowWidget = async () => {
    if (window.electronAPI) {
      await window.electronAPI.toggleWidget(true);
    }
  };

  // 小组件模式渲染
  if (isWidget) {
    return (
      <Widget
        todos={todos}
        onToggle={toggleTodo}
        onRestore={handleRestoreWindow}
      />
    );
  }

  // 主窗口渲染
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📝 WritingBoard</h1>
          <button 
            className="widget-toggle-btn" 
            onClick={handleShowWidget}
            title="最小化到桌面小组件"
          >
            ⊟
          </button>
        </div>
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'quick' ? 'active' : ''}`}
            onClick={() => setActiveTab('quick')}
          >
            快速笔记
          </button>
          <button
            className={`tab-button ${activeTab === 'todos' ? 'active' : ''}`}
            onClick={() => setActiveTab('todos')}
          >
            待办事项
          </button>
          <button
            className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            便签
          </button>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'quick' ? (
          <QuickNote
            text={quickNoteText}
            onChange={setQuickNoteText}
          />
        ) : activeTab === 'todos' ? (
          <TodoList
            todos={todos}
            onAdd={addTodo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ) : (
          <NotesList
            notes={notes}
            onAdd={addNote}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        )}
      </main>
    </div>
  );
};

export default App;


