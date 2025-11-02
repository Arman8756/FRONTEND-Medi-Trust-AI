# MediTrust AI - Complete Code Structure Guide

## 📚 How to Read This Codebase

This guide lists all files in the **optimal order** to understand the application architecture.

---

## 🎯 BACKEND (Node.js + Express)

### Read in This Order:

#### 1. Configuration Files
```
backend/
├── package.json              # Dependencies & scripts
├── .env.example              # Environment variables template
├── .env                      # Actual environment variables (API keys)
└── .gitignore               # Git ignore rules
```

#### 2. Main Server File
```
backend/
└── server.js                 # Main Express server
    ├── Express setup
    ├── CORS configuration
    ├── API routes
    ├── Gemini AI integration
    ├── Email service (SendGrid)
    └── Server startup
```

### Backend Summary:
- **Total Files**: 1 main file (server.js)
- **Purpose**: API server for AI chat, email, and data processing
- **Tech Stack**: Node.js, Express, Gemini AI, SendGrid
- **Port**: 3001

---

## 🎨 FRONTEND (React + TypeScript + Vite)

### Read in This Order:

---

### PHASE 1: Entry Points & Configuration

#### 1. Configuration Files (Start Here)
```
Root/
├── package.json              # Frontend dependencies
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── index.html               # HTML entry point
```

#### 2. Main Entry Files
```
src/
├── main.tsx                 # React app entry point
│   ├── Imports React & ReactDOM
│   ├── Imports global styles
│   └── Renders App component
│
└── App.tsx                  # Main app component
    ├── Routing logic
    ├── Page rendering
    ├── Context providers
    └── Layout wrapper
```

---

### PHASE 2: Styling & Theme

#### 3. Global Styles
```
src/styles/
├── globals.css              # Global CSS (Tailwind + custom)
│   ├── Blue gradient theme
│   ├── Glassmorphism effects
│   ├── Button styles
│   └── Animations
│
└── theme.ts                 # Theme configuration
    └── Color palette & constants
```

---

### PHASE 3: Shared Components (Building Blocks)

#### 4. Core UI Components (Read First)
```
src/components/shared/
├── index.ts                 # Exports all shared components
├── SvgIcons.tsx            # SVG icon library (25+ icons)
├── Button.tsx              # Reusable button component
├── Card.tsx                # Card container component
├── Badge.tsx               # Status badge component
├── Modal.tsx               # Modal dialog component
├── Toast.tsx               # Toast notification component
├── LoadingSpinner.tsx      # Loading indicator
├── Skeleton.tsx            # Skeleton loader
├── Table.tsx               # Data table component
├── FormField.tsx           # Form input wrapper
├── Icon.tsx                # Icon wrapper (legacy)
├── WalletConnect.tsx       # Wallet connection component
└── ErrorBoundary.tsx       # Error boundary wrapper
```

**Purpose**: Reusable UI components used throughout the app

---

### PHASE 4: Layout Components

#### 5. App Layout Structure
```
src/components/layout/
├── index.ts                 # Exports layout components
├── Layout.tsx              # Main layout wrapper
│   ├── Background gradient
│   ├── Floating elements
│   ├── Topbar integration
│   └── Sidebar integration
│
├── Topbar.tsx              # Top navigation bar
│   ├── Logo & branding
│   ├── Search bar
│   ├── User menu
│   └── Notifications
│
└── Sidebar.tsx             # Side navigation menu
    ├── Menu items
    ├── Navigation links
    └── Active state handling
```

**Purpose**: Defines the overall app structure and navigation

---

### PHASE 5: Context & State Management

#### 6. Global State (React Context)
```
src/contexts/
├── PatientContext.tsx       # Patient data state
│   ├── Patient information
│   ├── Medical records
│   └── Health data
│
└── RequestContext.tsx       # Access request state
    ├── Pending requests
    ├── Approved requests
    └── Request management
```

**Purpose**: Global state management across the app

---

### PHASE 6: API Layer

#### 7. API Services (Backend Communication)
```
src/api/
├── mock.ts                  # Mock data utilities
├── mockData.ts             # Sample data for testing
├── recordsApi.ts           # Medical records API
├── accessApi.ts            # Access control API
├── blockchainApi.ts        # Blockchain transaction API
├── emergencyApi.ts         # Emergency access API
├── feedbackApi.ts          # Feedback & ratings API
├── aiApi.ts                # AI chat API
└── integrationApi.ts       # Integration & interop API
```

**Purpose**: API calls to backend and mock data for development

---

### PHASE 7: Data & Utilities

#### 8. Sample Data
```
src/data/
└── sampleReports.ts         # Sample medical reports
    ├── Lab reports (CBC, Lipid Profile)
    ├── Radiology reports (X-Ray)
    └── AI analysis data
```

#### 9. Utility Functions
```
src/utils/
└── pdfGenerator.ts          # PDF generation utilities
    ├── HTML to PDF conversion
    ├── Print functionality
    └── Filename generation
```

**Purpose**: Helper functions and sample data

---

### PHASE 8: Main Pages (User Interface)

#### 10. Core Pages (Read in This Order)

**A. Dashboard & Overview**
```
src/pages/
├── HealthDashboard.tsx      # Main health dashboard
│   ├── Patient summary
│   ├── Vitals & trends
│   ├── Recent reports
│   └── AI insights
│
└── Overview.tsx             # System overview
    ├── Quick stats
    ├── Recent activity
    └── Quick actions
```

**B. Medical Records**
```
src/pages/
├── Records.tsx              # Medical records vault
│   ├── Records list
│   ├── Filters & search
│   ├── Upload functionality
│   └── Record viewer
│
├── PatientProfile.tsx       # Patient profile page
│   ├── Personal information
│   ├── Medical history
│   └── Records timeline
│
└── ReportGenerator.tsx      # Report generator
    ├── Report type selector
    ├── Beautiful report templates
    └── Print/PDF export
```

**C. AI Features**
```
src/pages/
├── AIHealthChatAssistant.tsx # AI health chatbot
│   ├── Chat interface
│   ├── Gemini AI integration
│   ├── Medical search
│   └── Emergency detection
│
└── AICenter.tsx             # AI tools center
    ├── AI features overview
    └── Tool selection
```

**D. Access Control**
```
src/pages/
├── Access.tsx               # Access management
│   ├── Grant/revoke access
│   ├── Access history
│   └── Key management
│
└── HospitalAccessRequest.tsx # Hospital access requests
    └── Request handling
```

**E. Emergency & Safety**
```
src/pages/
└── Emergency.tsx            # Emergency access
    ├── Emergency activation
    ├── Family approval
    ├── Hospital requests
    └── Emergency settings
```

**F. Blockchain & Logs**
```
src/pages/
└── BlockchainLog.tsx        # Blockchain transaction log
    ├── Transaction history
    ├── Verification
    ├── Filters
    └── Live sync
```

**G. Integration & Interoperability**
```
src/pages/
├── Integration.tsx          # Integration hub
│   ├── FHIR standards
│   ├── Wearable devices
│   └── ABDM integration
│
└── Interoperability.tsx     # Interoperability features
    ├── Data exchange
    ├── Connected facilities
    └── Sync status
```

**H. Feedback & Communication**
```
src/pages/
└── Feedback.tsx             # Feedback & ratings
    ├── Submit feedback
    ├── Ratings overview
    ├── Top rated providers
    └── Contact doctor
```

**I. Hospital Portal**
```
src/pages/
└── HospitalUpload.tsx       # Hospital portal
    ├── Lab report upload
    ├── Patient search
    └── Access requests
```

**J. User Management**
```
src/pages/
├── Login.tsx                # Login page
│   ├── Email login
│   └── Wallet login
│
└── Profile.tsx              # User profile
    ├── Personal settings
    └── Preferences
```

---

### PHASE 9: Feature Components (Page-Specific)

#### 11. Records Components
```
src/components/records/
├── RecordsTable.tsx         # Records data table
├── RecordsFilterBar.tsx     # Filter controls
├── RecordViewer.tsx         # Record detail viewer
├── UploadPanel.tsx          # File upload panel
└── TxModal.tsx              # Transaction modal
```

#### 12. Access Components
```
src/components/access/
├── AccessTable.tsx          # Access permissions table
├── GrantAccessModal.tsx     # Grant access dialog
├── RevokeConfirmModal.tsx   # Revoke confirmation
├── KeyManagerCard.tsx       # Encryption key manager
└── AuditHistoryPanel.tsx    # Access audit log
```

#### 13. Blockchain Components
```
src/components/blockchain/
├── TxLogTable.tsx           # Transaction log table
├── TxDetailsDrawer.tsx      # Transaction details
├── FilterPanel.tsx          # Filter controls
├── SummaryStatsCard.tsx     # Summary statistics
└── LiveSyncToggle.tsx       # Live sync toggle
```

#### 14. Emergency Components
```
src/components/emergency/
├── EmergencyStatusBanner.tsx # Emergency status
├── ActiveEmergencyCard.tsx   # Active emergency info
├── HospitalRequestForm.tsx   # Hospital request form
├── FamilyApprovalPanel.tsx   # Family approval UI
├── EmergencySettingsCard.tsx # Emergency settings
└── EmergencyTxModal.tsx      # Emergency transaction
```

#### 15. Feedback Components
```
src/components/feedback/
├── FeedbackFormCard.tsx     # Feedback submission form
├── RatingsOverviewCard.tsx  # Ratings statistics
├── TopRatedCard.tsx         # Top rated providers
├── ContactDoctorCard.tsx    # Contact doctor form
└── BlockchainFeedbackTable.tsx # Feedback blockchain log
```

#### 16. AI Components
```
src/components/ai/
├── Chatbot.tsx              # AI chatbot interface
├── ImageAnalyzer.tsx        # Medical image analysis
├── ContextPanel.tsx         # Context information
└── ExplainDrawer.tsx        # AI explanation drawer
```

#### 17. Integration Components
```
src/components/integration/
├── IntegrationSummaryCard.tsx # Integration overview
├── FHIRExchangeCard.tsx      # FHIR data exchange
├── WearableIntegrationPanel.tsx # Wearable devices
└── ABDMConnectivityCard.tsx  # ABDM connection
```

#### 18. Overview Components
```
src/components/overview/
├── HeaderSection.tsx        # Dashboard header
├── VitalsGrid.tsx          # Vitals display grid
├── TrendsChart.tsx         # Health trends chart
├── QuickActionsPanel.tsx   # Quick action buttons
├── RemindersPanel.tsx      # Reminders & alerts
├── AIHealthScore.tsx       # AI health score
└── BlockchainStatusBar.tsx # Blockchain status
```

#### 19. Report Components
```
src/components/reports/
└── MedicalReportTemplate.tsx # Beautiful report template
    ├── Professional layout
    ├── Color-coded results
    ├── AI analysis section
    └── Print/PDF ready
```

---

## 📊 File Count Summary

### Backend:
- **Configuration**: 4 files
- **Server Code**: 1 file
- **Total**: 5 files

### Frontend:
- **Configuration**: 6 files
- **Entry Points**: 2 files
- **Styles**: 2 files
- **Shared Components**: 14 files
- **Layout Components**: 3 files
- **Contexts**: 2 files
- **API Services**: 9 files
- **Data & Utils**: 2 files
- **Pages**: 17 files
- **Feature Components**: 60+ files
- **Total**: 117+ files

---

## 🎯 Reading Strategy by Goal

### Goal 1: Understand Overall Architecture
**Read in this order:**
1. `package.json` (both frontend & backend)
2. `backend/server.js`
3. `src/main.tsx`
4. `src/App.tsx`
5. `src/components/layout/Layout.tsx`

### Goal 2: Understand UI Components
**Read in this order:**
1. `src/styles/globals.css`
2. `src/components/shared/SvgIcons.tsx`
3. `src/components/shared/Button.tsx`
4. `src/components/shared/Card.tsx`
5. `src/components/layout/Sidebar.tsx`
6. `src/components/layout/Topbar.tsx`

### Goal 3: Understand Main Features
**Read in this order:**
1. `src/pages/HealthDashboard.tsx`
2. `src/pages/Records.tsx`
3. `src/pages/AIHealthChatAssistant.tsx`
4. `src/pages/Access.tsx`
5. `src/pages/Emergency.tsx`

### Goal 4: Understand Data Flow
**Read in this order:**
1. `src/contexts/PatientContext.tsx`
2. `src/api/recordsApi.ts`
3. `src/api/mockData.ts`
4. `backend/server.js`

### Goal 5: Understand Report Generation
**Read in this order:**
1. `src/data/sampleReports.ts`
2. `src/components/reports/MedicalReportTemplate.tsx`
3. `src/pages/ReportGenerator.tsx`
4. `src/utils/pdfGenerator.ts`

---

## 🔑 Key Technologies

### Backend:
- Node.js + Express
- Google Gemini AI
- SendGrid Email
- CORS

### Frontend:
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- React Context (State management)

---

## 🚀 Quick Start Commands

### Backend:
```bash
cd backend
npm install
npm start
```

### Frontend:
```bash
npm install
npm run dev
```

---

## 📝 Notes

- **Blue Theme**: All components use blue gradient (#E6F3FF → #B3D9FF → #4A90E2)
- **SVG Icons**: No emojis, all icons are SVG components
- **Glassmorphism**: Modern glass effect with backdrop-blur
- **Responsive**: All components are mobile-friendly
- **Type-Safe**: Full TypeScript coverage
- **Modular**: Components are reusable and well-organized

---

## 🎓 Learning Path

**Beginner** (Start here):
1. Configuration files
2. Entry points (main.tsx, App.tsx)
3. Shared components
4. One simple page (HealthDashboard.tsx)

**Intermediate**:
1. Layout components
2. Context providers
3. API services
4. Multiple pages

**Advanced**:
1. Feature-specific components
2. Report generation system
3. AI integration
4. Blockchain integration

---

**Happy Coding! 🚀**
