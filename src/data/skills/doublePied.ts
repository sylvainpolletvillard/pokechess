import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import {AlterationType} from "../alterations";

export const DOUBLE_PIED: HitSkill = {
    name: "Double-Pied",
    type: POKEMON_TYPES.COMBAT,
    effect: EFFECTS.DOUBLE_PIED,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 150,    
    power: 45,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 4,
}