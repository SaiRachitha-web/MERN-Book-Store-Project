import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
          <BookOpen className="w-6 h-6" />
          <span className="font-serif text-xl font-bold tracking-tight">PageTurn</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/catalog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Catalog
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4 border-l pl-6 ml-2">
              <Link to="/admin" className="text-sm font-medium text-secondary hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/admin/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
