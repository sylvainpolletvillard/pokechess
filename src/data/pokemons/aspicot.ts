import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {COCONFORT} from "./coconfort";
import {PokemonEntry} from "../pokemons";

export const ASPICOT: PokemonEntry = {
    ref: "aspicot",
    name: "Aspicot",
    maxPV: 40,
    maxPP: 20,
    attack: 35,
    attackRange: 1,
    defense: 30,
    speed: 50,
    types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.POISON],
    evolution: COCONFORT,
    evolutionLevel: 7,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // dard venin
    ppSkill: SKILLS.LANCE_SOLEIL // secrétion
}