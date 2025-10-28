import React from 'react';
import '../styles/QuickNote.css';

interface QuickNoteProps {
  text: string;
  onChange: (text: string) => void;
}

const QuickNote: React.FC<QuickNoteProps> = ({ text, onChange }) => {
  return (
    <div className="quick-note">
      <div className="quick-note-header">
        <h2>💡 快速笔记</h2>
        <span className="quick-note-tip">随时记录你的想法</span>
      </div>
      <textarea
        className="quick-note-textarea"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="在这里输入你的笔记...&#10;&#10;支持多行文本&#10;自动保存"
        autoFocus
      />
      <div className="quick-note-footer">
        <span className="char-count">{text.length} 字符</span>
        <span className="auto-save-tip">✓ 自动保存</span>
      </div>
    </div>
  );
};

export default QuickNote;

