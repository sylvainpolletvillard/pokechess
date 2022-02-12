import {POKEMON_TYPES} from "../types";
import {CRUSTABRI} from "./crustabri";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const KOKIYAS: PokemonEntry = {
    ref: "kokiyas",
    name: "Kokiyas",
    maxPV: 30,
    maxPP: 20,
    attack: 65,
    defense: 100,
    speed: 40,
    types: [POKEMON_TYPES.EAU],
    evolution: CRUSTABRI,
    evolutionLevel: 27,
    rank: 1,
    baseSkill: SKILLS.PISTOLET_A_O,
    ppSkill: SKILLS.ABRI
}