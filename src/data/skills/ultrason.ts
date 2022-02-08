import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import {AlterationType} from "../alterations";

export const ULTRASON: ProjectileSkill = {
    name: "Ultrason",
    description: "Onde sonore rendant confus les Pokémon touchés",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.ULTRASON,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 4,
    projectileRadius: 8,
    pierceThrough: true,
    rotateProjectile: true,
    power: 0,
    hitAlteration: { type: AlterationType.CONFUSION, stacks: 30 },
    attackRange: 2,
    effectDelta: 8
}