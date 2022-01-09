import {POKEMON_TYPES} from "../types";
import {HYPOCEAN} from "./hypocean";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const HYPOTREMPE: PokemonEntry = {
    ref: "hypotrempe",
    name: "Hypotrempe",
    maxPV: 30,
    maxPP: 20,
    attack: 40,
    attackRange: 4,
    defense: 70,
    speed: 60,
    types: [POKEMON_TYPES.EAU],
    evolution: HYPOCEAN,
    evolutionLevel: 32,
    rank: 1,
    baseSkill: SKILLS.BULLES_D_O,
    ppSkill: SKILLS.LANCE_SOLEIL // ouragan
}