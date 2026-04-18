import { Request, Response } from 'express';
import {
  CreateAttemptParamsSchema,
  CreateAttemptBodySchema,
  GetAttemptSchema,
} from '../validators/AttemptValidator.js';
import { getAttemptById, addAttempt } from '../models/AttemptModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';

export async function createAttempt(req: Request, res: Response): Promise<void> {
  const paramsResult = CreateAttemptParamsSchema.safeParse(req.params);
  const bodyResult = CreateAttemptBodySchema.safeParse(req.body);

  if (!paramsResult.success) {
    res.status(400).json({ error: paramsResult.error });
    return;
  }
  if (!bodyResult.success) {
    res.status(400).json({ error: bodyResult.error });
    return;
  }

  const { userId, puzzleId } = paramsResult.data;
  const { moveCount, timeSpent, firstAttempt } = bodyResult.data;
  try {
    const attempt = await addAttempt(moveCount, timeSpent, userId, puzzleId, firstAttempt);

    res.json({ attempt });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export async function getAttempt(req: Request, res: Response): Promise<void> {
  const result = GetAttemptSchema.safeParse(req.params);
  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }
  const attemptId = result.data.attemptId;
  try {
    const attempt = await getAttemptById(attemptId);

    res.json({ attempt });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}
