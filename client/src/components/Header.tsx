import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { useMsal } from "@azure/msal-react";
import { setAuthToken } from "@/lib/api";
import logoUrl from "@assets/image_1763445721362.png";

export function Header() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { instance } = useMsal();

  const handleLogout = async () => {
    dispatch(logout());
    setAuthToken(null);
    await instance.logoutPopup();
  };

  const initials = user?.displayName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img 
            src={logoUrl} 
            alt="Logo" 
            className="h-10 w-10" 
            data-testid="img-logo"
          />
          <div>
            <h1 className="text-lg font-semibold text-foreground" data-testid="text-app-title">
              Ticket Management
            </h1>
            <p className="text-xs text-muted-foreground">Track and manage your tickets</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="relative h-10 w-10 rounded-full" 
              size="icon"
              data-testid="button-user-menu"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel data-testid="text-user-name">
              {user?.displayName}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="font-normal text-muted-foreground" data-testid="text-user-email">
              {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
