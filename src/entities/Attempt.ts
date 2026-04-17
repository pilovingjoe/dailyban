import { Entity, PrimaryColumn, Column, BeforeInsert, Relation, ManyToOne } from 'typeorm';
import { Puzzle } from '../entities/Puzzle.js';
import { User } from '../entities/User.js';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class Attempt {
  @PrimaryColumn()
  attemptId: string;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  generateId(): void {
    this.attemptId = uuidv7();
    this.createdAt = new Date();
  }

  @Column()
  moveCount: number;

  @Column()
  solveTime: number;

  @Column({ default: false })
  firstAttempt: boolean;

  @ManyToOne(() => User, (user) => user.attempts)
  user: Relation<User>;

  @ManyToOne(() => Puzzle, (puzzle) => puzzle.attempts)
  puzzle: Relation<Puzzle>;
}
