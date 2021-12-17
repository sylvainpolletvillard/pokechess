export enum Direction { UP = "UP", DOWN = "DOWN", LEFT = "LEFT", RIGHT = "RIGHT" }

export type DirectionalData = {
    [Direction.UP]: any,
    [Direction.DOWN]: any,
    [Direction.LEFT]: any,
    [Direction.RIGHT]: any
}

export function emptyDirectionalData(){
    return {
        [Direction.UP]: null,
        [Direction.DOWN]: null,
        [Direction.LEFT]: null,
        [Direction.RIGHT]: null
    }
}

export function getRotationAngle(dir: Direction){
    const q = Math.PI/2;
    return dir === Direction.DOWN ? q
        : dir === Direction.LEFT ? 2*q
            : dir === Direction.UP ? 3*q
                : 0
}

export function getDirectionFromDelta(dx: number, dy: number): Direction | null {
    return dy <= -1 ? Direction.UP
        : dy >= 1? Direction.DOWN
            : dx <= -1 ? Direction.LEFT
                : dx >= 1 ? Direction.RIGHT
                    : null;
}

export function getDirectionFromVector(vec: Phaser.Math.Vector2): Direction | null {
  return getDirectionFromDelta(vec.x, vec.y)
}

export function getDeltaFromDirection(dir: Direction): [number, number] {
    return dir === Direction.UP ? [0,-1]
        : dir === Direction.DOWN ? [0, 1]
            : dir === Direction.LEFT ? [-1 ,0]
                : dir === Direction.RIGHT ? [1 ,0]
                    : [0,0]
}