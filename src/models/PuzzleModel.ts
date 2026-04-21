import { AppDataSource } from '../dataSource.js';
import { Puzzle } from '../entities/Puzzle.js';

export const puzzleRepository = AppDataSource.getRepository(Puzzle);

export async function getAllPuzzles(): Promise<Puzzle[]> {
  return puzzleRepository.find();
}

export async function getPuzzleByDate(date: Date): Promise<Puzzle | null> {
  return puzzleRepository.findOne({ where: { date } });
}
export async function getPuzzleAttemptsDate(date: Date): Promise<Puzzle | null> {
  return puzzleRepository.findOne({ where: { date }, relations: { attempts: true } });
}

export async function addPuzzle(content: string, date: Date, minMoves: number): Promise<Puzzle> {
  const newPuzzle = new Puzzle();
  newPuzzle.content = content;
  newPuzzle.date = date;
  newPuzzle.minMoves = minMoves;
  //newPuzzle.leaderboard = new Leaderboard(); add when leaderboards work

  return puzzleRepository.save(newPuzzle);
}
