import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ARCANIN: PokemonEntry = {
    ref: "arcanin",
    name: "Arcanin",
    maxPV: 90,
    maxPP: 20,
    attack: 110,
    attackRange: 1,
    defense: 80,
    speed: 95,
    types: [POKEMON_TYPES.FEU],
    rank: 2,
    baseSkill: SKILLS.FLAMMECHE,  // morsure
    ppSkill: SKILLS.LANCE_SOLEIL // crocs feu
}