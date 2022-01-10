import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const PISTOLET_A_O: ProjectileSkill = {
    name: "Pistolet à O",
    type: POKEMON_TYPES.EAU,
    effect: EFFECTS.PISTOLET_A_O,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 3,
    power: 3,
    projectileRadius: 3,
    hitEffect: EFFECTS.PISTOLET_A_O_HIT,
    rotateProjectile: false,
    attackRange: 3
}