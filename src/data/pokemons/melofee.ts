import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {MELODELFE} from "./melodelfe";
import {PokemonEntry} from "../pokemons";

export const MELOFEE: PokemonEntry = {
    ref: "melofee",
    name: "Mélofée",
    maxPV: 70,
    maxPP: 20,
    attack: 45,
    defense: 48,
    speed: 35,
    types: [POKEMON_TYPES.FEE],
    evolution: MELODELFE,
    evolutionLevel: 26,
    rank: 1,
    baseSkill: SKILLS.TORGNOLES,
    ppSkill: SKILLS.LANCE_SOLEIL // pouvoir lunaire
}