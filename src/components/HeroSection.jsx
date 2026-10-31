import React, { useState, useEffect } from 'react';

export default function HeroSection({ onNavigate, onOpenStickyModal, totalPostsCount }) {
  const [counts, setCounts] = useState({
    students: 0,
    blogs: 0,
    categories: 0,
    likes: 0
  });

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();

    const targetStudents = 120;
    const targetBlogs = 85 + (totalPostsCount - 6 > 0 ? totalPostsCount - 6 : 0);
    const targetCategories = 10;
    const targetLikes = 1400;

    let frameId;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out

      setCounts({
        students: Math.floor(targetStudents * ease),
        blogs: Math.floor(targetBlogs * ease),
        categories: Math.floor(targetCategories * ease),
        likes: (Math.floor(targetLikes * ease) / 1000).toFixed(1)
      });

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [totalPostsCount]);

  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">— the campus corkboard, digitized —</span>
          <h1 className="hero-title">
            Share Your Ideas.<br />Inspire Your Campus.
          </h1>
          <p className="hero-sub">
            CampusConnect is where students pin up what they're building, learning and living
            through — one index card at a time. Publish notes, projects and stories your classmates will actually
            read.
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onNavigate('pinboard')}
            >
              📌 Sticky Pinboard UI
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => onNavigate('filter-section')}
            >
              Explore Blog Notes
            </button>
            <button
              id="hero-sticky-btn"
              className="btn btn-outline btn-lg"
              style={{ borderStyle: 'dashed' }}
              onClick={onOpenStickyModal}
            >
              ✏️ Pin Sticky Note
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="corkboard">
            <div className="pin-card card-1">
              <span className="pin">📌</span>
              <div className="pc-tag">Projects</div>
              <div className="pc-line"></div>
              <div className="pc-line short"></div>
            </div>
            <div className="pin-card card-2">
              <span className="pin">📌</span>
              <div className="pc-tag">Study Tips</div>
              <div className="pc-line"></div>
              <div className="pc-line short"></div>
            </div>
            <div className="pin-card card-3">
              <span className="pin">📌</span>
              <div className="pc-tag">Events</div>
              <div className="pc-line"></div>
              <div className="pc-line short"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Strip with real animated numbers */}
      <div className="stats-strip">
        <div className="stat-item">
          <span className="stat-num">{counts.students}+</span>
          <span className="stat-label">Total Students</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{counts.blogs}+</span>
          <span className="stat-label">Published Blogs</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{counts.categories}</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">{counts.likes}k</span>
          <span className="stat-label">Total Likes</span>
        </div>
      </div>
    </section>
  );
}
