import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const GROLEM: PokemonEntry = {
    ref: "grolem",
    name: "Grolem",
    maxPV: 80,
    maxPP: 20,
    attack: 120,

    defense: 130,
    speed: 45,
    types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
    rank: 3,
    baseSkill: SKILLS.FLAMMECHE, // roulade
    ppSkill: SKILLS.LANCE_SOLEIL // boul'armure
}