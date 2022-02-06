import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import {AlterationType} from "../alterations";

export const DETRITUS: ProjectileSkill = {
    name: "Détritus",
    type: POKEMON_TYPES.POISON,
    effect: EFFECTS.DETRITUS,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 3,
    attackRange: 3,
    power: 30,
    hitAlteration: { type: AlterationType.POISON, stacks: 20 },
    hitEffect: EFFECTS.DETRITUS_HIT,
    projectileRadius: 6,
    rotateProjectile: true
}