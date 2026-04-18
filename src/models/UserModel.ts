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

export async function addUser(email: string, passwordHash: string): Promise<User> {
  const newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  newUser.averageScore = -1;
  newUser.averageTime = -1;
  // userId is generated automatically by @BeforeInsert

  return userRepository.save(newUser);
}
