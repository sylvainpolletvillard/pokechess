// @ts-ignore
import PF from "pathfinding";
import {Board} from "./board";
import {PokemonOnBoard} from "../objects/pokemon";
import { gameState } from "./gamestate";
import { canPokemonBeTargeted } from "./alteration";

export function distanceBetweenPokemon(pkm1: PokemonOnBoard, pkm2: PokemonOnBoard): number {
    return Math.sqrt((pkm1.x - pkm2.x) ** 2 + (pkm1.y - pkm2.y) ** 2)
}

export function findClosestReachableTarget(pkm: PokemonOnBoard): PokemonOnBoard | null {
    const board = gameState.board;
    const targets = (pkm.owner === 1 ? board.otherTeam : board.playerTeam)
        .filter(candidate => canPokemonBeTargeted(candidate))

    if(targets.length === 0) return null;
    return targets.reduce((closest, enemy) => {
        return distanceBetweenPokemon(pkm, closest) < distanceBetweenPokemon(pkm, enemy) ? closest : enemy
    })
}

export function findPathToTarget(pkm: PokemonOnBoard, target: PokemonOnBoard, board: Board): PF.path {
    //Walkability matrix. Zero is walkable, One is not
    const grid = new PF.Grid(board.width,board.height);
    const solidEntities = [ ...board.playerTeam, ...board.otherTeam ]
    for(let entity of solidEntities){
        if(entity !== pkm && entity !== target){
            grid.setWalkableAt(entity.x, entity.y, false);
        }
    }
    const finder = new PF.AStarFinder({
        //allowDiagonal: true,
        dontCrossCorners: true
    });

    return finder.findPath(pkm.x, pkm.y, target.x, target.y, grid)
}