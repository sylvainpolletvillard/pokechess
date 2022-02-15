import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const GROBISOU: HitSkill = {
    name: "Grobisou",
    description: "Un bisou glacé qui gèle la cible temporairement",
    type: POKEMON_TYPES.PSY,
    effect: EFFECTS.GROBISOU,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 200,
    hitAlteration: { type: AlterationType.GEL, stacks: 80 },
    effectPosition: "source",
    effectDelta: 16,
    power: 0,
    rotateSprite: false,
    attackRange: 2
}