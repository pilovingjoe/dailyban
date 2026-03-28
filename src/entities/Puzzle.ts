import {
  Entity, PrimaryColumn, Column,
  BeforeInsert,
  } from 'typeorm';
import {v7 as uuidv7} from 'uuid';

@Entity()
export class Puzzle = {
  @PrimaryColumn()
  id: number;

  @BeforeInsert()
  generateId(): void {
    this.id=uuidv7();
  }
  @column()
  minMoves: number;

  @column()
  content: string;
};
