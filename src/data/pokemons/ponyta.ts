import {POKEMON_TYPES} from "../types";
import {GALOPA} from "./galopa";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PONYTA: PokemonEntry = {
    ref: "ponyta",
    name: "Ponyta",
    maxPV: 50,
    maxPP: 20,
    attack: 85,

    defense: 55,
    speed: 90,
    types: [POKEMON_TYPES.FEU],
    evolution: GALOPA,
    evolutionLevel: 40,
    rank: 1,
    baseSkill: SKILLS.CHARGE,
    ppSkill: SKILLS.LANCE_SOLEIL // nitrocharge
}