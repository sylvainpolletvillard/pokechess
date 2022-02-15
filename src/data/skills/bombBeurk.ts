import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BOMB_BEURK: AOESkill = {
    name: "Bomb Beurk",
    description: "Bombe toxique empoisonnant la zone où elle tombe",
    type: POKEMON_TYPES.POISON,
    attackRange: 4,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    getTilesImpacted(attacker: PokemonOnBoard, target: PokemonOnBoard){
        let [i,j] = [target.x, target.y]
        const tiles: [number, number][] = [
            [i-1, j], [i,j], [i+1, j],
        ]
        return tiles.filter(([i,j]) => i>=0 && j>=0 && i<7 && j<8)
    },
    power: 80,
    effect: EFFECTS.BOMB_BEURK,
    hitDelay: 750,
    hitEffect: EFFECTS.BOMB_BEURK_HIT,
    hitAlteration: { type: AlterationType.POISON, stacks: 80 }
}