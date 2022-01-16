import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const SAQUEDENEU: PokemonEntry = {
    ref: "saquedeneu",
    name: "Saquedeneu",
    maxPV: 65,
    maxPP: 20,
    attack: 55,
    defense: 115,
    speed: 60,
    types: [POKEMON_TYPES.PLANTE],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES,
    ppSkill: SKILLS.LIGOTAGE
}