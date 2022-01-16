import { SkillBehavior, SpecialSkill} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const ECLAIR: SpecialSkill = {
    name: "Éclair",
    type: POKEMON_TYPES.ELECTRIQUE,
    behavior: SkillBehavior.SPECIAL,
    attackRange: 9,
    power: 250,
    effect: EFFECTS.ECLAIR,
    triggerSpecial: "eclair"
}