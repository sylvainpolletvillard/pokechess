import {AOESkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const LANCE_SOLEIL: AOESkill = {
    name: "Lance-Soleil",
    description: `Absorbe l'énergie solaire puis la relâche en un puissant faisceau.`,
    type: POKEMON_TYPES.PLANTE,
    effect: EFFECTS.ENERGY_BALL,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    getTilesImpacted(){
        return [] //TODO
    }
}