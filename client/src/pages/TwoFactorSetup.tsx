import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAppSelector } from "@/store/hooks";
import { toast } from "react-hot-toast";
import { apiRequest } from "@/lib/queryClient";
import logoUrl from "@assets/logo_1763446328043.png";
import { Shield, Smartphone } from "lucide-react";

export default function TwoFactorSetup() {
  const [, setLocation] = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const [qrCode, setQrCode] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (!user) {
      setLocation("/");
      return;
    }

    const setupTwoFactor = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest<{ qrCode: string; secret: string }>("POST", "/api/2fa/setup", {
          userId: user.id,
        });

        setQrCode(response.qrCode);
        setSecret(response.secret);
      } catch (error: any) {
        console.error("2FA setup error:", error);
        toast.error(error.message || "Failed to setup 2FA");
      } finally {
        setIsLoading(false);
      }
    };

    setupTwoFactor();
  }, [user, setLocation]);

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    try {
      setIsVerifying(true);
      await apiRequest("POST", "/api/2fa/verify-setup", {
        userId: user?.id,
        code,
      });

      toast.success("2FA enabled successfully!");
      setTimeout(() => {
        setLocation("/home");
      }, 1000);
    } catch (error: any) {
      console.error("2FA verify error:", error);
      toast.error(error.message || "Invalid code. Please try again.");
      setCode("");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSkip = () => {
    setLocation("/home");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
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
            <CardTitle className="text-2xl font-semibold" data-testid="text-2fa-title">
              Set Up Two-Factor Authentication
            </CardTitle>
          </div>
          <CardDescription data-testid="text-2fa-description">
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="text-center py-8">
              <svg className="h-8 w-8 animate-spin mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-muted-foreground">Generating QR code...</p>
            </div>
          ) : (
            <>
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Smartphone className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">Step 1: Scan QR Code</h3>
                    <p className="text-sm text-muted-foreground">
                      Open your authenticator app (Google Authenticator, Microsoft Authenticator, or Authy) and scan this QR code:
                    </p>
                  </div>
                </div>
                
                {qrCode && (
                  <div className="flex justify-center py-4">
                    <div className="bg-white p-4 rounded-lg">
                      <img 
                        src={qrCode} 
                        alt="2FA QR Code" 
                        className="w-48 h-48"
                        data-testid="img-qr-code"
                      />
                    </div>
                  </div>
                )}

                {secret && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Can't scan? Enter this code manually:
                    </p>
                    <div className="bg-muted p-3 rounded font-mono text-sm break-all" data-testid="text-secret">
                      {secret}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-card border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">Step 2: Enter Verification Code</h3>
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code from your authenticator app:
                </p>
                
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={setCode}
                    data-testid="input-2fa-code"
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
                  disabled={code.length !== 6 || isVerifying}
                  data-testid="button-verify-2fa"
                >
                  {isVerifying ? "Verifying..." : "Verify and Enable 2FA"}
                </Button>
              </div>

              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  data-testid="button-skip-2fa"
                >
                  Skip for now
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  You can enable 2FA later from your account settings
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
