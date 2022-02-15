import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const MORPHING: SpecialSkill = {
    name: "Morphing",
    description: "Se transforme en une copie du Pokémon cible - Garde le même niveau et objet",
    attackRange: 9,
    effect: EFFECTS.EVOLUTION,
    behavior: SkillBehavior.SPECIAL,
    power: 0,
    type: POKEMON_TYPES.NORMAL,
    triggerSpecial: "morphing",
    triggerSpecialDelay: 1000
}