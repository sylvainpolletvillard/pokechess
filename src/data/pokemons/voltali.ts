import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";
import { EVOLI } from "./evoli";

export const VOLTALI: PokemonEntry = {
    ref: "voltali",
    name: "Voltali",
    maxPV: 65,
    maxPP: 20,
    attack: 65,
    defense: 60,
    speed: 130,
    types: [POKEMON_TYPES.ELECTRIQUE],
    devolution: EVOLI,
    rank: 2,
    baseSkill: SKILLS.ETINCELLE,
    ppSkill: SKILLS.LANCE_SOLEIL // éclair
}