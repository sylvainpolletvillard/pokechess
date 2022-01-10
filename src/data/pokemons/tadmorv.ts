import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {GROTADMORV} from "./grotadmorv";
import {PokemonEntry} from "../pokemons";

export const TADMORV: PokemonEntry = {
    ref: "tadmorv",
    name: "Tadmorv",
    maxPV: 80,
    maxPP: 20,
    attack: 80,

    defense: 50,
    speed: 25,
    types: [POKEMON_TYPES.POISON],
    evolution: GROTADMORV,
    evolutionLevel: 38,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // coud'Boue
    ppSkill: SKILLS.LANCE_SOLEIL // Bomb beurk
}