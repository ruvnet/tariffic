import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary" : "text-foreground";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold">AlternativeTo</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/')}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/about')}`}
            >
              About
            </Link>
            <Link 
              to="/categories" 
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/categories')}`}
            >
              Categories
            </Link>
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
                className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/')}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/about')}`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/categories" 
                className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/categories')}`}
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};