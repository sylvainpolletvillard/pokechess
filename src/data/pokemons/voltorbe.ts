import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {ELECTRODE} from "./electrode";
import {PokemonEntry} from "../pokemons";

export const VOLTORBE: PokemonEntry = {
    ref: "voltorbe",
    name: "Voltorbe",
    maxPV: 40,
    maxPP: 20,
    attack: 30,

    defense: 50,
    speed: 100,
    types: [POKEMON_TYPES.ELECTRIQUE],
    evolution: ELECTRODE,
    evolutionLevel: 22,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // charge
    ppSkill: SKILLS.LANCE_SOLEIL // destruction
}