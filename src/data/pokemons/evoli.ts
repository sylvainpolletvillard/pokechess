import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const EVOLI: PokemonEntry = {
    ref: "evoli",
    name: "Evoli",
    maxPV: 55,
    maxPP: 20,
    attack: 55,
    defense: 50,
    speed: 55,
    types: [POKEMON_TYPES.NORMAL],
    rank: 1,
    baseSkill: SKILLS.CHARGE,
    ppSkill: SKILLS.LANCE_SOLEIL // évo: évolution temporaire en voltali, aquali ou pyroli selon le pokémon ciblé ; basé sur le code de l'attaque morphing pour
}