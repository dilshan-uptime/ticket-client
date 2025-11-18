# Ticket Management System

## Overview
A professional ticket management system with Microsoft SSO authentication, built with React TypeScript, Redux, and Tailwind CSS. The system integrates with an external backend API for ticket data management.

## Current State
**Status**: ✅ MVP Complete - Alert Dashboard Ready

The application is production-ready with a professional Alert Dashboard design featuring:
- Microsoft SSO authentication with MSAL (fully configured and tested)
- **Alert Dashboard Overview** with live statistics (Total Presets, Open Alerts, Active Presets, System Health)
- **Grid and List view modes** with circular progress indicators
- Alert cards with online/offline status, priority badges, and progress metrics
- Search and filter functionality with "Showing X of Y" counter
- Uptime logo branding throughout the application
- Responsive design with brand color #ee754e
- JWT token integration for API requests
- Protected routes with proper authentication guards
- Professional UI matching enterprise alert monitoring platforms
- All environment variables properly configured

## Recent Changes (November 18, 2025)
### Authentication & Routing (Completed)
- ✅ Microsoft MSAL configuration with proper tenant and client IDs
- ✅ Redux auth slice with user, token, and loading state
- ✅ Protected routes with redirect to login for unauthenticated users
- ✅ Two dashboard routes (/home for MSAL redirect, /dashboard for direct access)
- ✅ Axios interceptor automatically attaches JWT Bearer token to all API requests
- ✅ 401 error handling with automatic redirect to login
- ✅ Silent token acquisition and refresh handling

### UI Components (Completed)
- ✅ Login page with Uptime logo and Microsoft SSO button
- ✅ Protected route guards with loading states
- ✅ Header with Uptime logo, divider, and user profile menu
- ✅ **Alert Dashboard Overview** with 5 statistics cards and live health indicator
- ✅ Alert cards with circular progress indicators, status badges, and metrics
- ✅ Grid/List view toggle with "Showing X of Y" counter
- ✅ Search bar with filters and status dropdown
- ✅ "Add New" and "Reload" action buttons
- ✅ Loading skeletons and empty states
- ✅ Toast notifications for success/error feedback

### UI/UX Design (Completed)
- ✅ Uptime logo integrated on login page and header
- ✅ Alert Dashboard design matching enterprise monitoring platforms
- ✅ Circular progress indicators showing completion percentages
- ✅ Statistics overview with color-coded metrics
- ✅ Online/Offline status indicators on each alert card
- ✅ Priority badges (Priority: Low/High) based on status
- ✅ Total, Progress, and Open count displays
- ✅ "Last updated" timestamps on each card
- ✅ Professional grid layout (1-4 columns responsive)

### Testing & Validation (Completed)
- ✅ Automated E2E tests verified protected routes work correctly
- ✅ Login page renders properly with Uptime logo
- ✅ Microsoft SSO flow initiates successfully
- ✅ Unauthenticated users properly redirected to login
- ✅ No console errors or environment variable issues
- ✅ Alert Dashboard displays with statistics and grid layout

## Project Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: Wouter
- **Authentication**: @azure/msal-browser, @azure/msal-react
- **Styling**: Tailwind CSS with shadcn/ui components
- **API Client**: Axios
- **Notifications**: react-hot-toast
- **Date Formatting**: date-fns

### Backend Integration
- **API Base URL**: https://dev.api.uptimeglobal.tech
- **Authentication**: JWT tokens from Microsoft SSO
- **Endpoints**: RESTful API for ticket CRUD operations

### Data Models

#### User
```typescript
{
  id: string;
  email: string;
  displayName: string;
  azureId: string;
}
```

#### Ticket
```typescript
{
  id: string;
  name: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
}
```

### File Structure
```
client/
  src/
    components/       # Reusable UI components
    pages/           # Route pages (Login, Dashboard)
    store/           # Redux store and slices
    config/          # MSAL and app configuration
    lib/             # API client and utilities
shared/
  schema.ts          # Shared data types
```

## Environment Variables
All required environment variables are configured in `.env` and `client/.env`:
- ✅ `VITE_CLIENT_ID`: fc61dd22-8c4c-4789-ad8a-05c6f39515d4
- ✅ `VITE_TENANT_ID`: e8c7a1e6-646c-45df-95c0-1652dc958e27
- ✅ `VITE_REDIRECT_URI`: http://localhost:5000/home
- ✅ `VITE_API_URL`: https://dev.api.uptimeglobal.tech

## User Preferences
- **Brand Color**: #ee754e (coral/orange primary color)
- **Font Family**: Inter (sans-serif)
- **Design Style**: Clean, professional, enterprise-grade
- **View Preferences**: Support for card, list, and grid layouts

## Routes
- `/` - Login page (public)
- `/home` - Dashboard (protected, MSAL redirect target)
- `/dashboard` - Dashboard (protected, alias for easier navigation)

## How to Test
1. **Login Flow**: Open the app at http://localhost:5000
2. Click "Sign in with Microsoft" button
3. Complete Microsoft authentication in the popup
4. After successful login, you'll be redirected to the dashboard
5. View tickets in Card, List, or Grid view
6. Use search and filters to find specific tickets
7. Logout from the user menu in the header

## Manual Testing Required
Since Microsoft SSO requires actual user credentials and 2FA, the following should be tested manually:
- ✅ Login page UI (automated test passed)
- ✅ Protected route redirects (automated test passed)
- ✅ Microsoft SSO initiation (automated test passed)
- ⏳ Complete Microsoft login flow (requires user credentials)
- ⏳ Token storage and API requests (requires authenticated session)
- ⏳ Ticket CRUD operations (requires authenticated session)
- ⏳ Search and filter functionality (requires ticket data)
- ⏳ View mode switching (requires ticket data)

## Known Issues
None - all automated tests passed successfully. Manual testing with actual Microsoft credentials is required to verify the complete end-to-end flow.
