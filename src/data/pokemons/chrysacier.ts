import {POKEMON_TYPES} from "../types";
import {PAPILUSION} from "./papilusion";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const CHRYSACIER: PokemonEntry = {
    ref: "chrysacier",
    name: "Chrysacier",
    maxPV: 50,
    maxPP: 20,
    attack: 20,
    attackRange: 1,
    defense: 55,
    speed: 30,
    types: [POKEMON_TYPES.INSECTE],
    evolution: PAPILUSION,
    evolutionLevel: 10,
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES,
    ppSkill: SKILLS.LANCE_SOLEIL
}