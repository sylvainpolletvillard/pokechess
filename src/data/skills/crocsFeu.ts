import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const CROCS_FEU: HitSkill = {
    name: "Crocs de Feu",
    description: "Une morsure infligeant de grosses brulures",
    type: POKEMON_TYPES.FEU,
    effect: EFFECTS.CROCS_FEU,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 140,
    effectOrigin: "target",
    power: 100,
    hitAlteration: { type: AlterationType.BRULURE, stacks: 100 },
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 10,
}