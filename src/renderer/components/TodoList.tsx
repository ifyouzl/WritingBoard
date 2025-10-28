import React, { useState } from 'react';
import { Todo } from '../App';
import '../styles/TodoList.css';

interface TodoListProps {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onAdd, onToggle, onDelete }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="todo-list">
      {totalCount > 0 && (
        <div className="todo-stats">
          已完成 {completedCount} / {totalCount} 项任务
        </div>
      )}

      <form onSubmit={handleSubmit} className="todo-input-form">
        <input
          type="text"
          className="todo-input"
          placeholder="输入新任务，按回车添加..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-button">
          +
        </button>
      </form>

      {todos.length === 0 ? (
        <div className="empty-state">
          <p>📝 还没有任何待办事项</p>
          <p className="empty-hint">在上方输入框添加你的第一个任务吧！</p>
        </div>
      ) : (
        <div className="todos-container">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button
                className="delete-button"
                onClick={() => onDelete(todo.id)}
                title="删除任务"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;

