import { Request, Response } from 'express';

type LeaderboardAttempt = {
  leaderboardId: string;
  attemptId: string;
  userId: string;
  date: string;
  timeSpent: number;
  moveCount: number;
};

//Dummy Data

const leaderboardAttempts: LeaderboardAttempt[] = [
  {
    leaderboardId: '1',
    attemptId: 'a1',
    userId: 'user1',
    date: '2026-05-07',
    timeSpent: 120,
    moveCount: 50,
  },
  {
    leaderboardId: '1',
    attemptId: 'a2',
    userId: 'user2',
    date: '2026-05-07',
    timeSpent: 150,
    moveCount: 70,
  },
  {
    leaderboardId: '1',
    attemptId: 'a3',
    userId: 'user3',
    date: '2026-05-07',
    timeSpent: 90,
    moveCount: 40,
  },
];

//Action #4
export const updateLeaderboard = (req: Request, res: Response) => {
  const { leaderboardId, attemptId } = req.params;
  const { timeSpent, moveCount } = req.body;

  const attempt = leaderboardAttempts.find(
    (item) => item.leaderboardId === leaderboardId && item.attemptId === attemptId,
  );

  if (!attempt) {
    return res.status(400).json({ error: 'Attempt not found' });
  }

  attempt.timeSpent = timeSpent;
  attempt.moveCount = moveCount;

  return res.status(200).json({ message: 'Leaderboard updated', data: attempt });
};

//Action #11
export const getTopSpeeds = (req: Request, res: Response) => {
  const { date } = req.params;
  const topSpeeds = leaderboardAttempts
    .filter((item) => item.date === date)
    .sort((a, b) => a.timeSpent - b.timeSpent);

  return res.status(200).json({ message: 'Top speeds retrieved', data: topSpeeds });
};

//Action #12
export const getTopMoveCounts = (req: Request, res: Response) => {
  const { date } = req.params;

  const topMoveCounts = leaderboardAttempts
    .filter((item) => item.date === date)
    .sort((a, b) => a.moveCount - b.moveCount);

  return res.status(200).json({ message: 'Top move counts retrieved', data: topMoveCounts });
};

//Attempts #13
export const getNearbySpeeds = (req: Request, res: Response) => {
  const { date } = req.params;
  const userId = (req.session as any)?.userId || 'user2';

  if (!userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const sortedBySpeed = leaderboardAttempts
    .filter((item) => item.date === date)
    .sort((a, b) => a.timeSpent - b.timeSpent);

  const userIndex = sortedBySpeed.findIndex((item) => item.userId === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const nearbySpeeds = sortedBySpeed.slice(Math.max(userIndex - 1, 0), userIndex + 2);
  return res.status(200).json({ message: 'Nearby speeds retrieved', data: nearbySpeeds });
};

//Action #14
export const getNearbyMoves = (req: Request, res: Response) => {
  const { date } = req.params;
  const userId = (req.session as any)?.userId || 'user2';
  if (!userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const sortedByMoves = leaderboardAttempts
    .filter((item) => item.date === date)
    .sort((a, b) => a.moveCount - b.moveCount);

  const userIndex = sortedByMoves.findIndex((item) => item.userId === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const nearbyMoves = sortedByMoves.slice(Math.max(userIndex - 1, 0), userIndex + 2);
  return res.status(200).json({ message: 'Nearby moves retrieved', data: nearbyMoves });
};
