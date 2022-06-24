import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const SCARABRUTE: PokemonEntry = {
    ref: "scarabrute",
    name: "Scarabrute",
    maxPV: 65,
    maxPP: 30,
    attack: 125,
    defense: 100,
    speed: 85,
    types: [POKEMON_TYPES.INSECTE],
    rank: 3,
    baseSkill: SKILLS.GRIFFE,
    ppSkill: SKILLS.GUILLOTINE,
    wildEncounterChance: 0.75
}