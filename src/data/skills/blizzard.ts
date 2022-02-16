import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BLIZZARD: SpecialSkill = {
    name: "Blizzard",
    description: "Gèle tous les adversaires et fait tomber une pluie de grêlons dévastateurs",
    attackRange: 9,
    effect: EFFECTS.BLIZZARD,
    behavior: SkillBehavior.SPECIAL,
    power: 200,
    hitDelay: 100,
    type: POKEMON_TYPES.GLACE,
    triggerSpecial: "blizzard"
}