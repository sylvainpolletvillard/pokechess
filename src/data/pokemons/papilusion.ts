import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PAPILUSION: PokemonEntry = {
    ref: "papillusion",
    name: "Papillusion",
    maxPV: 45,
    maxPP: 20,
    attack: 49,
    attackRange: 2,
    defense: 49,
    speed: 45,
    types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.VOL],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // choc mental
    ppSkill: SKILLS.LANCE_SOLEIL // poudre dodo
}