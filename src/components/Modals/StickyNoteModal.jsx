import React, { useState, useEffect } from 'react';

const NOTE_COLORS = [
  { id: 'yellow', hex: '#FEF08A', name: 'Canary Yellow' },
  { id: 'green', hex: '#BBF7D0', name: 'Mint Green' },
  { id: 'blue', hex: '#BAE6FD', name: 'Sky Blue' },
  { id: 'pink', hex: '#FBCFE8', name: 'Coral Pink' },
  { id: 'purple', hex: '#E9D5FF', name: 'Lavender' },
  { id: 'orange', hex: '#FED7AA', name: 'Warm Peach' }
];

export default function StickyNoteModal({
  isOpen,
  onClose,
  onSave,
  editNote,
  currentUser
}) {
  const [color, setColor] = useState('yellow');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Exam Prep');
  const [priority, setPriority] = useState('normal');
  const [content, setContent] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [author, setAuthor] = useState('Campus Student');
  const [sem, setSem] = useState('3rd Sem');
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    if (editNote) {
      setColor(editNote.color || 'yellow');
      setTitle(editNote.title || '');
      setCategory(editNote.category || 'Exam Prep');
      setPriority(editNote.priority || 'normal');
      setContent(editNote.content || '');
      setTasks(editNote.tasks ? [...editNote.tasks] : []);
      setAuthor(editNote.author || 'Campus Student');
      setSem(editNote.sem || '3rd Sem');
      setPinned(!!editNote.pinned);
    } else {
      // Default for new note
      setColor('yellow');
      setTitle('');
      setCategory('Exam Prep');
      setPriority('normal');
      setContent('');
      setTasks([]);
      setNewTaskInput('');
      setPinned(true);

      if (currentUser) {
        setAuthor(currentUser.name || 'Campus Student');
        setSem(currentUser.branch || currentUser.roll || '3rd Sem');
      } else {
        setAuthor('Campus Student');
        setSem('3rd Sem');
      }
    }
  }, [editNote, currentUser, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddTask = () => {
    if (!newTaskInput.trim()) return;
    setTasks([...tasks, { text: newTaskInput.trim(), done: false }]);
    setNewTaskInput('');
  };

  const handleRemoveTask = (idx) => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const noteData = {
      id: editNote ? editNote.id : 'sn-' + Date.now(),
      title: title.trim(),
      category,
      priority,
      content: content.trim(),
      tasks,
      color,
      pinned,
      author: author.trim() || 'Student Writer',
      sem: sem.trim() || '3rd Sem',
      userId: currentUser?.id || currentUser?.roll || (editNote?.userId || 'guest'),
      date: editNote ? editNote.date : 'Today'
    };

    onSave(noteData, !!editNote);
    onClose();
  };

  return (
    <div
      id="sticky-note-modal"
      className="modal-overlay active"
      role="dialog"
      aria-labelledby="sn-modal-title"
      onClick={(e) => {
        if (e.target.id === 'sticky-note-modal') onClose();
      }}
    >
      <div className="modal-card" style={{ maxWidth: '540px' }}>
        <span className="modal-pin">📌</span>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-eyebrow">Virtual Corkboard Pin</span>
            <h2 className="modal-title" id="sn-modal-title">
              {editNote ? 'Edit Sticky Note' : 'Pin a Sticky Note'}
            </h2>
          </div>
          <button
            id="sn-modal-close"
            className="modal-close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Color Theme Selector */}
            <div className="form-group">
              <label className="form-label">Note Color Theme</label>
              <div className="sn-color-picker-row">
                {NOTE_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`sn-modal-color-btn ${color === c.id ? 'active' : ''}`}
                    style={{ background: c.hex }}
                    title={c.name}
                    onClick={() => setColor(c.id)}
                  ></button>
                ))}
              </div>
            </div>

            {/* Note Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="sn-title-input">
                Note Title *
              </label>
              <input
                type="text"
                id="sn-title-input"
                className="form-input"
                placeholder="e.g. DSA Revision / Hackathon Team Search"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={70}
              />
            </div>

            {/* Category & Priority */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}
            >
              <div className="form-group">
                <label className="form-label" htmlFor="sn-category-select">
                  Category
                </label>
                <select
                  id="sn-category-select"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Exam Prep">📝 Exam Prep</option>
                  <option value="Project Tasks">🚀 Project Tasks</option>
                  <option value="Study Groups">☕ Study Groups</option>
                  <option value="Campus Ideas">💡 Campus Ideas</option>
                  <option value="Announcements">📢 Announcements</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="sn-priority-select">
                  Priority Level
                </label>
                <select
                  id="sn-priority-select"
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="normal">📌 Normal Note</option>
                  <option value="priority">⭐ Important Priority</option>
                  <option value="urgent">🔥 Urgent Deadline</option>
                </select>
              </div>
            </div>

            {/* Note Content */}
            <div className="form-group">
              <label className="form-label" htmlFor="sn-content-input">
                Note Details *
              </label>
              <textarea
                id="sn-content-input"
                className="form-textarea"
                placeholder="Add room numbers, time slots, exam units, or project details..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={3}
                style={{ minHeight: '80px' }}
              ></textarea>
            </div>

            {/* Interactive Checklist Tasks Builder */}
            <div className="form-group">
              <label className="form-label">
                <span>Interactive Checklist Tasks</span>{' '}
                <small>(Optional to-dos)</small>
              </label>
              <div className="sn-task-builder-row">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add a task item (e.g. Review AVL Tree)..."
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTask();
                    }
                  }}
                  maxLength={60}
                />
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handleAddTask}
                >
                  Add Item
                </button>
              </div>

              <div className="sn-builder-tasks-list">
                {tasks.length === 0 ? (
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--ink-faint)',
                      fontStyle: 'italic'
                    }}
                  >
                    No tasks added yet (optional).
                  </span>
                ) : (
                  tasks.map((t, idx) => (
                    <div key={idx} className="sn-builder-task-pill">
                      <span>{t.done ? '☑️' : '◻️'} {t.text}</span>
                      <button
                        type="button"
                        className="sn-builder-task-del"
                        title="Remove task"
                        onClick={() => handleRemoveTask(idx)}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Author Info */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}
            >
              <div className="form-group">
                <label className="form-label" htmlFor="sn-author-input">
                  Your Name
                </label>
                <input
                  type="text"
                  id="sn-author-input"
                  className="form-input"
                  placeholder="e.g. Aarav Sharma"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="sn-sem-input">
                  Semester / Branch
                </label>
                <input
                  type="text"
                  id="sn-sem-input"
                  className="form-input"
                  placeholder="e.g. 3rd Sem CSE"
                  value={sem}
                  onChange={(e) => setSem(e.target.value)}
                />
              </div>
            </div>

            <div className="sn-checkbox-option">
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  id="sn-pin-checkbox"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                />
                <span>📌 Pin this note prominently at the top of the corkboard</span>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editNote ? '💾 Save Note Changes' : '📌 Pin Note to Board'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
