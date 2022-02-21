import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const FATAL_FOUDRE: SpecialSkill = {
    name: "Fatal Foudre",
    description: "Fait tomber la foudre sur 3 ennemis et paralyse tous les autres",
    attackRange: 9,
    effect: EFFECTS.FATAL_FOUDRE,
    behavior: SkillBehavior.SPECIAL,
    power: 200,
    type: POKEMON_TYPES.ELECTRIQUE,
    triggerSpecial: "fatal_foudre",
    hitDelay: 100
}