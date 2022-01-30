import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const VIVE_ATTAQUE: HitSkill = {
    name: "Vive-Attaque",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.VIVE_ATTAQUE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 20,
    effectPosition: "target",
    power: 40,
    rotateSprite: true,
    attackRange: 1,
    chargeDelta: 10,
}