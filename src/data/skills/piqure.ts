import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const PIQURE: HitSkill = {
    name: "Piqure",
    type: POKEMON_TYPES.INSECTE,
    effect: EFFECTS.PIQURE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    effectPosition: "target",
    power: 60,
    rotateSprite: true,
    attackRange: 1,
    chargeDelta: 10,
}