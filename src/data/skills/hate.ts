import { AOESkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const HATE: AOESkill = {
    name: "Hâte",
    description: "Augmente la vitesse du lanceur jusqu'à la fin du combat - Accumulable",
    attackRange: 9,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    type: POKEMON_TYPES.PSY,
    getTilesImpacted(){ return [] },
    effect: EFFECTS.HATE,
    effectPosition: "source_ground",
    power: 0,
    hitDelay: 0,
    selfAlteration: {
        type: AlterationType.HATE,
        stacks: 1,
        keepStacks: true
    }
}