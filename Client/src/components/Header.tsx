import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="w-full bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-4xl">🍫</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary text-shadow">
            BrainBoost
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm md:text-base font-medium hidden sm:inline">
                Hi, {user?.name}! 👋
              </span>
              <Button onClick={logout} variant="outline" size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="gradient-primary">
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
