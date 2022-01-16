import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const TELEPORT: SpecialSkill = {
    name: "Teleport",
    description: "Téléporte le lanceur sur une case aléatoire du plateau",
    attackRange: 9,
    effect: EFFECTS.TELEPORT,
    behavior: SkillBehavior.SPECIAL,
    power: 0,
    type: POKEMON_TYPES.PSY,
    triggerSpecial: "teleport"
}