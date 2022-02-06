import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const CHARGE: HitSkill = {
    name: "Charge",
    type: POKEMON_TYPES.NORMAL,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 150,
    hitEffect: EFFECTS.CHARGE_HIT,
    effectPosition: "target",
    chargeDelta: 12,
    power: 40,
    rotateSprite: false,
    attackRange: 1
}