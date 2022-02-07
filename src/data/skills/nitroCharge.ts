import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import {AlterationType} from "../alterations";

export const NITROCHARGE: HitSkill = {
    name: "Nitrocharge",
    description: "Une violente charge enflammée qui blesse également le lanceur",
    type: POKEMON_TYPES.FEU,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 150,
    hitEffect: EFFECTS.NITROCHARGE_HIT,
    hitAlteration: { type: AlterationType.BRULURE, stacks: 30 },
    effectPosition: "target",
    chargeDelta: 12,
    power: 100,
    selfDamage: 30,
    rotateSprite: false,
    attackRange: 1,
}