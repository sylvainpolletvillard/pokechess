import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PTERA: PokemonEntry = {
    ref: "ptera",
    name: "Ptera",
    maxPV: 80,
    maxPP: 20,
    attack: 105,
    defense: 65,
    speed: 130,
    types: [POKEMON_TYPES.VOL, POKEMON_TYPES.ROCHE],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // cru-aile
    ppSkill: SKILLS.LANCE_SOLEIL // pouvoir antique
}