import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const METRONOME: SpecialSkill = {
    name: "Métronome",
    description: "Déclenche une capacité aléatoire parmi toutes celles existantes",
    attackRange: 9,
    effect: EFFECTS.METRONOME,
    effectPosition: "source",
    effectDelta: 16,
    behavior: SkillBehavior.SPECIAL,
    power: 0,
    type: POKEMON_TYPES.NORMAL,
    triggerSpecial: "metronome"
}