import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {ROUCARNAGE} from "./roucarnage";
import {PokemonEntry} from "../pokemons";

export const ROUCOUPS: PokemonEntry = {
    ref: "roucoups",
    name: "Roucoups",
    maxPV: 63,
    maxPP: 20,
    attack: 60,
    defense: 55,
    speed: 71,
    types: [POKEMON_TYPES.VOL, POKEMON_TYPES.NORMAL],
    evolution: ROUCARNAGE,
    evolutionLevel: 36,
    rank: 2,
    baseSkill: SKILLS.PICPIC,
    ppSkill: SKILLS.OURAGAN,
    wildEncounterChance: 0,
    portraitCropY: 8
}