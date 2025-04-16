
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Play,
  Wallet,
  Users,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  userName: string;
  userAvatar?: string;
  unreadNotifications: number;
}

export function DashboardSidebar({ userName, userAvatar, unreadNotifications }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navigationItems = [
    {
      name: "Home",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard"
    },
    {
      name: "Watch Ads",
      icon: <Play className="h-5 w-5" />,
      path: "/dashboard/watch"
    },
    {
      name: "Wallet",
      icon: <Wallet className="h-5 w-5" />,
      path: "/dashboard/wallet"
    },
    {
      name: "Referrals",
      icon: <Users className="h-5 w-5" />,
      path: "/dashboard/referrals"
    },
    {
      name: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      path: "/dashboard/notifications",
      badge: unreadNotifications > 0 ? unreadNotifications : undefined
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/dashboard/settings"
    }
  ];

  return (
    <div 
      className={`h-screen fixed top-0 left-0 z-30 flex flex-col bg-card border-r border-border transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-64"
      }`}
    >
      {/* Sidebar header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ptc-primary to-ptc-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="font-heading font-bold text-xl">WatchToEarn</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ptc-primary to-ptc-accent flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">W</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={`${collapsed ? "mx-auto" : ""}`}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      
      {/* User info */}
      <div className={`p-4 border-b border-border ${collapsed ? "flex justify-center" : ""}`}>
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <Avatar>
              {userAvatar ? (
                <AvatarImage src={userAvatar} alt={userName} />
              ) : (
                <AvatarFallback className="bg-primary/20 text-primary">
                  {userName.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <div className="font-medium">{userName}</div>
              <div className="text-xs text-muted-foreground">Free Account</div>
            </div>
          </div>
        ) : (
          <Avatar>
            {userAvatar ? (
              <AvatarImage src={userAvatar} alt={userName} />
            ) : (
              <AvatarFallback className="bg-primary/20 text-primary">
                {userName.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path}>
                <Button 
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={`w-full justify-start ${collapsed ? "px-2" : ""}`}
                >
                  <span className="relative">
                    {item.icon}
                    {item.badge && (
                      <Badge 
                        className="absolute -top-2 -right-2 h-4 min-w-4 p-0 flex items-center justify-center text-[10px] bg-ptc-primary"
                      >
                        {item.badge > 9 ? "9+" : item.badge}
                      </Badge>
                    )}
                  </span>
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className={`w-full justify-start ${collapsed ? "px-2" : ""}`}>
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Log Out</span>}
        </Button>
      </div>
    </div>
  );
}
