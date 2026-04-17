import { Entity, PrimaryColumn, Column, BeforeInsert, Relation, OneToMany, ManyToMany } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Attempt } from '../entities/Attempt.js';
import { User } from '../entities/User.js';

@Entity()
export class Puzzle {
  @PrimaryColumn()
  puzzleId: string;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  generateId(): void {
    this.puzzleId = uuidv7();
    this.createdAt = new Date();
  }

  @Column()
  date: Date;

  @Column()
  minMoves: number;

  @Column()
  content: string;

  @OneToMany(() => Attempt, (attempt) => attempt.puzzle)
  attempts: Relation<Attempt>;

  @ManyToMany(() => User, (user) => user.completedPuzzles)
  finishedUsers: Relation<User>;

  // @OneToOne(() =>Leaderboard, (leaderbaord) => leaderboard.puzzle)
  // @JoinColumn()
  // leaderboard: Relationship<leaderboard>;
}
