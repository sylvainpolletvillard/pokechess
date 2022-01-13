import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const RATTATAC: PokemonEntry = {
    ref: "rattata",
    name: "Rattata",
    maxPV: 55,
    maxPP: 20,
    attack: 81,

    defense: 60,
    speed: 97,
    types: [POKEMON_TYPES.NORMAL],
    rank: 2,
    baseSkill: SKILLS.MORSURE,
    ppSkill: SKILLS.LANCE_SOLEIL // croc fatal
}