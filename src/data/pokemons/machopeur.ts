import {POKEMON_TYPES} from "../types";
import {MACKOGNEUR} from "./mackogneur";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MACHOPEUR: PokemonEntry = {
    ref: "machopeur",
    name: "Machopeur",
    maxPV: 80,
    maxPP: 20,
    attack: 100,
    defense: 70,
    speed: 45,
    types: [POKEMON_TYPES.COMBAT],
    evolution: MACKOGNEUR,
    evolutionLevel: 40,
    rank: 2,
    baseSkill: SKILLS.FLAMMECHE, // poing karaté
    ppSkill: SKILLS.LANCE_SOLEIL // balayage
}