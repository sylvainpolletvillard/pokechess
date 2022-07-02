import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const KOUD_KORNE: HitSkill = {
    name: "Koud'Korne",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.KOUD_KORNE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    power: 40,
    rotateSprite: true,
    attackRange: 1,
    chargeDelta: 8,
}