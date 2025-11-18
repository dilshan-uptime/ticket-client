import { useEffect, useState } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType, AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "./config/msalConfig";
import { validateEnvironment } from "./config/env";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/not-found";
import { setLoading } from "./store/slices/authSlice";

const msalInstance = new PublicClientApplication(msalConfig);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/home">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    validateEnvironment();
    
    const initializeMsal = async () => {
      await msalInstance.initialize();
      
      msalInstance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
          const payload = event.payload as AuthenticationResult;
          msalInstance.setActiveAccount(payload.account);
        }
      });

      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        if (!msalInstance.getActiveAccount()) {
          msalInstance.setActiveAccount(accounts[0]);
        }
      }

      setIsInitialized(true);
    };

    initializeMsal();
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <svg className="h-8 w-8 animate-spin mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                border: '1px solid hsl(var(--border))',
              },
              success: {
                iconTheme: {
                  primary: 'hsl(var(--primary))',
                  secondary: 'hsl(var(--primary-foreground))',
                },
              },
            }}
          />
          <Router />
        </QueryClientProvider>
      </Provider>
    </MsalProvider>
  );
}

export default App;
