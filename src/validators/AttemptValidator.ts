import { z } from 'zod';

export const CreateAttemptParamsSchema = z.object({
  userId: z.string(),
  puzzleId: z.string(),
});

export const CreateAttemptBodySchema = z.object({
  moveCount: z.number().min(1, 'Move count must be greater than 0'),
  timeSpent: z.number().min(1, 'Time spent must be greater than 0'),
  firstAttempt: z.boolean(),
});

// export const GetAttemptsQuerySchema = z.object({
//   minTime: z.string().transform(Number).optional(),
//   minMoves: z.string().transform(Number).optional(),
//
// });

export const GetAttemptSchema = z.object({
  attemptId: z.string(),
});
