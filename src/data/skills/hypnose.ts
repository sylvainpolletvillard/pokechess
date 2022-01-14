import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const HYPNOSE: HitSkill = {
    name: "Hypnose",
    type: POKEMON_TYPES.PSY,
    effect: EFFECTS.HYPNOSE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 500,
    hitAlteration: { type: AlterationType.SOMMEIL, stacks: 100 },
    effectOrigin: "source",
    power: 0,
    rotateSprite: false,
    attackRange: 4
}