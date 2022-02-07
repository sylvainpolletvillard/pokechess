import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const JET_PIERRES: ProjectileSkill = {
    name: "Jet-Pierres",
    type: POKEMON_TYPES.ROCHE,
    effect: EFFECTS.JET_PIERRES,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 6,
    power: 50,
    projectileRadius: 5,
    hitEffect: EFFECTS.JET_PIERRES_HIT,
    rotateProjectile: false,
    attackRange: 3
}