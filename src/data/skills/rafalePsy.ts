import { ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const RAFALE_PSY: ProjectileSkill = {
    name: "Rafale Psy",
    description: "Vague d'énergie Psy traversant les adversaires",
    type: POKEMON_TYPES.PSY,
    effect: EFFECTS.RAFALE_PSY,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 6,
    projectileRadius: 16,
    pierceThrough: true,
    rotateProjectile: true,
    power: 100,
    attackRange: 4
}