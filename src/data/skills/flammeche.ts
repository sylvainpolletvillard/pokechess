import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const FLAMMECHE: HitSkill = {
    name: "Flammèche",
    type: POKEMON_TYPES.FEU,
    effect: EFFECTS.FLAMMECHE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    triggerAlteration: { type: AlterationType.BRULURE, stacks: 12 },
    effectOrigin: "target",
    power: 40,
    rotateSprite: true,
    attackRange: 1
}