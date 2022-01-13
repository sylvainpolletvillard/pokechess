import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const LIGOTAGE: HitSkill = {
    name: "Ligotage",
    description: "Empêche la cible de bouger et inflige des dégâts sur la durée",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.LIGOTAGE,
    effectDelta: 8,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 300,
    effectOrigin: "target_ground",
    power: 15,
    rotateSprite: false, 
    triggerAlteration: { type: AlterationType.LIGOTAGE, stacks: 120 },
    attackRange: 4
}