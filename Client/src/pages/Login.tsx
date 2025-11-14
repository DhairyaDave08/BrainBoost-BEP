import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import Header from '@/components/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/subjects');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      toast.success('Welcome back! 🎉');
      navigate('/subjects');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20">
      <Header />
      
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur">
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block animate-bounce-slow">🎓</span>
            <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">Login to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="text-base"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full gradient-primary text-lg py-6"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login 🚀'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              New user?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Register here!
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
