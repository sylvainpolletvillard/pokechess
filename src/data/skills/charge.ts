import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const CHARGE: HitSkill = {
    name: "Charge",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.CHARGE_HIT,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 150,
    effectDelay: 150,
    effectPosition: "target",
    chargeDelta: 12,
    power: 40,
    rotateSprite: false,
    attackRange: 1
}