import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const POUDREUSE: HitSkill = {
    name: "Poudreuse",
    type: POKEMON_TYPES.GLACE,
    effect: EFFECTS.POUDREUSE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 200,
    triggerAlteration: { type: AlterationType.GEL, stacks: 12 },
    effectOrigin: "target",
    power: 40,
    rotateSprite: true,
    attackRange: 1,
    chargeDelta: 2,
}