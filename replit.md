# Ticket Management System

## Overview
A professional ticket management system with Microsoft SSO authentication, built with React TypeScript, Redux, and Tailwind CSS. The system integrates with an external backend API for ticket data management.

## Current State
**Status**: Frontend MVP Complete - Ready for Backend Integration

The application features:
- Microsoft SSO authentication with MSAL
- Redux state management for tickets, auth, and UI preferences
- Multiple view modes (Card, List, Grid)
- Search and filter functionality
- Responsive design with brand color #ee754e
- JWT token integration for API requests

## Recent Changes (November 18, 2025)
- ✅ Defined data schemas for Users and Tickets
- ✅ Configured Microsoft MSAL authentication
- ✅ Created Redux store with auth, tickets, and UI slices
- ✅ Built all frontend components:
  - Login page with Microsoft SSO button
  - Protected route guards
  - Header with user profile
  - Ticket views (Card, List, Grid)
  - Search and filter components
  - Loading skeletons and empty states
- ✅ Set up Axios API client with JWT interceptors
- ✅ Configured design system with brand color
- ✅ Added Inter font family

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
Required environment variables (see SETUP.md for details):
- `VITE_CLIENT_ID`: Microsoft Azure AD Client ID
- `VITE_TENANT_ID`: Microsoft Azure AD Tenant ID
- `VITE_REDIRECT_URI`: OAuth redirect URI
- `VITE_API_URL`: Backend API base URL

## User Preferences
- **Brand Color**: #ee754e (coral/orange primary color)
- **Font Family**: Inter (sans-serif)
- **Design Style**: Clean, professional, enterprise-grade
- **View Preferences**: Support for card, list, and grid layouts

## Next Steps
1. Set up environment variables in `.env` file
2. Test Microsoft SSO authentication flow
3. Verify API integration with backend
4. Test all ticket operations (fetch, create, update)
5. Validate filtering and search functionality
6. Review responsive design on various devices

## Known Issues
None currently - MVP frontend is complete and ready for integration testing.
