import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PARASECT: PokemonEntry = {
    ref: "parasect",
    name: "Parasect",
    maxPV: 60,
    maxPP: 20,
    attack: 95,
    defense: 80,
    speed: 30,
    types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.PLANTE],
    rank: 2,
    baseSkill: SKILLS.GRIFFE,
    ppSkill: SKILLS.PARASPORE
}