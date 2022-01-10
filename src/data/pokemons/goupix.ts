import {POKEMON_TYPES} from "../types";
import {FEUNARD} from "./feunard";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const GOUPIX: PokemonEntry = {
    ref: "goupix",
    name: "Goupix",
    maxPV: 38,
    maxPP: 20,
    attack: 41,

    defense: 40,
    speed: 65,
    types: [POKEMON_TYPES.FEU],
    evolution: FEUNARD,
    evolutionLevel: 20,
    rank: 1,
    baseSkill: SKILLS.FLAMMECHE,
    ppSkill: SKILLS.LANCE_SOLEIL // danse flamme
}