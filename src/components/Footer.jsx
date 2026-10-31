import React from 'react';

export default function Footer({ onNavigate, onSelectCategory }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="brand footer-brand">
            <span className="brand-pin">📌</span>
            <span className="brand-text">CampusConnect</span>
          </div>
          <p>
            Made for College Students — a place to pin your ideas up where classmates can find them.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
          >
            Home
          </a>
          <a
            href="#trending"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('trending');
            }}
          >
            Trending
          </a>
          <a
            href="#latest"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('latest');
            }}
          >
            Latest Posts
          </a>
          <a
            href="#categories"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('categories');
            }}
          >
            Categories
          </a>
        </div>

        <div className="footer-col">
          <h4>Categories</h4>
          {['Technology', 'Programming', 'Career', 'Study Tips'].map((cat) => (
            <a
              key={cat}
              href="#categories"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory(cat);
              }}
            >
              {cat}
            </a>
          ))}
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>hello@campusconnect.edu</p>
          <div className="social-row">
            <span className="social-icon" title="Instagram">📷</span>
            <span className="social-icon" title="Twitter">🐦</span>
            <span className="social-icon" title="LinkedIn">💼</span>
            <span className="social-icon" title="GitHub">💻</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 CampusConnect. Made for College Students (FEE 3rd Sem Coursework).</span>
      </div>
    </footer>
  );
}
