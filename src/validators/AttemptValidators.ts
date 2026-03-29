import { z } from 'zod';

export const CreateAttemptParamsSchema = z.object({
  userId: z.string().transform(Number),
  puzzleId: z.string().transform(Number),
});

export const CreateAttemptBodySchema = z.object({
  moveCount: z.number().min(1, 'Move count must be greater than 0'),
  timeSpent: z.number().min(1, 'Time spent must be greater than 0'),
  firstAttempt: z.boolean(),

});

export const GetAttemptsParamsSchema = z.object({
  puzzleId: z.string().transform(Number),
});

export const GetAttemptsQuerySchema = z.object({
  minTime: z.string().transform(Number).optional(),
  minMoves: z.string().transform(Number).optional(),

});

export const GetAttemptParamsSchema = z.object({
  userId: z.string().transform(Number),
  puzzleId: z.string().transform(Number),
});
