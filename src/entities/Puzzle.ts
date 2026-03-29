import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class Puzzle {
  @PrimaryColumn()
  puzzleId: string;

  @BeforeInsert()
  generateId(): void {
    this.puzzleId = uuidv7();
  }
  @Column()
  minMoves: number;

  @Column()
  content: string;
}
