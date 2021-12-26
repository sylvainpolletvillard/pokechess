import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MEWTWO: PokemonEntry = {
    ref: "mewtwo",
    name: "Mewtwo",
    maxPV: 106,
    maxPP: 20,
    attack: 110,
    attackRange: 4,
    defense: 90,
    speed: 130,
    types: [POKEMON_TYPES.PSY],
    rank: 5,
    baseSkill: SKILLS.FOUET_LIANES, // choc mental
    ppSkill: SKILLS.LANCE_SOLEIL // psyko
}