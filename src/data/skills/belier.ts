import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const BELIER: HitSkill = {
    name: "Bélier",
    description: "Une violente charge qui blesse également le lanceur",
    type: POKEMON_TYPES.NORMAL,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 150,
    hitEffect: EFFECTS.CHARGE_HIT,
    effectPosition: "target",
    chargeDelta: 12,
    power: 120,
    selfDamage: 30,
    rotateSprite: false,
    attackRange: 1,
}