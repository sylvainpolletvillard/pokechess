import { SkillBehavior, SpecialSkill} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";

export const LASER_GLACE: SpecialSkill = {
    name: "Laser Glace",
    description: "Gèle les adversaires un court instant sur une ligne droite",
    type: POKEMON_TYPES.GLACE,
    behavior: SkillBehavior.SPECIAL,
    attackRange: 1,
    power: 80,
    triggerSpecial: "laser_glace"
}