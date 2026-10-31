import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import { ReadingProgress, BackToTop } from './components/ScrollWidgets';
import HeroSection from './components/HeroSection';
import StickyNotesBoard from './components/StickyNotesBoard';
import BlogFeed from './components/BlogFeed';
import { PopularCategories, TopAuthors } from './components/ExploreSections';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import ProfileDropdown from './components/ProfileDropdown';

// Modals
import ArticleReaderModal from './components/Modals/ArticleReaderModal';
import CreatePostModal from './components/Modals/CreatePostModal';
import StickyNoteModal from './components/Modals/StickyNoteModal';
import SavedBookmarksModal from './components/Modals/SavedBookmarksModal';
import AuthModal from './components/Modals/AuthModal';
import { SignOutConfirmModal, ForgotPasswordModal } from './components/Modals/AuthDialogs';

import { DEFAULT_POSTS, DEFAULT_STICKY_NOTES } from './data/initialData';

export default function App() {
  // 1. Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('campus_theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('campus_theme', theme);
  }, [theme]);

  // 2. Toasts State
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, icon = '📌') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    addToast(
      next === 'dark' ? 'Switched to Midnight Corkboard 🌙' : 'Switched to Classic Paper ☀️',
      '🎨'
    );
  };

  // 3. User Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('campus_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('campus_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('campus_user');
    }
  }, [currentUser]);

  // 4. Posts Data State
  const [posts, setPosts] = useState(() => {
    try {
      const custom = JSON.parse(localStorage.getItem('campus_custom_posts') || '[]');
      return [...custom, ...DEFAULT_POSTS];
    } catch {
      return DEFAULT_POSTS;
    }
  });

  // 5. Likes and Bookmarks State
  const [likedPostIds, setLikedPostIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('campus_liked_posts') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('campus_liked_posts', JSON.stringify(likedPostIds));
  }, [likedPostIds]);

  const [bookmarkedPostIds, setBookmarkedPostIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('campus_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('campus_bookmarks', JSON.stringify(bookmarkedPostIds));
  }, [bookmarkedPostIds]);

  // 6. Sticky Notes Data State
  const [stickyNotes, setStickyNotes] = useState(() => {
    try {
      const raw = localStorage.getItem('campus_sticky_notes');
      return raw ? JSON.parse(raw) : DEFAULT_STICKY_NOTES;
    } catch {
      return DEFAULT_STICKY_NOTES;
    }
  });

  useEffect(() => {
    localStorage.setItem('campus_sticky_notes', JSON.stringify(stickyNotes));
  }, [stickyNotes]);

  // 7. Navigation & ScrollSpy State
  const [activeSection, setActiveSection] = useState('home');
  const [activeFeedTab, setActiveFeedTab] = useState('all');
  const [activeTopic, setActiveTopic] = useState('All');

  useEffect(() => {
    const sectionIds = ['home', 'pinboard', 'filter-section', 'trending', 'latest', 'categories', 'authors'];

    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollY >= el.offsetTop) {
          const id = sectionIds[i] === 'filter-section' ? 'trending' : sectionIds[i];
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // If navigating to latest or trending while current feed tab has hidden it, reset to 'all'
    if (sectionId === 'latest' && (activeFeedTab === 'trending' || activeFeedTab === 'bookmarked')) {
      setActiveFeedTab('all');
    } else if (sectionId === 'trending' && (activeFeedTab === 'latest' || activeFeedTab === 'bookmarked')) {
      setActiveFeedTab('all');
    }

    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const navHeight = 72;
        const targetPos = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: 'smooth'
        });
        setActiveSection(sectionId);
      }
    }, 50);
  };

  // 8. Modals Visibility State
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isStickyModalOpen, setIsStickyModalOpen] = useState(false);
  const [editingStickyNote, setEditingStickyNote] = useState(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  // Like Toggle Handler
  const handleToggleLike = (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    if (likedPostIds.includes(postId)) {
      setLikedPostIds((prev) => prev.filter((id) => id !== postId));
      addToast(`Removed like from "${post.title.substring(0, 22)}..."`, '💔');
    } else {
      setLikedPostIds((prev) => [...prev, postId]);
      addToast(`Liked "${post.title.substring(0, 22)}..."!`, '❤️');
    }
  };

  // Bookmark Toggle Handler
  const handleToggleBookmark = (postId) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    if (bookmarkedPostIds.includes(postId)) {
      setBookmarkedPostIds((prev) => prev.filter((id) => id !== postId));
      addToast(`Removed note from saved desk`, '📌');
    } else {
      setBookmarkedPostIds((prev) => [...prev, postId]);
      addToast(`Saved "${post.title.substring(0, 22)}..." to desk! 📌`, '⭐');
    }
  };

  // Add Comment Handler
  const handleAddComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id === postId) {
          const updatedComments = [...(p.comments || []), comment];
          return {
            ...p,
            comments: updatedComments,
            commentsCount: updatedComments.length
          };
        }
        return p;
      })
    );
    addToast('Comment pinned to discussion! 💬', '✨');
  };

  // Create New Post Handler
  const handleCreatePost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    // Save to custom posts localStorage
    try {
      const custom = JSON.parse(localStorage.getItem('campus_custom_posts') || '[]');
      localStorage.setItem('campus_custom_posts', JSON.stringify([newPost, ...custom]));
    } catch (e) {
      console.error(e);
    }
    setActiveFeedTab('all');
    setActiveTopic('All');
    addToast(`Published "${newPost.title.substring(0, 22)}..." to corkboard! 📝`, '✨');
    scrollToSection('latest');
  };

  // Sticky Notes Handlers
  const handleToggleStickyTask = (noteId, taskIndex) => {
    setStickyNotes((prev) =>
      prev.map((note) => {
        if (note.id === noteId && note.tasks && note.tasks[taskIndex]) {
          const updatedTasks = note.tasks.map((t, idx) =>
            idx === taskIndex ? { ...t, done: !t.done } : t
          );
          const taskItem = updatedTasks[taskIndex];
          if (taskItem.done) {
            addToast(`Completed: "${taskItem.text}"! ✅`, '🎯');
          }
          return { ...note, tasks: updatedTasks };
        }
        return note;
      })
    );
  };

  const handleToggleStickyPin = (noteId) => {
    setStickyNotes((prev) =>
      prev.map((note) => {
        if (note.id === noteId) {
          const nextPinned = !note.pinned;
          addToast(
            nextPinned
              ? `Pinned "${note.title.substring(0, 20)}..." to top! ⭐`
              : `Unpinned "${note.title.substring(0, 20)}..." 📌`,
            '📌'
          );
          return { ...note, pinned: nextPinned };
        }
        return note;
      })
    );
  };

  const handleChangeStickyColor = (noteId, newColor) => {
    setStickyNotes((prev) =>
      prev.map((note) => (note.id === noteId ? { ...note, color: newColor } : note))
    );
    addToast(`Changed note color to ${newColor}! 🎨`, '✨');
  };

  const handleDeleteStickyNote = (noteId, noteTitle) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${noteTitle || 'this note'}" from the corkboard?`
    );
    if (!confirmed) return;

    setStickyNotes((prev) => prev.filter((n) => n.id !== noteId));
    addToast(`Removed "${noteTitle?.substring(0, 20) || 'Note'}" from corkboard 🗑️`, '📌');
  };

  const handleSaveStickyNote = (noteData, isEdit) => {
    if (isEdit) {
      setStickyNotes((prev) =>
        prev.map((n) => (n.id === noteData.id ? { ...noteData } : n))
      );
      addToast(`Saved changes to "${noteData.title}"! 💾`, '✨');
    } else {
      setStickyNotes((prev) => [noteData, ...prev]);
      addToast(`Pinned "${noteData.title}" to corkboard! 📌`, '✨');
    }
    scrollToSection('pinboard');
  };

  const handleResetStickyNotes = () => {
    const confirmed = window.confirm(
      'Reset corkboard to the 6 default campus student notes & tasks?'
    );
    if (confirmed) {
      setStickyNotes(DEFAULT_STICKY_NOTES);
      localStorage.setItem('campus_sticky_notes', JSON.stringify(DEFAULT_STICKY_NOTES));
      addToast('Corkboard reset to sample campus notes! 🔄', '✨');
    }
  };

  // Sign out choices
  const handleSignOutKeepNotes = () => {
    const name = currentUser?.name || 'Student';
    setCurrentUser(null);
    addToast(`Signed out of ${name}. Your notes remain pinned! 🚪`, '👋');
  };

  const handleSignOutDeleteNotes = () => {
    if (currentUser) {
      const userId = currentUser.id || currentUser.roll;
      setStickyNotes((prev) =>
        prev.filter((n) => n.userId !== userId && n.author !== currentUser.name)
      );
      addToast(`Signed out and cleared your session notes from corkboard. 🗑️`, '👋');
    }
    setCurrentUser(null);
  };

  const activeArticle = posts.find((p) => p.id === activeArticleId);
  const bookmarkedPostsList = posts.filter((p) => bookmarkedPostIds.includes(p.id));

  const userStickyCount = currentUser
    ? stickyNotes.filter(
        (n) =>
          n.userId === (currentUser.id || currentUser.roll) ||
          n.author?.toLowerCase() === currentUser.name?.toLowerCase()
      ).length
    : 0;

  const userBlogCount = currentUser
    ? posts.filter(
        (p) => p.author?.toLowerCase() === currentUser.name?.toLowerCase()
      ).length
    : 0;

  return (
    <div className="campus-app-root">
      {/* 3-Second Campus Corkboard Preloader */}
      <Preloader />

      {/* Reading Scroll Progress Bar */}
      <ReadingProgress />

      {/* Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        bookmarkCount={bookmarkedPostIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        currentUser={currentUser}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
        isProfileDropdownOpen={isProfileDropdownOpen}
        onToggleProfileDropdown={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
      />

      {/* Profile Dropdown Menu Card */}
      <ProfileDropdown
        isOpen={isProfileDropdownOpen}
        onClose={() => setIsProfileDropdownOpen(false)}
        currentUser={currentUser}
        userStickyCount={userStickyCount}
        userBlogCount={userBlogCount}
        bookmarkCount={bookmarkedPostIds.length}
        onNavigate={scrollToSection}
        onOpenStickyModal={() => {
          setEditingStickyNote(null);
          setIsStickyModalOpen(true);
        }}
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onToggleTheme={toggleTheme}
        onPromptSignOut={() => setIsSignOutConfirmOpen(true)}
      />

      <main>
        {/* Hero Section with animated counters */}
        <HeroSection
          onNavigate={scrollToSection}
          onOpenStickyModal={() => {
            setEditingStickyNote(null);
            setIsStickyModalOpen(true);
          }}
          totalPostsCount={posts.length}
        />

        {/* Live Interactive Corkboard Pinboard */}
        <StickyNotesBoard
          stickyNotes={stickyNotes}
          onToggleTask={handleToggleStickyTask}
          onTogglePin={handleToggleStickyPin}
          onChangeColor={handleChangeStickyColor}
          onEditNote={(note) => {
            setEditingStickyNote(note);
            setIsStickyModalOpen(true);
          }}
          onDeleteNote={handleDeleteStickyNote}
          onOpenCreateModal={() => {
            setEditingStickyNote(null);
            setIsStickyModalOpen(true);
          }}
          onResetNotes={handleResetStickyNotes}
          currentUser={currentUser}
        />

        {/* Live Blog Feed with search, filters, likes, bookmarks */}
        <BlogFeed
          posts={posts}
          likedPostIds={likedPostIds}
          bookmarkedPostIds={bookmarkedPostIds}
          onToggleLike={handleToggleLike}
          onToggleBookmark={handleToggleBookmark}
          onOpenArticle={(id) => setActiveArticleId(id)}
          activeFeedTab={activeFeedTab}
          onTabChange={(tab) => setActiveFeedTab(tab)}
          activeTopic={activeTopic}
          onTopicChange={(topic) => setActiveTopic(topic)}
          onOpenCreatePost={() => setIsCreatePostOpen(true)}
        />

        {/* Popular Categories */}
        <PopularCategories
          onSelectCategory={(catName) => {
            setActiveTopic(catName);
            setActiveFeedTab('all');
            scrollToSection('filter-section');
          }}
        />

        {/* Top Student Authors */}
        <TopAuthors
          onAuthorClick={(authorName) => {
            setActiveTopic('All');
            setActiveFeedTab('all');
            scrollToSection('filter-section');
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onSelectCategory={(catName) => {
          setActiveTopic(catName);
          setActiveFeedTab('all');
          scrollToSection('filter-section');
        }}
      />

      {/* Modals */}
      <ArticleReaderModal
        post={activeArticle}
        isOpen={!!activeArticle}
        onClose={() => setActiveArticleId(null)}
        isLiked={activeArticle ? likedPostIds.includes(activeArticle.id) : false}
        isBookmarked={activeArticle ? bookmarkedPostIds.includes(activeArticle.id) : false}
        onToggleLike={handleToggleLike}
        onToggleBookmark={handleToggleBookmark}
        onAddComment={handleAddComment}
        currentUser={currentUser}
      />

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onCreatePost={handleCreatePost}
        currentUser={currentUser}
      />

      <StickyNoteModal
        isOpen={isStickyModalOpen}
        onClose={() => {
          setIsStickyModalOpen(false);
          setEditingStickyNote(null);
        }}
        onSave={handleSaveStickyNote}
        editNote={editingStickyNote}
        currentUser={currentUser}
      />

      <SavedBookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedPosts={bookmarkedPostsList}
        onReadPost={(id) => setActiveArticleId(id)}
        onRemoveBookmark={handleToggleBookmark}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          addToast(`Signed in as ${user.name} (${user.branch || 'Student'})! 🎓`, '👋');
        }}
        onOpenForgotPassword={() => setIsForgotPasswordOpen(true)}
      />

      <SignOutConfirmModal
        isOpen={isSignOutConfirmOpen}
        onClose={() => setIsSignOutConfirmOpen(false)}
        currentUser={currentUser}
        userStickyNotesCount={userStickyCount}
        onSignOutKeepNotes={handleSignOutKeepNotes}
        onSignOutDeleteNotes={handleSignOutDeleteNotes}
      />

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onGeneratedToken={(studentId, token) => {
          addToast(`Recovery token for ${studentId}: ${token} (Saved to clipboard simulation) 🔑`, '✨');
        }}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
