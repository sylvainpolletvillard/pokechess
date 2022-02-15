import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";

export const LANCE_FLAMMES: HitSkill = {
    name: "Lance-Flammes",
    description: "Jet de flammes infligeant de grosses brulures à la cible",
    type: POKEMON_TYPES.FEU,
    effect: EFFECTS.LANCE_FLAMMES,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 300,
    triggerAlteration: { type: AlterationType.BRULURE, stacks: 100 },
    power: 200,
    rotateSprite: true,
    attackRange: 1
}