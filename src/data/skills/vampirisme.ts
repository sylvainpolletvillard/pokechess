import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const VAMPIRISME: HitSkill = {
    name: "Vampirisme",
    type: POKEMON_TYPES.INSECTE,
    effect: EFFECTS.VAMPIRISME,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 150,
    effectDelay: 150,
    effectOrigin: "source",
    chargeDelta: 0,
    power: 20,
    rotateSprite: true,
    selfAlteration: { type: AlterationType.SOIN, stacks: 10 },
    attackRange: 1
}