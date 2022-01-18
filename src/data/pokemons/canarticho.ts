import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const CANARTICHO: PokemonEntry = {
    ref: "canarticho",
    name: "Canarticho",
    maxPV: 52,
    maxPP: 20,
    attack: 90,
    defense: 55,
    speed: 60,
    types: [POKEMON_TYPES.NORMAL, POKEMON_TYPES.VOL],
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // picpic
    ppSkill: SKILLS.LANCE_SOLEIL // danse-lames
}