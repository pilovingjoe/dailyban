import { AppDataSource } from "../dataSource.js";
import { LeaderboardAttempt } from "../entities/Leaderboard.js";
import { User } from '../entities/User.js';
import { Attempt } from '../entities/Attempt.js';
 
export const leaderboardRepository = AppDataSource.getRepository(LeaderboardAttempt);
const userRepository = AppDataSource.getRepository(User);
const attemptRepository = AppDataSource.getRepository(Attempt);

export async function getTopSpeedsByDate(date: string): Promise<LeaderboardAttempt[]> {
  return leaderboardRepository
    .createQueryBuilder("l")
    .leftJoinAndSelect("l.user", "user")
    .leftJoinAndSelect("l.attempt", "attempt")
    .where("l.date = :date", { date })
    .orderBy("l.timeSpent", "ASC")
    .getMany();
}

export async function getTopMoveCountsByDate(date: string): Promise<LeaderboardAttempt[]> {
  return leaderboardRepository
    .createQueryBuilder("l")
    .leftJoinAndSelect("l.user", "user")
    .leftJoinAndSelect("l.attempt", "attempt")
    .where("l.date = :date", { date })
    .orderBy("l.moveCount", "ASC")
    .getMany();
}

export async function getLeaderboardAttemptByUser(
    date: string,
    userId: string
): Promise<LeaderboardAttempt | null> {
    return leaderboardRepository
        .createQueryBuilder('l')
        .leftJoinAndSelect('l.user', 'user')
        .leftJoinAndSelect('l.attempt', 'attempt')
        .where('l.date = :date', { date })
        .andWhere('l.userId = :userId', { userId })
        .getOne();
}

export async function addLeaderboardAttempt(
    timeSpent: number,
    moveCount: number,
    date: string,  
    userId: string,
    attemptId: string
): Promise<LeaderboardAttempt> {
    const newEntry = new LeaderboardAttempt();
    newEntry.timeSpent = timeSpent;
    newEntry.moveCount = moveCount;
    newEntry.date = date;
    newEntry.user = await userRepository.findOne({ where: { userId } });
    newEntry.attempt = await attemptRepository.findOne({ where: { attemptId } });
    
    if (!newEntry.user || !newEntry.attempt) {
        throw new Error("Invalid user or attempt");
    }
    return leaderboardRepository.save(newEntry);
}

export async function updateLeaderboardAttempt(
    leaderboardId: string,
    timeSpent: number,
    moveCount: number 
): Promise<LeaderboardAttempt | null> {
    const entry = await leaderboardRepository.findOne({ where: { leaderboardId } });
    if (!entry) return null;

    entry.timeSpent = timeSpent;
    entry.moveCount = moveCount;
    return leaderboardRepository.save(entry);
}