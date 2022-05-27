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
        return target.x === attacker.x
                ? [ [i-1, j], [i, j], [i+1, j] ] // horizontal slash
                : [ [i, j-1], [i, j], [i, j+1] ] // vertical slash
    },
    effect: EFFECTS.BALAYAGE,
    power: 100,
    hitDelay: 100,
    rotateSprite: true
}