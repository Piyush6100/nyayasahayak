# ⚖️ NyayaSahayak (न्यायसहायक) — Rights Navigator
### *AI-Powered Legal & Civic Empowerment Platform for Everyday Citizens*

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## 🌟 Executive Summary & Pitch

In India, over **90% of citizens struggle to navigate the legal and civic ecosystem** due to complex terminology, lack of procedural awareness, and friction in exercising basic statutory rights like RTI (Right to Information) or claiming entitled government welfare schemes.

**NyayaSahayak (न्यायसहायक)** bridges this critical gap. It is a full-stack, AI-augmented civic companion designed to demystify Indian law, streamline RTI drafting, intelligently match government welfare schemes, and provide step-by-step grievance resolution pathways in plain language.

---

## 🎯 Key Features & Innovation Highlights

| Feature | Description | Key Tech |
| :--- | :--- | :--- |
| 🤖 **AI Legal Assistant** | Conversational legal guidance breaking down complex statutes (BNS/IPC, BNSS/CrPC, Consumer Protection, Labor Rights) into plain, actionable advice. | Next.js Server Components, OpenAI / Custom Prompt Pipelines |
| 📝 **Intelligent RTI Builder** | Guided 4-step Right to Information application generator with auto-department routing, statutory citations, fee estimation, and instant PDF download. | `jspdf`, React Hook Form, Custom Legal Templates |
| 🏛️ **Government Scheme Matcher** | Smart discovery engine recommending central and state welfare schemes tailored to demographic criteria (state, occupation, income, age). | Dynamic Client-Side Filtering, Structured Dataset |
| 📁 **Civic Case & Grievance Tracker** | Personal dashboard to organize legal disputes, track RTI application progress, save notes, and monitor milestones. | Supabase PostgreSQL + Row Level Security (RLS) |
| 🎙️ **Voice & Multilingual Input** | Speech-to-text integration enabling citizens to describe their grievance naturally using voice without typing complex text. | Web Speech API / OpenAI Whisper Endpoint |
| 🔐 **Secure Auth & Verification** | Passwordless / Email OTP verification with automated profile creation and enterprise-grade data isolation. | Supabase Auth, Nodemailer (SMTP Engine) |
| 📊 **Civic Flow Visualizer** | Interactive visual remedy timeline showing citizens exact step-by-step procedures from complaint to resolution. | Custom Animated Canvas & SVGs, Lucide Icons |

---

## 🏗️ System Architecture

```
                      +------------------------------------------+
                      |         Citizen / User Interface         |
                      |   (Next.js 15 App Router + React 19)     |
                      +--------------------+---------------------+
                                           |
                    +----------------------+----------------------+
                    |                                             |
     [Client Interactions & State]                   [API Server Routes]
     - Voice & Audio Capture (Mic)                   - /api/auth/send-otp
     - Scheme Filter & Search Engine                 - /api/auth/verify-otp
     - RTI Multi-Step Form Engine                    - /api/transcribe (Whisper)
     - Interactive Legal Flow Viz                    - /api/contact (SMTP Mailer)
                    |                                             |
                    +----------------------+----------------------+
                                           |
                      +--------------------+---------------------+
                      |         Backend & Data Layer             |
                      +------------------------------------------+
                      |  - Supabase PostgreSQL (Auth + Tables)   |
                      |  - Row Level Security (RLS) Enforcement  |
                      |  - jsPDF Client-Side Document Engine     |
                      |  - Secure SMTP Notification Service      |
                      +------------------------------------------+
```

---

## 💻 Tech Stack

- **Framework**: [Next.js 15 (App Router with Turbopack)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) + `@tailwindcss/forms` + `@tailwindcss/typography`
- **Animations & Icons**: [Framer Motion](https://www.framer.com/motion/) & [Lucide React](https://lucide.dev/)
- **Database & Authentication**: [Supabase PostgreSQL](https://supabase.com/) with Row Level Security (RLS)
- **Document Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **Email / Communications**: [Nodemailer](https://nodemailer.com/) (Gmail SMTP Gateway)
- **Charts & Metrics**: [Recharts](https://recharts.org/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

---

## 🚀 Quick Start Guide (Windows & Cross-Platform)

Follow these simple steps to run **NyayaSahayak** locally on your machine in under 3 minutes.

### 📋 Prerequisites

Ensure you have installed:
- [Node.js](https://nodejs.org/) (Version **18.18.0** or higher recommended — Node 20 LTS preferred)
- [Git](https://git-scm.com/)
- Package Manager: `npm` (comes with Node.js) or `yarn` / `pnpm`

---

### Step 1: Clone the Repository

Open **PowerShell**, **Command Prompt**, or **Terminal**:

```bash
git clone https://github.com/Piyush6100/nyayasahayak.git
cd nyayasahayak
```

---

### Step 2: Configure Environment Variables

Create your local environment file by copying the provided `.env.example`:

**On Windows (PowerShell):**
```powershell
Copy-Item .env.example .env.local
```

**On macOS / Linux / Bash:**
```bash
cp .env.example .env.local
```

> **Note:** The `.env.example` file comes pre-configured with default cloud backend endpoints for instant demo testing. You can customize keys as needed:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://noboulmjhctyzapggbcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_fAwpeL9VBg95yi7SJn9EFA_MeRHgpGT
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_fAwpeL9VBg95yi7SJn9EFA_MeRHgpGT

# Optional: Voice Transcription API (Whisper)
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Email OTP & Contact SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=nayaysathi@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM_NAME=NyayaSahayak
```

---

### Step 3: Install Dependencies

```bash
npm install
```

---

### Step 4: Run the Development Server

```bash
npm run dev
```

The application will start with Next.js Turbopack at:
👉 **[http://localhost:4028](http://localhost:4028)**

Open your browser and navigate to `http://localhost:4028` to experience the live application!

---

### Step 5: (Optional) Database Setup in Supabase

If you wish to link your own Supabase project instead of the preconfigured demo backend:
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase Dashboard.
3. Open [`supabase_schema.sql`](./supabase_schema.sql) from this repository, paste its contents, and click **Run**.
4. Update `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your `.env.local`.

---

## 🛠️ Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts development server on port **4028** with Turbopack fast-refresh |
| `npm run build` | Compiles and optimizes application for production deployment |
| `npm run serve` | Builds and serves production bundle on port 4028 |
| `npm run lint` | Runs ESLint analysis for code quality & accessibility |
| `npm run lint:fix` | Automatically fixes auto-fixable ESLint warnings |
| `npm run format` | Formats all code files using Prettier |
| `npm run type-check` | Verifies TypeScript types across the entire project |

---

## 🗂️ Project Structure

```
rights-navigator/
├── public/                       # Static public assets, icons, logos & illustrations
│   └── assets/                   # Optimized images & graphics
├── src/
│   ├── app/                      # Next.js 15 App Router pages & API routes
│   │   ├── ai-assistant/         # Conversational Legal AI Assistant
│   │   ├── api/                  # Server-side API endpoints
│   │   │   ├── auth/             # OTP generation and email dispatch
│   │   │   ├── contact/          # Citizen support email dispatcher
│   │   │   └── transcribe/       # Whisper speech-to-text proxy
│   │   ├── cases/                # User Case & Grievance Management Dashboard
│   │   ├── help/                 # Legal FAQ, Guides & Emergency Helpline Directory
│   │   ├── login/                # Authentication login page
│   │   ├── rti-assistant/        # Multi-step RTI Application Generator & PDF Export
│   │   ├── schemes/              # Government Welfare Scheme Discovery & Filters
│   │   ├── signup/               # New citizen onboarding & registration
│   │   ├── layout.tsx            # Root HTML layout with context providers
│   │   └── page.tsx              # High-conversion interactive landing page
│   ├── components/               # Shared cross-application UI components
│   │   ├── Navbar.tsx            # Responsive navigation with auth states
│   │   ├── Footer.tsx            # Legal disclaimer, footer links & brand info
│   │   ├── ProtectedRoute.tsx    # Route protection wrapper for authenticated pages
│   │   └── StatusBadge.tsx       # Reusable civic status pill
│   ├── context/                  # React Context providers (e.g. AuthContext)
│   ├── data/                     # Curated legal knowledge bases & demo datasets
│   │   ├── demoCases.ts          # Sample legal dispute templates
│   │   ├── demoConversations.ts  # Pre-populated civic advice threads
│   │   ├── demoRTI.ts            # RTI department database & templates
│   │   └── demoSchemes.ts        # 50+ central & state welfare scheme records
│   ├── lib/                      # Core utility modules & third-party clients
│   │   ├── auth/                 # In-memory OTP token generator & validator
│   │   ├── email/                # Nodemailer email transport configuration
│   │   ├── supabase/             # Supabase client singleton
│   │   └── utils/                # Styling helpers (clsx, tailwind-merge)
│   └── styles/                   # Global CSS & Tailwind directives
├── .env.example                  # Environment variable configuration template
├── supabase_schema.sql           # Complete PostgreSQL schema with RLS policies
├── tailwind.config.js            # Tailwind typography & color theme configuration
├── tsconfig.json                 # TypeScript compiler options
└── package.json                  # Dependencies and execution scripts
```

---

## 🎬 3-Minute Hackathon Judge Evaluation Walkthrough

Want to test the full potential of NyayaSahayak quickly? Try this user journey:

1. **Explore the Landing Page (`/`)**:
   - Check the **Interactive Civic Flow Visualizer** demonstrating how legal issues get resolved systematically.
   - Review trust badges, emergency helpline quick links, and core capability highlights.
2. **Consult the AI Legal Assistant (`/ai-assistant`)**:
   - Ask a question in everyday language (e.g., *"My landlord refused to return my security deposit without reason"* or *"How do I file a consumer complaint against an e-commerce seller?"*).
   - Test voice input with the microphone button.
   - Observe structured advice: Legal Rights, Required Documents, and Recommended Action Steps.
3. **Generate an RTI Draft (`/rti-assistant`)**:
   - Select your target department (e.g., *Municipal Corporation / Road Infrastructure*).
   - Enter your query and citizen details in the 4-step wizard.
   - Preview the legally structured application and click **Export PDF** to generate an official RTI draft.
4. **Discover Government Welfare Schemes (`/schemes`)**:
   - Filter schemes by State (*Gujarat, Maharashtra, Pan-India*), Occupation (*Farmer, Student, Women Entrepreneur*), or Income category.
   - Click any scheme to view eligibility criteria, financial benefits, and direct application links.
5. **Manage Grievances (`/cases`)**:
   - Track active cases, add notes, and monitor timeline progress.

---

## 🛡️ Privacy, Security & Legal Ethics

- **Statutory Disclaimers**: NyayaSahayak is an informational civic and legal technology platform designed to empower citizens. It does not replace certified legal counsel from an Advocate.
- **Row Level Security (RLS)**: Citizen profile information, chat logs, and case files are strictly isolated using PostgreSQL RLS policies in Supabase.
- **Zero Audio Storage**: Voice recordings transcribed via the transcription gateway are processed in-flight without persistent audio storage.

---

## 🔮 Future Roadmap

- 📱 **WhatsApp & Telegram Chatbot Integration**: Reach rural citizens without requiring computer access.
- 🗣️ **Local Indian Dialect Audio Synthesis**: Text-to-speech output in 12+ Indic languages (Hindi, Gujarati, Tamil, Marathi, Bengali, etc.).
- 🏛️ **Direct e-Filing API Connectors**: Direct integration with e-Courts and State RTI Online portals.
- 📑 **OCR Document Analyzer**: Upload legal notices and receive instant summary of risks and next steps.

---

## 👥 Contributors & Acknowledgments

Developed with ❤️ for civic empowerment and legal accessibility.

- **Lead Developer**: [Piyush Gohel](https://github.com/Piyush6100)
- **Repository**: [https://github.com/Piyush6100/nyayasahayak](https://github.com/Piyush6100/nyayasahayak)

---

<p align="center">
  <b>⚖️ NyayaSahayak — Empowering Every Citizen with the Power of Law.</b><br/>
  <sub>Built for Hackathons & Civic Innovation.</sub>
</p>