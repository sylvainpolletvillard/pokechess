import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const POING_KARATE: HitSkill = {
    name: "Poing Karaté",
    type: POKEMON_TYPES.COMBAT,
    effect: EFFECTS.POING_KARATE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 10,
    effectPosition: "target",
    power: 50,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 8,
}