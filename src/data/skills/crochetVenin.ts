import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import {AlterationType} from "../alterations";

export const CROCHET_VENIN: HitSkill = {
    name: "Crochet Venin",
    type: POKEMON_TYPES.POISON,
    effect: EFFECTS.CROCHET_VENIN,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 150,
    hitAlteration: { type: AlterationType.POISON, stacks: 10 },
    power: 50,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 8,
}