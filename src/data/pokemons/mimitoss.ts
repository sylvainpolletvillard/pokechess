import {POKEMON_TYPES} from "../types";
import {AEROMITE} from "./aeromite";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MIMITOSS: PokemonEntry = {
    ref: "mimitoss",
    name: "Mimitoss",
    maxPV: 60,
    maxPP: 20,
    attack: 55,
    attackRange: 1,
    defense: 50,
    speed: 45,
    types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.POISON],
    evolution: AEROMITE,
    evolutionLevel: 31,
    rank: 1,
    baseSkill: SKILLS.GRIFFE, // charge
    ppSkill: SKILLS.LANCE_SOLEIL // rafale psy
}