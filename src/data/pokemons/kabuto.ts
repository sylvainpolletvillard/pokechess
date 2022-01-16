import {POKEMON_TYPES} from "../types";
import {KABUTOPS} from "./kabutops";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const KABUTO: PokemonEntry = {
    ref: "kabuto",
    name: "Kabuto",
    maxPV: 30,
    maxPP: 20,
    attack: 80,
    defense: 90,
    speed: 55,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.ROCHE],
    evolution: KABUTOPS,
    evolutionLevel: 40,
    rank: 1,
    baseSkill: SKILLS.GRIFFE,
    ppSkill: SKILLS.LANCE_SOLEIL // pouvoir antique
}