import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const DRACAUFEU: PokemonEntry = {
    ref: "dracaufeu",
    name: "Dracaufeu",
    maxPV: 78,
    maxPP: 20,
    attack: 84,
    defense: 78,
    speed: 100,
    types: [POKEMON_TYPES.FEU, POKEMON_TYPES.DRAGON],
    rank: 3,
    baseSkill: SKILLS.FLAMMECHE,
    ppSkill: SKILLS.LANCE_FLAMMES,
    wildEncounterChance: 0,
    portraitCropY: 8
}