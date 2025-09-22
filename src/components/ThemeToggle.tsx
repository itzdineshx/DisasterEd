import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4 text-warning" />;
      case 'dark':
        return <Moon className="h-4 w-4 text-primary" />;
      case 'system':
        return <Monitor className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Sun className="h-4 w-4 text-warning" />;
    }
  };

  const getCurrentThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      case 'system':
        return `System (${resolvedTheme === 'dark' ? 'Dark' : 'Light'})`;
      default:
        return 'Light Mode';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {getThemeIcon()}
          <span className="hidden sm:inline text-sm">
            {getCurrentThemeLabel()}
          </span>
          <span className="sm:hidden">
            {getThemeIcon()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="flex items-center justify-between cursor-pointer hover:bg-accent focus:bg-accent"
        >
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-warning" />
            <span>Light</span>
          </div>
          {theme === 'light' && (
            <div className="h-2 w-2 bg-primary rounded-full"></div>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="flex items-center justify-between cursor-pointer hover:bg-accent focus:bg-accent"
        >
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-primary" />
            <span>Dark</span>
          </div>
          {theme === 'dark' && (
            <div className="h-2 w-2 bg-primary rounded-full"></div>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="flex items-center justify-between cursor-pointer hover:bg-accent focus:bg-accent"
        >
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-muted-foreground" />
            <span>System</span>
          </div>
          {theme === 'system' && (
            <div className="h-2 w-2 bg-primary rounded-full"></div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;