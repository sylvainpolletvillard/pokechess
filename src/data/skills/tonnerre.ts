import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const TONNERRE: AOESkill = {
    name: "Tonnerre",
    description: "Inflige de gros dégâts électriques autour du lanceur",
    attackRange: 1,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    type: POKEMON_TYPES.ELECTRIQUE,
    getTilesImpacted(attacker: PokemonOnBoard){
        let [i,j] = [attacker.x, attacker.y]
        const tiles: [number, number][] = [
            [i-1, j-1], [i, j-1], [i+1, j-1],
            [i-1, j], [i+1, j],
            [i-1, j+1], [i, j+1], [i+1, j+1]
        ]        
        return tiles.filter(([i,j]) => i>=0 && j>=0 && i<7 && j<8)
    },
    effect: EFFECTS.TONNERRE,
    effectPosition: "source_ground",
    effectDelta: 16,
    power: 95,
    hitDelay: 250,
    triggerAlteration: {
        type: AlterationType.PARALYSIE,
        stacks: 10
    }
}