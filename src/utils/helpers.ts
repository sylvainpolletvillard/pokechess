let timeouts: Set<number> = new Set();

export function wait(ms: number = 0): Promise<void>{
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            resolve()
            timeouts.delete(timeout)
        }, ms)
        timeouts.add(timeout)
    })
}

export function clearTimeouts(){
    timeouts.forEach(timeout => clearTimeout(timeout))
    timeouts.clear()
}

export function range(start: number, end: number) {
    return Array(end - start)
        .fill(0)
        .map((_, i) => start + i)
}

export function removeInArray(array: Array<any>, elem: any) {
    return array.splice(array.indexOf(elem), 1)
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

export function pickRandomIn(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)]
}

export function randomInt(start: number, end: number){
    return Math.floor(Math.random()*(end-start+1) + start)
}

export function promisify(fn: (...args: any[]) => any) {
    return (...args: any[]) => new Promise((resolve, reject) => {
        fn(...args, function(err: any, result: any){
            err ? reject(err) : resolve(result)
        })
    })
}

export function clamp(value: number, min: number, max: number){
    return value < min ? min : value > max ? max : value
}
export function isBetween(value: number, min: number, max:number){
    return value >= min && value <= max
}