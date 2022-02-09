import { ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const SURF: ProjectileSkill = {
    name: "Surf",
    description: "Une vague balayant tout sur son passage",
    type: POKEMON_TYPES.EAU,
    effect: EFFECTS.SURF,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 4,
    projectileRadius: 16,
    pierceThrough: true,
    rotateProjectile: true,
    power: 100,
    attackRange: 9    
}