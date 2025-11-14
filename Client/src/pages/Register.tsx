import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import Header from '@/components/Header';

const Register = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [standard, setStandard] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/subjects');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !age || !standard || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const success = await register(name, parseInt(age), parseInt(standard), email, password);
    setLoading(false);

    if (success) {
      toast.success('Registration successful! Welcome to BrainBoost! 🎉');
      navigate('/subjects');
    } else {
      toast.error('Email already exists. Please login instead.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20">
      <Header />
      
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur">
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block animate-bounce-slow">🌟</span>
            <h1 className="text-3xl font-bold mb-2">Join BrainBoost!</h1>
            <p className="text-muted-foreground">Create your account and start learning</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="6"
                  max="12"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Your age"
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="standard">Standard</Label>
                <Select value={standard} onValueChange={setStandard}>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Standard 3</SelectItem>
                    <SelectItem value="4">Standard 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

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
                placeholder="Create a password (min 6 characters)"
                className="text-base"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full gradient-primary text-lg py-6"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register 🚀'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Login here!
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
