import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const PILONNAGE: ProjectileSkill = {
    name: "Pilonnage",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.PILONNAGE,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 6,
    power: 30,
    projectileRadius: 6,
    hitEffect: EFFECTS.CHARGE_HIT,    
    rotateProjectile: true,
    attackRange: 4
}