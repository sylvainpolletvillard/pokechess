import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const AMONISTAR: PokemonEntry = {
    ref: "amonistar",
    name: "Amonistar",
    maxPV: 70,
    maxPP: 20,
    attack: 60,
    defense: 125,
    speed: 55,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.ROCHE],
    rank: 3,
    baseSkill: SKILLS.PISTOLET_A_O,
    ppSkill: SKILLS.POUVOIR_ANTIQUE
}