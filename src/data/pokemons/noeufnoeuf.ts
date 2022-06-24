import {POKEMON_TYPES} from "../types";
import {NOADKOKO} from "./noadkoko";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const NOEUFNOEUF: PokemonEntry = {
    ref: "noeufnoeuf",
    name: "Noeufnoeuf",
    maxPV: 60,
    maxPP: 20,
    attack: 40,
    defense: 80,
    speed: 40,
    types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.PSY],
    evolution: NOADKOKO,
    evolutionLevel: 40,
    rank: 1,
    baseSkill: SKILLS.CHOC_MENTAL,
    ppSkill: SKILLS.BOMB_OEUF,
    wildEncounterChance: 1
}