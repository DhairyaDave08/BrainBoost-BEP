import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 text-center">
        <div className="animate-float mb-8">
          <span className="text-8xl md:text-9xl">🍫</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-shadow leading-tight">
          BrainBoost: A Reward-Based
          <br />
          <span className="text-primary">Learning Experience</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-foreground/80 max-w-3xl mx-auto">
          Answer. Learn. Celebrate with Chocolate! 🎉
        </p>

        {isAuthenticated ? (
          <Link to="/subjects">
            <Button size="lg" className="text-xl px-8 py-6 gradient-primary hover:scale-105 transition-transform">
              Start Learning! 🚀
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button size="lg" className="text-xl px-8 py-6 gradient-primary hover:scale-105 transition-transform">
              Get Started! 🚀
            </Button>
          </Link>
        )}
      </section>

      {/* USP Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-shadow">
          Why Kids Love BrainBoost? 🌟
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 text-center hover:scale-105 transition-transform bg-card/80 backdrop-blur">
            <div className="text-5xl mb-4">🌈</div>
            <h3 className="text-xl font-bold mb-2">Fun Learning</h3>
            <p className="text-sm text-muted-foreground">
              Make education exciting with rewards
            </p>
          </Card>

          <Card className="p-6 text-center hover:scale-105 transition-transform bg-card/80 backdrop-blur">
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-2">Build Concepts</h3>
            <p className="text-sm text-muted-foreground">
              Strengthen understanding through practice
            </p>
          </Card>

          <Card className="p-6 text-center hover:scale-105 transition-transform bg-card/80 backdrop-blur">
            <div className="text-5xl mb-4">🍫</div>
            <h3 className="text-xl font-bold mb-2">Instant Rewards</h3>
            <p className="text-sm text-muted-foreground">
              Get chocolate with every correct answer!
            </p>
          </Card>

          <Card className="p-6 text-center hover:scale-105 transition-transform bg-card/80 backdrop-blur">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Celebrate Success</h3>
            <p className="text-sm text-muted-foreground">
              Every achievement is a party!
            </p>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-shadow">
          Amazing Features 🎯
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-secondary/20 to-secondary/5 border-2 border-secondary">
            <div className="flex items-start gap-4">
              <span className="text-4xl">✨</span>
              <div>
                <h3 className="text-xl font-bold mb-2">Interactive MCQs</h3>
                <p className="text-muted-foreground">
                  Engaging multiple-choice questions designed for young learners
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent">
            <div className="flex items-start gap-4">
              <span className="text-4xl">📊</span>
              <div>
                <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  See how you improve with every quiz you take
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🎨</span>
              <div>
                <h3 className="text-xl font-bold mb-2">Kid-Friendly Design</h3>
                <p className="text-muted-foreground">
                  Colorful, fun, and easy to navigate for children
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-destructive/20 to-destructive/5 border-2 border-destructive/50">
            <div className="flex items-start gap-4">
              <span className="text-4xl">⚡</span>
              <div>
                <h3 className="text-xl font-bold mb-2">Arduino Integration</h3>
                <p className="text-muted-foreground">
                  Real-time chocolate dispenser rewards for correct answers
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
