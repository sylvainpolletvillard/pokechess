import { AOESkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ARMURE: AOESkill = {
    name: "Armure",
    description: "Augmente la défense du lanceur jusqu'à la fin du combat - Accumulable",
    attackRange: 9,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    type: POKEMON_TYPES.ROCHE,
    getTilesImpacted(){ return [] },
    effect: EFFECTS.ARMURE,
    effectPosition: "source_ground",
    power: 0,
    hitDelay: 0,
    selfAlteration: {
        type: AlterationType.ARMURE,
        stacks: 1,
        keepStacks: true
    }
}