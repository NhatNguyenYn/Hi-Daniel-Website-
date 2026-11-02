// All English copy for the landing page. Must mirror the shape of vi.ts.
import type { Dictionary } from "./vi";

const en: Dictionary = {
  meta: {
    title: "Hi Daniel! — The next-generation learning platform",
    description:
      "A fresh, smart LMS ecosystem for schools, academies and companies: learning management, live classes, AI course authoring and learning analytics.",
  },

  nav: {
    links: [
      { label: "Products", href: "#products" },
      { label: "Features", href: "#features" },
      { label: "Courses", href: "#courses" },
      { label: "Pricing", href: "#pricing" },
      { label: "Blog", href: "/blog" },
    ],
    login: "Log in",
    cta: "Start free",
    menu: "Menu",
  },

  hero: {
    badge: "New · Hi Daniel! 2.0 with an AI teaching assistant",
    titleLines: ["Learning, lit up.", "Teaching, made light."],
    subtitle:
      "One platform to build courses, teach live, grade work and follow every learner's progress — fast, fun and ridiculously easy to use.",
    primary: "Get started free",
    secondary: "Watch the 2-min demo",
    note: "No credit card · 14-day free trial",
  },

  mock: {
    greeting: "Good morning, Minh Anh",
    sub: "You have 2 classes and 1 assignment today.",
    nav: ["Overview", "Courses", "Schedule", "Assignments", "Achievements"],
    weekly: "Study time this week",
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    continue: "Continue learning",
    streak: "day streak",
    upcoming: "Up next",
    liveNow: "Live now",
    chips: {
      xp: "+120 XP",
      assignment: "Assignment graded: 9.5",
      live: "IELTS class starts in 5 min",
    },
    studioPrompt: "Create a 10-question quiz on the present perfect",
    studioGenerating: "AI is writing questions…",
    insightsKpi: ["Active learners", "Completion rate", "Avg. score"],
    chat: ["Quick question on #3!", "Slides are super clear", "Got it now 🎉"],
  },

  manifesto: {
    eyebrow: "Why Hi Daniel!",
    text: "We believe learning should feel like a conversation — warm, exciting and never boring. Hi Daniel! brings every teaching and learning tool into one place, so teachers spend their time on students instead of paperwork.",
    highlight: ["a conversation", "one place", "students"],
  },

  stats: {
    items: [
      { value: 250, suffix: "K+", label: "Learners studying every day" },
      { value: 1200, suffix: "+", label: "Schools & companies on board" },
      { value: 98, suffix: "%", label: "Teachers satisfied after a month" },
      { value: 40, suffix: "%", label: "Less time spent on lesson prep" },
    ],
    trustedBy: "Trusted by forward-thinking education teams",
    logos: [
      "Sao Mai Academy",
      "EduNova",
      "Lumos School",
      "Bright Minds",
      "Hanoi Tech Hub",
      "Kite English",
      "Vinh Quang College",
      "Orbit Labs",
    ],
  },

  products: {
    eyebrow: "The product family",
    title: "One platform. Four superpowers.",
    subtitle: "Use each product on its own or all together — your data stays in sync.",
    items: [
      {
        key: "lms",
        name: "Hi Daniel! LMS",
        tagline: "All-in-one learning management",
        description:
          "Build courses, organise classes, assign work and follow every learner's progress from one clear dashboard.",
        points: ["Personalised learning paths", "Automatic gradebook", "iOS & Android apps"],
      },
      {
        key: "live",
        name: "Hi Daniel! Live",
        tagline: "Live classes that feel alive",
        description:
          "HD video, an interactive whiteboard, breakout rooms and automatic attendance — nothing extra to install.",
        points: ["Collaborative whiteboard", "Recording & auto captions", "Breakout rooms"],
      },
      {
        key: "studio",
        name: "Hi Daniel! Studio",
        tagline: "Author lessons with AI",
        description:
          "Turn an idea into a complete lesson, slide deck and quiz in minutes with your AI co-author.",
        points: ["Quiz question generation", "5,000+ templates", "SCORM / PDF export"],
      },
      {
        key: "insights",
        name: "Hi Daniel! Insights",
        tagline: "Learning analytics",
        description:
          "Real-time reports spot learners who need help early and measure the impact of every course.",
        points: ["At-risk learner alerts", "Parent reports", "Leadership dashboards"],
      },
    ],
    learnMore: "Learn more",
  },

  features: {
    eyebrow: "Features",
    title: "Everything you need. Not one click more.",
    items: [
      {
        icon: "bot",
        title: "24/7 AI teaching assistant",
        text: "Answers questions, suggests practice and summarises lessons for every learner.",
      },
      {
        icon: "trophy",
        title: "Gamification",
        text: "XP, badges, leaderboards and streaks bring learners back every day.",
      },
      {
        icon: "check",
        title: "Auto-grading",
        text: "Multiple choice, fill-in, matching — scored instantly.",
      },
      {
        icon: "phone",
        title: "Learn anywhere",
        text: "Mobile apps with offline downloads.",
      },
      {
        icon: "plug",
        title: "Built-in integrations",
        text: "Google Workspace, Microsoft 365, Zoom, Zalo and VNPay payments.",
      },
      {
        icon: "shield",
        title: "Enterprise-grade security",
        text: "Encryption, granular roles and daily backups.",
      },
    ],
  },

  courses: {
    eyebrow: "Featured courses",
    title: "Hundreds of courses, ready when you are.",
    lessons: "lessons",
    students: "learners",
    items: [
      { title: "IELTS 7.0+ Bootcamp", teacher: "Daniel Nguyen", lessons: 48, students: "12.4K", rating: 4.9, price: "$49", tag: "English", hue: "flame" },
      { title: "Python for Beginners", teacher: "Tran Hoang Long", lessons: 36, students: "8.9K", rating: 4.8, price: "$39", tag: "Tech", hue: "sky" },
      { title: "Hands-on UI/UX Design", teacher: "Le Bao Ngoc", lessons: 30, students: "6.1K", rating: 4.9, price: "$59", tag: "Design", hue: "mint" },
      { title: "Math Thinking, Grades 6–9", teacher: "Pham Minh Duc", lessons: 64, students: "15.2K", rating: 4.8, price: "$29", tag: "K-12", hue: "sun" },
      { title: "Digital Marketing 2026", teacher: "Vo Thanh Ha", lessons: 28, students: "4.7K", rating: 4.7, price: "$45", tag: "Business", hue: "violet" },
      { title: "Conversational Japanese N4", teacher: "Sato Yuki", lessons: 40, students: "3.8K", rating: 4.9, price: "$42", tag: "Languages", hue: "sky" },
    ],
    viewAll: "Browse all courses",
  },

  testimonials: {
    eyebrow: "Loved by users",
    title: "Teachers and learners can't stop talking.",
    items: [
      { quote: "Since switching to Hi Daniel!, I save almost 6 hours of lesson prep every week.", name: "Nguyen Thu Trang", role: "English teacher, Le Quy Don High School" },
      { quote: "Our learners show up on their own now, thanks to leaderboards and badges.", name: "Hoang Viet", role: "Director, Kite English" },
      { quote: "So clean and simple that even grandparents can read the progress reports.", name: "Lan Phuong", role: "Parent of a Grade 8 student" },
      { quote: "Rolled out to 2,000 employees in a single week. The support team is amazing.", name: "Minh Tuan", role: "HR Manager, Orbit Labs" },
      { quote: "The AI assistant explained the lesson at 11pm — exactly when I needed it.", name: "Bao Anh", role: "IELTS learner" },
      { quote: "Insights gives our leadership the whole school on a single screen.", name: "Tran Quoc Bao", role: "Vice Principal, Lumos School" },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Simple, transparent, built for every size.",
    monthly: "Monthly",
    yearly: "Yearly",
    save: "Save 20%",
    perMonth: "/mo",
    popular: "Most popular",
    plans: [
      {
        name: "Starter",
        desc: "For teachers and small classes",
        monthly: "$0",
        yearly: "$0",
        cta: "Start free",
        features: ["Up to 50 learners", "3 courses", "Auto-grading", "Mobile apps"],
      },
      {
        name: "Pro",
        desc: "For growing academies",
        monthly: "$21",
        yearly: "$17",
        cta: "Try 14 days free",
        features: ["Unlimited learners", "Hi Daniel! Live", "AI teaching assistant", "Advanced reports", "Custom domain"],
      },
      {
        name: "Enterprise",
        desc: "For schools and companies",
        monthly: "Custom",
        yearly: "Custom",
        cta: "Talk to us",
        features: ["Everything in Pro", "SSO & advanced roles", "Private / on-premise deployment", "24/7 support & 99.9% SLA"],
      },
    ],
  },

  cta: {
    title: "Ready to say “Hi” to a new way of learning?",
    subtitle: "Create your first class in under 5 minutes. Free forever for small classes.",
    primary: "Create a free account",
    secondary: "Book a demo",
  },

  footer: {
    tagline: "A fresh learning platform for a new generation.",
    columns: [
      { title: "Product", links: ["LMS", "Live", "Studio", "Insights", "Mobile apps"] },
      { title: "Solutions", links: ["Schools", "Academies", "Companies", "Independent teachers"] },
      { title: "Resources", links: ["Blog", "Help center", "Webinars", "API docs"] },
      { title: "Company", links: ["About", "Careers", "Contact", "Press"] },
    ],
    rights: "© 2026 Hi Daniel! All rights reserved.",
    legal: ["Terms", "Privacy", "Cookies"],
  },
};

export default en;
