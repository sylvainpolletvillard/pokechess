import {POKEMON_TYPES} from "../types";
import {KRABBOSS} from "./krabboss";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const KRABBY: PokemonEntry = {
    ref: "krabby",
    name: "Krabby",
    maxPV: 30,
    maxPP: 20,
    attack: 105,

    defense: 90,
    speed: 50,
    types: [POKEMON_TYPES.EAU],
    evolution: KRABBOSS,
    evolutionLevel: 28,
    rank: 1,
    baseSkill: SKILLS.PISTOLET_A_O,
    ppSkill: SKILLS.LANCE_SOLEIL // guillotine
}