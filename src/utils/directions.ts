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
    return getDirectionFromVector(new Phaser.Math.Vector2(dx,dy))
}

export function getDirectionFromVector(vec: Phaser.Math.Vector2): Direction | null {
  if(vec.length() === 0) return null
  const angle = vec.angle(), q = Math.PI/4;
  if(angle >= 0 && angle < 1*q) return Direction.RIGHT
  if(angle >= 1*q && angle < 3*q) return Direction.DOWN
  if(angle >= 3*q && angle < 5*q) return Direction.LEFT
  if(angle >= 5*q && angle < 7*q) return Direction.UP
  if(angle >= 7*q && angle < 8*q) return Direction.RIGHT
  return null
}

export function getDirectionFromAngle(angle: number): Direction {
    let tour = Math.PI * 2, eight = Math.PI/4;
    angle = (angle + tour) % tour;

    if(angle > eight && angle < 3 * eight) return Direction.UP
    if(angle > 3* eight && angle < 5 * eight) return Direction.LEFT
    if(angle > 5 * eight && angle < 7 * eight) return Direction.DOWN
    return Direction.RIGHT    
}

export function getDeltaFromDirection(dir: Direction): [number, number] {
    return dir === Direction.UP ? [0,-1]
        : dir === Direction.DOWN ? [0, 1]
            : dir === Direction.LEFT ? [-1 ,0]
                : dir === Direction.RIGHT ? [1 ,0]
                    : [0,0]
}