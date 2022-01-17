import { SpecialSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const REPOS: SpecialSkill = {
    name: "Repos",
    description: "S'endort et regagne une grosse partie de ses PV tant qu'il est endormi",
    attackRange: 9,    
    behavior: SkillBehavior.SPECIAL,
    power: 0,
    type: POKEMON_TYPES.NORMAL,
    selfAlteration: { type: AlterationType.REPOS, stacks: 100 }
}