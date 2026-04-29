import {z} from "zod";

export const updateLeaderboardSchema = z.object({
    params: z.object({
        leaderboardId: z.string(),
        attemptId: z.string(),
    }),
    body: z.object({
        timeSpent: z.number().min(1),
        moveCount: z.number().min(1),
    }),
});

export const dateParamSchema = z.object({
    params: z.object({
        date: z.coerce.date(),
    }),
});