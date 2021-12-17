import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {NIDORINO} from "./nidorino";
import {PokemonEntry} from "../pokemons";

export const NIDORAN_MALE: PokemonEntry = {
    ref: "nidoran_m",
    name: "Nidoran♂",
    maxPV: 46,
    maxPP: 20,
    attack: 57,
    attackRange: 1,
    defense: 40,
    speed: 50,
    types: [POKEMON_TYPES.POISON],
    evolution: NIDORINO,
    evolutionLevel: 16,
    rank: 1,
    baseSkill: SKILLS.GRIFFE, // dard venin
    ppSkill: SKILLS.LANCE_SOLEIL // Koud'Korne
}