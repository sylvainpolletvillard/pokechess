import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const BULLES_D_O: ProjectileSkill = {
    name: "Bulles d'O",
    type: POKEMON_TYPES.EAU,
    effect: EFFECTS.WATER_BUBBLE_2,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 2,
    power: 4,
    projectileRadius: 8,
    rotateProjectile: false,
    hitEffect: EFFECTS.WATER_BUBBLE_2_HIT
}