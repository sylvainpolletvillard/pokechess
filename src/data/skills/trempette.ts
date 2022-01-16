import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const TREMPETTE: SpecialSkill = {
    behavior: SkillBehavior.SPECIAL,    
    name: "Trempette",
    description: "Mais rien en se passe.",
    type: POKEMON_TYPES.EAU,
    power: 0,
    effect: EFFECTS.TREMPETTE,
    attackRange: 9
}