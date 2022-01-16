import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MELODELFE: PokemonEntry = {
    ref: "melodelfe",
    name: "Mélodelfe",
    maxPV: 95,
    maxPP: 20,
    attack: 70,
    defense: 73,
    speed: 60,
    types: [POKEMON_TYPES.FEE],
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // torgnoles
    ppSkill: SKILLS.LANCE_SOLEIL // pouvoir lunaire
}