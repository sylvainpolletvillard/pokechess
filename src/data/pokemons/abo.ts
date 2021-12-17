import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {ARBOK} from "./arbok";
import {PokemonEntry} from "../pokemons";

export const ABO: PokemonEntry = {
    ref: "abo",
    name: "Abo",
    maxPV: 35,
    maxPP: 20,
    attack: 60,
    attackRange: 1,
    defense: 44,
    speed: 55,
    types: [POKEMON_TYPES.POISON],
    evolution: ARBOK,
    evolutionLevel: 22,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // morsure
    ppSkill: SKILLS.LANCE_SOLEIL // ligotage
}