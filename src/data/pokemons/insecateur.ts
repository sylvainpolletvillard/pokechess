import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const INSECATEUR: PokemonEntry = {
    ref: "insecateur",
    name: "Insecateur",
    maxPV: 70,
    maxPP: 20,
    attack: 110,

    defense: 80,
    speed: 105,
    types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.VOL],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // vive attaque
    ppSkill: SKILLS.LANCE_SOLEIL // danse lames
}