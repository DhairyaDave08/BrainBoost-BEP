import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { subjects } from '@/data/quizData';

const Subjects = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow">
            Hi {user?.name}! 👋
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Choose your subject to start your BrainBoost Journey!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {subjects.map((subject) => (
            <Link key={subject.id} to={`/quiz/${subject.id}`}>
              <Card className="p-8 text-center hover:scale-105 transition-all duration-300 cursor-pointer bg-card/80 backdrop-blur border-2 hover:border-primary">
                <div className="text-7xl mb-4 animate-float">{subject.icon}</div>
                <h2 className="text-2xl font-bold mb-2">{subject.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  10 Fun Questions
                </p>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${subject.color} animate-pulse`}
                    style={{ width: '100%' }}
                  />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            💡 Remember: Every correct answer gets you a chocolate! 🍫
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
