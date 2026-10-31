import React, { useState } from 'react';

export default function Navbar({
  activeSection,
  onNavigate,
  theme,
  onToggleTheme,
  bookmarkCount,
  onOpenBookmarks,
  currentUser,
  onOpenLogin,
  onOpenCreatePost,
  isProfileDropdownOpen,
  onToggleProfileDropdown
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'pinboard', label: '📌 Sticky Pinboard', icon: '📌' },
    { id: 'trending', label: 'Trending', icon: '🔥' },
    { id: 'latest', label: 'Latest Posts', icon: '🆕' },
    { id: 'categories', label: 'Categories', icon: '🗂' },
    { id: 'authors', label: 'Top Authors', icon: '🏆' }
  ];

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <a
            href="#home"
            className="brand"
            onClick={(e) => handleNavClick('home', e)}
          >
            <span className="brand-pin" aria-hidden="true">📌</span>
            <span className="brand-text">CampusConnect</span>
          </a>

          <nav className="nav-links" id="main-nav-tabs">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(item.id, e)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="navbar-actions">
            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              className="nav-icon-btn"
              aria-label="Toggle Dark/Light Mode"
              title={theme === 'dark' ? 'Switch to Classic Paper Mode' : 'Switch to Midnight Corkboard'}
              onClick={onToggleTheme}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Saved Bookmarks */}
            <button
              id="bookmarks-nav-btn"
              className="nav-icon-btn"
              aria-label="View Saved Notes"
              title="Saved Notes"
              onClick={onOpenBookmarks}
            >
              📌
              {bookmarkCount > 0 && (
                <span id="bookmark-badge-count" className="nav-badge">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* User Profile Badge or Log In Button */}
            {currentUser ? (
              <div
                id="user-nav-container"
                style={{ position: 'relative', display: 'inline-block' }}
              >
                <button
                  type="button"
                  className="btn btn-outline nav-user-badge-btn"
                  onClick={onToggleProfileDropdown}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    borderColor: 'var(--marigold)'
                  }}
                >
                  <span
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'var(--marigold)',
                      color: '#fff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700
                    }}
                  >
                    {currentUser.initials || 'ST'}
                  </span>
                  <span>{currentUser.name?.split(' ')[0] || 'Student'}</span>
                  <span style={{ fontSize: '10px' }}>▼</span>
                </button>
              </div>
            ) : (
              <button
                id="login-btn"
                className="btn btn-ghost nav-action-login"
                onClick={onOpenLogin}
              >
                Log In
              </button>
            )}

            {/* Start Writing Blog CTA */}
            <button
              id="write-btn"
              className="btn btn-primary nav-action-write"
              onClick={onOpenCreatePost}
            >
              Start Writing
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="hamburger-btn"
              className={`hamburger-btn ${mobileMenuOpen ? 'is-active' : ''}`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-nav"
          className={`mobile-nav ${mobileMenuOpen ? 'is-open' : ''}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="mobile-nav-inner">
            <nav className="mobile-nav-links" id="mobile-nav-tabs">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                >
                  <span className="mn-icon">{item.icon}</span>
                  <span>{item.label.replace('📌 ', '')}</span>
                </a>
              ))}
            </nav>
            <div className="mobile-nav-divider"></div>
            <div className="mobile-nav-actions">
              {currentUser ? (
                <button
                  className="btn btn-outline mobile-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onToggleProfileDropdown();
                  }}
                >
                  👤 {currentUser.name} (Profile)
                </button>
              ) : (
                <button
                  id="mobile-login-btn"
                  className="btn btn-outline mobile-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                >
                  Log In
                </button>
              )}
              <button
                id="mobile-write-btn"
                className="btn btn-primary mobile-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCreatePost();
                }}
              >
                Start Writing ✏️
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-nav-overlay"
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'is-active' : ''}`}
        aria-hidden={!mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </>
  );
}
