import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const ETINCELLE: HitSkill = {
    name: "Etincelle",
    type: POKEMON_TYPES.ELECTRIQUE,
    effect: EFFECTS.ETINCELLE,
    effectDelta: 4,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    triggerAlteration: { type: AlterationType.PARALYSIE, stacks: 15 },
    effectOrigin: "target",
    power: 65,
    rotateSprite: true,
    attackRange: 1
}