import { z } from 'zod';

// This is probably going to be a weird thing I do
export const CreatePuzzleSchema = z.object({
  content: z.string().min(1, "A puzzle is defined by a string composed of '#', ' ', 'o', and 'x'"),
  minMoves: z.number().min(1, 'The minimum moves must be at least 1').optional(),
  date: z.iso.date(),
});

export const GetPuzzleSchema = z.object({
  //fixme: should be some form of z.string().tranform(Date), idk exactly though
  date: z.string(),
});

export const GetPuzzleByIdSchema = z.object({
  //fixme: should be some form of z.string().tranform(Date), idk exactly though
  date: z.string().transform(Date),
});
