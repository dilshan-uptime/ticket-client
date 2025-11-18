import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, setTempUser, setAccessToken, setLoading } from "@/store/slices/authSlice";
import { loginRequest } from "@/config/msalConfig";
import logoUrl from "@assets/logo_1763446328043.png";
import { toast } from "react-hot-toast";
import { setAuthToken } from "@/lib/api";
import { apiRequest } from "@/lib/queryClient";
import type { User } from "@shared/schema";

export default function Login() {
  const { instance, accounts, inProgress } = useMsal();
  const dispatch = useAppDispatch();
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/home");
    }
  }, [isAuthenticated, setLocation]);

  useEffect(() => {
    const checkAuth = async () => {
      if (accounts.length > 0) {
        try {
          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });

          const user = {
            id: accounts[0].localAccountId,
            email: accounts[0].username,
            displayName: accounts[0].name || accounts[0].username,
            azureId: accounts[0].localAccountId,
          };

          dispatch(setUser(user));
          dispatch(setAccessToken(response.accessToken));
          setAuthToken(response.accessToken);
          dispatch(setLoading(false));
          setLocation("/home");
        } catch (error) {
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [accounts, instance, dispatch, setLocation]);

  const handleLogin = async () => {
    if (isSigningIn) {
      return;
    }

    if (inProgress === "login" || inProgress === "ssoSilent") {
      toast.error("Sign-in already in progress. Please wait...");
      return;
    }

    try {
      setIsSigningIn(true);
      dispatch(setLoading(true));
      
      const response = await instance.loginPopup(loginRequest);

      if (response && response.account) {
        const user = {
          id: response.account.localAccountId,
          email: response.account.username,
          displayName: response.account.name || response.account.username,
          azureId: response.account.localAccountId,
        };

        dispatch(setUser(user));
        dispatch(setAccessToken(response.accessToken));
        setAuthToken(response.accessToken);
        toast.success("Successfully logged in!");
        setLocation("/home");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.errorCode === "interaction_in_progress") {
        toast.error("Sign-in already in progress. Please wait and try again.");
      } else if (error.errorCode === "user_cancelled") {
        toast.error("Sign-in was cancelled.");
      } else {
        toast.error(error.message || "Failed to sign in. Please try again.");
      }
    } finally {
      setIsSigningIn(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <img 
              src={logoUrl} 
              alt="Uptime Logo" 
              className="h-20 w-auto" 
              data-testid="img-logo"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold" data-testid="text-login-title">
              Ticket Management System
            </CardTitle>
            <CardDescription className="mt-2" data-testid="text-login-description">
              Sign in with your Microsoft account to continue
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            onClick={handleLogin} 
            className="w-full gap-2" 
            size="lg"
            disabled={isSigningIn}
            data-testid="button-microsoft-login"
          >
            {isSigningIn ? (
              <>
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 23 23" fill="currentColor">
                  <path d="M0 0h11v11H0z" />
                  <path d="M12 0h11v11H12z" />
                  <path d="M0 12h11v11H0z" />
                  <path d="M12 12h11v11H12z" />
                </svg>
                Sign in with Microsoft
              </>
            )}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2"
            size="lg"
            onClick={() => window.location.href = '/download-project'}
            data-testid="button-download-project"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Complete Project (449 KB)
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            By signing in, you agree to our terms of service and privacy policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
