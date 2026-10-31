import React, { useEffect, useRef } from 'react';

export default function ProfileDropdown({
  isOpen,
  onClose,
  currentUser,
  userStickyCount,
  userBlogCount,
  bookmarkCount,
  onNavigate,
  onOpenStickyModal,
  onOpenCreatePost,
  onOpenBookmarks,
  onToggleTheme,
  onPromptSignOut
}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest('.nav-user-badge-btn')
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !currentUser) return null;

  return (
    <div
      ref={dropdownRef}
      id="profile-dropdown-menu"
      className="profile-dropdown-card"
      style={{
        display: 'block',
        position: 'absolute',
        top: '64px',
        right: '24px',
        zIndex: 1000
      }}
      role="menu"
    >
      <div className="pd-header">
        <div className="pd-avatar-wrap">
          <span className="pd-avatar">{currentUser.initials || 'ST'}</span>
          <span className="pd-online-dot" title="Active on Campus"></span>
        </div>
        <div className="pd-user-info">
          <h4 className="pd-name">{currentUser.name}</h4>
          <span className="pd-roll">
            {currentUser.roll || ''} · {currentUser.branch || '3rd Sem'}
          </span>
          <span className="pd-badge">🎓 Verified Student</span>
        </div>
      </div>

      <div className="pd-stats-row">
        <div className="pd-stat">
          <span className="pd-stat-num">{userStickyCount}</span>
          <span className="pd-stat-label">Sticky Notes</span>
        </div>
        <div className="pd-stat">
          <span className="pd-stat-num">{userBlogCount}</span>
          <span className="pd-stat-label">Blog Posts</span>
        </div>
        <div className="pd-stat">
          <span className="pd-stat-num">{bookmarkCount}</span>
          <span className="pd-stat-label">Bookmarks</span>
        </div>
      </div>

      <div className="pd-menu-links">
        <button
          type="button"
          className="pd-menu-item"
          onClick={() => {
            onClose();
            onNavigate('pinboard');
          }}
        >
          <span className="pd-item-icon">📌</span>
          <span>My Sticky Notes on Board</span>
        </button>

        <button
          type="button"
          className="pd-menu-item"
          onClick={() => {
            onClose();
            onOpenStickyModal();
          }}
        >
          <span className="pd-item-icon">➕</span>
          <span>Pin New Sticky Note</span>
        </button>

        <button
          type="button"
          className="pd-menu-item"
          onClick={() => {
            onClose();
            onOpenCreatePost();
          }}
        >
          <span className="pd-item-icon">✏️</span>
          <span>Publish a Blog Post</span>
        </button>

        <button
          type="button"
          className="pd-menu-item"
          onClick={() => {
            onClose();
            onOpenBookmarks();
          }}
        >
          <span className="pd-item-icon">⭐</span>
          <span>Saved Desk Bookmarks</span>
        </button>

        <button
          type="button"
          className="pd-menu-item"
          onClick={() => {
            onToggleTheme();
          }}
        >
          <span className="pd-item-icon">🌙</span>
          <span>Toggle Theme</span>
        </button>
      </div>

      <div className="pd-footer">
        <button
          type="button"
          className="btn btn-outline btn-sm pd-signout-btn"
          onClick={() => {
            onClose();
            onPromptSignOut();
          }}
        >
          <span>🚪</span> <span>Sign Out Profile</span>
        </button>
      </div>
    </div>
  );
}
