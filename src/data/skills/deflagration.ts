import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const DEFLAGRATION: SpecialSkill = {
    name: "Déflagration",
    description: "Enflamme tout le terrain et déclenche des éruptions sur 8 cases aléatoires",
    attackRange: 9,
    effect: EFFECTS.DEFLAGRATION,
    behavior: SkillBehavior.SPECIAL,
    power: 300,
    type: POKEMON_TYPES.FEU,
    triggerSpecial: "deflagration",
    hitDelay: 200
}