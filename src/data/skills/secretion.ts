import {ProjectileSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";
import { Z } from "../depths";

export const SECRETION: ProjectileSkill = {
    name: "Sécrétion",
    description: "Réduit la vitesse de l'adversaire",
    type: POKEMON_TYPES.INSECTE,
    effect: EFFECTS.SECRETION,
    effectDepth: Z.SKILL_EFFECT_ABOVE_POKEMON,
    behavior: SkillBehavior.PROJECTILE,
    travelSpeed: 4,
    attackRange: 4,
    power: 50,
    projectileRadius: 3,
    rotateProjectile: true,
    hitEffect: EFFECTS.SECRETION_HIT,
    hitAlteration: {
        type: AlterationType.SECRETION,
        stacks: 100
    },    
}