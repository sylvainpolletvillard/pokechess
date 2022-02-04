import {POKEMON_TYPES} from "../types";
import {KRABBOSS} from "./krabboss";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";
import {PINCE_MASSE} from "../skills/pinceMasse";

export const KRABBY: PokemonEntry = {
    ref: "krabby",
    name: "Krabby",
    maxPV: 30,
    maxPP: 20,
    attack: 105,
    defense: 90,
    speed: 50,
    types: [POKEMON_TYPES.EAU],
    evolution: KRABBOSS,
    evolutionLevel: 28,
    rank: 1,
    baseSkill: SKILLS.PINCE_MASSE,
    ppSkill: SKILLS.GUILLOTINE
}