import {PokemonType} from "../data/types";
import {Effect} from "../data/effects";
import { Alteration } from "../data/alterations";

export interface Skill {
    type: PokemonType
    name: string
    description?: string
    effect: Effect;
    effectDelta?: number;
    effectDepth?: number;
    behavior: SkillBehavior;
    power: number;
    triggerAlteration?: Alteration;    
    attackRange: number;
}

export interface HitSkill extends Skill {
    behavior: SkillBehavior.DIRECT_HIT
    hitDelay: number
    effectOrigin: "source" | "target" | "ground";
    rotateSprite: boolean;
    hitAlteration?: Alteration;
}

export interface BuffSkill extends Skill {
    behavior: SkillBehavior.BUFF    
}

export interface ProjectileSkill extends Skill {
    behavior: SkillBehavior.PROJECTILE
    travelSpeed: number;
    hitEffect?: Effect;
    hitAlteration?: Alteration;
    rotateProjectile: boolean;
    pierceThrough?: boolean;
    projectileRadius: number;
}

export interface AOESkill extends Skill {
    behavior: SkillBehavior.AREA_OF_EFFECT,
    getTilesImpacted: () => [number, number][]
}

export enum SkillBehavior {
    DIRECT_HIT,
    BUFF,
    PROJECTILE,
    AREA_OF_EFFECT
}