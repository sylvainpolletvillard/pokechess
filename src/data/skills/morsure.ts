import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const MORSURE: HitSkill = {
    name: "Morsure",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.MORSURE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 140,
    effectOrigin: "target",
    power: 60,
    rotateSprite: false,
    attackRange: 1
}