import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const HYDROCANON: HitSkill = {
    name: "Hydrocanon",
    description: "Geyser propulsant l'adversaire dans les airs",
    type: POKEMON_TYPES.EAU,
    effect: EFFECTS.WATER_JET,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 2000,
    effectOrigin: "ground",
    power: 10,
    rotateSprite: false, 
    triggerAlteration: { type: AlterationType.MAELSTROM, stacks: 16 }
}