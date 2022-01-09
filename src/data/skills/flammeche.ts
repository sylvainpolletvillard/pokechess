import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const FLAMMECHE: HitSkill = {
    name: "Flammèche",
    type: POKEMON_TYPES.FEU,
    effect: EFFECTS.FIRE_BALL,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    effectOrigin: "target",
    power: 1.2,
    rotateSprite: true
}