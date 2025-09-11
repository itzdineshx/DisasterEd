import { Shield, Bell, User, LogOut } from "lucide-react";
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

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  userRole: "student" | "teacher" | "admin" | "disaster-officer";
}

export const DashboardHeader = ({ title, subtitle, userRole }: DashboardHeaderProps) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "student": return "primary";
      case "teacher": return "safe";
      case "admin": return "warning";
      case "disaster-officer": return "emergency";
      default: return "primary";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "student": return "Student";
      case "teacher": return "Teacher";
      case "admin": return "Administrator";
      case "disaster-officer": return "Disaster Officer";
      default: return "User";
    }
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">DisasterEd</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/student-dashboard" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/modules" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Modules
              </Link>
              <Link 
                to="/drills" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Drills
              </Link>
              <Link 
                to="/emergency" 
                className="text-emergency hover:text-emergency/80 transition-colors font-medium"
              >
                Emergency
              </Link>
            </nav>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                2
              </Badge>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className={`p-1.5 bg-${getRoleColor(userRole)}/10 rounded-full`}>
                    <User className={`h-4 w-4 text-${getRoleColor(userRole)}`} />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium">John Doe</div>
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
                <DropdownMenuItem asChild>
                  <Link to="/">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Link>
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
            <Badge variant="outline" className={`text-${getRoleColor(userRole)} border-${getRoleColor(userRole)}/30`}>
              {getRoleLabel(userRole)}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};