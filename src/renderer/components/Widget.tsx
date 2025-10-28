import React from 'react';
import { Todo } from '../App';
import '../styles/Widget.css';

interface WidgetProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRestore: () => void;
}

const Widget: React.FC<WidgetProps> = ({ todos, onToggle, onRestore }) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="widget-container">
      <div className="widget-header">
        <div className="widget-title">
          <span>📝 待办事项</span>
          <span className="widget-stats">{completedCount}/{totalCount}</span>
        </div>
      </div>

      <div className="widget-list">
        {todos.length === 0 ? (
          <div className="widget-empty">暂无待办事项</div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`widget-item ${todo.completed ? 'completed' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggle(todo.id);
              }}
            >
              <input
                type="checkbox"
                className="widget-checkbox"
                checked={todo.completed}
                onChange={() => {}}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="widget-text">{todo.text}</span>
            </div>
          ))
        )}
      </div>

      <div className="widget-footer" onClick={onRestore}>
        点击恢复完整窗口
      </div>
    </div>
  );
};

export default Widget;

