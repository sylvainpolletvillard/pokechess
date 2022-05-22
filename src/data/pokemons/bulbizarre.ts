import {POKEMON_TYPES} from "../types";
import {HERBIZARRE} from "./herbizarre";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const BULBIZARRE: PokemonEntry = {
    ref: "bulbizarre",
    name: "Bulbizarre",
    maxPV: 45,
    maxPP: 20,
    attack: 49,
    defense: 49,
    speed: 45,
    types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
    evolution: HERBIZARRE,
    evolutionLevel: 10,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES,
    ppSkill: SKILLS.LANCE_SOLEIL,
}