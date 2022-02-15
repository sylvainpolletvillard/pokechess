import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const POUDREUSE: HitSkill = {
    name: "Poudreuse",
    type: POKEMON_TYPES.GLACE,
    effect: EFFECTS.POUDREUSE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 200,
    power: 40,
    rotateSprite: true,
    attackRange: 1,
    chargeDelta: 2,
}