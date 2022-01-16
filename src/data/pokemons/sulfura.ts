import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const SULFURA: PokemonEntry = {
    ref: "sulfura",
    name: "Sulfura",
    maxPV: 90,
    maxPP: 20,
    attack: 100,
    defense: 90,
    speed: 90,
    types: [POKEMON_TYPES.VOL, POKEMON_TYPES.FEU],
    rank: 5,
    baseSkill: SKILLS.FLAMMECHE,
    ppSkill: SKILLS.LANCE_SOLEIL // déflagration
}