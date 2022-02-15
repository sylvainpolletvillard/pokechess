import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const CRUAILE: HitSkill = {
    name: "Cru-Ailes",
    type: POKEMON_TYPES.VOL,
    effect: EFFECTS.CRUAILE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 200,
    power: 60,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 4,
}