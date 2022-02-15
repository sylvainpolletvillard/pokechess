import { SkillBehavior, SpecialSkill} from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ARMURE: SpecialSkill = {
    name: "Armure",
    description: "Augmente la défense du lanceur jusqu'à la fin du combat - Accumulable",
    attackRange: 9,
    behavior: SkillBehavior.SPECIAL,
    type: POKEMON_TYPES.ROCHE,
    effect: EFFECTS.ARMURE,
    power: 0,
    hitDelay: 0,
    selfAlteration: {
        type: AlterationType.ARMURE,
        stacks: 1,
        keepStacks: true
    }
}