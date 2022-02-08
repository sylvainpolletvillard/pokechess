import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MR_MIME: PokemonEntry = {
    ref: "mrmime",
    name: "Mr. Mime",
    maxPV: 40,
    maxPP: 15,
    attack: 45,
    defense: 65,
    speed: 90,
    types: [POKEMON_TYPES.PSY, POKEMON_TYPES.FEE],
    rank: 1,
    baseSkill: SKILLS.TORGNOLES,
    ppSkill: SKILLS.ENCORE
}