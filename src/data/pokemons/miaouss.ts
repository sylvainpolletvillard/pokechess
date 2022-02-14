import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PERSIAN} from "./persian";
import {PokemonEntry} from "../pokemons";

export const MIAOUSS: PokemonEntry = {
    ref: "miaouss",
    name: "Miaouss",
    maxPV: 40,
    maxPP: 20,
    attack: 45,
    defense: 35,
    speed: 90,
    types: [POKEMON_TYPES.NORMAL],
    evolution: PERSIAN,
    evolutionLevel: 28,
    rank: 1,
    baseSkill: SKILLS.GRIFFE,
    ppSkill: SKILLS.JACKPOT
}