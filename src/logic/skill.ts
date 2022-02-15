import {PokemonType} from "../data/types";
import {Effect} from "../data/effects";
import { Alteration } from "../data/alterations";
import { PokemonOnBoard } from "../objects/pokemon";

export interface Skill {
    type: PokemonType
    name: string
    description?: string
    effect?: Effect;
    hitDelay?: number
    hitEffect?: Effect;
    hitAlteration?: Alteration;
    rotateSprite?: boolean;
    behavior: SkillBehavior;
    power: number;
    selfDamage?: number;
    triggerAlteration?: Alteration;
    selfAlteration?: Alteration;
    attackRange: number;
    precision?: number;
}

export interface HitSkill extends Skill {
    behavior: SkillBehavior.DIRECT_HIT
    chargeDelta?: number; // déplace l'attaquant, ex: charge
}

export interface SpecialSkill extends Skill {
    behavior: SkillBehavior.SPECIAL
    triggerSpecial?: string;
    triggerSpecialDelay?: number
}

export interface ProjectileSkill extends Skill {
    behavior: SkillBehavior.PROJECTILE
    travelSpeed: number;
    rotateProjectile: boolean;
    pierceThrough?: boolean;
    projectileRadius: number;
}

export interface AOESkill extends Skill {
    behavior: SkillBehavior.AREA_OF_EFFECT
    getTilesImpacted: (attacker: PokemonOnBoard, target: PokemonOnBoard) => [number, number][]
}

export enum SkillBehavior {
    DIRECT_HIT,
    SPECIAL,
    PROJECTILE,
    AREA_OF_EFFECT
}