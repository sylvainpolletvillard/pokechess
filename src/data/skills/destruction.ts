import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
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
        const tiles: [number, number][] = [
            [i-1, j-1], [i, j-1], [i+1, j-1],
            [i-1, j], [i+1, j],
            [i-1, j+1], [i, j+1], [i+1, j+1]
        ]        
        return tiles.filter(([i,j]) => i>=0 && j>=0 && i<7 && j<8)
    },
    effect: EFFECTS.DESTRUCTION,
    effectPosition: "source_ground",
    effectDelta: 16,
    power: 300,
    selfDamage: 99999,
    hitDelay: 50
}