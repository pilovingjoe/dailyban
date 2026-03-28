import {
  Entity, PrimaryColumn, Column,
  BeforeInsert,
  } from 'typeorm';
import {v7 as uuidv7} from 'uuid';

@Entity()
export type Attempt = {
  @PrimaryColumn()
  id: number;

  @BeforeInsert()
  generateId(): void {
    this.id=uuidv7();
  }

  @column()
  userId: number;

  @column()
  puzzleId: number;

  @column()
  moveCount: number;

  @column()
  solveTime: number;

  @column({ default: false})
  firstAttempt: boolean;
};
