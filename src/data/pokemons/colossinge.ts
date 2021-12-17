import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const COLOSSINGE: PokemonEntry = {
    ref: "colossinge",
    name: "Colossinge",
    maxPV: 65,
    maxPP: 20,
    attack: 105,
    attackRange: 1,
    defense: 60,
    speed: 95,
    types: [POKEMON_TYPES.COMBAT],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // griffe
    ppSkill: SKILLS.LANCE_SOLEIL // poing karaté
}