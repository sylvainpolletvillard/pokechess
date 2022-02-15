import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import {AlterationType} from "../alterations";

export const CROC_DE_MORT: HitSkill = {
    name: "Croc de Mort",
    description: "Puissante morsure qui apeure la cible pendant 3 secondes",
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.CROC_DE_MORT,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 200,
    hitAlteration: { type: AlterationType.PEUR, stacks: 30 },
    power: 250,
    rotateSprite: false,
    attackRange: 1,
    chargeDelta: 0
}