import { ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const DRACOCHARGE: ProjectileSkill = {
    name: "Dracocharge",
    type: POKEMON_TYPES.DRAGON,
    effect: EFFECTS.DRACOCHARGE,
    hitEffect: EFFECTS.BULLES_D_O_HIT,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 8,
    projectileRadius: 6,
    rotateProjectile: true,
    power: 70,
    attackRange: 3
}