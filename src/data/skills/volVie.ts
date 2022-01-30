import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const VOL_VIE: HitSkill = {
    name: "Vol-Vie",
    type: POKEMON_TYPES.PLANTE,
    effect: EFFECTS.VOL_VIE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 400,
    effectDelay: 150,
    effectPosition: "target_to_source",
    chargeDelta: 0,
    power: 20,
    rotateSprite: true,
    selfAlteration: { type: AlterationType.SOIN, stacks: 10 },
    attackRange: 3
}