// @ts-ignore
import PF from "pathfinding";
import {Board, BOARD_HEIGHT, BOARD_WIDTH} from "./board";
import {PokemonOnBoard} from "../objects/pokemon";
import { gameState } from "./gamestate";
import { AlterationType } from "../data/alterations";

export function distanceBetweenPokemon(pkm1: PokemonOnBoard, pkm2: PokemonOnBoard): number {
    return Math.sqrt((pkm1.x - pkm2.x) ** 2 + (pkm1.y - pkm2.y) ** 2)
}

export function findClosestReachableTarget(pkm: PokemonOnBoard): PokemonOnBoard | null {
    let targets = pkm.opponents
    if(pkm.hasAlteration(AlterationType.CONFUSION)) targets = pkm.team.filter(p => p !== pkm)
    targets = targets.filter(candidate => !candidate.untargettable)

    if(targets.length === 0) return null;
    return targets.reduce((closest, enemy) => {
        return distanceBetweenPokemon(pkm, closest) < distanceBetweenPokemon(pkm, enemy) ? closest : enemy
    })
}

export function findPathToTarget(pkm: PokemonOnBoard, target: PokemonOnBoard, board: Board): PF.path {
    //Walkability matrix. Zero is walkable, One is not
    const grid = new PF.Grid(BOARD_WIDTH, BOARD_HEIGHT);
    const solidEntities = gameState.allPokemonsOnBoard
    for(let entity of solidEntities){
        if(entity !== pkm && entity !== target){
            grid.setWalkableAt(entity.x, entity.y, false);
        }
    }
    const finder = new PF.AStarFinder({
        //allowDiagonal: true,
        //dontCrossCorners: true
    });

    return finder.findPath(pkm.x, pkm.y, target.x, target.y, grid)
}