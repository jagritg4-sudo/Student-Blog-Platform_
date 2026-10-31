export const DEFAULT_POSTS = [
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

export const DEFAULT_STICKY_NOTES = [
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

export const AUTH_PERSONAS = {
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

export const CATEGORIES_LIST = [
  { name: "Technology", icon: "💻", count: 12 },
  { name: "Programming", icon: "🖥️", count: 24 },
  { name: "Study Tips", icon: "📝", count: 18 },
  { name: "Projects", icon: "🛠️", count: 15 },
  { name: "Career", icon: "💼", count: 9 },
  { name: "Events", icon: "🎉", count: 7 }
];

export const TOP_AUTHORS = [
  { name: "Priya Sharma", avatar: "PS", stats: "2 posts · 87 likes" },
  { name: "Rahul Verma", avatar: "RV", stats: "2 posts · 76 likes" },
  { name: "Sara Khan", avatar: "SK", stats: "1 post · 38 likes" },
  { name: "Devansh Nair", avatar: "DN", stats: "1 post · 31 likes" },
  { name: "Ananya Iyer", avatar: "AI", stats: "1 post · 29 likes" },
  { name: "Karan Mehta", avatar: "KM", stats: "1 post · 25 likes" }
];
