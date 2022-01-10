import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const GRIFFE: HitSkill = {
    name: "Griffe",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.CLAW_LEFT,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    effectOrigin: "target",
    power: 1,
    rotateSprite: true,
    attackRange: 1
}