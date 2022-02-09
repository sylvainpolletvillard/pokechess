import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BROUILLARD: AOESkill = {
    name: "Brouillard",
    description: "Réduit la précision des adversaires autour du lanceur",
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
    effect: EFFECTS.BROUILLARD,
    effectPosition: "source_ground",
    effectDelta: 16,
    power: 0,
    hitDelay: 200,
    hitAlteration: {
        type: AlterationType.AVEUGLE,
        stacks: 50
    }
}