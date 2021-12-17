import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const AKWAKWAK: PokemonEntry = {
    ref: "akwakwak",
    name: "Akwakwak ",
    maxPV: 80,
    maxPP: 20,
    attack: 82,
    attackRange: 4,
    defense: 78,
    speed: 85,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.PSY],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // choc mental
    ppSkill: SKILLS.LANCE_SOLEIL // surf
}