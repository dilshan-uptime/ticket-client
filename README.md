# 🎯 Alert Dashboard - Ticket Management System

A professional enterprise-grade alert dashboard with Microsoft SSO authentication, built with React TypeScript, Redux, and Tailwind CSS.

![Uptime Logo](attached_assets/logo_1763446328043.png)

## ✨ Features

- 🔐 **Microsoft SSO Authentication** - Secure login with MSAL
- 📊 **Alert Dashboard Overview** - Live statistics with 5 metric cards
- 🎨 **Circular Progress Indicators** - Visual completion tracking
- 📱 **Responsive Design** - Works on all devices
- 🔄 **Grid & List Views** - Flexible display modes
- 🔍 **Search & Filter** - Find alerts quickly
- 🎨 **Uptime Branding** - Professional corporate design
- 🚀 **Real-time Updates** - JWT token integration
- 🛡️ **Protected Routes** - Secure authentication guards

## 🖼️ Screenshots

### Dashboard Overview
Professional alert monitoring with live statistics, status indicators, and circular progress tracking.

### Features
- **Total Presets**: Track all configured alert dashboards
- **Open Alerts**: Monitor alerts requiring immediate action
- **Active Presets**: View currently monitoring dashboards
- **System Health**: Real-time health percentage with visual indicator

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- Microsoft Azure AD app registration
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dilshan-uptime/ticket-client.git
cd ticket-client

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

### Environment Setup

Create a `.env` file in the root directory:
```env
SESSION_SECRET=your-secret-key-here
```

Create a `client/.env` file:
```env
VITE_CLIENT_ID=your-microsoft-client-id
VITE_TENANT_ID=your-microsoft-tenant-id
VITE_REDIRECT_URI=http://localhost:5000/home
VITE_API_URL=https://dev.api.uptimeglobal.tech
```

### Run the Application

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

Visit **http://localhost:5000**

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **Wouter** - Routing
- **Axios** - HTTP client
- **MSAL** - Microsoft authentication

### Backend
- **Express.js** - Server framework
- **Node.js** - Runtime environment
- **JWT** - Token authentication

### Build Tools
- **Vite** - Fast build tool
- **esbuild** - Fast bundler
- **TypeScript** - Type checking

## 📁 Project Structure

```
ticket-client/
├── client/                  # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # Shadcn UI primitives
│   │   │   ├── AlertCard.tsx
│   │   │   ├── StatisticsOverview.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ...
│   │   ├── pages/          # Route pages
│   │   │   ├── Login.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── store/          # Redux store
│   │   │   ├── store.ts
│   │   │   └── slices/
│   │   ├── config/         # Configuration
│   │   │   └── msalConfig.ts
│   │   └── lib/            # Utilities
│   └── index.html
├── server/                  # Backend application
│   ├── index.ts            # Server entry
│   ├── routes.ts           # API routes
│   ├── vite.ts             # Vite integration
│   └── storage.ts          # Storage interface
├── shared/                  # Shared types
│   └── schema.ts
├── attached_assets/         # Static assets
│   └── logo_1763446328043.png
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Design System

### Colors
- **Primary:** `#ee754e` (Uptime brand color)
- **Background:** Adaptive light/dark theme
- **Card:** Elevated surfaces
- **Muted:** Secondary text and borders

### Components
- Alert cards with circular progress
- Statistics overview cards
- Status badges (Online/Offline)
- Priority indicators (Low/High)
- Action buttons with icons

## 🔐 Authentication Flow

1. User clicks "Sign in with Microsoft"
2. MSAL popup opens for authentication
3. User authenticates with Microsoft credentials
4. JWT token received and stored
5. Token attached to all API requests
6. User redirected to dashboard
7. Protected routes validated

## 📊 Dashboard Features

### Statistics Overview
- **Total Presets**: Count of all alert dashboards
- **Open Alerts**: Alerts needing attention
- **Active Presets**: Currently monitoring
- **System Health**: Visual health percentage

### Alert Cards
Each alert card displays:
- Online/Offline status indicator
- Alert name and description
- Priority badge (Low/High)
- Circular progress indicator
- Statistics (Total/Progress/Open)
- Last updated timestamp
- Action menu (View/Edit/Delete)
- "Open Dashboard" button

### View Modes
- **Grid View**: Visual card layout
- **List View**: Compact table view

### Actions
- **Search**: Filter alerts by name
- **Filter**: Filter by status (All/Pending/In Progress/Completed)
- **Reload**: Refresh alert data
- **Add New**: Create new alert dashboard

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production server
npm run check    # TypeScript type checking
```

## 🔧 Configuration

### Microsoft Azure Setup
1. Register app in Azure AD
2. Configure redirect URIs
3. Get Client ID and Tenant ID
4. Add to environment variables

### API Integration
- Base URL: `https://dev.api.uptimeglobal.tech`
- JWT tokens automatically attached
- 401 errors trigger re-authentication

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SESSION_SECRET` | Express session secret | `random-secret-string` |
| `VITE_CLIENT_ID` | Microsoft Azure Client ID | `fc61dd22-...` |
| `VITE_TENANT_ID` | Microsoft Azure Tenant ID | `e8c7a1e6-...` |
| `VITE_REDIRECT_URI` | OAuth redirect URI | `http://localhost:5000/home` |
| `VITE_API_URL` | Backend API URL | `https://dev.api.uptimeglobal.tech` |

## 🚢 Deployment

### Build Production Files
```bash
npm run build
```

Outputs to:
- `dist/` - Server code
- `dist/public/` - Client build

### Deploy to Production
```bash
npm start
```

Server runs on port 5000 by default.

### Deployment Platforms
- ✅ Replit
- ✅ Vercel
- ✅ Netlify
- ✅ Railway
- ✅ Heroku
- ✅ Any Node.js hosting

## 📚 Documentation

- `design_guidelines.md` - UI/UX design system
- `SETUP.md` - Detailed setup guide
- `replit.md` - Project documentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👨‍💻 Author

**Uptime Global**

## 🆘 Support

For issues and questions:
1. Check the documentation files
2. Review environment variables
3. Verify Azure AD configuration
4. Check browser console for errors

## 🎯 Roadmap

- [ ] Real-time WebSocket updates
- [ ] Advanced filtering and sorting
- [ ] Alert history and analytics
- [ ] Email notifications
- [ ] Mobile app
- [ ] Dark mode improvements
- [ ] Multi-language support

---

**Built with ❤️ by Uptime Global**
