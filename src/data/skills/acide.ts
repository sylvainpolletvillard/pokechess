import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const ACIDE: ProjectileSkill = {
    name: "Acide",
    description: "Jet de suc gastrique réduisant fortement la défense de la cible",
    type: POKEMON_TYPES.POISON,
    effect: EFFECTS.ACIDE,    
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 3,
    attackRange: 2,
    power: 40,
    projectileRadius: 8,
    rotateProjectile: false,
    hitEffect: EFFECTS.ACIDE_HIT,
    hitAlteration: { type: AlterationType.ACIDE, stacks: 80 }
}