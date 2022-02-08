import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const FURIE: HitSkill = {
    name: "Furie",
    description: "Augmente l'attaque du lanceur jusqu'à la fin du combat - Accumulable",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.FURIE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    effectPosition: "target_ground",
    power: 80,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 10,
}