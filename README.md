# InsureApp 🛡️

A modern, premium **Insurance Policy Management System** built with React, Vite, TypeScript, and Tailwind CSS. Features a glassmorphic UI, role-based authentication, full admin console, and Indian Rupee (₹) localization.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)

---

## ✨ Features

- **Authentication** — Role-based login (Personal / Administrator) with JWT-ready auth context
- **Dashboard** — Policy catalog with search, category filters, sort, price & coverage range filters
- **Policy Cards** — 8 insurance plans (Auto, Health, Home, Life, Travel, Business, Pet, Critical Illness) with star ratings and ₹ pricing
- **My Policies** — Portfolio view with coverage breakdown, claims usage bar, policy timeline, and expandable details
- **Admin Console** — 4-tab panel: Overview (live activity, plan distribution), Plans & Pricing, User Management, Claims Management
- **Purchase Flow** — Checkout page with UPI/card support and GST breakdown
- **Indian Localization** — All prices in ₹, coverage in Lakh/Crore format
- **Premium UI** — Glassmorphic cards, radial gradient backgrounds, Syne + Inter typography, micro-animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Icons | Lucide React |
| Fonts | Google Fonts (Syne, Inter) |
| Auth | Context API + JWT (mock) |
| Backend (planned) | Spring Boot at `http://localhost:8080` |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node)
- **Git** — [Download](https://git-scm.com/)

Check your versions:
```bash
node -v   # should be v18+
npm -v    # should be v9+
```

---

### 1. Clone the Repository

```bash
git clone https://github.com/iam-pratham/InsureApp.git
cd InsureApp
```

---

### 2. Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json` including React, Tailwind, Lucide, etc.

---

### 3. Start the Development Server

```bash
npm run dev
```

The app will start at **http://localhost:5173** — open it in your browser.

> Hot Module Replacement (HMR) is enabled, so any file changes will reflect instantly without a full page reload.

---

### 4. Login Credentials

The app currently uses **mock authentication** (no real backend required).

| Role | How to Login |
|------|-------------|
| **Personal User** | Select "Personal" tab → enter any email + any password |
| **Administrator** | Select "Administrator" tab → enter any email + any password |

> Admin gets access to the **Admin Console** tab in the navbar.

---

## 📁 Project Structure

```
InsureApp/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   └── Navbar.tsx       # Glassmorphic top navigation
│   ├── context/
│   │   └── AuthContext.tsx  # Auth state + login/logout
│   ├── pages/
│   │   ├── Login.tsx        # Split-screen login page
│   │   ├── Register.tsx     # Registration page
│   │   ├── Dashboard.tsx    # Policy catalog + filters
│   │   ├── MyPolicies.tsx   # User's purchased policies
│   │   ├── Purchase.tsx     # Checkout / payment page
│   │   └── AdminPanel.tsx   # Admin console (4 tabs)
│   ├── services/
│   │   └── api.ts           # API base config (Spring Boot)
│   ├── App.tsx              # Routes + layout
│   ├── index.css            # Global styles + design tokens
│   └── main.tsx             # React entry point
├── index.html               # HTML shell (title, fonts)
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── package.json
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:5173 |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

---

## 🔗 Backend Integration (Optional)

The app is pre-wired to connect to a **Spring Boot backend** at `http://localhost:8080`.

To enable real API calls, update `src/services/api.ts` and replace the mock auth logic in `AuthContext.tsx` and individual page components with real `fetch`/`axios` calls.

```ts
// src/services/api.ts
export const API_BASE = 'http://localhost:8080';
```

---

## 🎨 Design System

- **Primary**: Indigo `#6366f1` / `#4F46E5`
- **Background**: Layered radial gradient on `#EEF0FB`
- **Cards**: `rgba(255,255,255,0.82)` + `backdrop-filter: blur(16px)`
- **Typography**: `Syne` (headings) · `Inter` (body)
- **Border radius**: `16px` cards · `12px` buttons · `24px` hero sections

---

## 📄 License

MIT — feel free to use and modify.
