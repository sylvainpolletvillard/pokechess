import {POKEMON_TYPES} from "../types";
import {DRACOLOSSE} from "./dracolosse";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const DRACO: PokemonEntry = {
    ref: "draco",
    name: "Draco",
    maxPV: 61,
    maxPP: 20,
    attack: 84,
    defense: 65,
    speed: 70,
    types: [POKEMON_TYPES.DRAGON],
    evolution: DRACOLOSSE,
    evolutionLevel: 55,
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // dracocharge
    ppSkill: SKILLS.OURAGAN
}