import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const FATAL_FOUDRE: SpecialSkill = {
    name: "Fatal Foudre",
    description: "Paralyse tous les ennemis sur le terrain et fait tomber la foudre 8 fois sur une case aléatoire",
    attackRange: 9,
    effect: EFFECTS.FATAL_FOUDRE,
    behavior: SkillBehavior.SPECIAL,
    power: 200,
    type: POKEMON_TYPES.ELECTRIQUE,
    triggerSpecial: "fatal_foudre",
    hitDelay: 100
}