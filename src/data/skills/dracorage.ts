import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const DRACORAGE: AOESkill = {
    name: "Draco-Rage",
    description: "Invoque une tempête qui inflige des dégâts bruts dans la zone",
    attackRange: 2,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    type: POKEMON_TYPES.DRAGON,
    getTilesImpacted(attacker: PokemonOnBoard, target){
        let [i,j] = [target.x, target.y]
        return [
            [i-1, j-1], [i, j-1], [i+1, j-1],
            [i-1, j], [i, j], [i+1, j],
            [i-1, j+1], [i, j+1], [i+1, j+1]
        ]
    },
    effect: EFFECTS.DRACORAGE,
    power: 0,
    hitDelay: 0,
    triggerAlteration: {
        type: AlterationType.DAMAGE_OVER_TIME,
        stacks: 30
    }
}