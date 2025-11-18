# Ticket Management System - Setup Instructions

## Prerequisites
- Node.js 20+
- Microsoft Azure AD application credentials

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Microsoft SSO Configuration
VITE_CLIENT_ID=fc61dd22-8c4c-4789-ad8a-05c6f39515d4
VITE_TENANT_ID=e8c7a1e6-646c-45df-95c0-1652dc958e27
VITE_REDIRECT_URI=http://localhost:5000/home

# Backend API Configuration
VITE_API_URL=https://dev.api.uptimeglobal.tech

# Other Configuration
VITE_HTTP_REQUEST_TIMEOUT=5000
VITE_VERSION=v1.0.0
VITE_IS_PRODUCTION=false
VITE_ENABLE_SENTRY=false
VITE_HUB_NAME=local_user_hub
VITE_INVITATION_DEFAULT_MESSAGE=This is sample message
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Features

- **Microsoft SSO Authentication**: Secure login using Microsoft accounts
- **Ticket Management**: View, search, and filter tickets
- **Multiple View Modes**: Card, List, and Grid views
- **Real-time Filtering**: Search and filter by status
- **Responsive Design**: Works on desktop and mobile devices
- **JWT Token Integration**: All API requests include JWT authentication

## Architecture

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Authentication**: Microsoft MSAL
- **Styling**: Tailwind CSS
- **API Integration**: Axios with JWT interceptors
- **Backend**: External API at https://dev.api.uptimeglobal.tech
