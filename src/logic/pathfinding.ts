// @ts-ignore
import PF from "pathfinding";
import {BOARD_HEIGHT, BOARD_WIDTH, getPokemonOnTile, isOnBoard} from "./board";
import {PokemonOnBoard} from "../objects/pokemon";
import { gameState } from "./gamestate";
import { AlterationType } from "../data/alterations";
import { Direction, getDeltaFromDirection, getDirectionFromDelta } from "../utils/directions";

export function distanceBetweenPokemon(pkm1: PokemonOnBoard, pkm2: PokemonOnBoard): number {
    return Math.sqrt((pkm1.x - pkm2.x) ** 2 + (pkm1.y - pkm2.y) ** 2)
}

export function findClosestReachableTarget(pkm: PokemonOnBoard, targetsToExclude: PokemonOnBoard[] = []): PokemonOnBoard | null {
    let targets = pkm.opponents.filter(p => !targetsToExclude.includes(p))
    if(pkm.hasAlteration(AlterationType.CONFUSION)) targets = pkm.team.filter(p => p !== pkm)
    targets = targets.filter(candidate => !candidate.untargettable)

    if(targets.length === 0) return null;
    return targets.reduce((closest, enemy) => {
        return distanceBetweenPokemon(pkm, closest) < distanceBetweenPokemon(pkm, enemy) ? closest : enemy
    })
}

export function findPathToXY(pkm: PokemonOnBoard, target: PokemonOnBoard | null, x: number, y: number){
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

    return finder.findPath(pkm.x, pkm.y, x, y, grid)
}

export function findPathToTarget(pkm: PokemonOnBoard, target: PokemonOnBoard): PF.path {
    return findPathToXY(pkm, target, target.x, target.y)
}

export function findAnotherTarget(pokemon: PokemonOnBoard, targetsToExclude: PokemonOnBoard[]): PokemonOnBoard | null {
    const anotherTarget = findClosestReachableTarget(pokemon, targetsToExclude)
    if(anotherTarget === null) return null
    const path = findPathToTarget(pokemon, anotherTarget)
    if(path.length === 0) return findAnotherTarget(pokemon, [...targetsToExclude, anotherTarget]) // cant reach neither
    else return anotherTarget
}

export function tryToGetCloserToTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard): PF.path {
    let directionsInOrderOfPriority;
    switch(getDirectionFromDelta(target.x-pokemon.x, target.y-pokemon.y)){
        case Direction.DOWN: directionsInOrderOfPriority = [Direction.DOWN, Direction.LEFT, Direction.RIGHT, Direction.UP]
        case Direction.LEFT: directionsInOrderOfPriority = [Direction.LEFT, Direction.DOWN, Direction.UP, Direction.RIGHT]
        case Direction.UP: directionsInOrderOfPriority = [Direction.UP, Direction.LEFT, Direction.RIGHT, Direction.UP]
        case Direction.RIGHT: default: directionsInOrderOfPriority = [Direction.RIGHT, Direction.DOWN, Direction.UP, Direction.LEFT]
    }

    let distance = 1, currentDirection = 0, x, y;
    do {
        let delta = getDeltaFromDirection(directionsInOrderOfPriority[currentDirection]);
        [x,y] = [delta[0] * distance, delta[1] * distance]
        currentDirection++;
        if(currentDirection > directionsInOrderOfPriority.length){
            distance++;
            currentDirection = 0
        }
    } while(getPokemonOnTile(x,y) != null || !isOnBoard(x,y))

    return findPathToXY(pokemon, null, x, y)
}