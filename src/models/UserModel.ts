import { AppDataSource } from '../dataSource.js';
import { User } from '../entities/User.js';

export const userRepository = AppDataSource.getRepository(User);

export async function getAllUsers(): Promise<User[]> {
  return userRepository.find();
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return userRepository.findOne({ where: { email } });
}

export async function getUserById(userId: string): Promise<User | null> {
  return userRepository.findOne({ where: { userId } });
}

export async function getUserWithAttempts(userId: string): Promise<User | null> {
  return userRepository.findOne({
    where: { userId },
    relations: { attempts: true },
  });
}

export async function addUser(
  email: string,
  passwordHash: string,
  displayName: string,
): Promise<User> {
  const newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  newUser.displayName = displayName;
  newUser.averageScore = -1;
  newUser.averageTime = -1;
  newUser.numCompleted = 0;
  // userId is generated automatically by @BeforeInsert

  return userRepository.save(newUser);
}

export async function computeAvgs(
  userId: string,
  moveCount: number,
  solveTime: number,
): Promise<void> {
  const user = await userRepository.findOne({ where: { userId } });
  const numComplete = user.numCompleted;
  user.averageScore = (user.averageScore * numComplete + moveCount) / (numComplete + 1);
  user.averageTime = (user.averageTime * numComplete + solveTime) / (numComplete + 1);
  user.numCompleted++;
  userRepository.save(user);
}
