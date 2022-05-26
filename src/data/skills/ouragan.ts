import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import {AlterationType} from "../alterations";

export const OURAGAN: ProjectileSkill = {
    name: "Ouragan",
    description: `Une tornade soulevant tous les adversaires sur son passage`,
    type: POKEMON_TYPES.DRAGON,
    effect: EFFECTS.OURAGAN,
    behavior: SkillBehavior.PROJECTILE,
    power: 120,
    travelSpeed: 2,
    pierceThrough: true,
    projectileRadius: 8,
    rotateProjectile: false,
    attackRange: 4,
    hitAlteration: { type: AlterationType.TOURBILLON, stacks: 15 }
}