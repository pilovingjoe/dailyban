import { Request, Response } from 'express';
import { GetPuzzleSchema, CreatePuzzleSchema } from '../validators/PuzzleValidator.js';
import { getAllPuzzles, getPuzzleByDate, addPuzzle } from '../models/PuzzleModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';

export async function getPuzzles(req: Request, res: Response): Promise<void> {
  try {
    const puzzles = await getAllPuzzles();
    res.json({ puzzles });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export async function getPuzzle(req: Request, res: Response): Promise<void> {
  const result = GetPuzzleSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({ erorr: result.error });
    return;
  }

  const puzzleDate = new Date(result.data.date);
  try {
    const puzzle = await getPuzzleByDate(puzzleDate);

    res.json({ puzzle });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export async function getTodaysPuzzle(req: Request, res: Response): Promise<void> {
  const result = GetPuzzleSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({ erorr: result.error });
    return;
  }

  const puzzleDate = new Date();
  try {
    const puzzle = await getPuzzleByDate(puzzleDate);

    res.json({ puzzle });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export async function createPuzzle(req: Request, res: Response): Promise<void> {
  const result = CreatePuzzleSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }

  const { content, minMoves, date } = result.data;

  try {
    const realDate = new Date(date);
    const newPuzzle = await addPuzzle(content, realDate, minMoves);
    console.log(newPuzzle.content);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}
// export async function createPuzzle( req: Request, res: Response): Promise<void> {
//   const result = CreatePuzzleSchema.safeParse(req.params);
//
//   if(!result.success){
//     res.status(400).json({ error: result.error });
//     return;
//   }
// }
