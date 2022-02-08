import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import {AlterationType} from "../alterations";

export const DEVOREVE: HitSkill = {
    name: "Dévorêve",
    description: "Appeure l'adversaire avec des visions de cauchemar",
    type: POKEMON_TYPES.SPECTRE,
    effect: EFFECTS.DEVOREVE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 350,
    effectPosition: "target_ground",
    effectDelta: 8,
    power: 100,
    rotateSprite: false,
    attackRange: 4,
    hitAlteration: { type: AlterationType.PEUR, stacks: 30 }
}