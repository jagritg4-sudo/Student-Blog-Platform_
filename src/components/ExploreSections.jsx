import React from 'react';
import { CATEGORIES_LIST, TOP_AUTHORS } from '../data/initialData';

export function PopularCategories({ onSelectCategory }) {
  return (
    <section className="section" id="categories">
      <div className="section-head">
        <h2 className="section-title">🗂 Popular Categories</h2>
        <span className="section-sub">Browse by topic</span>
      </div>
      <div className="category-chip-row">
        {CATEGORIES_LIST.map((cat) => (
          <button
            key={cat.name}
            className="cat-chip-btn"
            onClick={() => onSelectCategory(cat.name)}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
            <span className="cat-chip-count">{cat.count}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function TopAuthors({ onAuthorClick }) {
  return (
    <section className="section alt-bg" id="authors">
      <div className="section-head">
        <h2 className="section-title">🏆 Top Student Authors</h2>
        <span className="section-sub">Most active writers this term</span>
      </div>
      <div className="author-row">
        {TOP_AUTHORS.map((author) => (
          <div
            key={author.name}
            className="author-card"
            style={{ cursor: 'pointer' }}
            onClick={() => onAuthorClick && onAuthorClick(author.name)}
          >
            <div className="author-avatar-lg">{author.avatar}</div>
            <div className="author-name">{author.name}</div>
            <div className="author-count">{author.stats}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
