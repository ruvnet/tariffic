import { useState } from "react";
import { Menu, Settings, Globe, Home, Info, Grid, Boxes, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const location = useLocation();

  const languages = {
    en: { name: "English", flag: "🇺🇸" },
    fr: { name: "Français", flag: "🇫🇷" },
    es: { name: "Español", flag: "🇪🇸" },
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary" : "text-foreground";
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    // Here you would typically trigger language change in your i18n system
    console.log(`Language changed to: ${lang}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Boxes className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Tariffic</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive('/')}`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link 
              to="/calculator" 
              className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive('/calculator')}`}
            >
              <Calculator className="h-4 w-4" />
              Calculator
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive('/about')}`}
            >
              <Info className="h-4 w-4" />
              About
            </Link>
            <Link 
              to="/categories" 
              className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive('/categories')}`}
            >
              <Grid className="h-4 w-4" />
              Categories
            </Link>
            <Link 
              to="/settings" 
              className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive('/settings')}`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 px-0">
                  <Globe className="h-4 w-4" />
                  <span className="ml-2">{languages[currentLanguage as keyof typeof languages].flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.entries(languages).map(([code, { name, flag }]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{flag}</span>
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive('/')}`}
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link 
                to="/calculator" 
                className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive('/calculator')}`}
                onClick={() => setIsOpen(false)}
              >
                <Calculator className="h-4 w-4" />
                Calculator
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive('/about')}`}
                onClick={() => setIsOpen(false)}
              >
                <Info className="h-4 w-4" />
                About
              </Link>
              <Link 
                to="/categories" 
                className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive('/categories')}`}
                onClick={() => setIsOpen(false)}
              >
                <Grid className="h-4 w-4" />
                Categories
              </Link>
              <Link 
                to="/settings" 
                className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive('/settings')}`}
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>

              <div className="pt-2 border-t">
                {Object.entries(languages).map(([code, { name, flag }]) => (
                  <button
                    key={code}
                    onClick={() => {
                      handleLanguageChange(code);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-2 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center"
                  >
                    <span className="mr-2">{flag}</span>
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
