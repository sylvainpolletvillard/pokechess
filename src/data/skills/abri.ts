import { SkillBehavior, SpecialSkill} from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ABRI: SpecialSkill = {
    name: "Abri",
    description: "Rend le lanceur invulnérable pendant un court instant",
    attackRange: 9,
    behavior: SkillBehavior.SPECIAL,
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.ABRI,
    effectPosition: "source_ground",
    effectDelta: 16,
    power: 0,
    hitDelay: 0,
    selfAlteration: {
        type: AlterationType.INVULNERABLE,
        stacks: 20
    }
}