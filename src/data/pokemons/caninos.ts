import {POKEMON_TYPES} from "../types";
import {ARCANIN} from "./arcanin";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const CANINOS: PokemonEntry = {
    ref: "caninos",
    name: "Caninos",
    maxPV: 55,
    maxPP: 20,
    attack: 70,
    attackRange: 1,
    defense: 45,
    speed: 60,
    types: [POKEMON_TYPES.FEU],
    evolution: ARCANIN,
    evolutionLevel: 30,
    rank: 1,
    baseSkill: SKILLS.FLAMMECHE, // morsure
    ppSkill: SKILLS.LANCE_SOLEIL // crocs feu
}