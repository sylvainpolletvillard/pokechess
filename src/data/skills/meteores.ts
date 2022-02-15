import { ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const METEORES: ProjectileSkill = {
    name: "Météores",
    description: "Une pluie d'étoiles qui touche à tous les coups",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.METEORES,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 4,
    projectileRadius: 8,
    pierceThrough: true,
    rotateProjectile: true,
    power: 50,
    precision: 10,
    attackRange: 9    
}