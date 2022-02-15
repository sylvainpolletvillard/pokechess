import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const PINCE_MASSE: HitSkill = {
    name: "Pince-Masse",
    type: POKEMON_TYPES.EAU,
    effect: EFFECTS.PINCE_MASSE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    power: 40,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 8,
}