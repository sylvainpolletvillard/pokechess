import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BALAYAGE: AOESkill = {
    name: "Balayage",
    description: "Attaque large pouvant toucher jusqu'à 3 adversaires en face",
    attackRange: 1,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    type: POKEMON_TYPES.COMBAT,
    getTilesImpacted(attacker: PokemonOnBoard, target: PokemonOnBoard){
        let [i,j] = [target.x, target.y]
        const tiles: [number, number][] =
            target.x === attacker.x
                ? [ [i-1, j], [i, j], [i+1, j] ] // horizontal slash
                : [ [i, j-1], [i, j], [i, j+1] ] // vertical slash

        return tiles.filter(([i,j]) => i>=0 && j>=0 && i<7 && j<8)
    },
    effect: EFFECTS.BROUILLARD,
    effectPosition: "source",
    effectDelta: 12,
    power: 100,
    hitDelay: 100,
    rotateSprite: true
}