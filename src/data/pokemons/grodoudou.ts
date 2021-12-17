import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const GRODOUDOU: PokemonEntry = {
    ref: "grodoudou",
    name: "Grodoudou",
    maxPV: 140,
    maxPP: 20,
    attack: 70,
    attackRange: 1,
    defense: 45,
    speed: 45,
    types: [POKEMON_TYPES.FEE],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // torgnoles
    ppSkill: SKILLS.LANCE_SOLEIL // berceuse
}