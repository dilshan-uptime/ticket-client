# 🎉 Uptime Alert Dashboard - Complete Project

## 📦 Download Your Project

Your complete, working project has been packaged as: **`uptime-alert-dashboard.tar.gz`**

## 🚀 Quick Setup Instructions

### 1. Extract the Archive
```bash
tar -xzf uptime-alert-dashboard.tar.gz
cd uptime-alert-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file and configure it:
```bash
cp .env.example .env
```

Edit `.env` and `client/.env` with your values:
```env
# .env
SESSION_SECRET=your-secret-key-here

# client/.env
VITE_CLIENT_ID=your-microsoft-client-id
VITE_TENANT_ID=your-microsoft-tenant-id
VITE_REDIRECT_URI=http://localhost:5000/home
VITE_API_URL=https://dev.api.uptimeglobal.tech
```

### 4. Run the Application

**Development Mode:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm start
```

The application will be available at: **http://localhost:5000**

## ✨ What's Included

### **Features:**
- ✅ Microsoft SSO authentication with MSAL
- ✅ Alert Dashboard with statistics overview
- ✅ Circular progress indicators
- ✅ Grid and List view modes
- ✅ Search and filter functionality
- ✅ Uptime branding with logo
- ✅ Professional enterprise UI design
- ✅ Responsive layout
- ✅ JWT token integration
- ✅ Protected routes

### **Tech Stack:**
- **Frontend:** React 18, TypeScript, Tailwind CSS
- **State Management:** Redux Toolkit
- **Routing:** Wouter
- **Authentication:** MSAL (Microsoft Authentication Library)
- **API Client:** Axios
- **UI Components:** Shadcn/ui
- **Backend:** Express.js (Node.js)
- **Build Tool:** Vite

### **Project Structure:**
```
uptime-alert-dashboard/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── store/          # Redux store & slices
│   │   ├── config/         # MSAL configuration
│   │   └── lib/            # API client & utilities
│   └── index.html
├── server/                  # Express backend
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   └── vite.ts             # Vite integration
├── shared/                  # Shared types & schemas
├── attached_assets/         # Logo and images
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

## 🔧 Available Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run check` - TypeScript type checking

## 📝 Important Notes

1. **Microsoft Azure Setup Required:**
   - You need to register an app in Azure AD
   - Configure redirect URIs
   - Get Client ID and Tenant ID

2. **API Integration:**
   - The app connects to: `https://dev.api.uptimeglobal.tech`
   - JWT tokens are automatically attached to API requests

3. **Port Configuration:**
   - Default port: 5000
   - Frontend and backend run on the same port
   - Configured for 0.0.0.0 binding

## 🎨 Design Features

- **Alert Dashboard Overview:** Live statistics with 5 metric cards
- **Circular Progress:** Visual completion indicators on each card
- **Status Badges:** Online/Offline and Priority levels
- **Statistics Grid:** Total, Progress, and Open counts
- **View Modes:** Switch between Grid and List layouts
- **Search & Filter:** Find alerts quickly
- **Action Buttons:** Add New and Reload functionality
- **Uptime Branding:** Professional logo integration

## 📚 Documentation

- `SETUP.md` - Detailed setup guide
- `design_guidelines.md` - UI/UX design system
- `replit.md` - Project documentation and architecture

## 🆘 Troubleshooting

**Build fails:**
- Make sure Node.js v18+ is installed
- Delete `node_modules` and run `npm install` again

**Authentication not working:**
- Verify environment variables in `.env` and `client/.env`
- Check Azure AD app registration settings
- Ensure redirect URI matches exactly

**Port already in use:**
- Change port in `server/index.ts` or stop other processes

## 🎯 Ready to Deploy

This project is production-ready! You can deploy it to:
- Replit (already configured)
- Vercel
- Netlify
- Any Node.js hosting platform

---

**Need help?** Check the documentation files or reach out for support!

Enjoy your Alert Dashboard! 🚀
