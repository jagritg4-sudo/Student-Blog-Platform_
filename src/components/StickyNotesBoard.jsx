import React, { useState, useMemo } from 'react';

export default function StickyNotesBoard({
  stickyNotes,
  onToggleTask,
  onTogglePin,
  onChangeColor,
  onEditNote,
  onDeleteNote,
  onOpenCreateModal,
  onResetNotes,
  currentUser
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortOption, setSortOption] = useState('pinned');

  // Compute Metrics
  const metrics = useMemo(() => {
    const total = stickyNotes.length;
    const pinned = stickyNotes.filter(n => n.pinned).length;
    const urgent = stickyNotes.filter(n => n.priority === 'urgent').length;
    let totalTasks = 0;
    let completedTasks = 0;

    stickyNotes.forEach(n => {
      (n.tasks || []).forEach(t => {
        totalTasks++;
        if (t.done) completedTasks++;
      });
    });

    return { total, pinned, urgent, totalTasks, completedTasks };
  }, [stickyNotes]);

  // Filtered and Sorted Notes
  const filteredNotes = useMemo(() => {
    return stickyNotes
      .filter(note => {
        // Category
        const matchesCategory =
          selectedCategory === 'All' ||
          note.category?.toLowerCase() === selectedCategory.toLowerCase();

        // Color
        const matchesColor =
          selectedColor === 'all' || note.color === selectedColor;

        // Search
        let matchesSearch = true;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const inTitle = note.title?.toLowerCase().includes(q);
          const inContent = note.content?.toLowerCase().includes(q);
          const inAuthor = note.author?.toLowerCase().includes(q);
          const inCategory = note.category?.toLowerCase().includes(q);
          const inTasks = (note.tasks || []).some(t => t.text?.toLowerCase().includes(q));
          matchesSearch = inTitle || inContent || inAuthor || inCategory || inTasks;
        }

        return matchesCategory && matchesColor && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOption === 'pinned') {
          if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
        } else if (sortOption === 'urgent') {
          const priorityScore = { urgent: 3, priority: 2, normal: 1 };
          const scoreA = priorityScore[a.priority] || 1;
          const scoreB = priorityScore[b.priority] || 1;
          if (scoreA !== scoreB) return scoreB - scoreA;
        } else if (sortOption === 'tasks') {
          const remainingA = (a.tasks || []).filter(t => !t.done).length;
          const remainingB = (b.tasks || []).filter(t => !t.done).length;
          return remainingB - remainingA;
        }
        return 0; // Default order
      });
  }, [stickyNotes, searchQuery, selectedCategory, selectedColor, sortOption]);

  const categories = [
    { key: 'All', label: 'All Notes' },
    { key: 'Exam Prep', label: '📝 Exam Prep' },
    { key: 'Project Tasks', label: '🚀 Project Tasks' },
    { key: 'Study Groups', label: '☕ Study Groups' },
    { key: 'Campus Ideas', label: '💡 Campus Ideas' },
    { key: 'Announcements', label: '📢 Notices' }
  ];

  const colors = [
    { key: 'all', label: 'All', bg: 'transparent' },
    { key: 'yellow', label: 'Yellow', bg: '#FEF08A' },
    { key: 'green', label: 'Green', bg: '#BBF7D0' },
    { key: 'blue', label: 'Blue', bg: '#BAE6FD' },
    { key: 'pink', label: 'Pink', bg: '#FBCFE8' },
    { key: 'purple', label: 'Purple', bg: '#E9D5FF' },
    { key: 'orange', label: 'Orange', bg: '#FED7AA' }
  ];

  return (
    <section className="section pinboard-section" id="pinboard">
      <div className="pinboard-header-wrap">
        <div className="pinboard-head-left">
          <div className="pinboard-badge">
            <span className="pulse-dot"></span>
            <span>Live Interactive Corkboard</span>
          </div>
          <h2 className="section-title">📌 Sticky Notes Dashboard</h2>
          <p className="section-sub">
            Pin study memos, group tasks, code snippets & campus reminders in real time with interactive checklists
          </p>
        </div>

        <div className="pinboard-head-actions">
          <button
            id="add-sticky-btn"
            className="btn btn-primary pb-action-btn"
            onClick={onOpenCreateModal}
          >
            <span className="pb-btn-icon">➕</span>
            <span>Pin New Sticky Note</span>
          </button>
          <button
            id="reset-sticky-btn"
            className="btn btn-outline btn-sm"
            title="Restore sample campus notes"
            onClick={onResetNotes}
          >
            <span>🔄</span> <span>Reset Notes</span>
          </button>
        </div>
      </div>

      {/* Quick Metrics Strip */}
      <div className="pinboard-metrics-strip">
        <div className="pb-metric-card">
          <div
            className="pb-metric-icon-wrap"
            style={{ background: 'rgba(227, 162, 60, 0.15)', color: 'var(--marigold-dark)' }}
          >
            📌
          </div>
          <div className="pb-metric-info">
            <span className="pb-metric-num">{metrics.total}</span>
            <span className="pb-metric-label">Total Notes</span>
          </div>
        </div>

        <div className="pb-metric-card">
          <div
            className="pb-metric-icon-wrap"
            style={{ background: 'rgba(196, 87, 59, 0.15)', color: 'var(--rust)' }}
          >
            ⭐
          </div>
          <div className="pb-metric-info">
            <span className="pb-metric-num">{metrics.pinned}</span>
            <span className="pb-metric-label">Pinned on Board</span>
          </div>
        </div>

        <div className="pb-metric-card">
          <div
            className="pb-metric-icon-wrap"
            style={{ background: 'rgba(110, 143, 115, 0.15)', color: 'var(--sage-dark)' }}
          >
            ✅
          </div>
          <div className="pb-metric-info">
            <span className="pb-metric-num">
              {metrics.completedTasks}/{metrics.totalTasks}
            </span>
            <span className="pb-metric-label">Tasks Completed</span>
          </div>
        </div>

        <div className="pb-metric-card">
          <div
            className="pb-metric-icon-wrap"
            style={{ background: 'rgba(138, 111, 176, 0.15)', color: '#8A6FB0' }}
          >
            🔥
          </div>
          <div className="pb-metric-info">
            <span className="pb-metric-num">{metrics.urgent}</span>
            <span className="pb-metric-label">Urgent Deadlines</span>
          </div>
        </div>
      </div>

      {/* Pinboard Toolbar */}
      <div className="pinboard-toolbar">
        <div className="pb-search-row">
          <div className="pb-search-wrap">
            <span className="pb-search-icon">🔍</span>
            <input
              type="text"
              id="sticky-search-input"
              className="pb-search-input"
              placeholder="Search sticky notes, tasks, or authors (e.g. DSA, Hackathon, Priya)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            {searchQuery && (
              <button
                id="sticky-search-clear"
                className="pb-search-clear visible"
                aria-label="Clear search"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="pb-sort-wrap">
            <label htmlFor="sticky-sort-select" className="pb-sort-label">
              Sort:
            </label>
            <select
              id="sticky-sort-select"
              className="pb-sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              aria-label="Sort sticky notes"
            >
              <option value="pinned">📌 Pinned First</option>
              <option value="newest">🕒 Newest Created</option>
              <option value="urgent">🔥 Urgent Priority</option>
              <option value="tasks">📋 Most Tasks</option>
            </select>
          </div>
        </div>

        <div className="pb-filters-row">
          {/* Category Chips */}
          <div className="pb-chips-wrap">
            <span className="pb-filter-label">Categories:</span>
            <div className="pb-chip-group">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`pb-chip ${selectedCategory === cat.key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter Dots */}
          <div className="pb-colors-wrap">
            <span className="pb-filter-label">Color:</span>
            <div className="pb-color-dots">
              {colors.map((c) => (
                <button
                  key={c.key}
                  className={`pb-color-dot ${selectedColor === c.key ? 'active' : ''} c-${c.key}`}
                  style={{ background: c.bg }}
                  title={`${c.label} Notes`}
                  onClick={() => setSelectedColor(c.key)}
                >
                  {c.key === 'all' ? 'All' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Real Corkboard Canvas Frame */}
      <div className="pinboard-canvas-frame">
        <div className="corkboard-wood-border">
          <div className="corkboard-surface" id="sticky-notes-container">
            {filteredNotes.length === 0 ? (
              <div className="sn-empty-board">
                <span className="sn-empty-icon">📌</span>
                <h3 className="sn-empty-title">No Sticky Notes Match Filter</h3>
                <p className="sn-empty-desc">
                  No campus notes found for "{searchQuery || selectedCategory}". Try resetting your filters or pin a new note!
                </p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ background: '#fff', color: 'var(--ink)', marginTop: '6px' }}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedColor('all');
                  }}
                >
                  Reset Pinboard Filters
                </button>
              </div>
            ) : (
              filteredNotes.map((note) => {
                const isOwner =
                  currentUser &&
                  ((note.userId && note.userId === (currentUser.id || currentUser.roll)) ||
                    (note.author &&
                      note.author.toLowerCase() === currentUser.name?.toLowerCase()));

                const tasks = note.tasks || [];
                const doneTasks = tasks.filter((t) => t.done).length;
                const totalTasks = tasks.length;
                const progressPercent =
                  totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

                const priorityLabel =
                  note.priority === 'urgent'
                    ? '🔥 Urgent'
                    : note.priority === 'priority'
                    ? '⭐ Priority'
                    : '📌 Normal';

                return (
                  <div
                    key={note.id}
                    className={`sticky-note color-${note.color} ${note.pinned ? 'is-starred' : ''}`}
                    data-id={note.id}
                  >
                    <div className="sn-pin-wrap">
                      <span
                        className={`sn-thumbtack ${note.pinned ? 'is-pinned' : ''}`}
                        title={note.pinned ? 'Pinned note' : 'Note'}
                      >
                        📌
                      </span>
                    </div>

                    <div className="sn-header">
                      <span className="sn-cat-badge">{note.category}</span>
                      <span className={`sn-priority-pill priority-${note.priority}`}>
                        {priorityLabel}
                      </span>
                      <button
                        type="button"
                        className={`sn-action-pin ${note.pinned ? 'active' : ''}`}
                        title={note.pinned ? 'Unpin from top' : 'Pin to top of corkboard'}
                        onClick={() => onTogglePin(note.id)}
                      >
                        {note.pinned ? '⭐' : '📌'}
                      </button>
                    </div>

                    <h3 className="sn-title">{note.title}</h3>
                    <p className="sn-content">{note.content}</p>

                    {/* Interactive To-Do Checklist */}
                    {totalTasks > 0 && (
                      <div className="sn-checklist">
                        <div className="sn-checklist-head">
                          <span>To-Do Checklist</span>
                          <span>
                            {doneTasks}/{totalTasks} ({progressPercent}%)
                          </span>
                        </div>
                        <div className="sn-progress-bar">
                          <div
                            className="sn-progress-fill"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                        <ul className="sn-task-list">
                          {tasks.map((task, tIndex) => (
                            <li
                              key={tIndex}
                              className={`sn-task-item ${task.done ? 'done' : ''}`}
                              onClick={() => onToggleTask(note.id, tIndex)}
                            >
                              <input
                                type="checkbox"
                                checked={task.done}
                                onChange={() => {}}
                                aria-label={task.text}
                              />
                              <span>{task.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="sn-footer">
                      <div className="sn-meta">
                        <span className="sn-author">
                          👤 {note.author}
                          {isOwner ? ' (You)' : ''}
                        </span>
                        <span className="sn-time">
                          {note.sem ? `${note.sem} · ` : ''}
                          {note.date}
                        </span>
                      </div>

                      <div className="sn-footer-actions">
                        {/* Quick Color Switcher */}
                        <div className="sn-color-dots" title="Change note color">
                          {['yellow', 'green', 'blue', 'pink', 'purple', 'orange'].map((c) => (
                            <span
                              key={c}
                              className={`sn-color-btn c-${c}`}
                              title={c}
                              onClick={() => onChangeColor(note.id, c)}
                            ></span>
                          ))}
                        </div>

                        {/* Edit Button */}
                        <button
                          type="button"
                          className="sn-edit-btn"
                          title="Edit this note"
                          aria-label="Edit note"
                          onClick={() => onEditNote(note)}
                        >
                          ✏️
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          className="sn-delete-btn"
                          title="Delete this note"
                          aria-label="Delete note"
                          onClick={() => onDeleteNote(note.id, note.title)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
