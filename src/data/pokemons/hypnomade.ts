import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const HYPNOMADE: PokemonEntry = {
    ref: "hypnomade",
    name: "Hypnomade",
    maxPV: 85,
    maxPP: 20,
    attack: 73,

    defense: 70,
    speed: 67,
    types: [POKEMON_TYPES.PSY],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // choc mental
    ppSkill: SKILLS.LANCE_SOLEIL // teleport
}