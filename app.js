/**
 * CampusConnect — Student Blog Platform
 * Main JavaScript Controller (app.js)
 * 
 * Hackathon-Ready Interactive Features:
 *  - Interactive Navigation Tabs (Desktop & Mobile with Smooth Scroll & Active Indicator)
 *  - ScrollSpy: Real-time active tab tracking on page scroll
 *  - Feed View Tabs: [All Notes], [Trending], [Latest Posts], [Saved Bookmarks] with live counts
 *  - Topic Filter Tabs: [All Topics], [Study Tips], [Technology], [Programming], [Projects], [Career], [Events]
 *  - Article Reader Modal Tabs: [Read Note] & [Discussion Comments]
 *  - Create Post Modal Tabs: [Edit Note] & [Live Corkboard Preview]
 *  - Popular Categories & Top Authors Interactive Chips/Cards (One-click filtering)
 *  - Footer Quick Links & Category Tab Routing
 *  - 3-Second Campus Corkboard Preloader
 *  - Theme Switcher (Classic Paper / Midnight Corkboard) with LocalStorage
 *  - Interactive Like System (Heart burst + LocalStorage persistence)
 *  - Interactive Bookmark System (Nav badge counter + Saved Notes Drawer)
 *  - Multi-Criteria Sorting (Trending, Recent, Most Discussed, A-Z)
 *  - Student Auth Simulation: Demo Login, Profile Dropdown, Logout
 *  - Animated Number Counters with IntersectionObserver
 *  - Reading Scroll Progress Bar & Floating Back-To-Top Pin Button
 *  - Corkboard Toast Notification System
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. DATA STORE & INITIALIZATION
  // ============================================================

  // Default sample posts data
  const DEFAULT_POSTS = [
    {
      id: "post-1",
      title: "Best Productivity Tips for Students Who Procrastinate",
      desc: "Motivation is unreliable. These are the systems that work even on the days you don't feel like doing anything…",
      content: `Procrastination isn't a character flaw or laziness — it is usually an emotional response to feeling overwhelmed, uncertain where to start, or afraid of producing subpar work.\n\nHere are 3 battle-tested systems that work even on low-energy days:\n\n1. The 5-Minute Micro Rule: Tell yourself you only have to work on the assignment for 5 minutes. If you want to stop after that, you can. 90% of the time, the friction of starting was the only real obstacle.\n\n2. Low-Friction Workspace: Keep your desk clear and open your IDE or document the night before. Removing 3 clicks between your waking mind and your work reduces morning procrastination dramatically.\n\n3. Time-boxing over Task Lists: Never write "study for exams" on your to-do list. Write "Review lecture 3 slides from 4:00 PM to 4:45 PM". Time-boxing provides an explicit finish line.`,
      category: "Study Tips",
      author: "Priya Sharma",
      avatar: "PS",
      date: "Aug 30, 2026",
      readTime: "2 min read",
      likes: 45,
      commentsCount: 4,
      gradient: "linear-gradient(135deg, #E3A23C, #C4573B)",
      isTrending: true,
      comments: [
        { id: "c1", author: "Rahul Verma", text: "The 5-minute rule saved my semester project!", time: "2 days ago" },
        { id: "c2", author: "Sara Khan", text: "Time boxing is genuinely a game changer.", time: "1 day ago" },
        { id: "c3", author: "Devansh Nair", text: "Totally agree on clearing the desk. Brain follows the environment.", time: "18 hours ago" },
        { id: "c4", author: "Ananya Iyer", text: "Bookmarked! Need this before finals week.", time: "5 hours ago" }
      ]
    },
    {
      id: "post-2",
      title: "How AI Is Changing Student Life",
      desc: "From note summarizers to project debugging, AI tools have quietly become part of every student's daily routine…",
      content: `Just two years ago, using AI in college was seen as either sci-fi or cheating. Today, it has settled into our daily rhythms as an indispensable pair programmer, tutor, and research assistant.\n\nHere is how top students are using AI responsibly:\n\n- Socratic Tutor: Instead of asking for answers, ask LLMs: "Quiz me on binary search trees one question at a time and correct my mistakes."\n- Code Explainer: Paste cryptic compiler errors or legacy codebases and ask for a plain-English mental model before writing the fix yourself.\n- Literature & Paper Synthesis: Feeding dense academic PDFs into summarizers to extract methodology and key findings before diving into deep reading.\n\nThe real superpower isn't letting AI do your thinking — it's using AI to shorten feedback loops so you learn twice as fast.`,
      category: "Technology",
      author: "Priya Sharma",
      avatar: "PS",
      date: "Aug 18, 2026",
      readTime: "3 min read",
      likes: 42,
      commentsCount: 6,
      gradient: "linear-gradient(135deg, #6E8F73, #4A5567)",
      isTrending: true,
      comments: [
        { id: "c5", author: "Devansh Nair", text: "The Socratic tutor prompt is genius.", time: "3 days ago" },
        { id: "c6", author: "Karan Mehta", text: "Debugging syntax with AI saves hours of staring at semi-colons.", time: "2 days ago" }
      ]
    },
    {
      id: "post-3",
      title: "How to Build a Strong Developer Portfolio Before Graduating",
      desc: "Recruiters skim resumes in seconds but spend real time on a good portfolio. Here's how to make yours worth that time…",
      content: `Most college portfolios look identical: a weather app, a generic to-do list, and a clone of an existing landing page. While these teach fundamentals, they rarely impress technical recruiters.\n\nTo stand out, build projects with these 3 qualities:\n\n1. Solves a Real Campus Problem: Build something your own college club or classmates actually use. Even 20 active student users proves you can handle feedback, edge cases, and deployments.\n\n2. Documentation & Live Demos: A working deployment link and a clean README with architecture diagrams and animated GIFs are worth 100 lines of resume bullet points.\n\n3. Deep Technical Depth: Rather than 10 shallow apps, build 2 full-stack apps with authentication, responsive design, tests, and clean modular code.`,
      category: "Career",
      author: "Rahul Verma",
      avatar: "RV",
      date: "Aug 31, 2026",
      readTime: "2 min read",
      likes: 40,
      commentsCount: 3,
      gradient: "linear-gradient(135deg, #8A6FB0, #3C7EA3)",
      isTrending: true,
      comments: [
        { id: "c7", author: "Ananya Iyer", text: "Great tips! Deploying on Vercel/Netlify was key for my interview.", time: "1 day ago" }
      ]
    },
    {
      id: "post-4",
      title: "Why Every Student Should Learn Git and GitHub",
      desc: "It's not just for group projects. Git is the single most useful tool I picked up outside the classroom…",
      content: `Almost every freshman experiences the nightmare of saving files as "project_final.zip", "project_final_v2.zip", and "project_FINAL_ACTUAL.zip".\n\nGit eliminates that fear forever:\n\n- Time Machine: You can experiment boldly. If something breaks, one command reverts you to your last working commit.\n- Collaboration Without Overwriting: Git branches allow teammates to work simultaneously on frontend and backend without stepping on each other's code.\n- Your Public Portfolio: Your GitHub contribution graph and clean commit messages show employers how you think and how regularly you code.\n\nTake one weekend to learn: git clone, branch, commit, push, and resolve a simple merge conflict. You will thank yourself for the rest of your engineering degree.`,
      category: "Programming",
      author: "Sara Khan",
      avatar: "SK",
      date: "Aug 26, 2026",
      readTime: "2 min read",
      likes: 38,
      commentsCount: 5,
      gradient: "linear-gradient(135deg, #4A5567, #8A6FB0)",
      isTrending: false,
      comments: [
        { id: "c8", author: "Priya Sharma", text: "Branching saved our hackathon team this year!", time: "4 days ago" }
      ]
    },
    {
      id: "post-5",
      title: "My Experience Building a College Project From Scratch",
      desc: "From a shaky idea to a working demo — the messy, non-linear reality of building something for the first time…",
      content: `In the classroom, problems come with clean specifications and expected outputs. In the real world, you are handed a blank screen and infinite choices.\n\nWhen our team set out to build a student event tracker, we spent the first week arguing about database schemas before writing a single line of frontend. The biggest lesson was: Build the thinnest end-to-end slice first.\n\nGet a button on the screen that saves a record and displays it back. Once the pipeline works, decorating and refining is easy. Do not let perfectionism stall the prototype!`,
      category: "Projects",
      author: "Devansh Nair",
      avatar: "DN",
      date: "Aug 28, 2026",
      readTime: "3 min read",
      likes: 31,
      commentsCount: 2,
      gradient: "linear-gradient(135deg, #3C7EA3, #6E8F73)",
      isTrending: false,
      comments: [
        { id: "c9", author: "Karan Mehta", text: "Thin vertical slices are the best way to develop.", time: "2 days ago" }
      ]
    },
    {
      id: "post-6",
      title: "My First College Hackathon Experience",
      desc: "36 hours, three energy drinks, and a project that broke twenty minutes before judging — here's what I learned…",
      content: `Walking into the auditorium with 300 students typing furiously was intimidating. Our team had big ambitions: an AI-powered smart campus parking detector using computer vision.\n\nAt 3:00 AM, our model weights refused to load. At 7:00 AM, the API rate-limited us. But instead of giving up, we simplified down to a functional core demo.\n\nKey takeaways:\n- Pitch matters as much as code: Judges care about the problem you solve and how well you articulate the demo.\n- Sleep for at least 3 hours: Sleep-deprived bugs take 4 times longer to fix.\n- The network you build during hackathons is priceless.`,
      category: "Events",
      author: "Ananya Iyer",
      avatar: "AI",
      date: "Aug 22, 2026",
      readTime: "2 min read",
      likes: 29,
      commentsCount: 4,
      gradient: "linear-gradient(135deg, #C4573B, #E3A23C)",
      isTrending: false,
      comments: [
        { id: "c10", author: "Rahul Verma", text: "The 3 AM API failure is a universal hackathon rite of passage 😂", time: "1 week ago" }
      ]
    }
  ];

  // Helper to get state from localStorage
  const getStoredLikes = () => JSON.parse(localStorage.getItem('campus_liked_posts') || '[]');
  const setStoredLikes = (likes) => localStorage.setItem('campus_liked_posts', JSON.stringify(likes));

  const getStoredBookmarks = () => JSON.parse(localStorage.getItem('campus_bookmarks') || '[]');
  const setStoredBookmarks = (bms) => localStorage.setItem('campus_bookmarks', JSON.stringify(bms));

  const getCustomPosts = () => JSON.parse(localStorage.getItem('campus_custom_posts') || '[]');
  const setCustomPosts = (posts) => localStorage.setItem('campus_custom_posts', JSON.stringify(posts));

  const getStoredUser = () => JSON.parse(localStorage.getItem('campus_user') || 'null');
  const setStoredUser = (user) => localStorage.setItem('campus_user', JSON.stringify(user));

  // Merge default posts with custom posts
  function getAllPosts() {
    const custom = getCustomPosts();
    return [...custom, ...DEFAULT_POSTS];
  }

  function getPostById(id) {
    return getAllPosts().find(p => p.id === id);
  }

  // ============================================================
  // 2. PRELOADER (Exact 3-Second Corkboard Loading Screen)
  // ============================================================
  (function initPreloader() {
    const preloader = document.getElementById('preloader');
    const fill = document.getElementById('preloader-fill');
    const percent = document.getElementById('preloader-percent');
    const status = document.getElementById('preloader-status');

    if (!preloader) return;

    const DURATION = 3000;
    let startTimestamp = null;

    const statusMessages = [
      { threshold: 0, text: "📌 Pinning ideas to the corkboard..." },
      { threshold: 30, text: "📝 Loading trending student blogs..." },
      { threshold: 65, text: "👥 Connecting campus authors & projects..." },
      { threshold: 90, text: "✨ Welcome to CampusConnect!" }
    ];

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / DURATION, 1);
      const percentage = Math.floor(progress * 100);

      if (fill) fill.style.width = percentage + '%';
      if (percent) percent.textContent = percentage + '%';
      preloader.setAttribute('aria-valuenow', percentage);

      for (let i = statusMessages.length - 1; i >= 0; i--) {
        if (percentage >= statusMessages[i].threshold) {
          if (status && status.textContent !== statusMessages[i].text) {
            status.textContent = statusMessages[i].text;
          }
          break;
        }
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          preloader.classList.add('loaded');
          document.body.classList.remove('preloading');
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 600);
        }, 150);
      }
    }

    window.requestAnimationFrame(step);
  })();

  // ============================================================
  // 3. THEME CONTROLLER (Classic Paper / Midnight Corkboard)
  // ============================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const currentTheme = localStorage.getItem('campus_theme') || 'light';

  function applyTheme(theme, showNotice = false) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleBtn) themeToggleBtn.innerHTML = '☀️';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Classic Paper Mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggleBtn) themeToggleBtn.innerHTML = '🌙';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Midnight Mode');
    }
    localStorage.setItem('campus_theme', theme);
    if (showNotice) {
      showToast(theme === 'dark' ? 'Switched to Midnight Corkboard 🌙' : 'Switched to Classic Paper ☀️', '🎨');
    }
  }

  applyTheme(currentTheme, false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(active, true);
    });
  }

  // ============================================================
  // 4. NAVIGATION TABS CONTROLLER (Desktop, Mobile & ScrollSpy)
  // ============================================================
  const desktopNavLinks = document.querySelectorAll('#main-nav-tabs .nav-link');
  const mobileNavLinks = document.querySelectorAll('#mobile-nav-tabs .mobile-nav-link');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');

  function setActiveNavTab(targetSectionId) {
    // Clean target ID (remove leading hash)
    const sectionName = targetSectionId.replace('#', '');

    desktopNavLinks.forEach(link => {
      const hrefTarget = (link.getAttribute('href') || '').replace('#', '');
      const dataSec = link.dataset.section || '';
      if (hrefTarget === sectionName || dataSec === sectionName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileNavLinks.forEach(link => {
      const hrefTarget = (link.getAttribute('href') || '').replace('#', '');
      const dataSec = link.dataset.section || '';
      if (hrefTarget === sectionName || dataSec === sectionName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function smoothScrollToSection(targetId) {
    const el = document.querySelector(targetId);
    if (el) {
      const navHeight = 74;
      const targetPos = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: 'smooth'
      });
      setActiveNavTab(targetId);
    }
  }

  // Mobile menu open / close
  function openMobileMenu() {
    if (!hamburgerBtn || !mobileNav) return;
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    if (mobileOverlay) mobileOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!hamburgerBtn || !mobileNav) return;
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (mobileOverlay) mobileOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileNav?.classList.contains('is-open')) closeMobileMenu();
      else openMobileMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Handle click on all Navigation Tabs (Desktop & Mobile)
  const allNavLinks = [...desktopNavLinks, ...mobileNavLinks];
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollToSection(href);
        closeMobileMenu();

        // If clicking Trending or Latest, sync with the Feed View Tab as well!
        if (href === '#trending') {
          switchFeedTab('trending', false);
        } else if (href === '#latest') {
          switchFeedTab('latest', false);
        } else if (href === '#home') {
          switchFeedTab('all', false);
        }
      }
    });
  });

  // Footer Quick Links Tab Handling
  document.querySelectorAll('.footer-col a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const text = link.textContent.trim();

      if (href && href.startsWith('#')) {
        // Check if it's a category link or section link
        const matchingCategory = ['Technology', 'Programming', 'Study Tips', 'Projects', 'Career', 'Events'].find(
          c => c.toLowerCase() === text.toLowerCase()
        );

        if (matchingCategory) {
          e.preventDefault();
          filterByCategory(matchingCategory);
          smoothScrollToSection('#filter-section');
        } else {
          e.preventDefault();
          smoothScrollToSection(href);
        }
      }
    });
  });

  // ScrollSpy: Real-time active tab observer as the user scrolls
  (function initScrollSpy() {
    const sections = ['home', 'pinboard', 'filter-section', 'trending', 'latest', 'categories', 'authors']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 120;
      let currentSectionId = 'home';

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSectionId = sec.id;
        }
      });

      if (currentSectionId === 'filter-section') currentSectionId = 'trending';
      setActiveNavTab(currentSectionId);
    }, { passive: true });
  })();

  // Close mobile nav on escape or desktop resize
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('is-open')) closeMobileMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760 && mobileNav?.classList.contains('is-open')) closeMobileMenu();
  });

  // ============================================================
  // 5. SCROLL PROGRESS BAR & BACK TO TOP BUTTON
  // ============================================================
  const progressBar = document.getElementById('reading-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }

    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // 6. ANIMATED STATS NUMBER COUNTER (IntersectionObserver)
  // ============================================================
  (function initStatsCounter() {
    const statsSection = document.querySelector('.stats-strip');
    if (!statsSection) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateStats();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);

    function animateStats() {
      const statItems = statsSection.querySelectorAll('.stat-item');
      const customPostsCount = getCustomPosts().length;

      const targets = [
        { el: statItems[0]?.querySelector('.stat-num'), end: 120, suffix: "+" },
        { el: statItems[1]?.querySelector('.stat-num'), end: 85 + customPostsCount, suffix: "+" },
        { el: statItems[2]?.querySelector('.stat-num'), end: 10, suffix: "" },
        { el: statItems[3]?.querySelector('.stat-num'), end: 1400, suffix: "", formatK: true }
      ];

      targets.forEach(item => {
        if (!item.el) return;
        const duration = 1600;
        const start = 0;
        const startTime = performance.now();

        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.floor(start + (item.end - start) * easeOut);

          if (item.formatK) {
            item.el.textContent = (currentVal / 1000).toFixed(1) + 'k' + item.suffix;
          } else {
            item.el.textContent = currentVal + item.suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(update);
          }
        }

        requestAnimationFrame(update);
      });
    }
  })();

  // ============================================================
  // 7. TOAST NOTIFICATION UTILITY
  // ============================================================
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, icon = '📌') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-text">${message}</span>
    `;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, 3200);
  }

  // ============================================================
  // 8. LIKE & BOOKMARK SYSTEM
  // ============================================================
  const bookmarkNavBadge = document.getElementById('bookmark-badge-count');

  function updateBookmarkBadge() {
    const bookmarks = getStoredBookmarks();
    if (bookmarkNavBadge) {
      if (bookmarks.length > 0) {
        bookmarkNavBadge.textContent = bookmarks.length;
        bookmarkNavBadge.style.display = 'inline-flex';
      } else {
        bookmarkNavBadge.style.display = 'none';
      }
    }
    updateTabCounts();
  }

  updateBookmarkBadge();

  // Handle Like Clicks
  function toggleLike(postId, buttonEl) {
    const likedPosts = getStoredLikes();
    const isLiked = likedPosts.includes(postId);
    const post = getPostById(postId);
    if (!post) return;

    let newCount;
    if (isLiked) {
      const updated = likedPosts.filter(id => id !== postId);
      setStoredLikes(updated);
      newCount = post.likes;
      showToast(`Removed like from "${post.title.substring(0, 24)}..."`, '💔');
    } else {
      likedPosts.push(postId);
      setStoredLikes(likedPosts);
      newCount = post.likes + 1;
      showToast(`Liked "${post.title.substring(0, 24)}..."!`, '❤️');
    }

    document.querySelectorAll(`.like-btn[data-id="${postId}"]`).forEach(btn => {
      if (isLiked) {
        btn.classList.remove('liked');
        btn.querySelector('.like-num').textContent = newCount;
      } else {
        btn.classList.add('liked');
        btn.querySelector('.like-num').textContent = newCount;
      }
    });

    const modalLikeBtn = document.getElementById('reader-like-btn');
    if (modalLikeBtn && modalLikeBtn.dataset.id === postId) {
      if (isLiked) {
        modalLikeBtn.classList.remove('liked');
        modalLikeBtn.querySelector('.like-num').textContent = newCount;
      } else {
        modalLikeBtn.classList.add('liked');
        modalLikeBtn.querySelector('.like-num').textContent = newCount;
      }
    }
  }

  // Handle Bookmark Clicks
  function toggleBookmark(postId, buttonEl) {
    const bookmarks = getStoredBookmarks();
    const isBookmarked = bookmarks.includes(postId);
    const post = getPostById(postId);
    if (!post) return;

    if (isBookmarked) {
      const updated = bookmarks.filter(id => id !== postId);
      setStoredBookmarks(updated);
      showToast(`Removed "${post.title.substring(0, 22)}..." from saved notes.`, '📌');
    } else {
      bookmarks.push(postId);
      setStoredBookmarks(bookmarks);
      showToast(`Pinned "${post.title.substring(0, 22)}..." to your saved notes!`, '📌');
    }

    updateBookmarkBadge();

    document.querySelectorAll(`.bookmark-toggle[data-id="${postId}"]`).forEach(btn => {
      if (isBookmarked) {
        btn.classList.remove('bookmarked');
      } else {
        btn.classList.add('bookmarked');
      }
    });

    const modalBmBtn = document.getElementById('reader-bookmark-btn');
    if (modalBmBtn && modalBmBtn.dataset.id === postId) {
      if (isBookmarked) {
        modalBmBtn.classList.remove('bookmarked');
      } else {
        modalBmBtn.classList.add('bookmarked');
      }
    }

    // If currently on Bookmarks Feed Tab, refresh view
    if (activeFeedView === 'bookmarked') {
      applyFiltersAndSort();
    }
  }

  // Event Delegation for Cards
  document.addEventListener('click', (e) => {
    // Delete post button (owner only)
    const delBtn = e.target.closest('.delete-post-btn');
    if (delBtn && delBtn.dataset.id) {
      e.preventDefault();
      deleteSinglePost(delBtn.dataset.id);
      return;
    }

    const likeBtn = e.target.closest('.like-btn');
    if (likeBtn && likeBtn.dataset.id) {
      e.preventDefault();
      toggleLike(likeBtn.dataset.id, likeBtn);
      return;
    }

    const bmBtn = e.target.closest('.bookmark-toggle');
    if (bmBtn && bmBtn.dataset.id) {
      e.preventDefault();
      toggleBookmark(bmBtn.dataset.id, bmBtn);
      return;
    }

    const readBtn = e.target.closest('.readmore-btn');
    if (readBtn && readBtn.dataset.id) {
      e.preventDefault();
      openArticleModal(readBtn.dataset.id);
      return;
    }

    // Category Chip click in popular categories section (Tab routing)
    const catChip = e.target.closest('.cat-chip-btn');
    if (catChip) {
      e.preventDefault();
      const catName = catChip.querySelector('span:nth-child(2)')?.textContent.trim();
      if (catName) {
        filterByCategory(catName);
        smoothScrollToSection('#filter-section');
        showToast(`Filtered by ${catName} topic tab 🗂️`, '✨');
      }
      return;
    }

    // Author card click in Top Authors section (Tab routing)
    const authorCard = e.target.closest('.author-card');
    if (authorCard) {
      e.preventDefault();
      const authorName = authorCard.querySelector('.author-name')?.textContent.trim();
      if (authorName) {
        filterByAuthor(authorName);
        smoothScrollToSection('#filter-section');
      }
      return;
    }
  });

  // ============================================================
  // 9. INTERACTIVE TABS & SEARCH / FILTER ENGINE
  // ============================================================
  const searchInput = document.getElementById('blog-search-input');
  const searchClearBtn = document.getElementById('blog-search-clear');
  const sortSelect = document.getElementById('blog-sort-select');
  const filterChips = document.querySelectorAll('.filter-chip');
  const feedTabBtns = document.querySelectorAll('.feed-tab-btn');

  let activeFeedView = 'all'; // 'all', 'trending', 'latest', 'bookmarked'
  let activeCategory = 'All';
  let activeAuthorFilter = '';
  let searchQuery = '';

  // Switch Feed Mode Tab
  function switchFeedTab(viewName, notify = true) {
    activeFeedView = viewName;
    feedTabBtns.forEach(btn => {
      const isMatch = btn.dataset.view === viewName;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    if (notify) {
      const labels = {
        all: "Showing All Student Notes 📌",
        trending: "Showing Trending Posts 🔥",
        latest: "Showing Latest Notes 🆕",
        bookmarked: "Showing Your Saved Bookmarks ⭐"
      };
      showToast(labels[viewName] || "Feed tab updated", "📑");
    }

    applyFiltersAndSort();
  }

  feedTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchFeedTab(btn.dataset.view, true);
    });
  });

  // Topic Tabs Filtering
  function filterByCategory(category) {
    activeCategory = category;
    activeAuthorFilter = '';
    filterChips.forEach(chip => {
      const chipCat = (chip.dataset.category || '').toLowerCase();
      if (chipCat === category.toLowerCase()) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
    applyFiltersAndSort();
  }

  function filterByAuthor(author) {
    activeAuthorFilter = author;
    activeCategory = 'All';
    filterChips.forEach(chip => chip.classList.remove('active'));
    showToast(`Filtering notes written by ${author}`, '👤');
    applyFiltersAndSort();
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterByCategory(chip.dataset.category);
    });
  });

  // Search Input Handlers
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (searchClearBtn) {
        if (searchQuery.length > 0) searchClearBtn.classList.add('visible');
        else searchClearBtn.classList.remove('visible');
      }
      applyFiltersAndSort();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      searchClearBtn.classList.remove('visible');
      applyFiltersAndSort();
      searchInput?.focus();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      applyFiltersAndSort();
    });
  }

  // Core Filtering & Sorting Engine
  function applyFiltersAndSort() {
    const allCards = document.querySelectorAll('.card-grid .post-card');
    const bookmarkedIds = getStoredBookmarks();
    let visibleCount = 0;

    allCards.forEach(card => {
      const cardId = card.dataset.id || '';
      const sectionId = card.closest('section')?.id || '';
      const title = (card.querySelector('.post-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.post-desc')?.textContent || '').toLowerCase();
      const cat = (card.querySelector('.post-cat-tag')?.textContent || '').toLowerCase();
      const author = (card.querySelector('.post-meta-row span:nth-child(2)')?.textContent || '').toLowerCase();

      // 1. Feed View Tab Filter
      let matchesFeed = true;
      if (activeFeedView === 'trending') {
        matchesFeed = (sectionId === 'trending');
      } else if (activeFeedView === 'latest') {
        matchesFeed = (sectionId === 'latest');
      } else if (activeFeedView === 'bookmarked') {
        matchesFeed = bookmarkedIds.includes(cardId);
      }

      // 2. Category Topic Filter
      const matchesCategory = (activeCategory === 'All') || cat.includes(activeCategory.toLowerCase());

      // 3. Author Filter
      const matchesAuthor = !activeAuthorFilter || author.includes(activeAuthorFilter.toLowerCase());

      // 4. Search Query Filter
      const matchesSearch = !searchQuery || 
        title.includes(searchQuery) || 
        desc.includes(searchQuery) || 
        cat.includes(searchQuery) || 
        author.includes(searchQuery);

      if (matchesFeed && matchesCategory && matchesAuthor && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Check if both grids are empty
    const trendingGrid = document.querySelector('#trending .card-grid');
    const latestGrid = document.querySelector('#latest .card-grid');

    updateEmptyState(trendingGrid, '#trending');
    updateEmptyState(latestGrid, '#latest');

    updateTabCounts();
  }

  // Update Dynamic Counts on Feed Tabs
  function updateTabCounts() {
    const bookmarkedIds = getStoredBookmarks();
    const customPostsCount = getCustomPosts().length;

    const allNotesCount = 6 + customPostsCount;
    const trendingCount = 3;
    const latestCount = 3 + customPostsCount;
    const bookmarksCount = bookmarkedIds.length;

    const elAll = document.getElementById('count-tab-all');
    const elTrending = document.getElementById('count-tab-trending');
    const elLatest = document.getElementById('count-tab-latest');
    const elBookmarks = document.getElementById('count-tab-bookmarks');

    if (elAll) elAll.textContent = allNotesCount;
    if (elTrending) elTrending.textContent = trendingCount;
    if (elLatest) elLatest.textContent = latestCount;
    if (elBookmarks) elBookmarks.textContent = bookmarksCount;
  }

  function updateEmptyState(gridEl, sectionId) {
    if (!gridEl) return;
    const cards = gridEl.querySelectorAll('.post-card');
    let hasVisible = false;
    cards.forEach(c => {
      if (c.style.display !== 'none') hasVisible = true;
    });

    let emptyEl = gridEl.querySelector('.empty-results');
    if (!hasVisible) {
      if (!emptyEl) {
        emptyEl = document.createElement('div');
        emptyEl.className = 'empty-results';
        
        const isBookmarkTab = (activeFeedView === 'bookmarked');
        emptyEl.innerHTML = `
          <span class="empty-icon">${isBookmarkTab ? '⭐' : '📌'}</span>
          <h4 class="empty-title">${isBookmarkTab ? 'No saved notes yet' : 'No notes found on this corkboard'}</h4>
          <p class="empty-desc">${isBookmarkTab 
            ? 'Click the bookmark ribbon on any card to pin it to your saved notes!'
            : 'No student notes match your current filters. Try resetting the filters or pin a new note!'}</p>
          <button class="btn btn-outline btn-sm reset-filter-btn" style="margin-top:8px;">Reset All Filters</button>
        `;
        emptyEl.querySelector('.reset-filter-btn')?.addEventListener('click', resetAllFilters);
        gridEl.appendChild(emptyEl);
      }
    } else {
      if (emptyEl) emptyEl.remove();
    }
  }

  function resetAllFilters() {
    activeCategory = 'All';
    activeAuthorFilter = '';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    if (searchClearBtn) searchClearBtn.classList.remove('visible');
    filterChips.forEach(c => {
      if (c.dataset.category === 'All') c.classList.add('active');
      else c.classList.remove('active');
    });
    switchFeedTab('all', false);
    applyFiltersAndSort();
    showToast("Filters reset to all notes", "🔄");
  }

  // ============================================================
  // 10. ARTICLE READER MODAL (WITH TABS: READ vs COMMENTS)
  // ============================================================
  const articleModal = document.getElementById('article-modal');
  const articleCloseBtn = document.getElementById('article-modal-close');
  const articleTabRead = document.getElementById('article-tab-read');
  const articleTabComments = document.getElementById('article-tab-comments');
  const readerArticleView = document.getElementById('reader-article-view');
  const readerCommentsView = document.getElementById('reader-comments-view');
  let currentArticlePostId = null;

  function switchArticleTab(tabName) {
    if (tabName === 'comments') {
      articleTabComments?.classList.add('active');
      articleTabRead?.classList.remove('active');
      if (readerArticleView) readerArticleView.style.display = 'none';
      if (readerCommentsView) readerCommentsView.style.display = 'block';
    } else {
      articleTabRead?.classList.add('active');
      articleTabComments?.classList.remove('active');
      if (readerArticleView) readerArticleView.style.display = 'block';
      if (readerCommentsView) readerCommentsView.style.display = 'none';
    }
  }

  articleTabRead?.addEventListener('click', () => switchArticleTab('read'));
  articleTabComments?.addEventListener('click', () => switchArticleTab('comments'));

  function openArticleModal(postId) {
    const post = getPostById(postId);
    if (!post || !articleModal) return;

    currentArticlePostId = postId;
    const likedPosts = getStoredLikes();
    const bookmarks = getStoredBookmarks();
    const isLiked = likedPosts.includes(postId);
    const isBookmarked = bookmarks.includes(postId);
    const likeCount = isLiked ? post.likes + 1 : post.likes;

    // Reset to Read tab
    switchArticleTab('read');

    // Fill Reader contents
    const cover = document.getElementById('reader-cover');
    const tag = document.getElementById('reader-cat-tag');
    const title = document.getElementById('reader-title');
    const avatar = document.getElementById('reader-avatar');
    const author = document.getElementById('reader-author');
    const date = document.getElementById('reader-date');
    const readTime = document.getElementById('reader-readtime');
    const content = document.getElementById('reader-content');
    const likeBtn = document.getElementById('reader-like-btn');
    const bmBtn = document.getElementById('reader-bookmark-btn');

    if (cover) cover.style.background = post.gradient;
    if (tag) tag.textContent = post.category;
    if (title) title.textContent = post.title;
    if (avatar) avatar.textContent = post.avatar;
    if (author) author.textContent = post.author;
    if (date) date.textContent = post.date;
    if (readTime) readTime.textContent = post.readTime;

    if (content) {
      content.innerHTML = post.content
        .split('\n\n')
        .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
        .join('');
    }

    if (likeBtn) {
      likeBtn.dataset.id = postId;
      likeBtn.className = `like-btn ${isLiked ? 'liked' : ''}`;
      likeBtn.querySelector('.like-num').textContent = likeCount;
    }

    if (bmBtn) {
      bmBtn.dataset.id = postId;
      bmBtn.className = `bookmark-toggle ${isBookmarked ? 'bookmarked' : ''}`;
    }

    renderComments(postId);

    articleModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeArticleModal() {
    if (!articleModal) return;
    articleModal.classList.remove('active');
    document.body.style.overflow = '';
    currentArticlePostId = null;
  }

  articleCloseBtn?.addEventListener('click', closeArticleModal);
  articleModal?.addEventListener('click', (e) => {
    if (e.target === articleModal) closeArticleModal();
  });

  // Comments rendering & submission
  function renderComments(postId) {
    const post = getPostById(postId);
    const listEl = document.getElementById('reader-comments-list');
    const countEl = document.getElementById('reader-comments-count');
    const tabNumEl = document.getElementById('reader-tab-comments-num');
    if (!post || !listEl) return;

    const storedComments = JSON.parse(localStorage.getItem(`campus_comments_${postId}`) || '[]');
    const allComments = [...post.comments, ...storedComments];

    if (countEl) countEl.textContent = `(${allComments.length})`;
    if (tabNumEl) tabNumEl.textContent = `(${allComments.length})`;

    if (allComments.length === 0) {
      listEl.innerHTML = `<p style="font-size:13px; color:var(--ink-faint); margin:4px 0;">No comments yet. Be the first classmate to comment!</p>`;
      return;
    }

    listEl.innerHTML = allComments.map(c => `
      <div class="comment-card">
        <div class="comment-head">
          <span class="comment-author-name">👤 ${c.author}</span>
          <span class="comment-time">${c.time}</span>
        </div>
        <p class="comment-body">${escapeHTML(c.text)}</p>
      </div>
    `).join('');
  }

  const commentForm = document.getElementById('reader-comment-form');
  const commentInput = document.getElementById('reader-comment-input');

  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!currentArticlePostId) return;

      const text = commentInput.value.trim();
      if (!text) return;

      const user = getStoredUser();
      const authorName = user ? user.name : "Anonymous Student";

      const newComment = {
        id: "c_" + Date.now(),
        author: authorName,
        text: text,
        time: "Just now"
      };

      const key = `campus_comments_${currentArticlePostId}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.unshift(newComment);
      localStorage.setItem(key, JSON.stringify(existing));

      commentInput.value = '';
      renderComments(currentArticlePostId);

      const post = getPostById(currentArticlePostId);
      const totalComments = post.comments.length + existing.length;
      document.querySelectorAll(`.post-card[data-id="${currentArticlePostId}"] .post-stats span:nth-child(2)`).forEach(el => {
        el.textContent = `💬 ${totalComments}`;
      });

      showToast("Your comment was pinned to the note! 💬", "✨");
    });
  }

  // ============================================================
  // 11. "START WRITING" MODAL (WITH TABS: EDIT vs LIVE PREVIEW)
  // ============================================================
  const createModal = document.getElementById('create-post-modal');
  const createCloseBtn = document.getElementById('create-modal-close');
  const createForm = document.getElementById('create-post-form');
  const writeNavBtn = document.getElementById('write-btn');
  const mobileWriteBtn = document.getElementById('mobile-write-btn');
  const heroWriteBtn = document.getElementById('hero-write-btn');

  const createTabEdit = document.getElementById('create-tab-edit');
  const createTabPreview = document.getElementById('create-tab-preview');
  const createFieldsWrap = document.getElementById('create-fields-wrap');
  const createPreviewWrap = document.getElementById('create-preview-wrap');

  let selectedGradient = "linear-gradient(135deg, #E3A23C, #C4573B)";

  function switchCreateTab(tabName) {
    if (tabName === 'preview') {
      createTabPreview?.classList.add('active');
      createTabEdit?.classList.remove('active');
      if (createFieldsWrap) createFieldsWrap.style.display = 'none';
      if (createPreviewWrap) {
        renderLivePreviewCard();
        createPreviewWrap.style.display = 'block';
        createPreviewWrap.classList.add('active');
      }
    } else {
      createTabEdit?.classList.add('active');
      createTabPreview?.classList.remove('active');
      if (createFieldsWrap) createFieldsWrap.style.display = 'block';
      if (createPreviewWrap) {
        createPreviewWrap.style.display = 'none';
        createPreviewWrap.classList.remove('active');
      }
    }
  }

  createTabEdit?.addEventListener('click', () => switchCreateTab('edit'));
  createTabPreview?.addEventListener('click', () => switchCreateTab('preview'));

  function renderLivePreviewCard() {
    if (!createPreviewWrap) return;
    const title = document.getElementById('post-title-input')?.value.trim() || "Untitled Note";
    const category = document.getElementById('post-category-select')?.value || "📝 Study Tips";
    const author = document.getElementById('post-author-input')?.value.trim() || "Student Writer";
    const readTime = document.getElementById('post-readtime-input')?.value.trim() || "2 min read";
    const desc = document.getElementById('post-desc-input')?.value.trim() || "Your note summary hook will display here on the campus corkboard...";
    const initials = author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || "SW";

    createPreviewWrap.innerHTML = `
      <div style="max-width: 380px; margin: 0 auto;">
        <article class="post-card" style="box-shadow: var(--shadow-pop); transform: rotate(-0.5deg);">
          <div class="post-cover" style="background-image: ${selectedGradient};">
            <span class="post-thumbtack">📌</span>
            <span class="post-cat-tag">${escapeHTML(category)}</span>
          </div>
          <div class="post-body">
            <h3 class="post-title">${escapeHTML(title)}</h3>
            <p class="post-desc">${escapeHTML(desc)}</p>
            <div class="post-meta-row">
              <span class="post-avatar">${escapeHTML(initials)}</span>
              <span>${escapeHTML(author)}</span>
              <span class="dot-sep"></span>
              <span>Today</span>
              <span class="dot-sep"></span>
              <span>${escapeHTML(readTime)}</span>
            </div>
            <div class="post-divider"></div>
            <div class="post-foot">
              <div class="post-stats">
                <span>❤ 1</span>
                <span>💬 0</span>
              </div>
              <span style="font-size:11.5px; font-family:var(--font-mono); color:var(--sage-dark); font-weight:700;">LIVE PREVIEW ✨</span>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  function openCreateModal() {
    if (!createModal) return;
    const user = getStoredUser();
    const authorInput = document.getElementById('post-author-input');
    if (authorInput && user) {
      authorInput.value = user.name;
    }
    switchCreateTab('edit');
    createModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCreateModal() {
    if (!createModal) return;
    createModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  writeNavBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openCreateModal();
  });

  mobileWriteBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openCreateModal();
  });

  heroWriteBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openCreateModal();
  });

  createCloseBtn?.addEventListener('click', closeCreateModal);
  createModal?.addEventListener('click', (e) => {
    if (e.target === createModal) closeCreateModal();
  });

  // Color picker options inside Create Modal
  const colorOptions = document.querySelectorAll('.color-option-btn');
  colorOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      colorOptions.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedGradient = btn.dataset.gradient;
      if (createPreviewWrap?.style.display !== 'none') {
        renderLivePreviewCard();
      }
    });
  });

  if (createForm) {
    createForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('post-title-input').value.trim();
      const category = document.getElementById('post-category-select').value;
      const author = document.getElementById('post-author-input').value.trim() || "Dev Student";
      const readTime = document.getElementById('post-readtime-input').value.trim() || "2 min read";
      const desc = document.getElementById('post-desc-input').value.trim();
      const content = document.getElementById('post-content-input').value.trim();

      if (!title || !desc || !content) {
        showToast("Please fill in the title, summary, and article content!", "⚠️");
        return;
      }

      const user = getStoredUser();
      const currentUserId = user ? (user.id || user.roll || user.name) : "guest";
      const currentUserRoll = user ? (user.roll || "") : "";

      const initials = author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || "ST";
      const newPostId = "custom-" + Date.now();

      const newPost = {
        id: newPostId,
        userId: currentUserId,
        userRoll: currentUserRoll,
        title: title,
        desc: desc,
        content: content,
        category: category,
        author: author,
        avatar: initials,
        date: "Today",
        readTime: readTime,
        likes: 1,
        commentsCount: 0,
        gradient: selectedGradient,
        isTrending: false,
        comments: []
      };

      const customPosts = getCustomPosts();
      customPosts.unshift(newPost);
      setCustomPosts(customPosts);

      const latestGrid = document.querySelector('#latest .card-grid');
      if (latestGrid) {
        const cardEl = createCardElement(newPost);
        latestGrid.prepend(cardEl);
      }

      const blogStat = document.querySelectorAll('.stat-item')[1]?.querySelector('.stat-num');
      if (blogStat) {
        blogStat.textContent = (85 + customPosts.length) + "+";
      }

      createForm.reset();
      closeCreateModal();

      showToast(`🎉 New note pinned: "${title.substring(0, 24)}..."!`, '📌');
      updateTabCounts();
      smoothScrollToSection('#latest');
    });
  }

  // Delete an individual post by author
  function deleteSinglePost(postId) {
    const customPosts = getCustomPosts();
    const targetPost = customPosts.find(p => p.id === postId);
    if (!targetPost) return;

    const confirmed = confirm(`Are you sure you want to delete "${targetPost.title}" from the corkboard?`);
    if (!confirmed) return;

    const remaining = customPosts.filter(p => p.id !== postId);
    setCustomPosts(remaining);
    localStorage.removeItem(`campus_comments_${postId}`);

    const bookmarks = getStoredBookmarks().filter(id => id !== postId);
    setStoredBookmarks(bookmarks);

    document.querySelectorAll(`.post-card[data-id="${postId}"]`).forEach(card => {
      card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.85)';
      setTimeout(() => card.remove(), 250);
    });

    const blogStat = document.querySelectorAll('.stat-item')[1]?.querySelector('.stat-num');
    if (blogStat) {
      blogStat.textContent = (85 + remaining.length) + "+";
    }

    updateBookmarkBadge();
    updateTabCounts();
    applyFiltersAndSort();

    showToast(`Deleted "${targetPost.title.substring(0, 22)}..." from corkboard 🗑️`, "✨");
  }

  function createCardElement(post) {
    const user = getStoredUser();
    const currentUserId = user ? (user.id || user.roll || user.name) : null;
    const isOwner = post.userId && currentUserId && (
      post.userId === currentUserId ||
      (post.author && user && post.author.toLowerCase() === user.name.toLowerCase())
    );

    const article = document.createElement('article');
    article.className = 'post-card highlight-pulse';
    article.dataset.id = post.id;
    if (post.userId) article.dataset.userId = post.userId;

    const deleteBtnHtml = isOwner ? `
      <button class="delete-post-btn" data-id="${post.id}" title="Delete this note" aria-label="Delete this note">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    ` : '';

    article.innerHTML = `
      <div class="post-cover" style="background-image: ${post.gradient};">
        <span class="post-thumbtack">📌</span>
        <span class="post-cat-tag">${escapeHTML(post.category)}</span>
      </div>
      <div class="post-body">
        <h3 class="post-title">${escapeHTML(post.title)}</h3>
        <p class="post-desc">${escapeHTML(post.desc)}</p>
        <div class="post-meta-row">
          <span class="post-avatar">${escapeHTML(post.avatar)}</span>
          <span>${escapeHTML(post.author)}</span>
          <span class="dot-sep"></span>
          <span>${post.date}</span>
          <span class="dot-sep"></span>
          <span>${escapeHTML(post.readTime)}</span>
        </div>
        <div class="post-divider"></div>
        <div class="post-foot">
          <div class="post-stats">
            <button class="like-btn" data-id="${post.id}" aria-label="Like post">
              <span class="heart-icon">❤</span> <span class="like-num">${post.likes}</span>
            </button>
            <span>💬 ${post.commentsCount}</span>
          </div>
          <div class="card-btn-row">
            ${deleteBtnHtml}
            <button class="bookmark-toggle" data-id="${post.id}" title="Bookmark" aria-label="Bookmark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <a href="#" class="readmore-btn" data-id="${post.id}">Read More →</a>
          </div>
        </div>
      </div>
    `;
    return article;
  }

  // Refresh owner delete buttons on all cards based on current user
  function refreshOwnerControlsOnCards() {
    const user = getStoredUser();
    const currentUserId = user ? (user.id || user.roll || user.name) : null;

    document.querySelectorAll('.post-card').forEach(card => {
      const cardId = card.dataset.id;
      const post = getPostById(cardId);
      const isCustom = cardId && cardId.startsWith('custom-');
      const isOwner = isCustom && post && post.userId && currentUserId && (
        post.userId === currentUserId ||
        (post.author && user && post.author.toLowerCase() === user.name.toLowerCase())
      );

      const btnRow = card.querySelector('.card-btn-row');
      if (!btnRow) return;

      const existingDel = btnRow.querySelector('.delete-post-btn');
      if (isOwner) {
        if (!existingDel) {
          const delBtn = document.createElement('button');
          delBtn.className = 'delete-post-btn';
          delBtn.dataset.id = cardId;
          delBtn.setAttribute('title', 'Delete this note');
          delBtn.setAttribute('aria-label', 'Delete this note');
          delBtn.innerHTML = `
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          `;
          btnRow.prepend(delBtn);
        }
      } else {
        if (existingDel) existingDel.remove();
      }
    });
  }

  // Load custom posts on startup
  (function loadCustomPostsOnStartup() {
    const customPosts = getCustomPosts();
    const latestGrid = document.querySelector('#latest .card-grid');
    if (latestGrid && customPosts.length > 0) {
      customPosts.forEach(post => {
        const cardEl = createCardElement(post);
        latestGrid.prepend(cardEl);
      });
    }
  })();

  // Synchronize initial post card elements
  (function syncCardsStartup() {
    const likedPosts = getStoredLikes();
    const bookmarks = getStoredBookmarks();

    document.querySelectorAll('.post-card').forEach((card, index) => {
      const postId = card.dataset.id || `post-${index + 1}`;
      card.dataset.id = postId;

      const likeBtn = card.querySelector('.like-btn');
      if (likeBtn) {
        likeBtn.dataset.id = postId;
        if (likedPosts.includes(postId)) likeBtn.classList.add('liked');
      }

      const bmBtn = card.querySelector('.bookmark-toggle');
      if (bmBtn) {
        bmBtn.dataset.id = postId;
        if (bookmarks.includes(postId)) bmBtn.classList.add('bookmarked');
      }

      const rmBtn = card.querySelector('.readmore-btn');
      if (rmBtn) {
        rmBtn.dataset.id = postId;
      }
    });

    updateTabCounts();
  })();

  // ============================================================
  // 12. SAVED BOOKMARKS MODAL
  // ============================================================
  const bookmarksModal = document.getElementById('bookmarks-modal');
  const bookmarksCloseBtn = document.getElementById('bookmarks-modal-close');
  const bookmarksNavBtn = document.getElementById('bookmarks-nav-btn');

  function openBookmarksModal() {
    if (!bookmarksModal) return;
    renderBookmarksList();
    bookmarksModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBookmarksModal() {
    if (!bookmarksModal) return;
    bookmarksModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  bookmarksNavBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openBookmarksModal();
  });

  bookmarksCloseBtn?.addEventListener('click', closeBookmarksModal);
  bookmarksModal?.addEventListener('click', (e) => {
    if (e.target === bookmarksModal) closeBookmarksModal();
  });

  function renderBookmarksList() {
    const listEl = document.getElementById('bookmarks-list-container');
    if (!listEl) return;

    const bookmarkIds = getStoredBookmarks();
    if (bookmarkIds.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding: 32px 16px; color:var(--ink-faint);">
          <span style="font-size:36px; display:block; margin-bottom:10px;">📌</span>
          <h4 style="margin:0 0 6px; font-family:var(--font-display); color:var(--ink);">No Saved Notes Yet</h4>
          <p style="font-size:13px; margin:0;">Click the bookmark ribbon on any card to save study notes, project ideas, or articles here!</p>
        </div>
      `;
      return;
    }

    const savedPosts = bookmarkIds.map(id => getPostById(id)).filter(Boolean);

    listEl.innerHTML = savedPosts.map(post => `
      <div class="comment-card" style="display:flex; flex-direction:row; justify-content:space-between; align-items:center; gap:12px;">
        <div style="flex:1;">
          <span style="font-size:11px; font-family:var(--font-mono); color:var(--sage-dark); font-weight:700;">${post.category}</span>
          <h4 style="margin:4px 0 2px; font-size:14.5px; font-family:var(--font-display);">${escapeHTML(post.title)}</h4>
          <span style="font-size:12px; color:var(--ink-faint);">${post.author} · ${post.readTime}</span>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-outline btn-sm read-saved-btn" data-id="${post.id}" style="padding:6px 12px; font-size:12px;">Read</button>
          <button class="btn btn-ghost btn-sm remove-saved-btn" data-id="${post.id}" style="padding:6px 8px; font-size:12px;" title="Remove">✕</button>
        </div>
      </div>
    `).join('');

    listEl.querySelectorAll('.read-saved-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        closeBookmarksModal();
        openArticleModal(btn.dataset.id);
      });
    });

    listEl.querySelectorAll('.remove-saved-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleBookmark(btn.dataset.id, btn);
        renderBookmarksList();
      });
    });
  }

  // ============================================================
  // 13. STICKY NOTES DASHBOARD & PINBOARD CONTROLLER
  // ============================================================

  const DEFAULT_STICKY_NOTES = [
    {
      id: "sn-1",
      title: "DSA Midterm Syllabus & Rev Sheet",
      content: "Prof. Verma confirmed Midterms on Oct 28th in Room 302. Review Graph Traversals, Shortest Paths, and AVL rotations thoroughly!",
      category: "Exam Prep",
      priority: "urgent", // 'urgent', 'priority', 'normal'
      color: "yellow", // 'yellow', 'green', 'blue', 'pink', 'purple', 'orange'
      pinned: true,
      author: "Priya Sharma",
      sem: "5th Sem IT",
      userId: "22IT045",
      date: "Oct 20, 2026",
      tasks: [
        { text: "BFS vs DFS practice problems", done: true },
        { text: "Dijkstra algorithm runtime proof", done: true },
        { text: "AVL Tree rotations trace", done: false },
        { text: "LeetCode 50 campus sheet", done: false }
      ]
    },
    {
      id: "sn-2",
      title: "Hackathon Team Search (Smart Campus Hack)",
      content: "Looking for 1 frontend dev with HTML/CSS & JS skills for the 36-hr hackathon this weekend. Pitch & backend APIs ready!",
      category: "Project Tasks",
      priority: "priority",
      color: "green",
      pinned: true,
      author: "Aarav Sharma",
      sem: "3rd Sem CSE",
      userId: "23CS108",
      date: "Oct 20, 2026",
      tasks: [
        { text: "Draft problem statement & architecture", done: true },
        { text: "Figma interactive wireframes", done: true },
        { text: "Find 4th teammate (Frontend/UI)", done: false },
        { text: "Register team on hackathon portal", done: false }
      ]
    },
    {
      id: "sn-3",
      title: "Library Study Group @ Room 204",
      content: "OS revision session on Deadlocks (Banker's Algorithm) and Memory Virtualization. Open to all 3rd sem students!",
      category: "Study Groups",
      priority: "normal",
      color: "blue",
      pinned: false,
      author: "Sara Khan",
      sem: "3rd Sem CSE",
      userId: "23CS094",
      date: "Oct 19, 2026",
      tasks: [
        { text: "Reserve Study Room 204 (4:30 PM)", done: true },
        { text: "Print lecture slides on Paging", done: true },
        { text: "Bring whiteboard markers & thermos ☕", done: false }
      ]
    },
    {
      id: "sn-4",
      title: "FEE 3rd Sem Project Milestone",
      content: "Submission deadline next Tuesday. Make sure responsive design, Pinboard UI, and clean CSS architecture are finalized.",
      category: "Project Tasks",
      priority: "urgent",
      color: "pink",
      pinned: false,
      author: "Devansh Nair",
      sem: "3rd Sem CSE",
      userId: "23CS112",
      date: "Oct 19, 2026",
      tasks: [
        { text: "Interactive Sticky Notes Dashboard", done: true },
        { text: "Professional Student Auth Portal", done: true },
        { text: "Responsive testing on mobile", done: true },
        { text: "Push clean code to GitHub repo", done: false }
      ]
    },
    {
      id: "sn-5",
      title: "Campus Coding Club Git Workshop",
      content: "Hands-on Git & Open Source workshop for juniors on Saturday 11 AM at Audi-B. Free stickers and cheat sheets!",
      category: "Campus Ideas",
      priority: "priority",
      color: "purple",
      pinned: false,
      author: "Rahul Verma",
      sem: "7th Sem ECE",
      userId: "21EC089",
      date: "Oct 18, 2026",
      tasks: [
        { text: "Reserve Audi-B projector & mics", done: true },
        { text: "Share repo clone setup guide", done: false },
        { text: "Print Git command cheat sheets", done: false }
      ]
    },
    {
      id: "sn-6",
      title: "Book Exchange: CLRS Algorithms (3rd Ed)",
      content: "Got a spare copy of CLRS Algorithms in mint condition. Happy to lend or swap for Computer Networks (Tanenbaum)!",
      category: "Announcements",
      priority: "normal",
      color: "orange",
      pinned: false,
      author: "Ananya Iyer",
      sem: "4th Sem IT",
      userId: "22IT061",
      date: "Oct 18, 2026",
      tasks: [
        { text: "Check book condition & pages", done: true },
        { text: "Meet outside central cafeteria", done: false }
      ]
    }
  ];

  function getStoredStickyNotes() {
    const raw = localStorage.getItem('campus_sticky_notes');
    if (!raw) {
      localStorage.setItem('campus_sticky_notes', JSON.stringify(DEFAULT_STICKY_NOTES));
      return DEFAULT_STICKY_NOTES;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return DEFAULT_STICKY_NOTES;
    }
  }

  function setStoredStickyNotes(notes) {
    localStorage.setItem('campus_sticky_notes', JSON.stringify(notes));
  }

  const stickyNotesContainer = document.getElementById('sticky-notes-container');
  const stickySearchInput = document.getElementById('sticky-search-input');
  const stickySearchClear = document.getElementById('sticky-search-clear');
  const stickySortSelect = document.getElementById('sticky-sort-select');
  const stickyCategoryChips = document.querySelectorAll('#sticky-category-chips .pb-chip');
  const stickyColorFilterDots = document.querySelectorAll('#sticky-color-filters .pb-color-dot');
  const addStickyBtn = document.getElementById('add-sticky-btn');
  const heroStickyBtn = document.getElementById('hero-sticky-btn');
  const resetStickyBtn = document.getElementById('reset-sticky-btn');

  // Filter States
  let stickySearchQuery = '';
  let activeStickyCategory = 'All';
  let activeStickyColor = 'all';
  let activeStickySort = 'pinned';

  // Render Pinboard Sticky Notes
  function renderStickyNotes() {
    if (!stickyNotesContainer) return;
    const allNotes = getStoredStickyNotes();
    const currentUser = getStoredUser();

    // 1. Filter
    let filtered = allNotes.filter(note => {
      // Category filter
      const matchesCat = (activeStickyCategory === 'All') || (note.category.toLowerCase() === activeStickyCategory.toLowerCase());

      // Color filter
      const matchesColor = (activeStickyColor === 'all') || (note.color === activeStickyColor);

      // Search query
      let matchesSearch = true;
      if (stickySearchQuery) {
        const q = stickySearchQuery.toLowerCase();
        const inTitle = note.title.toLowerCase().includes(q);
        const inContent = note.content.toLowerCase().includes(q);
        const inAuthor = note.author.toLowerCase().includes(q);
        const inCategory = note.category.toLowerCase().includes(q);
        const inTasks = (note.tasks || []).some(t => t.text.toLowerCase().includes(q));
        matchesSearch = (inTitle || inContent || inAuthor || inCategory || inTasks);
      }

      return matchesCat && matchesColor && matchesSearch;
    });

    // 2. Sort
    filtered.sort((a, b) => {
      if (activeStickySort === 'pinned') {
        if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
      } else if (activeStickySort === 'urgent') {
        const priorityScore = { urgent: 3, priority: 2, normal: 1 };
        const scoreA = priorityScore[a.priority] || 1;
        const scoreB = priorityScore[b.priority] || 1;
        if (scoreA !== scoreB) return scoreB - scoreA;
      } else if (activeStickySort === 'tasks') {
        const remainingA = (a.tasks || []).filter(t => !t.done).length;
        const remainingB = (b.tasks || []).filter(t => !t.done).length;
        return remainingB - remainingA;
      }
      return 0;
    });

    // 3. Render HTML
    if (filtered.length === 0) {
      stickyNotesContainer.innerHTML = `
        <div class="sn-empty-board">
          <span class="sn-empty-icon">📌</span>
          <h3 class="sn-empty-title">No Sticky Notes Match Filter</h3>
          <p class="sn-empty-desc">No campus notes found for "${escapeHTML(stickySearchQuery || activeStickyCategory)}". Try resetting your filters or pin a new note!</p>
          <button type="button" class="btn btn-outline btn-sm" id="sn-reset-filters-btn" style="background:#fff; color:var(--ink); margin-top:6px;">Reset Pinboard Filters</button>
        </div>
      `;
      document.getElementById('sn-reset-filters-btn')?.addEventListener('click', () => {
        stickySearchQuery = '';
        activeStickyCategory = 'All';
        activeStickyColor = 'all';
        if (stickySearchInput) stickySearchInput.value = '';
        stickySearchClear?.classList.remove('visible');
        stickyCategoryChips.forEach(c => c.classList.toggle('active', c.dataset.cat === 'All'));
        stickyColorFilterDots.forEach(d => d.classList.toggle('active', d.dataset.color === 'all'));
        renderStickyNotes();
      });
    } else {
      stickyNotesContainer.innerHTML = filtered.map(note => {
        const isOwner = currentUser && (
          (note.userId && note.userId === (currentUser.id || currentUser.roll)) ||
          (note.author && note.author.toLowerCase() === currentUser.name.toLowerCase())
        );

        const tasks = note.tasks || [];
        const doneTasks = tasks.filter(t => t.done).length;
        const totalTasks = tasks.length;
        const progressPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

        const priorityLabel = note.priority === 'urgent' ? '🔥 Urgent' : (note.priority === 'priority' ? '⭐ Priority' : '📌 Normal');

        const checklistHTML = totalTasks > 0 ? `
          <div class="sn-checklist">
            <div class="sn-checklist-head">
              <span>To-Do Checklist</span>
              <span>${doneTasks}/${totalTasks} (${progressPercent}%)</span>
            </div>
            <div class="sn-progress-bar">
              <div class="sn-progress-fill" style="width: ${progressPercent}%;"></div>
            </div>
            <ul class="sn-task-list">
              ${tasks.map((task, tIndex) => `
                <li class="sn-task-item ${task.done ? 'done' : ''}" data-task-index="${tIndex}">
                  <input type="checkbox" ${task.done ? 'checked' : ''} id="task-${note.id}-${tIndex}" aria-label="${escapeHTML(task.text)}">
                  <span>${escapeHTML(task.text)}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : '';

        return `
          <div class="sticky-note color-${note.color} ${note.pinned ? 'is-starred' : ''}" data-id="${note.id}" data-color="${note.color}">
            <div class="sn-pin-wrap">
              <span class="sn-thumbtack ${note.pinned ? 'is-pinned' : ''}" title="${note.pinned ? 'Pinned note' : 'Note'}">📌</span>
            </div>
            
            <div class="sn-header">
              <span class="sn-cat-badge">${escapeHTML(note.category)}</span>
              <span class="sn-priority-pill priority-${note.priority}">${priorityLabel}</span>
              <button class="sn-action-pin ${note.pinned ? 'active' : ''}" data-id="${note.id}" title="${note.pinned ? 'Unpin from top' : 'Pin to top of corkboard'}">
                ${note.pinned ? '⭐' : '📌'}
              </button>
            </div>

            <h3 class="sn-title">${escapeHTML(note.title)}</h3>
            <p class="sn-content">${escapeHTML(note.content)}</p>

            ${checklistHTML}

            <div class="sn-footer">
              <div class="sn-meta">
                <span class="sn-author">👤 ${escapeHTML(note.author)}${isOwner ? ' (You)' : ''}</span>
                <span class="sn-time">${escapeHTML(note.sem || '')} · ${note.date}</span>
              </div>

              <div class="sn-footer-actions">
                <div class="sn-color-dots" title="Change note color">
                  <span class="sn-color-btn c-yellow" data-set-color="yellow" data-id="${note.id}" title="Yellow"></span>
                  <span class="sn-color-btn c-green" data-set-color="green" data-id="${note.id}" title="Green"></span>
                  <span class="sn-color-btn c-blue" data-set-color="blue" data-id="${note.id}" title="Blue"></span>
                  <span class="sn-color-btn c-pink" data-set-color="pink" data-id="${note.id}" title="Pink"></span>
                  <span class="sn-color-btn c-purple" data-set-color="purple" data-id="${note.id}" title="Purple"></span>
                  <span class="sn-color-btn c-orange" data-set-color="orange" data-id="${note.id}" title="Orange"></span>
                </div>
                <button class="sn-edit-btn" data-id="${note.id}" title="Edit this note" aria-label="Edit note">✏️</button>
                <button class="sn-delete-btn" data-id="${note.id}" title="Delete this note" aria-label="Delete note">🗑️</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    updatePinboardMetrics();
    attachStickyCardEvents();
  }

  // Update Pinboard Metric Counter Pills
  function updatePinboardMetrics() {
    const allNotes = getStoredStickyNotes();
    const totalCount = allNotes.length;
    const pinnedCount = allNotes.filter(n => n.pinned).length;
    const urgentCount = allNotes.filter(n => n.priority === 'urgent').length;

    let totalTasks = 0;
    let completedTasks = 0;
    allNotes.forEach(n => {
      (n.tasks || []).forEach(t => {
        totalTasks++;
        if (t.done) completedTasks++;
      });
    });

    const elTotal = document.getElementById('pb-stat-total');
    const elPinned = document.getElementById('pb-stat-pinned');
    const elTasks = document.getElementById('pb-stat-tasks');
    const elUrgent = document.getElementById('pb-stat-urgent');

    if (elTotal) elTotal.textContent = totalCount;
    if (elPinned) elPinned.textContent = pinnedCount;
    if (elTasks) elTasks.textContent = `${completedTasks}/${totalTasks}`;
    if (elUrgent) elUrgent.textContent = urgentCount;

    // Update Profile Dropdown count if user logged in
    const user = getStoredUser();
    const pdSticky = document.getElementById('pd-stat-sticky');
    if (pdSticky && user) {
      const userStickyCount = allNotes.filter(n => {
        return (n.userId && n.userId === (user.id || user.roll)) ||
               (n.author && n.author.toLowerCase() === user.name.toLowerCase());
      }).length;
      pdSticky.textContent = userStickyCount;
    }
  }

  // Attach Click Handlers to Sticky Card Elements
  function attachStickyCardEvents() {
    if (!stickyNotesContainer) return;

    // 1. Checklist Toggles
    stickyNotesContainer.querySelectorAll('.sn-task-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const card = item.closest('.sticky-note');
        if (!card) return;
        const noteId = card.dataset.id;
        const taskIdx = parseInt(item.dataset.taskIndex, 10);

        const allNotes = getStoredStickyNotes();
        const note = allNotes.find(n => n.id === noteId);
        if (!note || !note.tasks || !note.tasks[taskIdx]) return;

        // Toggle state
        note.tasks[taskIdx].done = !note.tasks[taskIdx].done;
        setStoredStickyNotes(allNotes);

        const taskText = note.tasks[taskIdx].text;
        if (note.tasks[taskIdx].done) {
          showToast(`Completed task: "${taskText}"! ✅`, '🎯');
        }

        renderStickyNotes();
      });
    });

    // 2. Pin / Unpin Action
    stickyNotesContainer.querySelectorAll('.sn-action-pin').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const noteId = btn.dataset.id;
        const allNotes = getStoredStickyNotes();
        const note = allNotes.find(n => n.id === noteId);
        if (!note) return;

        note.pinned = !note.pinned;
        setStoredStickyNotes(allNotes);

        showToast(note.pinned ? `Pinned "${note.title.substring(0, 20)}..." to top! ⭐` : `Unpinned "${note.title.substring(0, 20)}..." 📌`, '📌');
        renderStickyNotes();
      });
    });

    // 3. Quick Color Switcher Dots
    stickyNotesContainer.querySelectorAll('.sn-color-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const noteId = btn.dataset.id;
        const newColor = btn.dataset.setColor;
        const allNotes = getStoredStickyNotes();
        const note = allNotes.find(n => n.id === noteId);
        if (!note || !newColor) return;

        note.color = newColor;
        setStoredStickyNotes(allNotes);

        showToast(`Changed note color to ${newColor}! 🎨`, '✨');
        renderStickyNotes();
      });
    });

    // 4. Edit Note Button
    stickyNotesContainer.querySelectorAll('.sn-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openStickyModalForEdit(btn.dataset.id);
      });
    });

    // 5. Delete Note Button
    stickyNotesContainer.querySelectorAll('.sn-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const noteId = btn.dataset.id;
        deleteStickyNote(noteId);
      });
    });
  }

  // Delete Sticky Note
  function deleteStickyNote(noteId) {
    const allNotes = getStoredStickyNotes();
    const target = allNotes.find(n => n.id === noteId);
    if (!target) return;

    const confirmed = confirm(`Are you sure you want to remove "${target.title}" from the corkboard?`);
    if (!confirmed) return;

    const remaining = allNotes.filter(n => n.id !== noteId);
    setStoredStickyNotes(remaining);

    // Animate removal from DOM
    const cardEl = stickyNotesContainer.querySelector(`.sticky-note[data-id="${noteId}"]`);
    if (cardEl) {
      cardEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'scale(0.8) rotate(10deg)';
      setTimeout(() => {
        renderStickyNotes();
      }, 250);
    } else {
      renderStickyNotes();
    }

    showToast(`Removed "${target.title.substring(0, 20)}..." from corkboard 🗑️`, '📌');
  }

  // Reset to Default Notes
  resetStickyBtn?.addEventListener('click', () => {
    const confirmed = confirm("Reset corkboard to the 6 default campus student notes & tasks?");
    if (confirmed) {
      localStorage.setItem('campus_sticky_notes', JSON.stringify(DEFAULT_STICKY_NOTES));
      renderStickyNotes();
      showToast("Corkboard reset to sample campus notes! 🔄", "✨");
    }
  });

  // Category Filter Chips
  stickyCategoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      stickyCategoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeStickyCategory = chip.dataset.cat || 'All';
      renderStickyNotes();
    });
  });

  // Color Filter Dots
  stickyColorFilterDots.forEach(dot => {
    dot.addEventListener('click', () => {
      stickyColorFilterDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      activeStickyColor = dot.dataset.color || 'all';
      renderStickyNotes();
    });
  });

  // Search Input for Pinboard
  stickySearchInput?.addEventListener('input', (e) => {
    stickySearchQuery = e.target.value.trim();
    if (stickySearchClear) {
      stickySearchClear.classList.toggle('visible', stickySearchQuery.length > 0);
    }
    renderStickyNotes();
  });

  stickySearchClear?.addEventListener('click', () => {
    if (stickySearchInput) stickySearchInput.value = '';
    stickySearchQuery = '';
    stickySearchClear.classList.remove('visible');
    renderStickyNotes();
    stickySearchInput?.focus();
  });

  // Sort Selector
  stickySortSelect?.addEventListener('change', (e) => {
    activeStickySort = e.target.value;
    renderStickyNotes();
  });

  // ============================================================
  // STICKY NOTE MODAL (CREATE / EDIT)
  // ============================================================
  const stickyNoteModal = document.getElementById('sticky-note-modal');
  const stickyModalClose = document.getElementById('sn-modal-close');
  const stickyNoteForm = document.getElementById('sticky-note-form');
  const snModalTitle = document.getElementById('sn-modal-title');
  const snEditIdInput = document.getElementById('sn-edit-id');
  const snTitleInput = document.getElementById('sn-title-input');
  const snCategorySelect = document.getElementById('sn-category-select');
  const snPrioritySelect = document.getElementById('sn-priority-select');
  const snContentInput = document.getElementById('sn-content-input');
  const snAuthorInput = document.getElementById('sn-author-input');
  const snSemInput = document.getElementById('sn-sem-input');
  const snPinCheckbox = document.getElementById('sn-pin-checkbox');
  const snSubmitBtn = document.getElementById('sn-submit-btn');

  // Task builder elements in modal
  const snNewTaskInput = document.getElementById('sn-new-task-input');
  const snAddTaskBtn = document.getElementById('sn-add-task-btn');
  const snTasksPreviewList = document.getElementById('sn-tasks-preview-list');

  let currentModalTasks = [];
  let currentModalColor = 'yellow';

  // Color picker in modal
  document.querySelectorAll('#sn-modal-color-picker .sn-modal-color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#sn-modal-color-picker .sn-modal-color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentModalColor = btn.dataset.color || 'yellow';
    });
  });

  // Task builder in modal
  function renderModalTasksPreview() {
    if (!snTasksPreviewList) return;
    if (currentModalTasks.length === 0) {
      snTasksPreviewList.innerHTML = `<span style="font-size:12px; color:var(--ink-faint); font-style:italic;">No tasks added yet (optional).</span>`;
      return;
    }

    snTasksPreviewList.innerHTML = currentModalTasks.map((t, idx) => `
      <div class="sn-builder-task-pill">
        <span>${t.done ? '☑️' : '◻️'} ${escapeHTML(t.text)}</span>
        <button type="button" class="sn-builder-task-del" data-idx="${idx}" title="Remove task">✕</button>
      </div>
    `).join('');

    snTasksPreviewList.querySelectorAll('.sn-builder-task-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        currentModalTasks.splice(idx, 1);
        renderModalTasksPreview();
      });
    });
  }

  function addCurrentBuilderTask() {
    if (!snNewTaskInput) return;
    const txt = snNewTaskInput.value.trim();
    if (!txt) return;
    currentModalTasks.push({ text: txt, done: false });
    snNewTaskInput.value = '';
    renderModalTasksPreview();
    snNewTaskInput.focus();
  }

  snAddTaskBtn?.addEventListener('click', addCurrentBuilderTask);
  snNewTaskInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCurrentBuilderTask();
    }
  });

  function openStickyModalForCreate() {
    if (!stickyNoteModal) return;
    snEditIdInput.value = '';
    if (snModalTitle) snModalTitle.textContent = "Pin a Sticky Note";
    if (snSubmitBtn) snSubmitBtn.innerHTML = "📌 Pin Note to Board";

    stickyNoteForm.reset();
    currentModalTasks = [];
    currentModalColor = 'yellow';

    // Highlight yellow color button
    document.querySelectorAll('#sn-modal-color-picker .sn-modal-color-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.color === 'yellow');
    });

    // Pre-fill user details if logged in
    const user = getStoredUser();
    if (user) {
      if (snAuthorInput) snAuthorInput.value = user.name;
      if (snSemInput) snSemInput.value = user.branch || user.roll || "3rd Sem";
    }

    renderModalTasksPreview();
    stickyNoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openStickyModalForEdit(noteId) {
    if (!stickyNoteModal) return;
    const allNotes = getStoredStickyNotes();
    const note = allNotes.find(n => n.id === noteId);
    if (!note) return;

    snEditIdInput.value = note.id;
    if (snModalTitle) snModalTitle.textContent = "Edit Sticky Note";
    if (snSubmitBtn) snSubmitBtn.innerHTML = "💾 Save Note Changes";

    if (snTitleInput) snTitleInput.value = note.title;
    if (snCategorySelect) snCategorySelect.value = note.category;
    if (snPrioritySelect) snPrioritySelect.value = note.priority;
    if (snContentInput) snContentInput.value = note.content;
    if (snAuthorInput) snAuthorInput.value = note.author;
    if (snSemInput) snSemInput.value = note.sem || "3rd Sem";
    if (snPinCheckbox) snPinCheckbox.checked = !!note.pinned;

    currentModalColor = note.color || 'yellow';
    document.querySelectorAll('#sn-modal-color-picker .sn-modal-color-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.color === currentModalColor);
    });

    currentModalTasks = (note.tasks || []).map(t => ({ ...t }));
    renderModalTasksPreview();

    stickyNoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeStickyModal() {
    if (!stickyNoteModal) return;
    stickyNoteModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  stickyModalClose?.addEventListener('click', closeStickyModal);
  stickyNoteModal?.addEventListener('click', (e) => {
    if (e.target === stickyNoteModal) closeStickyModal();
  });

  addStickyBtn?.addEventListener('click', openStickyModalForCreate);
  heroStickyBtn?.addEventListener('click', openStickyModalForCreate);

  // Form Submission for Sticky Note
  stickyNoteForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = snEditIdInput?.value.trim();
    const title = snTitleInput?.value.trim();
    const category = snCategorySelect?.value || "Exam Prep";
    const priority = snPrioritySelect?.value || "normal";
    const content = snContentInput?.value.trim();
    const author = snAuthorInput?.value.trim() || "Student Writer";
    const sem = snSemInput?.value.trim() || "3rd Sem";
    const pinned = snPinCheckbox ? snPinCheckbox.checked : false;

    if (!title || !content) {
      showToast("Please enter a note title and details!", "⚠️");
      return;
    }

    const user = getStoredUser();
    const userId = user ? (user.id || user.roll) : "guest";

    const allNotes = getStoredStickyNotes();

    if (editId) {
      // Update existing note
      const idx = allNotes.findIndex(n => n.id === editId);
      if (idx !== -1) {
        allNotes[idx].title = title;
        allNotes[idx].category = category;
        allNotes[idx].priority = priority;
        allNotes[idx].content = content;
        allNotes[idx].author = author;
        allNotes[idx].sem = sem;
        allNotes[idx].pinned = pinned;
        allNotes[idx].color = currentModalColor;
        allNotes[idx].tasks = currentModalTasks;
        setStoredStickyNotes(allNotes);
        showToast(`Saved changes to "${title}"! 💾`, '✨');
      }
    } else {
      // Create new sticky note
      const newNote = {
        id: "sn-" + Date.now(),
        title: title,
        content: content,
        category: category,
        priority: priority,
        color: currentModalColor,
        pinned: pinned,
        author: author,
        sem: sem,
        userId: userId,
        date: "Today",
        tasks: currentModalTasks
      };
      allNotes.unshift(newNote);
      setStoredStickyNotes(allNotes);
      showToast(`Pinned "${title}" to corkboard! 📌`, '✨');
    }

    closeStickyModal();
    renderStickyNotes();
    smoothScrollToSection('#pinboard');
  });

  // Initial load of sticky notes
  renderStickyNotes();

  // ============================================================
  // 14. PROFESSIONAL STUDENT AUTHENTICATION CONTROLLER
  // ============================================================
  const loginModal = document.getElementById('login-modal');
  const loginCloseBtn = document.getElementById('login-modal-close');
  const loginNavBtn = document.getElementById('login-btn');
  const mobileLoginBtn = document.getElementById('mobile-login-btn');
  const userNavContainer = document.getElementById('user-nav-container');

  // Auth Tabs in Modal
  const authTabSignin = document.getElementById('auth-tab-signin');
  const authTabRegister = document.getElementById('auth-tab-register');
  const authPanelSignin = document.getElementById('auth-panel-signin');
  const authPanelRegister = document.getElementById('auth-panel-register');

  // Forms
  const studentLoginForm = document.getElementById('student-login-form');
  const studentRegisterForm = document.getElementById('student-register-form');
  const loginEmailInput = document.getElementById('login-email-input');
  const loginPasswordInput = document.getElementById('login-password-input');

  // Profile Dropdown Card
  const profileDropdownMenu = document.getElementById('profile-dropdown-menu');
  const signoutConfirmModal = document.getElementById('signout-confirm-modal');
  const signoutModalClose = document.getElementById('signout-modal-close');
  const signoutKeepBtn = document.getElementById('signout-keep-btn');
  const signoutDeleteBtn = document.getElementById('signout-delete-btn');
  const signoutUserSummary = document.getElementById('signout-user-summary');

  // Forgot Password Modal
  const forgotPasswordModal = document.getElementById('forgot-password-modal');
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  const forgotModalClose = document.getElementById('forgot-modal-close');
  const forgotSubmitBtn = document.getElementById('forgot-submit-btn');

  function openLoginModal() {
    if (!loginModal) return;
    // Switch to Sign In tab by default
    authTabSignin?.click();
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLoginModal() {
    if (!loginModal) return;
    loginModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  loginNavBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openLoginModal();
  });

  mobileLoginBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const user = getStoredUser();
    if (user) {
      toggleProfileDropdown();
    } else {
      openLoginModal();
    }
  });

  loginCloseBtn?.addEventListener('click', closeLoginModal);
  loginModal?.addEventListener('click', (e) => {
    if (e.target === loginModal) closeLoginModal();
  });

  // Tab Switching inside Auth Modal
  authTabSignin?.addEventListener('click', () => {
    authTabSignin.classList.add('active');
    authTabSignin.setAttribute('aria-selected', 'true');
    authTabRegister?.classList.remove('active');
    authTabRegister?.setAttribute('aria-selected', 'false');
    if (authPanelSignin) authPanelSignin.style.display = 'block';
    if (authPanelRegister) authPanelRegister.style.display = 'none';
  });

  authTabRegister?.addEventListener('click', () => {
    authTabRegister.classList.add('active');
    authTabRegister.setAttribute('aria-selected', 'true');
    authTabSignin?.classList.remove('active');
    authTabSignin?.setAttribute('aria-selected', 'false');
    if (authPanelSignin) authPanelSignin.style.display = 'none';
    if (authPanelRegister) authPanelRegister.style.display = 'block';
  });

  // Toggle Password Visibility Eye Icon
  document.querySelectorAll('.toggle-password-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement?.querySelector('input');
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
      } else {
        input.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });

  // 1-Click Evaluation Personas inside Login Modal
  const AUTH_PERSONAS = {
    aarav: {
      id: "23CS108",
      name: "Aarav Sharma",
      roll: "23CS108 · 3rd Sem CSE",
      branch: "3rd Sem CSE",
      email: "aarav.sharma@campusconnect.edu",
      initials: "AS"
    },
    priya: {
      id: "22IT045",
      name: "Priya Sharma",
      roll: "22IT045 · 5th Sem IT",
      branch: "5th Sem IT",
      email: "priya.sharma@campusconnect.edu",
      initials: "PS"
    },
    rahul: {
      id: "21EC089",
      name: "Rahul Verma",
      roll: "21EC089 · 7th Sem ECE",
      branch: "7th Sem ECE",
      email: "rahul.verma@campusconnect.edu",
      initials: "RV"
    }
  };

  document.querySelectorAll('.demo-persona-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const pKey = btn.dataset.persona;
      const user = AUTH_PERSONAS[pKey];
      if (user) {
        setStoredUser(user);
        updateUserNavbar();
        closeLoginModal();
        showToast(`Signed in as ${user.name} (${user.branch})! 🎓`, "👋");
        renderStickyNotes();
      }
    });
  });

  // Student Sign In Form Submit
  studentLoginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = loginEmailInput?.value.trim() || "Student";
    const name = val.includes('@') ? val.split('@')[0].replace('.', ' ') : val;
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || "ST";

    const user = {
      id: val || ("user-" + Date.now()),
      name: name,
      roll: val,
      branch: val.includes('Sem') ? val : "3rd Sem",
      initials: initials
    };

    setStoredUser(user);
    updateUserNavbar();
    closeLoginModal();
    showToast(`Welcome back, ${user.name}! 🎓`, "👋");
    renderStickyNotes();
  });

  // Student Registration Form Submit
  studentRegisterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name-input')?.value.trim();
    const roll = document.getElementById('reg-roll-input')?.value.trim();
    const branch = document.getElementById('reg-branch-select')?.value || "CSE";
    const sem = document.getElementById('reg-sem-select')?.value || "3rd Sem";
    const pass = document.getElementById('reg-password-input')?.value;
    const confirmPass = document.getElementById('reg-confirm-password-input')?.value;

    if (pass !== confirmPass) {
      showToast("Passwords do not match! Please check.", "⚠️");
      return;
    }

    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || "ST";
    const user = {
      id: roll || ("user-" + Date.now()),
      name: name,
      roll: `${roll} · ${sem} ${branch}`,
      branch: `${sem} ${branch}`,
      initials: initials
    };

    setStoredUser(user);
    updateUserNavbar();
    closeLoginModal();
    showToast(`Account created for ${user.name}! Welcome to campus! 🎓`, "✨");
    renderStickyNotes();
  });

  // Forgot Password Modal
  forgotPasswordLink?.addEventListener('click', () => {
    if (forgotPasswordModal) forgotPasswordModal.classList.add('active');
  });

  forgotModalClose?.addEventListener('click', () => {
    if (forgotPasswordModal) forgotPasswordModal.classList.remove('active');
  });

  forgotSubmitBtn?.addEventListener('click', () => {
    const val = document.getElementById('forgot-email-input')?.value.trim();
    if (forgotPasswordModal) forgotPasswordModal.classList.remove('active');
    showToast(`Verification token sent for ${val}! Use temporary password "campus2026" 🔑`, "✨");
  });

  // ============================================================
  // USER PROFILE DROPDOWN & CUSTOM SIGN OUT MODAL
  // ============================================================
  function toggleProfileDropdown() {
    if (!profileDropdownMenu) return;
    const isShown = profileDropdownMenu.style.display === 'flex';
    if (isShown) {
      closeProfileDropdown();
    } else {
      openProfileDropdown();
    }
  }

  function openProfileDropdown() {
    if (!profileDropdownMenu) return;
    const user = getStoredUser();
    if (!user) return;

    // Fill Dropdown fields
    const elInitials = document.getElementById('pd-avatar-initials');
    const elName = document.getElementById('pd-name');
    const elRoll = document.getElementById('pd-roll');
    const elSticky = document.getElementById('pd-stat-sticky');
    const elBlogs = document.getElementById('pd-stat-blogs');
    const elSaved = document.getElementById('pd-stat-saved');

    if (elInitials) elInitials.textContent = user.initials || "ST";
    if (elName) elName.textContent = user.name || "Student";
    if (elRoll) elRoll.textContent = user.roll || user.branch || "3rd Sem";

    // Calculate real-time counts
    const customPosts = getCustomPosts();
    const stickyNotes = getStoredStickyNotes();
    const bookmarks = getStoredBookmarks();

    const userPostsCount = customPosts.filter(p => {
      return (p.userId && p.userId === (user.id || user.roll)) ||
             (p.author && p.author.toLowerCase() === user.name.toLowerCase());
    }).length;

    const userStickyCount = stickyNotes.filter(n => {
      return (n.userId && n.userId === (user.id || user.roll)) ||
             (n.author && n.author.toLowerCase() === user.name.toLowerCase());
    }).length;

    if (elSticky) elSticky.textContent = userStickyCount;
    if (elBlogs) elBlogs.textContent = userPostsCount;
    if (elSaved) elSaved.textContent = bookmarks.length;

    profileDropdownMenu.style.display = 'flex';
  }

  function closeProfileDropdown() {
    if (profileDropdownMenu) profileDropdownMenu.style.display = 'none';
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!profileDropdownMenu || profileDropdownMenu.style.display === 'none') return;
    const badgeBtn = document.getElementById('profile-badge-btn');
    if (!profileDropdownMenu.contains(e.target) && !badgeBtn?.contains(e.target)) {
      closeProfileDropdown();
    }
  });

  // Profile Dropdown Actions
  document.getElementById('pd-goto-pinboard')?.addEventListener('click', (e) => {
    closeProfileDropdown();
    smoothScrollToSection('#pinboard');
    showToast("Scrolled to Sticky Notes Corkboard! 📌", "✨");
  });

  document.getElementById('pd-write-sticky')?.addEventListener('click', () => {
    closeProfileDropdown();
    openStickyModalForCreate();
  });

  document.getElementById('pd-write-blog')?.addEventListener('click', () => {
    closeProfileDropdown();
    openCreateModal();
  });

  document.getElementById('pd-view-saved')?.addEventListener('click', () => {
    closeProfileDropdown();
    openBookmarksModal();
  });

  document.getElementById('pd-toggle-theme')?.addEventListener('click', () => {
    closeProfileDropdown();
    themeToggleBtn?.click();
  });

  document.getElementById('pd-signout-btn')?.addEventListener('click', () => {
    closeProfileDropdown();
    openSignoutModal();
  });

  // Custom Sign Out Modal
  function openSignoutModal() {
    const user = getStoredUser();
    if (!user || !signoutConfirmModal) return;

    const customPosts = getCustomPosts();
    const userPostsCount = customPosts.filter(p => {
      return (p.userId && p.userId === (user.id || user.roll)) ||
             (p.author && p.author.toLowerCase() === user.name.toLowerCase());
    }).length;

    const stickyNotes = getStoredStickyNotes();
    const userStickyCount = stickyNotes.filter(n => {
      return (n.userId && n.userId === (user.id || user.roll)) ||
             (n.author && n.author.toLowerCase() === user.name.toLowerCase());
    }).length;

    if (signoutUserSummary) {
      signoutUserSummary.innerHTML = `
        <strong>Signed in as:</strong> ${escapeHTML(user.name)} (${escapeHTML(user.roll || 'Student')})<br>
        <strong>Your Content:</strong> ${userStickyCount} sticky notes · ${userPostsCount} published blog notes
      `;
    }

    signoutConfirmModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSignoutModal() {
    if (signoutConfirmModal) signoutConfirmModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  signoutModalClose?.addEventListener('click', closeSignoutModal);
  signoutConfirmModal?.addEventListener('click', (e) => {
    if (e.target === signoutConfirmModal) closeSignoutModal();
  });

  // Choice 1: Sign Out & Keep Notes on Board
  signoutKeepBtn?.addEventListener('click', () => {
    const user = getStoredUser();
    const name = user ? user.name : "Student";
    setStoredUser(null);
    updateUserNavbar();
    closeSignoutModal();
    showToast(`Signed out successfully. All notes by ${name} remain preserved on the board! 🎓`, "👋");
  });

  // Choice 2: Sign Out & Delete Profile Posts & Notes
  signoutDeleteBtn?.addEventListener('click', () => {
    closeSignoutModal();
    logoutUserWithClean();
  });

  function updateUserNavbar() {
    const user = getStoredUser();
    if (!userNavContainer) return;

    if (user) {
      if (loginNavBtn) loginNavBtn.style.display = 'none';
      if (mobileLoginBtn) mobileLoginBtn.textContent = `👤 ${user.name}`;
      userNavContainer.style.display = 'inline-flex';
      userNavContainer.innerHTML = `
        <div class="user-profile-badge" id="profile-badge-btn" title="Click to view student profile & options">
          <span class="user-avatar-sm">${user.initials}</span>
          <span>${user.name}</span>
          <span style="font-size:10px; color:var(--ink-faint);">▼</span>
        </div>
      `;

      document.getElementById('profile-badge-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleProfileDropdown();
      });
    } else {
      if (loginNavBtn) loginNavBtn.style.display = 'inline-flex';
      if (mobileLoginBtn) mobileLoginBtn.textContent = 'Log In';
      userNavContainer.style.display = 'none';
      userNavContainer.innerHTML = '';
      closeProfileDropdown();
    }

    refreshOwnerControlsOnCards();
  }

  // Logout and delete custom posts & notes created by this profile
  function logoutUserWithClean() {
    const user = getStoredUser();
    if (!user) return;

    const currentUserId = user.id || user.roll || user.name;
    const currentUserName = user.name;
    const currentUserRoll = user.roll || '';

    // 1. Identify all custom blog posts published by this profile
    const customPosts = getCustomPosts();
    const postsToDelete = customPosts.filter(p => {
      return (p.userId && p.userId === currentUserId) ||
             (p.userRoll && currentUserRoll && p.userRoll === currentUserRoll) ||
             (p.author && p.author.toLowerCase() === currentUserName.toLowerCase());
    });

    const remainingCustomPosts = customPosts.filter(p => !postsToDelete.includes(p));
    setCustomPosts(remainingCustomPosts);

    // 2. Identify sticky notes published by this user and clean them
    const allNotes = getStoredStickyNotes();
    const remainingNotes = allNotes.filter(n => {
      const isUserNote = (n.userId && n.userId === currentUserId) ||
                         (n.author && n.author.toLowerCase() === currentUserName.toLowerCase());
      return !isUserNote;
    });
    setStoredStickyNotes(remainingNotes.length > 0 ? remainingNotes : DEFAULT_STICKY_NOTES);

    // 3. Remove comments and bookmarks for deleted posts
    postsToDelete.forEach(p => {
      localStorage.removeItem(`campus_comments_${p.id}`);
    });

    const bookmarks = getStoredBookmarks();
    const deletedIds = postsToDelete.map(p => p.id);
    const updatedBookmarks = bookmarks.filter(id => !deletedIds.includes(id));
    setStoredBookmarks(updatedBookmarks);

    // 4. Animate and remove deleted post cards from the DOM
    postsToDelete.forEach(p => {
      document.querySelectorAll(`.post-card[data-id="${p.id}"]`).forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.85)';
        setTimeout(() => card.remove(), 300);
      });
    });

    // 5. Update stats
    const blogStat = document.querySelectorAll('.stat-item')[1]?.querySelector('.stat-num');
    if (blogStat) {
      blogStat.textContent = (85 + remainingCustomPosts.length) + "+";
    }

    // 6. Clear user session
    setStoredUser(null);
    updateUserNavbar();

    // 7. Update UI tab counts & pinboard
    updateBookmarkBadge();
    updateTabCounts();
    applyFiltersAndSort();
    renderStickyNotes();

    const count = postsToDelete.length;
    showToast(`Logged out. Session posts by ${currentUserName} were cleaned up 🗑️`, "👋");
  }

  updateUserNavbar();

  // ============================================================
  // 15. UTILITY HELPERS
  // ============================================================
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Welcome Toast
  setTimeout(() => {
    showToast("Sticky Pinboard & Student Portal are live! Try pinning a note. 📌", "✨");
  }, 3300);

});
