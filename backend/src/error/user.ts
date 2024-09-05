import {User} from "../schemas/user.schema";


export const NoUser = (id: number) => new Error("No user with id '" + id + "'")
export const NoUserMail = (mail: string) => new Error("No user with mail '" + mail + "'")
export const NoTeam = (id: number | null) => new Error("No team with id '" + id + "'")
export const NoTeamForUser = (user: User) => new Error("No team for user '" + user.email + "'")
export const NoFaction = (id: number | null) => new Error("No faction with id '" + id + "'")