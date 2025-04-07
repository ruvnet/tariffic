
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          The page you're looking for couldn't be found
        </p>
        <p className="text-gray-500 mb-8">
          Path: <code className="px-2 py-1 bg-gray-200 rounded">{location.pathname}</code>
        </p>
        <Link to="/">
          <Button className="gap-2">
            <ArrowLeft size={16} />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
