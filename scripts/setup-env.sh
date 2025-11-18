#!/bin/bash

# Setup script for Ticket Management System environment variables

cat > .env << 'EOF'
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
EOF

echo "✅ Environment variables configured successfully!"
echo "Run 'npm run dev' to start the application"
