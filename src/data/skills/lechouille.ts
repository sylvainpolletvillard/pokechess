import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import {AlterationType} from "../alterations";

export const LECHOUILLE: HitSkill = {
    name: "Léchouille",
    type: POKEMON_TYPES.SPECTRE,
    effect: EFFECTS.LECHOUILLE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 200,
    hitAlteration: { type: AlterationType.PARALYSIE, stacks: 20 },
    power: 35,
    rotateSprite: true,
    attackRange: 1
}