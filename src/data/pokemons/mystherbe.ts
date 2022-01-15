import {POKEMON_TYPES} from "../types";
import {ORTIDE} from "./ortide";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MYSTHERBE: PokemonEntry = {
    ref: "mystherbe",
    name: "Mystherbe",
    maxPV: 45,
    maxPP: 20,
    attack: 50,
    defense: 55,
    speed: 30,
    types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
    evolution: ORTIDE,
    evolutionLevel: 21,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // vol vie
    ppSkill: SKILLS.POUDRE_TOXIK
}