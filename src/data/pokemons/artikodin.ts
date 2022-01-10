import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ARTIKODIN: PokemonEntry = {
    ref: "artikodin",
    name: "Artikodin",
    maxPV: 90,
    maxPP: 20,
    attack: 95,
    defense: 100,
    speed: 85,
    types: [POKEMON_TYPES.VOL, POKEMON_TYPES.GLACE],
    rank: 5,
    baseSkill: SKILLS.POUDREUSE,
    ppSkill: SKILLS.LANCE_SOLEIL // blizzard
}