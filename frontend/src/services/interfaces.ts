export interface User {
    id: number;
    first_name: string;
    last_name: string;
}

export interface Team {
    id: number;
    name: string;
}

export interface NavProps {
    role: string;
}

export interface RubriqueProps {
    titre: string;
    contenu : React.FunctionComponent;
}

export interface Desire {
    id: number;
    name: string;
    description: string;
}