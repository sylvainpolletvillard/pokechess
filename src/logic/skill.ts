import {PokemonType} from "../data/types";
import {Effect} from "../data/effects";
import { Alteration } from "../data/alterations";
import { PokemonOnBoard } from "../objects/pokemon";


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
    hitDelay?: number
    effectOrigin: "source" | "target" | "target_ground";
    effectDelay?: number;
    rotateSprite: boolean;
    hitAlteration?: Alteration;
    chargeDelta?: number; // déplace l'attaquant, ex: charge
}

export interface SpecialSkill extends Skill {
    behavior: SkillBehavior.SPECIAL
    triggerSpecial: string;
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
    behavior: SkillBehavior.AREA_OF_EFFECT
    effectOrigin: "source" | "target" | "source_ground";
    getTilesImpacted: (attacker: PokemonOnBoard, target: PokemonOnBoard) => [number, number][]
    hitDelay: number
    hitAlteration?: Alteration;
}

export enum SkillBehavior {
    DIRECT_HIT,
    SPECIAL,
    PROJECTILE,
    AREA_OF_EFFECT
}