import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { subjects } from '@/data/quizData';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

const Quiz = () => {
  const { subjectId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const subject = subjects.find((s) => s.id === subjectId);

  const [quizQuestions, setQuizQuestions] = useState<
    typeof subjects[0]['questions']
  >([]);

  useEffect(() => {
    if (subject) {
      const shuffled = [...subject.questions].sort(() => Math.random() - 0.5);
      setQuizQuestions(shuffled.slice(0, 10));
    }
  }, [subject]);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  if (!subject || !isAuthenticated || quizQuestions.length === 0) return null;

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // 🎯 FIXME: PROPER ARDUINO SENDER
  const sendToArduino = async (cmd: string) => {
    try {
      await fetch("http://localhost:4000/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: cmd }), // MUST be command
      });

      console.log("Arduino command sent:", cmd);
    } catch (err) {
      console.error("Arduino error:", err);
    }
  };

  const celebrateCorrectAnswer = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const handleAnswerClick = (answerIndex: number) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
      celebrateCorrectAnswer();

      // ⭐ Correct → GREEN light → send "1"
      sendToArduino("1");
    } else {
      // ❌ Wrong → RED light/buzzer → send "0"
      sendToArduino("0");
    }

    setTimeout(() => handleNext(), 3000);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      const finalScore = score + (isCorrect ? 1 : 0);

      // ⭐ Final score sent to Arduino
      sendToArduino(String(finalScore));

      const scores = JSON.parse(
        localStorage.getItem('brainboost_scores') || '{}'
      );
      if (!scores[user!.id]) scores[user!.id] = {};
      if (!scores[user!.id][subject.id]) scores[user!.id][subject.id] = [];
      scores[user!.id][subject.id].push({
        score: finalScore,
        total: quizQuestions.length,
        date: new Date().toISOString(),
      });
      localStorage.setItem('brainboost_scores', JSON.stringify(scores));

      navigate(`/results/${subject.id}`, {
        state: { score: finalScore, total: quizQuestions.length },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm font-medium">
                Score: {score}/{quizQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <Card className="p-8 mb-8 bg-card/80 backdrop-blur">
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">{subject.icon}</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {question.question}
              </h2>
            </div>

            <div className="grid gap-4">
              {question.options.map((option, index) => {
                let buttonClass = 'text-lg py-6 w-full transition-all';

                if (showFeedback) {
                  if (index === question.correctAnswer) {
                    buttonClass +=
                      ' bg-success hover:bg-success text-success-foreground';
                  } else if (index === selectedAnswer) {
                    buttonClass +=
                      ' bg-destructive hover:bg-destructive text-destructive-foreground';
                  }
                }

                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={showFeedback}
                    variant={
                      showFeedback &&
                      index === selectedAnswer &&
                      !isCorrect
                        ? 'destructive'
                        : 'outline'
                    }
                    className={buttonClass}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
          </Card>

          {showFeedback && (
            <Card className="p-6 text-center animate-scale-in bg-card/80 backdrop-blur">
              {isCorrect ? (
                <>
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-success mb-2">
                    Yay! Chocolate time! 🍫
                  </h3>
                  <p className="text-muted-foreground">
                    Great job! Moving to next question...
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">😢</div>
                  <h3 className="text-2xl font-bold text-destructive mb-2">
                    Oops! Try better next time!
                  </h3>
                  <p className="text-muted-foreground">
                    The correct answer was:{' '}
                    <strong>{question.options[question.correctAnswer]}</strong>
                  </p>
                </>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
