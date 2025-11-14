import { useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { subjects } from '@/data/quizData';
import confetti from 'canvas-confetti';

const Results = () => {
  const { subjectId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { score, total } = location.state || { score: 0, total: 10 };
  const percentage = (score / total) * 100;
  const subject = subjects.find(s => s.id === subjectId);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Celebrate if score is good
    if (percentage >= 70) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
    }
  }, [isAuthenticated, navigate, percentage]);

  if (!subject || !isAuthenticated) return null;

  const getMotivationMessage = () => {
    if (percentage === 100) return "🌟 PERFECT SCORE! You're a genius!";
    if (percentage >= 80) return "🎉 Excellent work! You're doing amazing!";
    if (percentage >= 60) return "👍 Good job! Keep practicing!";
    if (percentage >= 40) return "💪 Nice try! You're getting better!";
    return "🌱 Keep learning! You'll do better next time!";
  };

  const getEmoji = () => {
    if (percentage === 100) return "🏆";
    if (percentage >= 80) return "🌟";
    if (percentage >= 60) return "😊";
    if (percentage >= 40) return "🙂";
    return "💪";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 text-center bg-card/80 backdrop-blur">
            <div className="text-8xl mb-6 animate-bounce-slow">
              {getEmoji()}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Quiz Complete!
            </h1>

            <div className="text-6xl font-extrabold mb-6 text-primary">
              {score}/{total}
            </div>

            <div className="mb-8">
              <div className="w-full bg-muted rounded-full h-6 overflow-hidden mb-2">
                <div
                  className={`h-full bg-gradient-to-r ${subject.color} transition-all duration-1000`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xl font-semibold">{percentage.toFixed(0)}% Score</p>
            </div>

            <p className="text-2xl md:text-3xl font-bold mb-8 text-muted-foreground">
              {getMotivationMessage()}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/quiz/${subjectId}`}>
                <Button size="lg" className="w-full sm:w-auto gradient-primary">
                  🔄 Play Again
                </Button>
              </Link>

              <Link to="/subjects">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  📚 Choose Another Subject
                </Button>
              </Link>
            </div>

            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 Tip: Practice makes perfect! Keep learning to improve your scores.
              </p>
            </div>
            {/* Leaderboard link */}
            <div className="mt-4 flex justify-center">
              <Link to="/Leaderboard" className="flex items-center gap-2 text-lg font-semibold hover:underline">
                🏆 View Leaderboard
              </Link>
            </div>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
