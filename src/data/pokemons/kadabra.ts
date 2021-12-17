import {POKEMON_TYPES} from "../types";
import {ALAKAZAM} from "./alakazam";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const KADABRA: PokemonEntry = {
    ref: "kadabra",
    name: "Kadabra",
    maxPV: 40,
    maxPP: 20,
    attack: 35,
    attackRange: 4,
    defense: 30,
    speed: 105,
    types: [POKEMON_TYPES.PSY],
    evolution: ALAKAZAM,
    evolutionLevel: 33,
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // choc mental
    ppSkill: SKILLS.LANCE_SOLEIL // teleport
}