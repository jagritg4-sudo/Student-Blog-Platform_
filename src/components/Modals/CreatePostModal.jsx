import React, { useState, useEffect } from 'react';

const GRADIENT_PRESETS = [
  { id: 'amber', gradient: 'linear-gradient(135deg, #E3A23C, #C4573B)', name: 'Warm Amber' },
  { id: 'sage', gradient: 'linear-gradient(135deg, #6E8F73, #4A5567)', name: 'Forest Sage' },
  { id: 'violet', gradient: 'linear-gradient(135deg, #8A6FB0, #3C7EA3)', name: 'Indigo Violet' },
  { id: 'flame', gradient: 'linear-gradient(135deg, #C4573B, #E3A23C)', name: 'Rust Flame' },
  { id: 'ocean', gradient: 'linear-gradient(135deg, #3C7EA3, #6E8F73)', name: 'Ocean Sage' }
];

export default function CreatePostModal({ isOpen, onClose, onCreatePost, currentUser }) {
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' | 'preview'
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('📝 Study Tips');
  const [readTime, setReadTime] = useState('2 min read');
  const [author, setAuthor] = useState(currentUser?.name || 'Student Writer');
  const [gradient, setGradient] = useState(GRADIENT_PRESETS[0].gradient);
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (currentUser?.name) {
      setAuthor(currentUser.name);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim() || !content.trim()) return;

    const initials = author
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'ST';

    const newPost = {
      id: 'post-' + Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      content: content.trim(),
      category: category.replace(/^[^\w\s]+\s*/, ''), // clean emoji prefix if needed or leave
      author: author.trim(),
      avatar: initials,
      date: 'Today',
      readTime: readTime.trim() || '2 min read',
      likes: 0,
      commentsCount: 0,
      gradient: gradient,
      isTrending: false,
      comments: []
    };

    onCreatePost(newPost);
    // Reset fields
    setTitle('');
    setDesc('');
    setContent('');
    onClose();
  };

  return (
    <div
      id="create-post-modal"
      className="modal-overlay active"
      role="dialog"
      aria-labelledby="create-modal-title"
      onClick={(e) => {
        if (e.target.id === 'create-post-modal') onClose();
      }}
    >
      <div className="modal-card">
        <span className="modal-pin">📌</span>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-eyebrow">Campus Corkboard Note</span>
            <h2 className="modal-title" id="create-modal-title">
              Pin a New Blog Post
            </h2>
          </div>
          <button
            id="create-modal-close"
            className="modal-close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Create Modal Tabs: Edit vs Live Preview */}
        <div className="modal-tabs" style={{ margin: '12px 24px 0' }}>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            ✏️ Edit Note
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            👁️ Live Corkboard Preview
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {activeTab === 'edit' ? (
              <div id="create-fields-wrap">
                <div className="form-group">
                  <label className="form-label" htmlFor="post-title-input">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    id="post-title-input"
                    className="form-input"
                    placeholder="e.g. 5 Habits That Helped Me Ace Data Structures"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={100}
                  />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px'
                  }}
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="post-category-select">
                      Topic Category
                    </label>
                    <select
                      id="post-category-select"
                      className="form-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="📝 Study Tips">📝 Study Tips</option>
                      <option value="💻 Technology">💻 Technology</option>
                      <option value="🖥️ Programming">🖥️ Programming</option>
                      <option value="🛠️ Projects">🛠️ Projects</option>
                      <option value="💼 Career">💼 Career</option>
                      <option value="🎉 Events">🎉 Events</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="post-readtime-input">
                      Read Time
                    </label>
                    <input
                      type="text"
                      id="post-readtime-input"
                      className="form-input"
                      placeholder="e.g. 3 min read"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="post-author-input">
                    Author Name / Roll No
                  </label>
                  <input
                    type="text"
                    id="post-author-input"
                    className="form-input"
                    placeholder="Your name or Student ID"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Note Header Gradient</label>
                  <div className="color-picker-row">
                    {GRADIENT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        className={`color-option-btn ${gradient === preset.gradient ? 'selected' : ''}`}
                        style={{ background: preset.gradient }}
                        title={preset.name}
                        onClick={() => setGradient(preset.gradient)}
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="post-desc-input">
                    Short Summary / Hook *{' '}
                    <small>(displays on index card)</small>
                  </label>
                  <input
                    type="text"
                    id="post-desc-input"
                    className="form-input"
                    placeholder="One or two sentences to catch classmates' attention..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    maxLength={160}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="post-content-input">
                    Full Note Content *{' '}
                    <small>(paragraphs separated by line breaks)</small>
                  </label>
                  <textarea
                    id="post-content-input"
                    className="form-textarea"
                    placeholder="Write out your notes, experiences, study advice, or project learnings here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={5}
                  ></textarea>
                </div>
              </div>
            ) : (
              <div id="create-preview-wrap" className="preview-container">
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--ink-faint)'
                    }}
                  >
                    — Live Card Preview on Corkboard —
                  </span>
                </div>

                <article
                  className="post-card"
                  style={{ maxWidth: '380px', margin: '0 auto', boxShadow: 'var(--shadow-pop)' }}
                >
                  <div
                    className="post-cover"
                    style={{ backgroundImage: gradient }}
                  >
                    <span className="post-thumbtack">📌</span>
                    <span className="post-cat-tag">{category}</span>
                  </div>
                  <div className="post-body">
                    <h3 className="post-title">
                      {title.trim() || 'Untitled Student Note'}
                    </h3>
                    <p className="post-desc">
                      {desc.trim() || 'Your short summary hook will show here...'}
                    </p>
                    <div className="post-meta-row">
                      <span className="post-avatar">
                        {author.substring(0, 2).toUpperCase() || 'ST'}
                      </span>
                      <span>{author || 'Student Writer'}</span>
                      <span className="dot-sep"></span>
                      <span>Today</span>
                      <span className="dot-sep"></span>
                      <span>{readTime}</span>
                    </div>
                    <div className="post-divider"></div>
                    <div className="post-foot">
                      <div className="post-stats">
                        <span style={{ fontSize: '12px', color: 'var(--ink-faint)' }}>
                          ❤ 0 likes · 💬 0
                        </span>
                      </div>
                      <span className="readmore-btn">Read More →</span>
                    </div>
                  </div>
                </article>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              📌 Pin to Corkboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
