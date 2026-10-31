import React, { useState, useEffect } from 'react';

export default function ArticleReaderModal({
  post,
  isOpen,
  onClose,
  isLiked,
  isBookmarked,
  onToggleLike,
  onToggleBookmark,
  onAddComment,
  currentUser
}) {
  const [activeTab, setActiveTab] = useState('read'); // 'read' | 'comments'
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  const comments = post.comments || [];
  const currentLikes = post.likes + (isLiked ? 1 : 0);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const authorName = currentUser?.name || 'Classmate';
    onAddComment(post.id, {
      id: 'c-' + Date.now(),
      author: authorName,
      text: newCommentText.trim(),
      time: 'Just now'
    });

    setNewCommentText('');
  };

  return (
    <div
      id="article-modal"
      className="modal-overlay active"
      role="dialog"
      aria-labelledby="reader-title"
      onClick={(e) => {
        if (e.target.id === 'article-modal') onClose();
      }}
    >
      <div className="modal-card">
        <span className="modal-pin">📌</span>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-eyebrow" id="reader-cat-tag">
              {post.category}
            </span>
            <h2 className="modal-title" id="reader-title">
              {post.title}
            </h2>
          </div>
          <button
            id="article-modal-close"
            className="modal-close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="modal-tabs" style={{ margin: '12px 24px 0' }}>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'read' ? 'active' : ''}`}
            onClick={() => setActiveTab('read')}
          >
            📖 Read Note
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            💬 Discussion{' '}
            <span style={{ fontSize: '11px', opacity: 0.8 }}>
              ({comments.length})
            </span>
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'read' ? (
            <div id="reader-article-view">
              <div
                id="reader-cover"
                className="reader-cover"
                style={{
                  backgroundImage:
                    post.gradient || 'linear-gradient(135deg, #E3A23C, #C4573B)'
                }}
              >
                <span className="post-thumbtack">📌</span>
              </div>

              <div
                className="post-meta-row"
                style={{ fontSize: '13.5px', margin: '12px 0' }}
              >
                <span className="post-avatar">{post.avatar || 'ST'}</span>
                <strong style={{ color: 'var(--ink)' }}>{post.author}</strong>
                <span className="dot-sep"></span>
                <span>{post.date}</span>
                <span className="dot-sep"></span>
                <span>{post.readTime}</span>
              </div>

              <div className="reader-article-content" id="reader-content">
                {post.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} style={{ lineHeight: '1.65', margin: '0 0 14px' }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="reader-actions" style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button
                    type="button"
                    className={`like-btn ${isLiked ? 'liked' : ''}`}
                    aria-label="Like post"
                    onClick={() => onToggleLike(post.id)}
                  >
                    <span className="heart-icon">❤</span>{' '}
                    <span className="like-num">{currentLikes}</span> Likes
                  </button>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--ink-faint)'
                    }}
                  >
                    Classmate feedback
                  </span>
                </div>

                <button
                  type="button"
                  className={`bookmark-toggle ${isBookmarked ? 'active' : ''}`}
                  title={isBookmarked ? 'Saved Note' : 'Save Note'}
                  aria-label="Bookmark"
                  onClick={() => onToggleBookmark(post.id)}
                  style={{
                    color: isBookmarked ? 'var(--marigold-dark)' : 'var(--ink-soft)'
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill={isBookmarked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div id="reader-comments-view" className="comments-section">
              <h3 className="comments-title">
                Campus Discussion{' '}
                <span
                  style={{
                    fontSize: '13.5px',
                    color: 'var(--ink-faint)',
                    fontWeight: 'normal'
                  }}
                >
                  ({comments.length})
                </span>
              </h3>

              <div
                className="comments-list"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '16px',
                  maxHeight: '260px',
                  overflowY: 'auto'
                }}
              >
                {comments.length === 0 ? (
                  <p
                    style={{
                      color: 'var(--ink-faint)',
                      fontSize: '13px',
                      fontStyle: 'italic'
                    }}
                  >
                    No comments yet. Be the first classmate to pin your thought!
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="comment-card"
                      style={{
                        padding: '12px 14px',
                        background: 'var(--paper)',
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '4px'
                        }}
                      >
                        <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>
                          {comment.author}
                        </strong>
                        <span style={{ fontSize: '11px', color: 'var(--ink-faint)' }}>
                          {comment.time}
                        </span>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: '13.5px',
                          color: 'var(--ink-soft)',
                          lineHeight: 1.45
                        }}
                      >
                        {comment.text}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleCommentSubmit} className="add-comment-row">
                <input
                  type="text"
                  className="comment-input"
                  placeholder="Pin a thought, question, or comment..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  required
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  Pin Comment
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
