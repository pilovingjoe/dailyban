import { AppDataSource } from '../dataSource.js';
import { Puzzle } from '../entities/Puzzle.js';

const puzzleRepository = AppDataSource.getRepository(Puzzle);

export async function getAllPuzzles(): Promise<Puzzle[]> {
  return puzzleRepository.find();
}

export async function getPuzzleById(puzzleId: string): Promise<Puzzle | null> {
  return puzzleRepository.findOne({ where: { puzzleId } });
}
