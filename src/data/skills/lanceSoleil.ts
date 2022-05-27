import { ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const LANCE_SOLEIL: ProjectileSkill = {
    name: "Lance-Soleil",
    description: `Absorbe l'énergie solaire puis la relâche en un puissant orbe`,
    type: POKEMON_TYPES.PLANTE,
    effect: EFFECTS.LANCE_SOLEIL,
    behavior: SkillBehavior.PROJECTILE,
    power: 120,
    travelSpeed: 2,
    pierceThrough: true,
    projectileRadius: 8,
    hitAlteration: {
        type: AlterationType.BRULURE,
        stacks: 10
    },
    rotateProjectile: false,
    attackRange: 4
}