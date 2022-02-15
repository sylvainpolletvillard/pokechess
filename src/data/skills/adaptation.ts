import { SkillBehavior, SpecialSkill} from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ADAPTATION: SpecialSkill = {
    name: "Adaptation",
    description: "Remplace temporairement son type par celui des attaques reçues",
    attackRange: 9,
    behavior: SkillBehavior.SPECIAL,
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.ADAPTATION,
    effectPosition: "source_ground",
    power: 0,
    hitDelay: 0,
    selfAlteration: {
        type: AlterationType.ADAPTATION,
        stacks: 50,
    }
}