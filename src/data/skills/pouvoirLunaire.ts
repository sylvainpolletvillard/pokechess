import {HitSkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";

export const POUVOIR_LUNAIRE: HitSkill = {
    name: "Pouvoir Lunaire",
    description: "Inflige des dégâts de type Fée à une cible à distance",
    type: POKEMON_TYPES.FEE,
    effect: EFFECTS.POUVOIR_LUNAIRE,
    behavior: SkillBehavior.DIRECT_HIT,
    hitDelay: 200,
    effectPosition: "target_ground",
    effectDelta: 16,
    power: 120,
    rotateSprite: false,
    attackRange: 4
}