import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const FOUET_LIANES: HitSkill = {
    name: "Fouet-Lianes",
    type: POKEMON_TYPES.PLANTE,
    effect: EFFECTS.FOUET_LIANES,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 250,
    effectPosition: "source",
    power: 45,
    rotateSprite: true,
    attackRange: 1
}