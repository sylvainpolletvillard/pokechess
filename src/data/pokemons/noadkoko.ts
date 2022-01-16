import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const NOADKOKO: PokemonEntry = {
    ref: "noadkoko",
    name: "Noadkoko",
    maxPV: 60,
    maxPP: 20,
    attack: 95,
    defense: 85,
    speed: 55,
    types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.PSY],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // pillonage
    ppSkill: SKILLS.LANCE_SOLEIL // protection
}