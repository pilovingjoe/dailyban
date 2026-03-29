import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class Attempt {
  @PrimaryColumn()
  attemptId: string;

  @BeforeInsert()
  generateId(): void {
    this.attemptId = uuidv7();
  }

  @Column()
  userId: number;

  @Column()
  puzzleId: number;

  @Column()
  moveCount: number;

  @Column()
  solveTime: number;

  @Column({ default: false })
  firstAttempt: boolean;
}
