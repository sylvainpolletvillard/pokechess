const timeouts: Set<number> = new Set();

export function wait(ms = 0): Promise<void> {
	return new Promise((resolve) => {
		const timeout = setTimeout(() => {
			resolve();
			timeouts.delete(timeout);
		}, ms);
		timeouts.add(timeout);
	});
}

export function defer(callback: () => void): Promise<void> {
	return Promise.resolve().then(callback);
}

export function clearTimeouts() {
	timeouts.forEach((timeout) => clearTimeout(timeout));
	timeouts.clear();
}

export function sum(...array: number[]): number {
	return array.reduce((a, b) => a + b, 0);
}

export function range(start: number, end: number): number[] {
	return Array(end - start)
		.fill(0)
		.map((_, i) => start + i);
}

export function removeInArray<T>(array: T[], elem: T): T[] {
	return array.splice(array.indexOf(elem), 1);
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export function shuffleArray(array: Array<any>) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

export function splitInGroups(array: Array<any>, nb: number) {
	return Array(Math.ceil(array.length / nb))
		.fill("")
		.map((v, i) => array.slice(nb * i, nb * (i + 1)));
}

export function pickRandomIn<T>(array: Array<T>): T {
	return array[Math.floor(Math.random() * array.length)];
}

export function pickNRandomIn<T>(array: Array<T>, number = 1): Array<T> {
	let selection = [],
		options = [...array],
		nbSelected = 0;
	while (nbSelected < number && options.length > 0) {
		const rand = Math.floor(Math.random() * options.length);
		selection.push(options[rand]);
		options.splice(rand, 1);
		nbSelected++;
	}
	return selection;
}

export function ponderatedRandomIn<T>(
	array: Array<T>,
	ponderator: (elem: T) => number,
) {
	const weights = array.map(ponderator);
	const sumWeights = sum(...weights);
	const rand = Math.random() * sumWeights;
	for (let i = 0, w = 0; i < weights.length; i++) {
		w += weights[i];
		if (rand < w) return array[i];
	}
	return array[array.length - 1];
}

export function randomInt(start: number, end: number) {
	return Math.floor(Math.random() * (end - start + 1) + start);
}

export function promisify(fn: (...args: any[]) => any) {
	return (...args: any[]) =>
		new Promise((resolve, reject) => {
			fn(...args, (err: any, result: any) => {
				err ? reject(err) : resolve(result);
			});
		});
}

export function clamp(value: number, min: number, max: number): number {
	return value < min ? min : value > max ? max : value;
}

export function isBetween(value: number, min: number, max: number): boolean {
	return value >= min && value <= max;
}

export function closest(value: number, propositions: number[]): number {
	return propositions.sort(
		(a, b) => Math.abs(a - value) - Math.abs(b - value),
	)[0];
}

export function arrayEquals(a: any[], b: any[]): boolean {
	return (
		a.length === b.length && a.every((val: any, i: number) => b[i] === val)
	);
}
