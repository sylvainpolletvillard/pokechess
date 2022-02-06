import {AOESkill, SkillBehavior} from "../../logic/skill";
import {POKEMON_TYPES} from "../types";
import {EFFECTS} from "../effects";
import { AlterationType } from "../alterations";
import {PokemonOnBoard} from "../../objects/pokemon";

export const ACIDE: AOESkill = {
    name: "Acide",
    description: "Jet de suc gastrique réduisant fortement la défense des cibles",
    type: POKEMON_TYPES.POISON,
    attackRange: 3,
    behavior: SkillBehavior.AREA_OF_EFFECT,
    getTilesImpacted(attacker: PokemonOnBoard, target: PokemonOnBoard){
        let [i,j] = [target.x, target.y]
        const tiles: [number, number][] = [
            [i-1, j], [i,j], [i+1, j],
        ]
        return tiles.filter(([i,j]) => i>=0 && j>=0 && i<7 && j<8)
    },
    power: 40,
    effect: EFFECTS.ACIDE,
    effectPosition: "parabolic_to_target",
    hitDelay: 500,
    hitEffect: EFFECTS.ACIDE_HIT,
    hitAlteration: { type: AlterationType.ACIDE, stacks: 150 }
}