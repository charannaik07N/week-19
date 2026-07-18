# RapidDispatch Live Ops Helpdesk 🚚

RapidDispatch is an enterprise-grade, native-feeling logistics helpdesk dashboard designed for fast-paced operational environments. It allows dispatchers, support agents, and fleet managers to track live tickets, monitor real-time activity, and manage resources efficiently.

## 🌟 Key Features

*   **Enterprise UX Redesign**: A modern, dense, and premium interface built for professionals working 8+ hours a day (inspired by Linear, Stripe, and Jira Premium).
*   **Mobile-First Native Feel**: The application is fully optimized for mobile devices, respecting safe-areas and using native application interaction patterns (Slide-over drawers, Bottom Sheets, Full-screen search overlays) rather than clunky responsive web paradigms. Zero horizontal scrolling.
*   **Live Ticket Queue**: Real-time filtering, pagination, and sorting for operational tickets.
*   **Master-Detail Flow**: Advanced split-view ticket resolution system with real-time lock management to prevent agent collisions.
*   **Activity Center**: Live feed of operational activities, escalations, and system alerts.
*   **Dark Mode**: Native `next-themes` integration for instant, flash-free light/dark mode toggling, fully compatible with Tailwind CSS v4.

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org) with React 19
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (Inline theme configuration, custom dark variants)
*   **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) (Modular stores for UI, Tickets, Agents, and Notifications)
*   **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

The project follows a feature-based architecture for enterprise scalability:

```
src/
├── app/                  # Next.js App Router pages and layouts
├── features/             # Feature-specific domains
│   ├── activity/         # Live Activity Center
│   ├── dashboard/        # KPI Cards and Main Dashboard
│   ├── notifications/    # Toast and Notification System
│   ├── settings/         # User and Workspace Settings
│   ├── team/             # Team Directory and Workloads
│   └── tickets/          # Core Ticket Resolution Engine (Queue, Details)
├── shared/               # Globally shared resources
│   ├── components/       # Reusable UI components (Buttons, Badges, Layouts)
│   ├── constants/        # Mock data, routes, and enumerations
│   ├── lib/              # Utility configurations (TanStack setup)
│   ├── store/            # Global Zustand stores
│   └── utils/            # Helper functions (date formatting, cn)
```

## 📱 Mobile Architecture

RapidDispatch enforces strict mobile constraints to simulate a native app environment:
*   `max-w-[100vw]` and `overflow-x-hidden` guarantees no horizontal drift.
*   Next.js Viewport strictly prevents user-scaling (`userScalable: false`).
*   All interactive elements (buttons, checkboxes, tabs) comply with Apple's HIG minimum `44x44px` touch target requirements.
*   Sticky action bars dynamically calculate CSS padding via `env(safe-area-inset-bottom)` to protect against home-indicator collision.
