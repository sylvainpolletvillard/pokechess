import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const DARDARGNAN: PokemonEntry = {
    ref: "dardargnan",
    name: "Dardargnan",
    maxPV: 65,
    maxPP: 20,
    attack: 80,
    defense: 40,
    speed: 75,
    types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.POISON],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // dard venin
    ppSkill: SKILLS.LANCE_SOLEIL // furie
}