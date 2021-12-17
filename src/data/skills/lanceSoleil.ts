import {Skill} from "../skills";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const LANCE_SOLEIL: Skill = {
    name: "Lance-Soleil",
    description: `Absorbe l'énergie solaire puis la relâche en un puissant faisceau.`,
    type: POKEMON_TYPES.PLANTE,
    effect: EFFECTS.ENERGY_BALL,
}