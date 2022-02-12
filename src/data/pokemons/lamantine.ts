import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const LAMANTINE: PokemonEntry = {
    ref: "lamantine",
    name: "Lamantine",
    maxPV: 90,
    maxPP: 20,
    attack: 70,
    defense: 80,
    speed: 70,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.GLACE],
    rank: 2,
    baseSkill: SKILLS.ECLATS_GLACE,
    ppSkill: SKILLS.LASER_GLACE
}