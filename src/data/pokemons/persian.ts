import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PERSIAN: PokemonEntry = {
    ref: "persian",
    name: "Persian",
    maxPV: 65,
    maxPP: 5,
    attack: 70,
    defense: 60,
    speed: 115,
    types: [POKEMON_TYPES.NORMAL],
    rank: 1,
    baseSkill: SKILLS.GRIFFE,
    ppSkill: SKILLS.JACKPOT
}