import {PokemonType} from "./types";
import {Pokemon} from "./pokemons";
import {Effect} from "./effects";
import {FOUET_LIANES} from "./skills/fouetLianes";
import {LANCE_SOLEIL} from "./skills/lanceSoleil";
import {FLAMMECHE} from "./skills/flammeche";
import {GRIFFE} from "./skills/griffe";

export interface Skill {
    type: PokemonType
    name: string
    description?: string
    effect: Effect;
    apply?: (source: Pokemon, target: Pokemon) => any
}

export const SKILLS = {
    FOUET_LIANES,
    LANCE_SOLEIL,
    FLAMMECHE,
    GRIFFE
}