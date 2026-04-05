# 🖼️ Intellexa Frontend

[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

The frontend of **Intellexa.ai** is a modern, high-performance web application built with **Next.js 15** and **React 19**. It features a beautiful glassmorphism-inspired UI and provides an intuitive workspace for data analysis.

---

## 🎨 UI & UX Highlights

- **Glassmorphism Design**: A sleek, translucent interface with vibrant gradients and smooth transitions.
- **Dynamic Dashboard**: Interactive charts and stats cards that update in real-time as data is processed.
- **AI Workspace**: A feature-rich chat interface for interacting with the neural engine.
- **Data Explorer**: A dedicated, high-performance table view for metric analysis.
- **Responsive Layout**: Optimized for both desktop and mobile workflows.

---

## 🛠️ Core Technologies

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **State Management**: [React Context API](https://react.dev/reference/react/createContext)
- **Data Visualization**: [Recharts](https://recharts.org/) for neural metrics.
- **Authentication**: [Clerk](https://clerk.com/) for secure identity management.
- **Icons**: [Lucide React](https://lucide.dev/) for consistent, scalable iconography.
- **Exporting**: [jsPDF](https://github.com/parallax/jsPDF) and [html2canvas](https://html2canvas.hertzen.com/) for PDF report generation.

---

## 📂 Project Structure

```bash
frontend/
├── app/                 # Next.js App Router (Pages & Layouts)
│   ├── dashboard/       # Core dashboard workspace
│   │   ├── ai-assistant # Neural Chat UI
│   │   ├── explorer     # Data Registry Explorer
│   │   └── insights     # Strategic Intelligence View
│   └── api/             # Frontend-to-Backend proxy routes
├── components/          # Reusable UI components
│   ├── dashboard/       # Dashboard-specific elements
│   ├── landing/         # Marketing site components
│   └── ui/              # Base Atomic components (Card, Button, etc.)
├── context/             # Global state (Dashboard & Theme)
├── lib/                 # Utility functions & helpers
└── public/              # Static assets (images, fonts, logos)
```

---

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Configuration**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_secret
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

3. **Development Mode**
   ```bash
   pnpm dev
   ```

4. **Build for Production**
   ```bash
   pnpm build
   pnpm start
   ```

---

<p align="center">
  Built with ❤️ for Strategic Intelligence
</p>
