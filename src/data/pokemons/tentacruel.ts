import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const TENTACRUEL: PokemonEntry = {
    ref: "tentacruel",
    name: "Tentacruel",
    maxPV: 80,
    maxPP: 20,
    attack: 70,
    defense: 65,
    speed: 100,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.POISON],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // dard venin
    ppSkill: SKILLS.LIGOTAGE
}