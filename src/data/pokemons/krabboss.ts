import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const KRABBOSS: PokemonEntry = {
    ref: "krabboss",
    name: "Krabboss",
    maxPV: 55,
    maxPP: 100,
    attack: 130,
    defense: 115,
    speed: 75,
    types: [POKEMON_TYPES.EAU],
    rank: 2,
    baseSkill: SKILLS.PISTOLET_A_O,
    ppSkill: SKILLS.LANCE_SOLEIL // guillotine
}