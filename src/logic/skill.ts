import {PokemonType} from "../data/types";
import {Effect} from "../data/effects";
import {Pokemon} from "../data/pokemons";

export interface Skill {
    type: PokemonType
    name: string
    description?: string
    effect: Effect;
    behavior: SkillBehavior;
    power: number; 
    apply?: (source: Pokemon, target: Pokemon) => any
}

export interface HitSkill extends Skill {
    behavior: SkillBehavior.DIRECT_HIT
    hitDelay: number
    effectOrigin: "source" | "target";    
}

export interface DOTSkill extends Skill {
    behavior: SkillBehavior.DAMAGE_OVER_TIME
}

export interface ProjectileSkill extends Skill {
    behavior: SkillBehavior.PROJECTILE
    travelSpeed: number;
    hitEffect?: Effect;
    rotateProjectile?: boolean;
    pierceThrough?: boolean;
    projectileRadius: number;    
}

export interface AOESkill extends Skill {
    behavior: SkillBehavior.AREA_OF_EFFECT,
    getTilesImpacted: () => [number, number][]
}

export enum SkillBehavior {
    DIRECT_HIT,
    DAMAGE_OVER_TIME,
    PROJECTILE,
    AREA_OF_EFFECT
}