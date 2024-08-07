import {pgTable, serial, text, integer, pgEnum} from "drizzle-orm/pg-core";
import { factionSchema } from "./faction.schema";
import {newstudentSchema} from "./newstudent.schema";
import {userSchema} from "./user.schema";
import {teamSchema} from "./team.schema";

export enum ChallengeType {
    Student = 'Student',
    StudentOrCe = 'StudentOrCe',
    Team = 'Team', // peut tout faire
    Faction = 'Faction', // peut creer des équipes
    Free = 'Free' //peut voir les perms
}

const challengeTypeEnum = pgEnum('challenge_type', [
    ChallengeType.Student,
    ChallengeType.StudentOrCe,
    ChallengeType.Team,
    ChallengeType.Faction,
    ChallengeType.Free,
]);


export const parseChallType = (chall: string): ChallengeType | undefined => {
    switch (chall) {
        case 'Student':
            return ChallengeType.Student;
        case 'StudentOrCe':
            return ChallengeType.StudentOrCe;
        case 'Team':
            return ChallengeType.Team;
        case 'Faction':
            return ChallengeType.Faction;
        case 'Free':
            return ChallengeType.Free;
        default:
            return undefined;
    }
}

export const challengeSchema = pgTable('challenge', {
    id: serial('id').primaryKey(),
    name: text('challenge_name').notNull().unique(),
    description: text('challenge_desc').notNull(),
    points: text('points').notNull(),
    challType: challengeTypeEnum('chall_type').notNull()
});

export type challenge = typeof challengeSchema.$inferInsert;

export const factionTochallengeSchema = pgTable('factionTochallenge', {
    factionId: integer('faction_id').notNull().primaryKey().references(() => factionSchema.id),
    challengeId: integer('challenge_id').notNull().primaryKey().references(() => challengeSchema.id),
    attributedPoints: integer('attributed_points').notNull(),
});

export type factionTochallenge = typeof factionTochallengeSchema.$inferInsert;

export const TeamTochallengeSchema = pgTable('factionTochallenge', {
    teamId: integer('team_id').notNull().primaryKey().references(() => teamSchema.id),
    challengeId: integer('challenge_id').notNull().primaryKey().references(() => challengeSchema.id),
    attributedPoints: integer('attributed_points').notNull(),
});

export type TeamTochallenge = typeof TeamTochallengeSchema.$inferInsert;

export const StudentTochallengeSchema = pgTable('studentTochallenge', {
    studentId: integer('student_id').notNull().primaryKey().references(() => userSchema.id),
    challengeId: integer('challenge_id').notNull().primaryKey().references(() => challengeSchema.id),
    attributedPoints: integer('attributed_points').notNull(),
});

export type studentTochallenge = typeof StudentTochallengeSchema.$inferInsert;
