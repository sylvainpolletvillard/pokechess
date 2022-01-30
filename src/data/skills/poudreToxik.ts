import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const POUDRE_TOXIK: AOESkill = {
    name: "Poudre Toxik",
    description: "Nuage de spores empoisonnant tous les adversaires autour",
    attackRange:1,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    type: POKEMON_TYPES.PLANTE,
    getTilesImpacted(attacker: PokemonOnBoard){
        let [i,j] = [attacker.x, attacker.y]
        const tiles: [number, number][] = [
            [i-1, j-1], [i, j-1], [i+1, j-1],
            [i-1, j], [i+1, j],
            [i-1, j+1], [i, j+1], [i+1, j+1]
        ]        
        return tiles.filter(([i,j]) => i>=0 && j>=0 && i<7 && j<8)
    },
    effect: EFFECTS.POUDRE_TOXIK,
    effectPosition: "source_ground",    
    power: 0,
    hitDelay: 400,
    hitAlteration: {
        type: AlterationType.POISON,
        stacks: 100
    }
}