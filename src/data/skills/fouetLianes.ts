import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const FOUET_LIANES: HitSkill = {
    name: "Fouet-Lianes",
    type: POKEMON_TYPES.PLANTE,
    effect: EFFECTS.VINE_WHIP,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 250,
    effectOrigin: "source",
    power: 1.2,
    rotateSprite: true
}