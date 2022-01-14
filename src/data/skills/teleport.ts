import { BuffSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const TELEPORT: BuffSkill = {
    name: "Teleport",
    description: "Téléporte le lanceur sur une case aléatoire du plateau",
    attackRange: 9,
    effect: EFFECTS.TELEPORT,
    behavior: SkillBehavior.BUFF,
    power: 0,
    type: POKEMON_TYPES.PSY,
    triggerSpecial: "teleport"
}