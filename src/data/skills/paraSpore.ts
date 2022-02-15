import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const PARASPORE: AOESkill = {
    name: "Poudre Toxik",
    description: "Nuage de spores qui paralyse tous les adversaires autour du lanceur",
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
    effect: EFFECTS.PARASPORE,
    power: 0,
    hitDelay: 300,
    hitAlteration: {
        type: AlterationType.PARALYSIE,
        stacks: 100
    }
}