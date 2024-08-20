

export const NoUser = (id: number) => new Error("No user with id '" + id + "'")
export const NoTeam = (id: number | null) => new Error("No team with id '" + id + "'")
export const NoFaction = (id: number) => new Error("No faction with id '" + id + "'")