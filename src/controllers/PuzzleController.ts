import { Request, Response } from 'express';

import {getAllPuzzles} from '../models/PuzzleModel.js';

export async function getPuzzles( req: Request, res: Response): Promise<void> {
  const puzzles = await getAllPuzzles();
  res.json({ users });
}
