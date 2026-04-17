import { Entity, PrimaryColumn, Column, BeforeInsert, Relation, OneToMany, ManyToMany } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Attempt } from '../entities/Attempt.js';
import { Puzzle } from '../entities/Puzzle.js';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  generateId(): void {
    this.userId = uuidv7();
    this.createdAt = new Date();
  }
  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  averageScore: number;

  @Column()
  averageTime: number;

  @ManyToMany(() => Puzzle, (puzzle)=>puzzle.finishedUsers)
  completedPuzzles: Relation<Puzzle>[];

  @OneToMany(() => Attempt, (attempt) =>attempt.user)
  attempts:Relation<Attempt>[];
}
