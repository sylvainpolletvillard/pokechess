import {POKEMON_TYPES} from "../types";
import {DRACAUFEU} from "./dracaufeu";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const REPTINCEL: PokemonEntry = {
    ref: "reptincel",
    name: "Reptincel",
    maxPV: 58,
    maxPP: 20,
    attack: 64,
    defense: 58,
    speed: 80,
    types: [POKEMON_TYPES.FEU],
    evolution: DRACAUFEU,
    evolutionLevel: 36,
    rank: 2,
    baseSkill: SKILLS.FLAMMECHE,
    ppSkill: SKILLS.LANCE_FLAMMES,
    wildEncounterChance: 0
}