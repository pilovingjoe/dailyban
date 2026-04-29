import{ Request, Response } from 'express';

type LeaderboardAttempt = {
    leaderboardId: string;
    attemptId: string;
    userId: string;
    timeSpent: number;
    date: string;
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
        (item) => item.leaderboardId === leaderboardId && item.attemptId === attemptId
    );

    if (!attempt) {
        return res.status(400).json({error: 'Attempt not found'});
    }

    attempt.timeSpent = timeSpent;
    attempt.moveCount = moveCount;

    return res.status(200).json({message: "Leaderboard updated", data: attempt,});
};

//Action #11
export const getTopSpeeds = (req: Request, res: Response) => {
    const { date } = req.params;
    const data = leaderboardAttempts
        .filter((l) => l.date === date)
        .sort((a, b) => a.timeSpent - b.timeSpent);

    return res.status(200).json(data);
};

//Action #12
export const getTopMoveCounts = (req: Request, res: Response) => {
    const { date} = req.params;
    const data = leaderboardAttempts
        .filter((l) => l.date === date)
        .sort((a, b) => a.moveCount - b.moveCount);

    return res.status(200).json(data);
};

//Attempts #13
export const getNearbySpeeds = (req: Request, res: Response) => {
    const { date } = req.params;
    const userId = "user2";

    const sorted = leaderboardAttempts
        .filter((l) => l.date === date)
        .sort((a, b) => a.timeSpent - b.timeSpent);

    const index = sorted.findIndex((l) => l.userId === userId);
    const data = sorted.slice(Math.max(index - 1, 0), index +2);
    return res.status(200).json(data);
};

//Action #14
export const getNearbyMoves = (req: Request, res: Response) => {
    const { date }  = req.params;
    const userId = "user2";

    const sorted = leaderboardAttempts
        .filter((l) => l.date === date)
        .sort((a, b) => a.moveCount - b.moveCount);

    const index = sorted.findIndex((l) => l.userId === userId);

    const data = sorted.slice(Math.max(index - 1, 0), index +2);

    return res.status(200).json(data);
};
