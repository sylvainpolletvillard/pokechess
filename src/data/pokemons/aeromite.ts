import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const AEROMITE: PokemonEntry = {
    ref: "aeromite",
    name: "Aéromite",
    maxPV: 70,
    maxPP: 20,
    attack: 65,
    attackRange: 1,
    defense: 60,
    speed: 90,
    types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.POISON],
    rank: 2,
    baseSkill: SKILLS.GRIFFE, // charge
    ppSkill: SKILLS.LANCE_SOLEIL // rafale psy
}