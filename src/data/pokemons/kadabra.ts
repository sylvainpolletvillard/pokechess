import {POKEMON_TYPES} from "../types";
import {ALAKAZAM} from "./alakazam";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const KADABRA: PokemonEntry = {
    ref: "kadabra",
    name: "Kadabra",
    maxPV: 40,
    maxPP: 10,
    attack: 35,
    defense: 30,
    speed: 105,
    types: [POKEMON_TYPES.PSY],
    evolution: ALAKAZAM,
    evolutionLevel: 33,
    rank: 2,
    baseSkill: SKILLS.CHOC_MENTAL,
    ppSkill: SKILLS.TELEPORT,
    wildEncounterChance: 0
}