import {POKEMON_TYPES} from "../types";
import {TETARTE} from "./tetarte";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PTITARD: PokemonEntry = {
    ref: "ptitard",
    name: "Ptitard",
    maxPV: 40,
    maxPP: 20,
    attack: 50,
    defense: 40,
    speed: 90,
    types: [POKEMON_TYPES.EAU],
    evolution: TETARTE,
    evolutionLevel: 25,
    rank: 1,
    baseSkill: SKILLS.BULLES_D_O,
    ppSkill: SKILLS.HYPNOSE,
    wildEncounterChance: 1
}