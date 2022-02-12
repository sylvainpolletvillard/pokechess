import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const CRUSTABRI: PokemonEntry = {
    ref: "crustabri",
    name: "Crustabri",
    maxPV: 50,
    maxPP: 20,
    attack: 95,
    defense: 180,
    speed: 70,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.GLACE],
    rank: 3,
    baseSkill: SKILLS.PISTOLET_A_O,
    ppSkill: SKILLS.ABRI
}