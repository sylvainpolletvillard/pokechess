import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const RUGISSEMENT: AOESkill = {
    name: "Rugissement",
    description: "Réduit temporairement l'attaque de tous les adversaires autour",
    attackRange:1,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    type: POKEMON_TYPES.NORMAL,
    getTilesImpacted(attacker: PokemonOnBoard){
        let [i,j] = [attacker.x, attacker.y]
        return [
            [i-1, j-1], [i, j-1], [i+1, j-1],
            [i-1, j], [i+1, j],
            [i-1, j+1], [i, j+1], [i+1, j+1]
        ]
    },
    effect: EFFECTS.RUGISSEMENT,
    power: 0,
    hitDelay: 50,
    hitAlteration: { type: AlterationType.RUGISSEMENT, stacks: 100 }
}