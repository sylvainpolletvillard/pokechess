import {POKEMON_TYPES} from "../types";
import {AKWAKWAK} from "./akwakwak";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PSYKOKWAK: PokemonEntry = {
    ref: "psykokwak",
    name: "Psykokwak",
    maxPV: 50,
    maxPP: 20,
    attack: 52,

    defense: 48,
    speed: 55,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.PSY],
    evolution: AKWAKWAK,
    evolutionLevel: 33,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // choc mental
    ppSkill: SKILLS.LANCE_SOLEIL // surf
}