import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const BULLES_D_O: ProjectileSkill = {
    name: "Bulles d'O",
    type: POKEMON_TYPES.EAU,
    effect: EFFECTS.BULLES_D_O,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 2,
    attackRange: 3,
    power: 4,
    projectileRadius: 8,
    rotateProjectile: false,
    hitEffect: EFFECTS.BULLES_D_O_HIT
}