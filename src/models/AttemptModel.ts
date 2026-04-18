import { AppDataSource } from '../dataSource.js';
import { Attempt } from '../entities/Attempt.js';
// import { Puzzle } from '../entities/Puzzle.js';
// import { User } from '../entities/User.js';
import { userRepository } from './UserModel.js';
import { puzzleRepository } from './PuzzleModel.js';
// import { leaderboardRepository } from 'LeaderboardModel.js';

const attemptRepository = AppDataSource.getRepository(Attempt);

// export async function getAllAttempts(): Promise<Attempt[]> {
//   return attemptRepository.find();
// }

// These should be in the other models, not this one
// export async function getAttemptsByPuzzle(): Promise<Attempt[]> {
//   return attemptRepository.find();
// }
// export async function getAttemptsByUser(): Promise<Attempt[]> {
//   return attemptRepository.find({where:);
// }
export async function getAttemptById(attemptId: string): Promise<Attempt | null> {
  return attemptRepository.findOne({ where: { attemptId } });
}

export async function addAttempt(
  moveCount: number,
  solveTime: number,
  userId: string,
  puzzleId: string,
  firstAttempt: boolean,
): Promise<Attempt | null> {
  const newAttempt = new Attempt();
  newAttempt.moveCount = moveCount;
  newAttempt.solveTime = solveTime;
  newAttempt.user = await userRepository.findOne({ where: { userId } });
  newAttempt.puzzle = await puzzleRepository.findOne({ where: { puzzleId } });
  newAttempt.firstAttempt = firstAttempt;
  //newPuzzle.leaderboard = new Leaderboard(); add when leaderboards work

  return attemptRepository.save(newAttempt);
}
