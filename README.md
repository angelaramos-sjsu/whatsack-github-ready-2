# 🌱 WhatSack: AI-Assisted Community Resource Navigation Platform

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![WCAG](https://img.shields.io/badge/WCAG%202.1-AA%2FAAA-green.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

**WhatSack** is a free, high-fidelity interactive web prototype demonstrating AI-assisted community resource navigation for residents across Silicon Valley (Santa Clara and San Mateo counties). 

> ⚠️ **Academic Research Prototype Notice**: This project is developed strictly for human-computer interaction and civic AI research. All organizations, telephone numbers, schedules, and eligibility rules are realistic demonstration placeholders. No sensitive personal data, Social Security Numbers, or credentials are requested or stored. For actual life-threatening emergencies, call **911** or **988** (Suicide & Crisis Lifeline).

---

## 🚀 Key Features

### 1. Conversational Civic Search & 4 Core Categories
- **Natural Language Search**: Residents can type or speak in plain English or Spanish (e.g., *"Where can I get groceries in East San Jose without an ID?"*).
- **Four Core Categories**:
  - 🍏 **Food Access**: Stigma-free community pantries, mobile produce markets, culturally familiar ingredients.
  - 🧠 **Mental Health**: Sliding-scale clinics, confidential youth text lines, bilingual peer groups.
  - 💼 **Education & Workforce Training**: Dislocated worker retraining vouchers (WIOA), California College Promise tuition-free community colleges, tech certificates.
  - 🤝 **Community Connection**: Spanish-language senior circles with hot lunch, youth wellness hubs, legal clinics.

### 2. Resident Introduction Assessment Form
- Captures resident context without sensitive PII: Name/nickname, monthly household income, household size, city, service priority areas, transit dependence, and zero-ID preference.
- Automatically tailors search results and catalog recommendations.
- Connects directly with the Civic-LLM chat (*"Ask as [Name]"*).

### 3. Civic AI LLM Platform Suite
- **Civic-LLM Copilot (`AILLMConsole.tsx`)**:
  - Simulated, local conversational prototype with scripted persona journeys and official source links for education and workforce questions.
  - **NextStep Insights**: Offers optional, practical follow-up suggestions alongside the response.
  - **No live model connection**: Education answers use curated local response scripts; the prototype does not send prompts to an LLM service or backend.
  - **Phone Rehearsal Mode (Roleplay)**: Practice an intake conversation with a simulated coordinator (*Elena*).
- **AI Architecture & RAG Pipeline Inspector (`AIEngineInspectorModal.tsx`)**:
  - Visual breakdown of the 4-step pipeline: Ingestion $\to$ Dense Vector Retrieval $\to$ Policy Guardrails $\to$ Grounded Synthesis.
  - Model parameter tuning (Temperature, Strict Citation Enforcement).
  - Full transparency into the Civic System Prompt directives.
- **AI Government Document & Bureaucratic Jargon Decoder (`AIDocumentDecoderModal.tsx`)**:
  - Decodes confusing notices (e.g., *Santa Clara CalFresh SAR 7*, *EDD CTB Retraining Audits*).
  - Extracts the **Bottom Line**, a **Panic Check** (confirming benefits aren't shut off today), and **3 Action Steps** with deadlines.

### 4. NextStep Insights & Action Checklists
- Explains *why* each program is recommended.
- Documents required checklist, transit notes (VTA, SamTrans, BART), and simulated intake contact methods.
- Interactive checkboxes with progress indicator, celebration confetti, clipboard copying, and printable checklists.

### 5. Simulated Browser-Extension Companion
- Dual-pane browser simulator pairing official government portals (*Santa Clara County CalFresh*, *California EDD*, *De Anza College Promise*) with the docked WhatSack assistant sidebar that translates regulatory legalese in real time.

### 6. Bilingual & Simulated Voice
- Seamless English and Spanish (**EN / ES**) toggle across the entire application.
- Simulated and Web Speech API Voice Assistant with animated soundwave visualizer and audio playback.

### 7. Built for WCAG 2.1 AA / AAA Accessibility
- **Skip to Main Content** keyboard shortcut link (`#main-content`).
- **Font Size Scaler**: Toggle between `1x`, `1.2x` (18px base), and `1.4x` (20px base).
- **High-Contrast AAA Mode**: Toggle high-contrast ratio ($\ge 7:1$) with enhanced borders and underlined links.
- **ARIA Dialogs**: All 7 modals and drawers implement `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and global <kbd>Escape</kbd> key dismissal.
- **Touch-Friendly**: $\ge 44 \times 44$px touch targets and visible focus indicators (`3px solid #047857`).
- **Screen Reader Announcements**: `aria-live="polite"` regions for dynamic search and filter updates.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom accessible CSS variables
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas-Confetti

---

## 📁 Project Structure

```
whatsack/
├── index.html                   # HTML entry point with accessibility skip link target
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite bundler configuration
├── tailwind.config.js           # Tailwind design tokens and theme extensions
├── postcss.config.js            # PostCSS plugins
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Root state orchestration & view management
│   ├── index.css                # WCAG focus rings, high-contrast & font scaling CSS
│   ├── types/
│   │   └── index.ts             # TypeScript definitions (IntakeProfile, Resource, Persona)
│   ├── data/
│   │   ├── resources.ts         # Demonstration community resource records
│   │   ├── translations.ts      # Bilingual EN/ES comprehensive dictionary
│   │   └── personas.ts          # Persona profile definitions
│   └── components/
│       ├── Navbar.tsx           # Accessible header with text sizer & high contrast toggle
│       ├── HeroConversationalSearch.tsx # Conversational search bar & assessment CTA
│       ├── IntroductionForm.tsx # 12-field resident intake assessment modal
│       ├── CategoryTabs.tsx     # 4 Core resource categories tablist
│       ├── ResourceCard.tsx     # Semantic cards with badges & NextStep preview
│       ├── NextStepInsightsModal.tsx # Action checklist modal with confetti & print
│       ├── AILLMConsole.tsx     # Civic-LLM Chat Copilot with RAG traces & roleplay
│       ├── AIEngineInspectorModal.tsx # RAG pipeline inspector & model settings
│       ├── AIDocumentDecoderModal.tsx # Official government notice plain-language decoder
│       ├── SimulatedExtensionSidebar.tsx # Browser companion split-screen view
│       ├── VoiceAssistantModal.tsx # Simulated voice query modal with soundwave
│       ├── SavedResourcesDrawer.tsx # Bookmarked resources & plan export
│       ├── DisclaimerBanner.tsx # Academic prototype safety & ethics notice
│       └── Footer.tsx           # Accessible footer with category links
└── .gitignore                   # Standard git ignore file
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or v20+)
- npm (v9 or v10+)

### Installation & Launch

```bash
# 1. Clone your repository (or navigate to the project directory):
cd whatsack

# 2. Install dependencies:
npm install

# 3. Start the development server:
npm run dev

# 4. Open your browser:
# Navigate to http://localhost:5173
```

### Building for Production

```bash
# Type check and build optimized bundle:
npm run build

# Preview the production build locally:
npm run preview
```

---

## 📜 License & Academic Citation

Developed as an academic research prototype. Feel free to use and adapt this code for civic tech, non-profit community navigation, or educational research.
