import {Path} from "../model/destination";

export function getPathLength(path: Path){
    let length = 0
    for(let step of path){
        const [dx, dy] = step;
        length += Math.abs(dx) + Math.abs(dy)
    }
    return length
}
