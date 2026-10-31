import React, { useState, useMemo, useCallback } from 'react';

const DEFAULT_POST_IDS = ['post-1', 'post-2', 'post-3', 'post-4', 'post-5', 'post-6'];

function PostCard({
  post,
  isLiked,
  isBookmarked,
  onToggleLike,
  onToggleBookmark,
  onOpenArticle
}) {
  const commentsCount = post.comments?.length || post.commentsCount || 0;

  return (
    <article className="post-card" data-id={post.id}>
      <div
        className="post-cover"
        style={{
          backgroundImage:
            post.gradient || 'linear-gradient(135deg, #E3A23C, #C4573B)'
        }}
      >
        <span className="post-thumbtack">📌</span>
        <span className="post-cat-tag">{post.category}</span>
      </div>

      <div className="post-body">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-desc">{post.desc}</p>

        <div className="post-meta-row">
          <span className="post-avatar">{post.avatar || 'ST'}</span>
          <span>{post.author}</span>
          <span className="dot-sep"></span>
          <span>{post.date}</span>
          <span className="dot-sep"></span>
          <span>{post.readTime}</span>
        </div>

        <div className="post-divider"></div>

        <div className="post-foot">
          <div className="post-stats">
            <button
              type="button"
              className={`like-btn ${isLiked ? 'liked' : ''}`}
              aria-label="Like post"
              onClick={() => onToggleLike(post.id)}
            >
              <span className="heart-icon">❤</span>{' '}
              <span className="like-num">
                {post.likes + (isLiked ? 1 : 0)}
              </span>
            </button>
            <span>💬 {commentsCount}</span>
          </div>

          <div className="card-btn-row">
            <button
              type="button"
              className={`bookmark-toggle ${isBookmarked ? 'active' : ''}`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Post'}
              aria-label="Bookmark"
              onClick={() => onToggleBookmark(post.id)}
              style={{
                color: isBookmarked ? 'var(--marigold-dark)' : 'var(--ink-soft)'
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={isBookmarked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button
              type="button"
              className="readmore-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => onOpenArticle(post.id)}
            >
              Read More →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BlogFeed({
  posts,
  likedPostIds,
  bookmarkedPostIds,
  onToggleLike,
  onToggleBookmark,
  onOpenArticle,
  activeFeedTab,
  onTabChange,
  activeTopic,
  onTopicChange,
  onOpenCreatePost
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');

  const topics = [
    'All',
    'Study Tips',
    'Technology',
    'Programming',
    'Projects',
    'Career',
    'Events'
  ];

  const isCustomPost = useCallback((p) => {
    return !DEFAULT_POST_IDS.includes(p.id);
  }, []);

  const isTrendingPost = useCallback((p) => {
    return Boolean(p.isTrending || p.likes >= 40);
  }, []);

  const isLatestPost = useCallback((p) => {
    return isCustomPost(p) || !p.isTrending;
  }, [isCustomPost]);

  // Tab counts
  const tabCounts = useMemo(() => {
    const customCount = posts.filter(isCustomPost).length;
    return {
      all: posts.length,
      trending: posts.filter(isTrendingPost).length,
      latest: 3 + customCount,
      bookmarked: bookmarkedPostIds.length
    };
  }, [posts, isCustomPost, isTrendingPost, bookmarkedPostIds]);

  // Topic and search filter
  const matchesFilter = useCallback((post) => {
    if (activeTopic !== 'All' && !post.category?.toLowerCase().includes(activeTopic.toLowerCase())) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inTitle = post.title?.toLowerCase().includes(q);
      const inDesc = post.desc?.toLowerCase().includes(q);
      const inAuthor = post.author?.toLowerCase().includes(q);
      const inCat = post.category?.toLowerCase().includes(q);
      return Boolean(inTitle || inDesc || inAuthor || inCat);
    }

    return true;
  }, [activeTopic, searchQuery]);

  // Sorting
  const sortPosts = useCallback((items) => {
    return [...items].sort((a, b) => {
      if (sortBy === 'trending') return b.likes - a.likes;
      if (sortBy === 'recent') {
        const aTime = a.id?.startsWith('post-') ? Number(a.id.replace('post-', '')) : 0;
        const bTime = b.id?.startsWith('post-') ? Number(b.id.replace('post-', '')) : 0;
        if (aTime && bTime && !isNaN(aTime) && !isNaN(bTime)) return bTime - aTime;
        return b.id.localeCompare(a.id);
      }
      if (sortBy === 'comments') {
        return (b.comments?.length || b.commentsCount || 0) - (a.comments?.length || a.commentsCount || 0);
      }
      return 0;
    });
  }, [sortBy]);

  // Trending posts list (matching topic & search)
  const trendingList = useMemo(() => {
    return sortPosts(posts.filter((p) => isTrendingPost(p) && matchesFilter(p)));
  }, [posts, isTrendingPost, matchesFilter, sortPosts]);

  // Latest posts list for "All Notes" view
  const latestList = useMemo(() => {
    return sortPosts(posts.filter((p) => isLatestPost(p) && matchesFilter(p)));
  }, [posts, isLatestPost, matchesFilter, sortPosts]);

  // Latest posts list for "Latest Posts" tab view
  // Ensures that if a user filters by a category (e.g. Study Tips), it shows matching posts even if they were trending, so it never shows an empty list!
  const latestPostsTab = useMemo(() => {
    const matching = posts.filter(matchesFilter);
    const specificLatest = matching.filter(isLatestPost);
    const result = specificLatest.length > 0 ? specificLatest : matching;
    return sortPosts(result);
  }, [posts, matchesFilter, isLatestPost, sortPosts]);

  // Bookmarked posts list
  const bookmarkedList = useMemo(() => {
    return sortPosts(posts.filter((p) => bookmarkedPostIds.includes(p.id) && matchesFilter(p)));
  }, [posts, bookmarkedPostIds, matchesFilter, sortPosts]);

  return (
    <>
      {/* Live Search & Filter Toolbar */}
      <section className="filter-toolbar-section" id="filter-section">
        <div className="filter-toolbar">
          {/* Feed Filter Tabs */}
          <div className="feed-tabs-row" role="tablist" aria-label="Feed filter tabs">
            <span className="filter-tag-label">Feed Tabs:</span>
            <button
              className={`feed-tab-btn ${activeFeedTab === 'all' ? 'active' : ''}`}
              onClick={() => onTabChange('all')}
              role="tab"
              aria-selected={activeFeedTab === 'all'}
            >
              📌 All Notes (<span>{tabCounts.all}</span>)
            </button>
            <button
              className={`feed-tab-btn ${activeFeedTab === 'trending' ? 'active' : ''}`}
              onClick={() => onTabChange('trending')}
              role="tab"
              aria-selected={activeFeedTab === 'trending'}
            >
              🔥 Trending (<span>{tabCounts.trending}</span>)
            </button>
            <button
              className={`feed-tab-btn ${activeFeedTab === 'latest' ? 'active' : ''}`}
              onClick={() => onTabChange('latest')}
              role="tab"
              aria-selected={activeFeedTab === 'latest'}
            >
              🆕 Latest Posts (<span>{tabCounts.latest}</span>)
            </button>
            <button
              className={`feed-tab-btn ${activeFeedTab === 'bookmarked' ? 'active' : ''}`}
              onClick={() => onTabChange('bookmarked')}
              role="tab"
              aria-selected={activeFeedTab === 'bookmarked'}
            >
              ⭐ Saved Bookmarks (<span>{tabCounts.bookmarked}</span>)
            </button>
          </div>

          {/* Search Row */}
          <div className="search-row">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                id="blog-search-input"
                className="search-input"
                placeholder="Search student notes, tags, or authors (e.g. Git, AI, Priya, Hackathon)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  id="blog-search-clear"
                  className="search-clear-btn"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            <select
              id="blog-sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort posts"
            >
              <option value="trending">🔥 Trending First</option>
              <option value="recent">🆕 Most Recent</option>
              <option value="comments">💬 Most Discussed</option>
            </select>
          </div>

          {/* Topic Filter Chips */}
          <div className="filter-tags-row">
            <span className="filter-tag-label">Topic Tabs:</span>
            {topics.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${activeTopic === cat ? 'active' : ''}`}
                onClick={() => onTopicChange(cat)}
              >
                {cat === 'All' ? 'All Topics' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VIEW 1: ALL NOTES (BOTH TRENDING & LATEST SECTIONS) ============ */}
      {activeFeedTab === 'all' && (
        <>
          {/* ============ TRENDING POSTS SECTION ============ */}
          <section className="section" id="trending">
            <div className="section-head">
              <h2 className="section-title">🔥 Trending Posts</h2>
              <span className="section-sub">Most liked this week</span>
            </div>

            {trendingList.length > 0 ? (
              <div className="card-grid">
                {trendingList.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isLiked={likedPostIds.includes(post.id)}
                    isBookmarked={bookmarkedPostIds.includes(post.id)}
                    onToggleLike={onToggleLike}
                    onToggleBookmark={onToggleBookmark}
                    onOpenArticle={onOpenArticle}
                  />
                ))}
              </div>
            ) : latestList.length > 0 ? (
              <p style={{ color: 'var(--ink-soft)', fontStyle: 'italic', margin: '0 0 16px' }}>
                No trending notes matching {activeTopic !== 'All' ? `topic "${activeTopic}"` : 'current search'}.
              </p>
            ) : null}
          </section>

          {/* ============ LATEST POSTS SECTION ============ */}
          <section className="section alt-bg" id="latest">
            <div className="section-head">
              <h2 className="section-title">🆕 Latest Posts</h2>
              <span className="section-sub">Fresh off the press</span>
            </div>

            {latestList.length > 0 ? (
              <div className="card-grid">
                {latestList.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isLiked={likedPostIds.includes(post.id)}
                    isBookmarked={bookmarkedPostIds.includes(post.id)}
                    onToggleLike={onToggleLike}
                    onToggleBookmark={onToggleBookmark}
                    onOpenArticle={onOpenArticle}
                  />
                ))}
              </div>
            ) : trendingList.length > 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 16px', color: 'var(--ink-soft)' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '12px' }}>
                  No recent notes pinned in {activeTopic !== 'All' ? `"${activeTopic}"` : 'current search'} yet.
                </p>
                {onOpenCreatePost && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={onOpenCreatePost}
                  >
                    ✍️ Write the First Note
                  </button>
                )}
              </div>
            ) : null}
          </section>

          {/* If BOTH trending and latest are empty */}
          {trendingList.length === 0 && latestList.length === 0 && (
            <section className="section">
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: 'var(--paper-raised)',
                  border: '1.5px dashed var(--line-strong)',
                  borderRadius: 'var(--radius)',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                <span style={{ fontSize: '42px', display: 'block', marginBottom: '12px' }}>📌</span>
                <h3 style={{ fontFamily: 'var(--font-display)', margin: '0 0 8px' }}>
                  No Posts Found
                </h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: '0 0 16px' }}>
                  No campus notes match your current filters. Try searching with different keywords or reset filters.
                </p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setSearchQuery('');
                    onTopicChange('All');
                    onTabChange('all');
                  }}
                >
                  Reset Feed Filters
                </button>
              </div>
            </section>
          )}
        </>
      )}

      {/* ============ VIEW 2: TRENDING ONLY ============ */}
      {activeFeedTab === 'trending' && (
        <>
          <section className="section" id="trending">
            <div className="section-head">
              <h2 className="section-title">🔥 Trending Student Posts</h2>
              <span className="section-sub">
                {trendingList.length} article{trendingList.length === 1 ? '' : 's'} available
              </span>
            </div>

            {trendingList.length > 0 ? (
              <div className="card-grid">
                {trendingList.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isLiked={likedPostIds.includes(post.id)}
                    isBookmarked={bookmarkedPostIds.includes(post.id)}
                    onToggleLike={onToggleLike}
                    onToggleBookmark={onToggleBookmark}
                    onOpenArticle={onOpenArticle}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: 'var(--paper-raised)',
                  border: '1.5px dashed var(--line-strong)',
                  borderRadius: 'var(--radius)',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                <span style={{ fontSize: '42px', display: 'block', marginBottom: '12px' }}>🔥</span>
                <h3 style={{ fontFamily: 'var(--font-display)', margin: '0 0 8px' }}>
                  No Trending Posts Found
                </h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: '0 0 16px' }}>
                  No trending notes match your selected topic or search query.
                </p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setSearchQuery('');
                    onTopicChange('All');
                    onTabChange('all');
                  }}
                >
                  Reset Feed Filters
                </button>
              </div>
            )}
          </section>
          <div id="latest" style={{ height: 0, overflow: 'hidden' }} aria-hidden="true" />
        </>
      )}

      {/* ============ VIEW 3: LATEST ONLY ============ */}
      {activeFeedTab === 'latest' && (
        <>
          <div id="trending" style={{ height: 0, overflow: 'hidden' }} aria-hidden="true" />
          <section className="section alt-bg" id="latest">
            <div className="section-head">
              <h2 className="section-title">🆕 Latest Campus Notes</h2>
              <span className="section-sub">
                {latestPostsTab.length} article{latestPostsTab.length === 1 ? '' : 's'} available
              </span>
            </div>

            {latestPostsTab.length > 0 ? (
              <div className="card-grid">
                {latestPostsTab.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isLiked={likedPostIds.includes(post.id)}
                    isBookmarked={bookmarkedPostIds.includes(post.id)}
                    onToggleLike={onToggleLike}
                    onToggleBookmark={onToggleBookmark}
                    onOpenArticle={onOpenArticle}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: 'var(--paper-raised)',
                  border: '1.5px dashed var(--line-strong)',
                  borderRadius: 'var(--radius)',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                <span style={{ fontSize: '42px', display: 'block', marginBottom: '12px' }}>🆕</span>
                <h3 style={{ fontFamily: 'var(--font-display)', margin: '0 0 8px' }}>
                  No Latest Posts Found
                </h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: '0 0 16px' }}>
                  No notes match your selected topic or search query.
                </p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setSearchQuery('');
                    onTopicChange('All');
                    onTabChange('all');
                  }}
                >
                  Reset Feed Filters
                </button>
              </div>
            )}
          </section>
        </>
      )}

      {/* ============ VIEW 4: BOOKMARKED ONLY ============ */}
      {activeFeedTab === 'bookmarked' && (
        <>
          <section className="section" id="trending">
            <div className="section-head">
              <h2 className="section-title">⭐ Your Saved Desk Bookmarks</h2>
              <span className="section-sub">
                {bookmarkedList.length} saved article{bookmarkedList.length === 1 ? '' : 's'}
              </span>
            </div>

            {bookmarkedList.length > 0 ? (
              <div className="card-grid">
                {bookmarkedList.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isLiked={likedPostIds.includes(post.id)}
                    isBookmarked={bookmarkedPostIds.includes(post.id)}
                    onToggleLike={onToggleLike}
                    onToggleBookmark={onToggleBookmark}
                    onOpenArticle={onOpenArticle}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: 'var(--paper-raised)',
                  border: '1.5px dashed var(--line-strong)',
                  borderRadius: 'var(--radius)',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                <span style={{ fontSize: '42px', display: 'block', marginBottom: '12px' }}>⭐</span>
                <h3 style={{ fontFamily: 'var(--font-display)', margin: '0 0 8px' }}>
                  No Saved Bookmarks
                </h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: '0 0 16px' }}>
                  {bookmarkedPostIds.length === 0
                    ? "You haven't bookmarked any notes yet. Click the bookmark icon on any post card to save notes to your desk!"
                    : 'No bookmarked notes match the current search or topic filter.'}
                </p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setSearchQuery('');
                    onTopicChange('All');
                    onTabChange('all');
                  }}
                >
                  Browse All Notes
                </button>
              </div>
            )}
          </section>
          <div id="latest" style={{ height: 0, overflow: 'hidden' }} aria-hidden="true" />
        </>
      )}
    </>
  );
}
