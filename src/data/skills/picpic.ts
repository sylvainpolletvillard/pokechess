import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const PICPIC: HitSkill = {
    name: "Picpic",
    type: POKEMON_TYPES.VOL,
    effect: EFFECTS.PICPIC,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    effectPosition: "target",
    power: 35,
    rotateSprite: true,
    attackRange: 1,
    chargeDelta: 8,
}