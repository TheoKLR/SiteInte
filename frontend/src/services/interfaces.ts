export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    team_id: number;
}

export interface UserLight {
    id: number;
    first_name: string;
    last_name: string;
    team_id: number;
}

export interface Team {
    id: number;
    name: string;
    faction:number;
}

export interface Faction {
    id: number;
    name: string;
    points: number;
}

export interface Role {
    id: number;
    name: string;
    description: string;
}

export interface Event {
    id: number;
    name: string;
}

