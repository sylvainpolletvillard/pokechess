import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const CHOC_MENTAL: HitSkill = {
    name: "Choc mental",
    type: POKEMON_TYPES.PSY,
    effect: EFFECTS.CHOC_MENTAL,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 500,
    effectOrigin: "source",
    power: 50,
    rotateSprite: false,
    attackRange: 4,
    effectDelta: 8
}