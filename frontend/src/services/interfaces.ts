export interface User {
    id: number;
    first_name: string;
    last_name: string;
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

