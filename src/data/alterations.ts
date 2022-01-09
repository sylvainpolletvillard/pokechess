import { PokemonOnBoard } from "../objects/pokemon"

export enum AlterationType {
    MAELSTROM = "MAELSTROM",
    POISON = "POISON"
}

export interface Alteration {
    type: AlterationType
    stacks: number;
}