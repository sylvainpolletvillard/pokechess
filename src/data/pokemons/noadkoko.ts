import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const NOADKOKO: PokemonEntry = {
    ref: "noadkoko",
    name: "Noadkoko",
    maxPV: 60,
    maxPP: 10,
    attack: 95,
    defense: 85,
    speed: 55,
    types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.PSY],
    rank: 2,
    baseSkill: SKILLS.CHOC_MENTAL,
    ppSkill: SKILLS.BOMB_OEUF,
    wildEncounterChance: 0,
    portraitCropY: 20
}