import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";
import { EVOLI } from "./evoli";

export const AQUALI: PokemonEntry = {
    ref: "aquali",
    name: "Aquali",
    maxPV: 130,
    maxPP: 20,
    attack: 65,
    attackRange: 4,
    defense: 60,
    speed: 65,
    types: [POKEMON_TYPES.EAU],
    devolution: EVOLI,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // pistolet à O
    ppSkill: SKILLS.LANCE_SOLEIL // hydrocanon
}