import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ELECTRODE: PokemonEntry = {
    ref: "electrode",
    name: "Electrode",
    maxPV: 60,
    maxPP: 20,
    attack: 50,
    attackRange: 1,
    defense: 70,
    speed: 150,
    types: [POKEMON_TYPES.ELECTRIQUE],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // charge
    ppSkill: SKILLS.LANCE_SOLEIL // destruction
}