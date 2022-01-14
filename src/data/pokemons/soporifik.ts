import {POKEMON_TYPES} from "../types";
import {HYPNOMADE} from "./hypnomade";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const SOPORIFIK: PokemonEntry = {
    ref: "soporifik",
    name: "Soporifik",
    maxPV: 60,
    maxPP: 20,
    attack: 48,
    defense: 45,
    speed: 42,
    types: [POKEMON_TYPES.PSY],
    evolution: HYPNOMADE,
    evolutionLevel: 26,
    rank: 1,
    baseSkill: SKILLS.CHOC_MENTAL,
    ppSkill: SKILLS.HYPNOSE
}