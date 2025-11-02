# MediTrust AI - Blockchain Healthcare Platform Frontend

A modern, blockchain-powered healthcare management system built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Modules
- **📊 Overview Dashboard** - Real-time health metrics, AI health score, and vitals monitoring
- **📁 Records Vault** - Secure medical records storage with blockchain verification
- **🤖 AI Center** - AI-powered health insights, chatbot, and medical image analysis
- **🔐 Access Control** - Granular permission management for healthcare providers
- **🚨 Emergency System** - Quick access protocols with family approval workflows
- **⛓️ Blockchain Log** - Transparent transaction history and audit trails
- **🔗 Integration Hub** - ABDM connectivity, wearable devices, and FHIR exchange
- **💬 Feedback System** - Patient feedback with blockchain-verified ratings
- **👤 Profile Management** - User profile with emergency contacts and ABHA ID

### Technical Highlights
- ⚡ Built with **React 18** and **TypeScript**
- 🎨 Styled with **Tailwind CSS**
- 📊 Data visualization with **Recharts**
- ✨ Smooth animations with **Framer Motion**
- 🔒 Blockchain-secured data integrity
- 📱 Fully responsive design
- ♿ Accessibility compliant

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Build Tool**: Vite 5.3.1
- **Styling**: Tailwind CSS 3.4.4
- **Charts**: Recharts 3.3.0
- **Animations**: Framer Motion 12.23.24

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yadavkrishn0956-hash/beta11_frontend.git

# Navigate to project directory
cd beta11_frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── api/                    # API integration layer
│   ├── accessApi.ts
│   ├── blockchainApi.ts
│   ├── emergencyApi.ts
│   ├── feedbackApi.ts
│   ├── integrationApi.ts
│   └── recordsApi.ts
├── components/
│   ├── layout/            # Layout components
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   ├── shared/            # Reusable components
│   │   └── Icon.tsx
│   ├── overview/          # Dashboard components
│   ├── records/           # Records management
│   ├── ai/                # AI Center components
│   ├── access/            # Access control
│   ├── emergency/         # Emergency system
│   ├── blockchain/        # Blockchain logs
│   ├── integration/       # Integration hub
│   └── feedback/          # Feedback system
├── pages/                 # Page components
│   ├── Overview.tsx
│   ├── Records.tsx
│   ├── AICenter.tsx
│   ├── Access.tsx
│   ├── Emergency.tsx
│   ├── BlockchainLog.tsx
│   ├── Integration.tsx
│   ├── Feedback.tsx
│   └── Profile.tsx
├── styles/
│   ├── globals.css
│   └── theme.ts
├── App.tsx
└── main.tsx
```

## 🎨 Key Features Breakdown

### Overview Dashboard
- Real-time vitals monitoring (Heart Rate, BP, SpO2, Temperature)
- AI-powered health score with trend analysis
- Quick actions and reminders
- Blockchain status indicator

### Records Vault
- Upload and manage medical records
- Blockchain verification for each record
- Advanced filtering and search
- Secure record viewer with download options

### AI Center
- Interactive health chatbot
- Medical image analysis
- Context-aware health insights
- Detailed AI explanations

### Access Control
- Grant/revoke access to healthcare providers
- Time-limited permissions
- Audit trail for all access events
- Emergency override protocols

### Emergency System
- Quick emergency access activation
- Family approval workflows
- Hospital request management
- Real-time emergency status tracking

### Blockchain Log
- Complete transaction history
- Live sync toggle
- Advanced filtering (type, status, date range)
- Detailed transaction viewer

### Integration Hub
- ABDM (Ayushman Bharat Digital Mission) connectivity
- Wearable device integration (Fitbit, Apple Health, etc.)
- FHIR data exchange
- Real-time sync status

### Feedback System
- Submit feedback with ratings
- View top-rated providers
- Blockchain-verified feedback
- Ratings analytics dashboard

## 🔐 Security Features

- Blockchain-based data integrity
- Immutable audit trails
- Granular access control
- Emergency access protocols
- Encrypted data transmission

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_url
VITE_BLOCKCHAIN_NETWORK=your_network
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Krishna Yadav**
- GitHub: [@yadavkrishn0956-hash](https://github.com/yadavkrishn0956-hash)

## 🙏 Acknowledgments

- Built with modern web technologies
- Blockchain integration for healthcare data security
- AI-powered health insights
- ABDM compliance

---

**Note**: This is a frontend application. Backend API integration required for full functionality.
