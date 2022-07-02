import {POKEMON_TYPES} from "../types";
import {KADABRA} from "./kadabra";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ABRA: PokemonEntry = {
    ref: "abra",
    name: "Abra",
    maxPV: 25,
    maxPP: 10,
    attack: 20,
    defense: 15,
    speed: 90,
    types: [POKEMON_TYPES.PSY],
    evolution: KADABRA,
    evolutionLevel: 16,
    rank: 1,
    baseSkill: SKILLS.CHOC_MENTAL,
    ppSkill: SKILLS.TELEPORT,
    wildEncounterChance: 1,
    portraitCropY: 13
}