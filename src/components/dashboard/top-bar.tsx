
import { useState } from "react";
import { Bell, MessageSquare, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  userBalance: string;
  unreadNotifications: number;
  unreadMessages: number;
}

export function TopBar({ userBalance, unreadNotifications, unreadMessages }: TopBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <div className="h-16 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-20">
      {/* Left side */}
      <div className="flex items-center">
        {isSearchOpen ? (
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-10"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* Right side */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
          Balance: {userBalance}
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center bg-ptc-primary">
              {unreadNotifications > 9 ? "9+" : unreadNotifications}
            </Badge>
          )}
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
          {unreadMessages > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center bg-ptc-secondary">
              {unreadMessages > 9 ? "9+" : unreadMessages}
            </Badge>
          )}
        </Button>
        
        <ThemeToggle />
      </div>
    </div>
  );
}
