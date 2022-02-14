import { SkillBehavior, SpecialSkill} from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const JACKPOT: SpecialSkill = {
    name: "Jackpot",
    description: "A 50% de chance de vous rapporter une Pokéball",
    attackRange: 1,
    behavior: SkillBehavior.SPECIAL,
    type: POKEMON_TYPES.NORMAL,
    effect: EFFECTS.JACKPOT,
    effectPosition: "target_to_source",
    power: 0,
    triggerSpecial: "jackpot",
    triggerSpecialDelay: 250
}