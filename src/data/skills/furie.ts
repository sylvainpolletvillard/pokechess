import {HitSkill, SkillBehavior} from "../../logic/skill";
import { AlterationType } from "../alterations";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const FURIE: HitSkill = {
    name: "Furie",
    description: "Augmente l'attaque du lanceur jusqu'à la fin du combat - Accumulable",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.FURIE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    power: 80,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 10,
    selfAlteration: {
        type: AlterationType.FURIE,
        stacks: 1,
        keepStacks: true
    }
}