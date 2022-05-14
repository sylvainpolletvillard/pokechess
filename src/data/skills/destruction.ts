import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const DESTRUCTION: AOESkill = {
    name: "Destruction",
    description: "Autodestruction pulvérisant tout aux alentours",
    attackRange: 1,
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
    effect: EFFECTS.DESTRUCTION,
    power: 500,
    selfDamage: 99999,
    hitDelay: 50
}