import {AOESkill, SkillBehavior} from "../../logic/skill";
import { AlterationType } from "../alterations";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const FURIE: AOESkill = {
    name: "Furie",
    description: "Augmente l'attaque du lanceur jusqu'à la fin du combat - Accumulable",
    type: POKEMON_TYPES.NORMAL,
    attackRange: 9,
    effect: EFFECTS.FURIE,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    getTilesImpacted(){ return [] },
    power: 0,
    hitDelay: 0,    
    selfAlteration: {
        type: AlterationType.FURIE,
        stacks: 1,
        keepStacks: true
    }
}