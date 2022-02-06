import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const HYDROCANON: HitSkill = {
    name: "Hydrocanon",
    description: "Geyser propulsant l'adversaire dans les airs",
    type: POKEMON_TYPES.EAU,
    effect: EFFECTS.HYDROCANON,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 2000,
    effectPosition: "target_ground",
    power: 300,
    rotateSprite: false, 
    triggerAlteration: { type: AlterationType.TOURBILLON, stacks: 30 },
    attackRange: 4
}