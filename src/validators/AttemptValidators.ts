import { z } from 'zod';

export const CreateAttemptParamsSchema = z.object({
  userId: z.string().transform(Number),
  puzzleId: z.string().tranform(Number),
});

export const CreateAttemptBodySchema = z.object({
  moveCount: z.number().min(1, 'Move count must be greater than 0'),
  timeSpent: z.number().min(1, 'Time spent must be greater than 0'),
  firstAttempt: z.boolean(),

});

export const GetAttemptsParamsSchema = z.object({
  puzzleId: z.string().tranform(Number),
});

export const GetAttemptsQuerySchema = z.object({
  minTime: z.string().transform(Number).min(1, 'minTime must be greater than 0').optional(),
  minMoves: z.string().transform(Number).min(1, 'minMoves must be greater than 0').optional(),

});

export const GetAttemptParamsSchema = z.object({
  userId: z.string().tranform(Number),
  puzzleId: z.string().tranform(Number),
});
