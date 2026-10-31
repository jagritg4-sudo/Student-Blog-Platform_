# CampusConnect – Student Blog Platform 🎓📝

A modern, responsive, and collaborative student blogging platform designed for students to share ideas, publish articles, connect with peers, and foster campus community knowledge sharing.

---

## 🌟 Key Features

- **Campus Corkboard Aesthetic**: Polished UI with smooth animations, custom preloader, and clean typography.
- **Authentication System**: Dedicated login and signup interface (`login.html`) with form validation.
- **Interactive Blog Feed**: Filter articles by category, tags, and search query.
- **Publish & Share**: Create, edit, and publish rich blog posts.
- **Engaging Interactions**: Bookmark posts, like/upvote articles, and comment discussions.
- **Responsive Design**: Optimized for desktops, tablets, and mobile screens.
- **Reading Progress Bar**: Dynamic scroll progress indicator for an enhanced reading experience.

---

## 🛠️ Built With

- **React 18 & Vite**: Component-driven architecture, Hot Module Replacement (HMR), fast development server
- **CSS3 / Vanilla Design System**: Campus Corkboard aesthetic, custom CSS variables, responsive Grid & Flexbox, smooth animations
- **Typography**: Google Fonts (*Fraunces* serif display, *Inter* clean body, *JetBrains Mono* code & tags)
- **HTML5 & Modern JavaScript (ES6+)**: Semantic markup, localStorage state persistence

---

## 🚀 Running on Localhost (React)

### Prerequisites

- Node.js (v18 or higher recommended) & npm

### Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to:
   ```text
   http://localhost:5173/
   ```

4. **Build for production** (optional):
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
├── index.html            # Vite entry point for React application
├── vite.config.js        # Vite configuration
├── package.json          # Project scripts and dependencies
├── src/
│   ├── main.jsx          # React DOM root entry
│   ├── App.jsx           # Main App component with full state management
│   ├── index.css         # Corkboard design system and token styling
│   ├── data/
│   │   └── initialData.js # Sample posts, sticky notes, categories, authors
│   └── components/
│       ├── Navbar.jsx           # Brand, links, theme switch, bookmarks, user badge
│       ├── Preloader.jsx        # 3-second animated corkboard loading screen
│       ├── ScrollWidgets.jsx    # Reading progress bar & floating back-to-top button
│       ├── HeroSection.jsx      # Digital corkboard graphic with animated stat counters
│       ├── StickyNotesBoard.jsx # Live Interactive Corkboard with checklists & filters
│       ├── BlogFeed.jsx         # Search, topic chips, feed tabs, post cards with likes
│       ├── ExploreSections.jsx  # Popular categories & Top student authors
│       ├── Footer.jsx           # Links, categories, and academic footer
│       ├── ToastContainer.jsx   # Corkboard toast notifications
│       ├── ProfileDropdown.jsx  # Verified student card & quick action menu
│       └── Modals/
│           ├── ArticleReaderModal.jsx  # Reading view & discussion comments
│           ├── CreatePostModal.jsx     # Edit note & live corkboard preview
│           ├── StickyNoteModal.jsx     # Sticky note editor & task checklist builder
│           ├── SavedBookmarksModal.jsx # Saved desk bookmarks drawer
│           ├── AuthModal.jsx           # 1-click evaluation personas & auth portal
│           └── AuthDialogs.jsx         # Sign out options & password recovery
├── home.html             # Vanilla HTML version (backup)
├── home.css              # Vanilla CSS stylesheet
├── login.html            # Standalone login page
└── app.js                # Vanilla JavaScript controller
```

---

## 📄 License

This project was built for academic coursework (Front End Engineering - FEE 3rd Semester).
