import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const GALOPA: PokemonEntry = {
    ref: "galopa",
    name: "Galopa",
    maxPV: 65,
    maxPP: 20,
    attack: 100,

    defense: 70,
    speed: 105,
    types: [POKEMON_TYPES.FEU],
    rank: 2,
    baseSkill: SKILLS.FLAMMECHE, // charge
    ppSkill: SKILLS.LANCE_SOLEIL // nitrocharge
}