import { Shield, User, LogOut, Bell, Menu, AlertTriangle, BookOpen, Target, MapPin, BarChart3, MessageSquare, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { NotificationCenter } from "@/components/NotificationCenter";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  userRole: "student" | "teacher" | "admin" | "officer";
}

export const DashboardHeader = ({ title, subtitle, userRole }: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  
  const navigationLinks = [
    { href: "/emergency", label: "Emergency Hub", icon: AlertTriangle, show: true, color: "emergency" },
    { href: "/real-time-alerts", label: "Live Alerts", icon: Bell, show: true, color: "warning" },
    { href: "/geo-location-tips", label: "Safety Tips", icon: MapPin, show: true, color: "safe" },
    { href: "/emergency-map", label: "Emergency Map", icon: Map, show: true, color: "primary" },
    { href: "/live-communication", label: "Communication", icon: MessageSquare, show: true, color: "primary" },
    { href: "/modules", label: "Training Modules", icon: BookOpen, show: userRole !== 'officer', color: "primary" },
    { href: "/progress-analytics", label: "Analytics", icon: BarChart3, show: userRole !== 'officer', color: "primary" },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "student": return "primary";
      case "teacher": return "safe";
      case "admin": return "warning";
      case "officer": return "emergency";
      default: return "primary";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "student": return "Student";
      case "teacher": return "Teacher";
      case "admin": return "Administrator";
      case "officer": return "Disaster Officer";
      default: return "User";
    }
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">DisasterEd</span>
            </Link>
            
            <nav className="hidden lg:flex space-x-4">
              {navigationLinks.filter(link => link.show).slice(0, 4).map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link 
                    key={link.href}
                    to={link.href} 
                    className={`text-muted-foreground transition-colors flex items-center space-x-1 ${link.color === 'emergency' ? 'font-medium text-emergency' : ''}`}
                  >
                    <IconComponent className={`h-4 w-4 ${link.color === 'emergency' ? 'text-emergency' : ''}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              {/* Quick Access Menu for remaining links */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <Menu className="h-4 w-4 mr-1" />
                    More
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {navigationLinks.filter(link => link.show).slice(4).map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link to={link.href} className="flex items-center">
                          <IconComponent className="h-4 w-4 mr-2" />
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NotificationCenter />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className={`p-1.5 ${getRoleColor(userRole) === 'primary' ? 'bg-primary/10 text-primary' : getRoleColor(userRole) === 'safe' ? 'bg-safe/10 text-safe' : getRoleColor(userRole) === 'warning' ? 'bg-warning/10 text-warning' : 'bg-emergency/10 text-emergency'} rounded-full`}>
                    <User className={`h-4 w-4 ${getRoleColor(userRole) === 'primary' ? 'text-primary' : getRoleColor(userRole) === 'safe' ? 'text-safe' : getRoleColor(userRole) === 'warning' ? 'text-warning' : 'text-emergency'}`} />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium">{user?.firstName} {user?.lastName}</div>
                    <div className="text-xs text-muted-foreground">{getRoleLabel(userRole)}</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/notifications">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/role-selection">
                    <LogOut className="h-4 w-4 mr-2" />
                    Switch Role
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="border-t bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            </div>
            <Badge variant="outline" className={`border-${getRoleColor(userRole)}/30 ${getRoleColor(userRole) === 'primary' ? 'text-primary' : getRoleColor(userRole) === 'safe' ? 'text-safe' : getRoleColor(userRole) === 'warning' ? 'text-warning' : 'text-emergency'}`}>
              {getRoleLabel(userRole)}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};