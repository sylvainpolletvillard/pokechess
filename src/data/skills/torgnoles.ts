import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const TORGNOLES: HitSkill = {
    name: "Torgnoles",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.TORGNOLES,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 10,
    power: 35,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 8,
}