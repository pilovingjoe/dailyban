import { AppDataSource } from '../dataSource.js';
import { Attempt } from '../entities/Attempt.js';

const attemptRepository = AppDataSource.getRepository(Attempt);

export async function getAllAttempts(): Promise<Attempt[]> {
  return attemptRepository.find();
}

export async function getAttemptById(attemptId: string): Promise<Attempt | null> {
  return attemptRepository.findOne({ where: { attemptId } });
}
