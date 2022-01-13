import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PORYGON: PokemonEntry = {
    ref: "porygon",
    name: "Porygon",
    maxPV: 65,
    maxPP: 20,
    attack: 60,

    defense: 70,
    speed: 40,
    types: [POKEMON_TYPES.NORMAL],
    rank: 2,
    baseSkill: SKILLS.CHARGE,
    ppSkill: SKILLS.LANCE_SOLEIL // adaptation: change de type pour prendre celui de la dernière attaque reçue
}