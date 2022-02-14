import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const ECLATS_GLACE: ProjectileSkill = {
    name: "Eclats Glace",
    type: POKEMON_TYPES.GLACE,
    effect: EFFECTS.ECLATS_GLACE,
    hitEffect: EFFECTS.ECLATS_GLACE_HIT,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 5,
    attackRange: 1,
    power: 40,
    projectileRadius: 7,    
    rotateProjectile: true
}