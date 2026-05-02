import { Entity, PrimaryColumn, Column, BeforeInsert, ManyToOne, Relation } from 'typeorm';
import { Attempt } from '../entities/Attempt.js';
import { User } from '../entities/User.js';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class LeaderboardAttempt {
    @PrimaryColumn()
    leaderboardId: string;

    @BeforeInsert()
    generatedId(): void {
        this.leaderboardId = uuidv7();
    }

    @Column()
    timeSpent: number;

    @Column()
    moveCount: number;

    @Column({ type: 'date' })
    date: string;

    @ManyToOne (() => User, (user) => user.attempts)
    user: Relation<User>;

    @ManyToOne(() => Attempt, (attempt) => attempt.attemptId)
    attempt: Relation<Attempt>;
}