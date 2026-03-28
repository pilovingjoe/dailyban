import { z } from 'zod';

export const CreatePuzzleSchema = z.object({
  content: z.string().min(1, 'A puzzle is defined by a string composed of \'#\', \' \', \'o\', and \'x\''),
  minMoves: z.Number().min(1, 'The minimum moves must be at least 1').optional()
});


export const GetPuzzleSchema = z.object({
  puzzleId: z.string().tranform(Number),
});

