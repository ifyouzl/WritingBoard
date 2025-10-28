import React, { useState } from 'react';
import { Note } from '../App';
import '../styles/NotesList.css';

interface NotesListProps {
  notes: Note[];
  onAdd: (title: string, content: string, color: string) => void;
  onUpdate: (id: string, title: string, content: string, color: string) => void;
  onDelete: (id: string) => void;
}

const COLORS = ['#FFE066', '#FFB3BA', '#BAE1FF', '#BAFFC9', '#E4C1F9'];

const NotesList: React.FC<NotesListProps> = ({ notes, onAdd, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleAddNew = () => {
    setIsEditing(true);
    setEditingId(null);
    setTitle('');
    setContent('');
    setSelectedColor(COLORS[0]);
  };

  const handleEdit = (note: Note) => {
    setIsEditing(true);
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setSelectedColor(note.color);
  };

  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      return;
    }

    if (editingId) {
      onUpdate(editingId, title.trim(), content.trim(), selectedColor);
    } else {
      onAdd(title.trim() || '无标题', content.trim(), selectedColor);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setTitle('');
    setContent('');
    setSelectedColor(COLORS[0]);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return '今天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return '昨天';
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
    }
  };

  return (
    <div className="notes-list">
      {!isEditing && (
        <button className="add-note-button" onClick={handleAddNew}>
          + 添加新便签
        </button>
      )}

      {isEditing && (
        <div className="note-editor" style={{ backgroundColor: selectedColor }}>
          <input
            type="text"
            className="note-title-input"
            placeholder="标题（可选）"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="note-content-input"
            placeholder="输入便签内容..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
          <div className="color-picker">
            {COLORS.map((color) => (
              <button
                key={color}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                title={`选择颜色 ${color}`}
              />
            ))}
          </div>
          <div className="editor-buttons">
            <button className="save-button" onClick={handleSave}>
              保存
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              取消
            </button>
          </div>
        </div>
      )}

      {notes.length === 0 && !isEditing ? (
        <div className="empty-state">
          <p>📌 还没有任何便签</p>
          <p className="empty-hint">点击上方按钮创建你的第一个便签！</p>
        </div>
      ) : (
        <div className="notes-container">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              style={{ backgroundColor: note.color }}
            >
              <div className="note-header">
                <h3 className="note-title">{note.title}</h3>
                <div className="note-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(note)}
                    title="编辑便签"
                  >
                    ✎
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => onDelete(note.id)}
                    title="删除便签"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="note-content">{note.content}</div>
              <div className="note-date">{formatDate(note.createdAt)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;

