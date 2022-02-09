import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const ULTIMAPOING: HitSkill = {
    name: "Ultimapoing",
    description: "Un uppercut dévastateur",
    type: POKEMON_TYPES.COMBAT,
    effect: EFFECTS.ULTIMAPOING,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    effectPosition: "target",
    power: 250,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 12,
}