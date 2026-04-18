import argon2 from 'argon2';
import { Request, Response } from 'express';
import { RegistrationSchema, GetUserSchema } from '../validators/authValidator.js';
import { addUser, getUserByEmail, getUserById } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
// import { Session } from '../express-session.d.js';

// Mostly taken from slides
export async function registerUser(req: Request, res: Response): Promise<void> {
  const result = RegistrationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password } = result.data;

  try {
    const passwordHash = await argon2.hash(password);
    const newUser = await addUser(email, passwordHash);
    console.log(newUser);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export async function logIn(req: Request, res: Response): Promise<void> {
  const result = RegistrationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password } = result.data;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(403);
      return;
    }

    const { passwordHash } = user;
    if (!(await argon2.verify(passwordHash, password))) {
      res.sendStatus(403);
      return;
    }

    await req.session.clearSession();

    req.session.authenticatedUser = {
      userId: user.userId,
      email: user.email,
      // displayName: user.displayName,
    };
    req.session.isLoggedIn = true;

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function logOut(req: Request, res: Response): Promise<void> {
  await req.session.clearSession();
  res.sendStatus(204);
}

export async function getUserProfile(req: Request, res: Response): Promise<void> {
  const result = GetUserSchema.safeParse(req.params);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { userId } = result.data;

  try {
    const user = await getUserById(userId);
    if (!user) {
      res.sendStatus(403);
      return;
    }
    res.json({
      email: user.email,
      averageScore: user.averageScore,
      averageTime: user.averageTime,
      completedPuzzles: user.completedPuzzles,
      attempts: user.attempts,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

// export async function getAttemptHistory(req: Request: res: Response): Promise<void> {
//   const result = GetUserSchema.safeParse(req.params);
//   if (!result.success) {
//     res.status(400).json(result.error.flatten());
//     return;
//   }
//
//   const { userId } result.data;
//   try {
//     const user = await getUserById(userId);
// }
