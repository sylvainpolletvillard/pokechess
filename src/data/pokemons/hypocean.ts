import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const HYPOCEAN: PokemonEntry = {
    ref: "hypocean",
    name: "Hypocean",
    maxPV: 55,
    maxPP: 20,
    attack: 65,

    defense: 95,
    speed: 85,
    types: [POKEMON_TYPES.EAU],
    rank: 2,
    baseSkill: SKILLS.BULLES_D_O,
    ppSkill: SKILLS.LANCE_SOLEIL // ouragan
}