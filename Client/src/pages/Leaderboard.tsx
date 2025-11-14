import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardEntry {
  userId: string;
  name: string;
  totalScore: number;
  totalPossible: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { user } = useAuth(); // current logged-in user (optional if you want to highlight)

  useEffect(() => {
    const scoresData = JSON.parse(localStorage.getItem('brainboost_scores') || '{}');
    const usersData = JSON.parse(localStorage.getItem('brainboost_users') || '[]');

    const entries: LeaderboardEntry[] = [];

    for (const userId in scoresData) {
      let totalScore = 0;
      let totalPossible = 0;

      for (const subjectId in scoresData[userId]) {
        const attempts = scoresData[userId][subjectId];
        for (const attempt of attempts) {
          totalScore += attempt.score;
          totalPossible += attempt.total;
        }
      }

      // Find user name from usersData
      const userInfo = usersData.find((u: any) => u.id === userId);
      const name = userInfo ? userInfo.name : userId;

      entries.push({ userId, name, totalScore, totalPossible });
    }

    // Sort descending by totalScore
    entries.sort((a, b) => b.totalScore - a.totalScore);

    setLeaderboard(entries);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">🏆 Leaderboard</h1>

        <div className="max-w-3xl mx-auto space-y-4">
          {leaderboard.map((entry, index) => (
            <Card
              key={entry.userId}
              className={`p-6 flex justify-between items-center bg-card/80 backdrop-blur ${
                user && entry.userId === user.id ? 'border-2 border-yellow-400' : ''
              }`}
            >
              <span className="font-bold text-xl">#{index + 1}</span>
              <span className="text-lg">{entry.name}</span>
              <span className="text-lg">
                {entry.totalScore} / {entry.totalPossible}
              </span>
            </Card>
          ))}

          {leaderboard.length === 0 && (
            <p className="text-center text-muted-foreground">
              No scores yet. Play quizzes to appear on leaderboard!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
