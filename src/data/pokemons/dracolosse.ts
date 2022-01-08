import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const DRACOLOSSE: PokemonEntry = {
    ref: "dracolosse",
    name: "Dracolosse",
    maxPV: 91,
    maxPP: 20,
    attack: 134,
    attackRange: 1,
    defense: 95,
    speed: 80,
    types: [POKEMON_TYPES.DRAGON, POKEMON_TYPES.VOL],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // cru-aile
    ppSkill: SKILLS.LANCE_SOLEIL // ultralaser
}