import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, set2FAVerified } from "@/store/slices/authSlice";
import { toast } from "react-hot-toast";
import { apiRequest } from "@/lib/queryClient";
import logoUrl from "@assets/logo_1763446328043.png";
import { Shield } from "lucide-react";

export default function TwoFactorVerify() {
  const [, setLocation] = useLocation();
  const dispatch = useAppDispatch();
  const { tempUser } = useAppSelector((state) => state.auth);
  const [code, setCode] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);

  if (!tempUser) {
    setLocation("/");
    return null;
  }

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    try {
      setIsVerifying(true);
      const response = await apiRequest<{ success: boolean; user: any }>("POST", "/api/2fa/verify", {
        userId: tempUser.id,
        code,
      });

      if (response.success) {
        dispatch(setUser(response.user));
        dispatch(set2FAVerified(true));
        toast.success("Authentication successful!");
        setLocation("/home");
      }
    } catch (error: any) {
      console.error("2FA verify error:", error);
      toast.error(error.message || "Invalid code. Please try again.");
      setCode("");
    } finally {
      setIsVerifying(false);
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
              className="h-16 w-auto" 
              data-testid="img-logo"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-semibold" data-testid="text-verify-title">
              Two-Factor Authentication
            </CardTitle>
          </div>
          <CardDescription data-testid="text-verify-description">
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={setCode}
                data-testid="input-verify-code"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleVerify}
              className="w-full"
              size="lg"
              disabled={code.length !== 6 || isVerifying}
              data-testid="button-verify"
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Open your authenticator app to view your code
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/")}
              data-testid="button-back-login"
            >
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
