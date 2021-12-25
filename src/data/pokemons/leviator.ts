import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const LEVIATOR: PokemonEntry = {
    ref: "leviator",
    name: "Leviator",
    maxPV: 95,
    maxPP: 20,
    attack: 125,
    attackRange: 1,
    defense: 79,
    speed: 81,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.VOL],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // morsure
    ppSkill: SKILLS.LANCE_SOLEIL // draco rage
}