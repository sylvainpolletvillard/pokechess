import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PAPILUSION: PokemonEntry = {
    ref: "papillusion",
    name: "Papillusion",
    maxPV: 45,
    maxPP: 30,
    attack: 49,
    defense: 49,
    speed: 45,
    types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.VOL],
    rank: 3,
    baseSkill: SKILLS.CHOC_MENTAL,
    ppSkill: SKILLS.POUDRE_DODO
}