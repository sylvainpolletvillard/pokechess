import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {RATTATAC} from "./rattatac";
import {PokemonEntry} from "../pokemons";

export const RATTATA: PokemonEntry = {
    ref: "rattata",
    name: "Rattata",
    maxPV: 30,
    maxPP: 20,
    attack: 56,
    defense: 35,
    speed: 72,
    types: [POKEMON_TYPES.NORMAL],
    evolution: RATTATAC,
    evolutionLevel: 20,
    rank: 1,
    baseSkill: SKILLS.MORSURE,
    ppSkill: SKILLS.CROC_DE_MORT,
    wildEncounterChance: 1,
    portraitCropY: 24
}