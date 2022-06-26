import {POKEMON_TYPES} from "../types";
import {FLORIZARRE} from "./florizarre";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const HERBIZARRE: PokemonEntry = {
    ref: "herbizarre",
    name: "Herbizarre",
    maxPV: 60,
    maxPP: 20,
    attack: 62,
    defense: 63,
    speed: 60,
    types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
    evolution: FLORIZARRE,
    evolutionLevel: 32,
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES,
    ppSkill: SKILLS.LANCE_SOLEIL,
    wildEncounterChance: 0
}