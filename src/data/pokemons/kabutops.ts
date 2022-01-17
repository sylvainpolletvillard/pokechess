import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const KABUTOPS: PokemonEntry = {
    ref: "kabutops",
    name: "Kabutops",
    maxPV: 60,
    maxPP: 20,
    attack: 115,
    defense: 105,
    speed: 70,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.ROCHE],
    rank: 3,
    baseSkill: SKILLS.GRIFFE,
    ppSkill: SKILLS.POUVOIR_ANTIQUE
}