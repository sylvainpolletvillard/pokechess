import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const TUNNEL: SpecialSkill = {
    name: "Tunnel",
    description: "Creuse un tunnel vers une case libre du plateau, attaquant par le sol au passage",
    attackRange: 9,
    effect: EFFECTS.TUNNEL,
    behavior: SkillBehavior.SPECIAL,
    power: 100,
    type: POKEMON_TYPES.SOL,
    triggerSpecial: "tunnel",
    hitDelay: 500
}