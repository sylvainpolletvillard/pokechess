import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const CROC_DE_MORT: HitSkill = {
    name: "Morsure",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.CROC_DE_MORT,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 200,
    effectOrigin: "target_ground",
    power: 250,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 0,
    effectDelta: 16
}