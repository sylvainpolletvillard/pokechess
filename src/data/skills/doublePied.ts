import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const DOUBLE_PIED: HitSkill = {
    name: "Double-Pied",
    type: POKEMON_TYPES.COMBAT,
    effect: EFFECTS.DOUBLE_PIED,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 150,    
    power: 40,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 4,
}