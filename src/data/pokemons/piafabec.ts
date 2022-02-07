import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {RAPASDEPIC} from "./rapasdepic";
import {PokemonEntry} from "../pokemons";

export const PIAFABEC: PokemonEntry = {
    ref: "piafabec",
    name: "Piafabec",
    maxPV: 40,
    maxPP: 20,
    attack: 60,
    defense: 30,
    speed: 70,
    types: [POKEMON_TYPES.VOL, POKEMON_TYPES.NORMAL],
    evolution: RAPASDEPIC,
    evolutionLevel: 20,
    rank: 1,
    baseSkill: SKILLS.PICPIC,
    ppSkill: SKILLS.HATE
}