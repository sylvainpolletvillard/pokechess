import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const TORTANK: PokemonEntry = {
    ref: "tortank",
    name: "Tortank",
    maxPV: 79,
    maxPP: 20,
    attack: 83,
    attackRange: 2,
    defense: 80,
    speed: 58,
    types: [POKEMON_TYPES.EAU],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES,
    ppSkill: SKILLS.LANCE_SOLEIL
}