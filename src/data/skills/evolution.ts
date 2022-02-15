import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const EVOLUTION: SpecialSkill = {
    name: "Evolution",
    description: "Evolue temporairement en Pyroli, Voltali ou Aquali selon le type de la cible",
    attackRange: 9,
    effect: EFFECTS.EVOLUTION,
    effectPosition: "source_ground",
    behavior: SkillBehavior.SPECIAL,
    power: 0,
    type: POKEMON_TYPES.NORMAL,
    triggerSpecial: "evolution",
    triggerSpecialDelay: 1000
}