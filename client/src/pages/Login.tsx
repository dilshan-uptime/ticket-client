import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, setAccessToken, setLoading } from "@/store/slices/authSlice";
import { loginRequest } from "@/config/msalConfig";
import logoUrl from "@assets/image_1763445721362.png";
import { toast } from "react-hot-toast";
import { setAuthToken } from "@/lib/api";

export default function Login() {
  const { instance, accounts } = useMsal();
  const dispatch = useAppDispatch();
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

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
    try {
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
        dispatch(setLoading(false));
        toast.success("Successfully logged in!");
        setLocation("/home");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      dispatch(setLoading(false));
      toast.error(error.message || "Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="h-16 w-16" 
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
        <CardContent>
          <Button 
            onClick={handleLogin} 
            className="w-full gap-2" 
            size="lg"
            data-testid="button-microsoft-login"
          >
            <svg className="h-5 w-5" viewBox="0 0 23 23" fill="currentColor">
              <path d="M0 0h11v11H0z" />
              <path d="M12 0h11v11H12z" />
              <path d="M0 12h11v11H0z" />
              <path d="M12 12h11v11H12z" />
            </svg>
            Sign in with Microsoft
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            By signing in, you agree to our terms of service and privacy policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
