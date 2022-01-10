import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const ECLATS_GLACE: ProjectileSkill = {
    name: "Eclats Glace",
    type: POKEMON_TYPES.GLACE,
    effect: EFFECTS.ECLATS_GLACE,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 5,
    attackRange: 3,
    power: 5,
    projectileRadius: 7,    
    rotateProjectile: true
}