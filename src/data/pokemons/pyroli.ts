import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";
import { EVOLI } from "./evoli";

export const PYROLI: PokemonEntry = {
    ref: "pyroli",
    name: "Pyroli",
    maxPV: 65,
    maxPP: 20,
    attack: 130,
    defense: 60,
    speed: 65,
    types: [POKEMON_TYPES.FEU],
    devolution: EVOLI,
    rank: 1,
    baseSkill: SKILLS.FLAMMECHE,
    ppSkill: SKILLS.LANCE_SOLEIL // crocs feu
}