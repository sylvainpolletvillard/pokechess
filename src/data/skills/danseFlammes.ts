import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const DANSE_FLAMMES: AOESkill = {
    name: "Danse-Flammes",
    description: "Inflige des brûlures à tous les adversaires autour du lanceur",
    attackRange: 1,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    type: POKEMON_TYPES.FEU,
    getTilesImpacted(attacker: PokemonOnBoard){
        let [i,j] = [attacker.x, attacker.y]
        const tiles: [number, number][] = [
            [i-1, j-1], [i, j-1], [i+1, j-1],
            [i-1, j], [i+1, j],
            [i-1, j+1], [i, j+1], [i+1, j+1]
        ]        
        return tiles.filter(([i,j]) => i>=0 && j>=0 && i<7 && j<8)
    },
    effect: EFFECTS.DANSE_FLAMMES,
    effectPosition: "source_ground",
    effectDelta: 16,
    power: 50,
    hitDelay: 0,
    hitAlteration: {
        type: AlterationType.BRULURE,
        stacks: 60
    }
}