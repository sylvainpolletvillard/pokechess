import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const DARD_VENIN: ProjectileSkill = {
    name: "Dard-Venin",
    type: POKEMON_TYPES.POISON,
    effect: EFFECTS.DARD_VENIN,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 6,
    power: 15,
    projectileRadius: 2,
    hitEffect: EFFECTS.DARD_VENIN_HIT,
    hitAlteration: { type: AlterationType.POISON, stacks: 20 },
    rotateProjectile: true,
    attackRange: 2
}