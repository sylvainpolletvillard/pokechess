import {POKEMON_TYPES} from "../types";
import {LAMANTINE} from "./lamantine";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const OTARIA: PokemonEntry = {
    ref: "otaria",
    name: "Otaria",
    maxPV: 65,
    maxPP: 20,
    attack: 45,
    defense: 55,
    speed: 45,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.GLACE],
    evolution: LAMANTINE,
    evolutionLevel: 34,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // coup d'Boule
    ppSkill: SKILLS.ECLATS_GLACE
}