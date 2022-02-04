import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import {AlterationType} from "../alterations";

export const JET_DE_SABLE: HitSkill = {
    name: "Jet de Sable",
    description: "Aveugle l'ennemi et réduit sa précision de 50% pendant 8 secondes",
    type: POKEMON_TYPES.SOL,
    effect: EFFECTS.JET_DE_SABLE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 100,
    effectPosition: "target",
    power: 10,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 4,
    hitAlteration: { type: AlterationType.AVEUGLE, stacks: 80 }
}