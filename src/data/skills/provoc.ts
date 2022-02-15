import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const PROVOC: SpecialSkill = {
    name: "Provoc",
    description: "Provoque tous les adversaires dans un rayon de 2 cases",
    attackRange: 9,
    effect: EFFECTS.PROVOCATION,
    behavior: SkillBehavior.SPECIAL,
    power: 0,
    type: POKEMON_TYPES.COMBAT,
    triggerSpecial: "provoc"
}