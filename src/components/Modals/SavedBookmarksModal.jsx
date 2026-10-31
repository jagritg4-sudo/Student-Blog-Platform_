import React, { useEffect } from 'react';

export default function SavedBookmarksModal({
  isOpen,
  onClose,
  bookmarkedPosts,
  onReadPost,
  onRemoveBookmark
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="bookmarks-modal"
      className="modal-overlay active"
      role="dialog"
      aria-labelledby="bm-modal-title"
      onClick={(e) => {
        if (e.target.id === 'bookmarks-modal') onClose();
      }}
    >
      <div className="modal-card">
        <span className="modal-pin">📌</span>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-eyebrow">Your Personal Desk</span>
            <h2 className="modal-title" id="bm-modal-title">
              Saved Student Notes
            </h2>
          </div>
          <button
            id="bookmarks-modal-close"
            className="modal-close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {bookmarkedPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <span style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}>
                📌
              </span>
              <p style={{ color: 'var(--ink-soft)', margin: 0, fontSize: '14px' }}>
                No saved notes yet. Bookmark interesting study tips or articles while browsing the feed!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {bookmarkedPosts.map((post) => (
                <div
                  key={post.id}
                  className="comment-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--sage-dark)',
                        fontWeight: 700
                      }}
                    >
                      {post.category}
                    </span>
                    <h4
                      style={{
                        margin: '4px 0 2px',
                        fontSize: '14.5px',
                        fontFamily: 'var(--font-display)',
                        color: 'var(--ink)'
                      }}
                    >
                      {post.title}
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--ink-faint)' }}>
                      {post.author} · {post.readTime}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      className="btn btn-outline btn-sm"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => {
                        onClose();
                        onReadPost(post.id);
                      }}
                    >
                      Read
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '6px 8px', fontSize: '12px' }}
                      title="Remove Bookmark"
                      onClick={() => onRemoveBookmark(post.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
