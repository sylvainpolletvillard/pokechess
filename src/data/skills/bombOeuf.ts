import { AOESkill, SkillBehavior } from "../../logic/skill";
import { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BOMB_OEUF: AOESkill = {
    name: "Bomb Oeuf",
    description: "Lance un oeuf explosif infligeant des dégâts dans une large zone",
    type: POKEMON_TYPES.NORMAL,
    attackRange: 4,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    getTilesImpacted(attacker: PokemonOnBoard, target: PokemonOnBoard){
        let [i,j] = [target.x, target.y]
        const tiles: [number, number][] = [
            [i-1, j-1], [i,j-1], [i+1, j-1],
            [i-1, j], [i,j], [i+1, j],
            [i-1, j+1], [i,j+1], [i+1, j+1],
        ]
        return tiles.filter(([i,j]) => i>=0 && j>=0 && i<7 && j<8)
    },
    power: 150,
    effect: EFFECTS.BOMB_OEUF,
    effectPosition: "parabolic_to_target",
    hitDelay: 1000,
    hitEffect: EFFECTS.BOMB_OEUF_HIT
}