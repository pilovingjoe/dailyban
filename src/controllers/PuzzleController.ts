import { Request, Response } from 'express';
import { GetPuzzleSchema } from '../validators/PuzzleValidator.js';
import { getAllPuzzles, getPuzzleByDate } from '../models/PuzzleModel.js';

export async function getPuzzles(req: Request, res: Response): Promise<void> {
  const puzzles = await getAllPuzzles();
  res.json({ puzzles });
}

export async function getPuzzle(req: Request, res: Response): Promise<void> {
  const result = GetPuzzleSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({ erorr: result.error });
    return;
  }

  const puzzleDate= new Date(result.data.date);
  const puzzle = await getPuzzleByDate(puzzleDate);

  res.json({ puzzle });
}

// export async function createPuzzle( req: Request, res: Response): Promise<void> {
//   const result = CreatePuzzleSchema.safeParse(req.params);
//
//   if(!result.success){
//     res.status(400).json({ error: result.error });
//     return;
//   }
// }
