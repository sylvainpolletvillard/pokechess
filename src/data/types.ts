export interface PokemonType {
	ref: string;
	frameIndex: number;
}

export const TYPE_COMBAT: PokemonType = {
	ref: "COMBAT",
	frameIndex: 4,
};

export const TYPE_DRAGON: PokemonType = {
	ref: "DRAGON",
	frameIndex: 2,
};

export const TYPE_EAU: PokemonType = {
	ref: "EAU",
	frameIndex: 15,
};

export const TYPE_ELECTRIQUE: PokemonType = {
	ref: "ELECTRIQUE",
	frameIndex: 1,
};

export const TYPE_FEE: PokemonType = {
	ref: "FEE",
	frameIndex: 3,
};

export const TYPE_FEU: PokemonType = {
	ref: "FEU",
	frameIndex: 5,
};

export const TYPE_GLACE: PokemonType = {
	ref: "GLACE",
	frameIndex: 10,
};

export const TYPE_INSECTE: PokemonType = {
	ref: "INSECTE",
	frameIndex: 0,
};

export const TYPE_NORMAL: PokemonType = {
	ref: "NORMAL",
	frameIndex: 11,
};

export const TYPE_PLANTE: PokemonType = {
	ref: "PLANTE",
	frameIndex: 8,
};

export const TYPE_POISON: PokemonType = {
	ref: "POISON",
	frameIndex: 12,
};

export const TYPE_PSY: PokemonType = {
	ref: "PSY",
	frameIndex: 13,
};

export const TYPE_ROCHE: PokemonType = {
	ref: "ROCHE",
	frameIndex: 14,
};

export const TYPE_SOL: PokemonType = {
	ref: "SOL",
	frameIndex: 9,
};

export const TYPE_SPECTRE: PokemonType = {
	ref: "SPECTRE",
	frameIndex: 7,
};

export const TYPE_VOL: PokemonType = {
	ref: "VOL",
	frameIndex: 6,
};

export const POKEMON_TYPES = {
	[TYPE_COMBAT.ref]: TYPE_COMBAT,
	[TYPE_DRAGON.ref]: TYPE_DRAGON,
	[TYPE_EAU.ref]: TYPE_EAU,
	[TYPE_ELECTRIQUE.ref]: TYPE_ELECTRIQUE,
	[TYPE_FEE.ref]: TYPE_FEE,
	[TYPE_FEU.ref]: TYPE_FEU,
	[TYPE_GLACE.ref]: TYPE_GLACE,
	[TYPE_INSECTE.ref]: TYPE_INSECTE,
	[TYPE_NORMAL.ref]: TYPE_NORMAL,
	[TYPE_PLANTE.ref]: TYPE_PLANTE,
	[TYPE_POISON.ref]: TYPE_POISON,
	[TYPE_PSY.ref]: TYPE_PSY,
	[TYPE_ROCHE.ref]: TYPE_ROCHE,
	[TYPE_SOL.ref]: TYPE_SOL,
	[TYPE_SPECTRE.ref]: TYPE_SPECTRE,
	[TYPE_VOL.ref]: TYPE_VOL,
};

export type PokemonTypeRef = keyof typeof POKEMON_TYPES;

export const TABLE_TYPES = new Map([
	[
		TYPE_NORMAL,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 1],
			[TYPE_EAU, 1],
			[TYPE_PLANTE, 1],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 1],
			[TYPE_POISON, 1],
			[TYPE_SOL, 1],
			[TYPE_VOL, 1],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 1],
			[TYPE_ROCHE, 0.5],
			[TYPE_SPECTRE, 0.2],
			[TYPE_DRAGON, 1],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_FEU,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 0.5],
			[TYPE_EAU, 0.5],
			[TYPE_PLANTE, 2],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 2],
			[TYPE_COMBAT, 1],
			[TYPE_POISON, 1],
			[TYPE_SOL, 1],
			[TYPE_VOL, 1],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 2],
			[TYPE_ROCHE, 0.5],
			[TYPE_SPECTRE, 1],
			[TYPE_DRAGON, 0.5],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_EAU,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 2],
			[TYPE_EAU, 0.5],
			[TYPE_PLANTE, 0.5],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 1],
			[TYPE_POISON, 1],
			[TYPE_SOL, 2],
			[TYPE_VOL, 1],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 1],
			[TYPE_ROCHE, 2],
			[TYPE_SPECTRE, 1],
			[TYPE_DRAGON, 0.5],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_PLANTE,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 0.5],
			[TYPE_EAU, 2],
			[TYPE_PLANTE, 0.5],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 1],
			[TYPE_POISON, 0.5],
			[TYPE_SOL, 2],
			[TYPE_VOL, 0.5],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 0.5],
			[TYPE_ROCHE, 2],
			[TYPE_SPECTRE, 1],
			[TYPE_DRAGON, 0.5],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_ELECTRIQUE,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 1],
			[TYPE_EAU, 2],
			[TYPE_PLANTE, 0.5],
			[TYPE_ELECTRIQUE, 0.5],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 1],
			[TYPE_POISON, 1],
			[TYPE_SOL, 0.2],
			[TYPE_VOL, 2],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 1],
			[TYPE_ROCHE, 1],
			[TYPE_SPECTRE, 1],
			[TYPE_DRAGON, 0.5],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_GLACE,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 0.5],
			[TYPE_EAU, 0.5],
			[TYPE_PLANTE, 2],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 0.5],
			[TYPE_COMBAT, 1],
			[TYPE_POISON, 1],
			[TYPE_SOL, 2],
			[TYPE_VOL, 2],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 1],
			[TYPE_ROCHE, 1],
			[TYPE_SPECTRE, 1],
			[TYPE_DRAGON, 2],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_COMBAT,
		new Map([
			[TYPE_NORMAL, 2],
			[TYPE_FEU, 1],
			[TYPE_EAU, 1],
			[TYPE_PLANTE, 1],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 2],
			[TYPE_COMBAT, 1],
			[TYPE_POISON, 0.5],
			[TYPE_SOL, 1],
			[TYPE_VOL, 0.5],
			[TYPE_PSY, 0.5],
			[TYPE_INSECTE, 0.5],
			[TYPE_ROCHE, 2],
			[TYPE_SPECTRE, 0.2],
			[TYPE_DRAGON, 1],
			[TYPE_FEE, 0.5],
		]),
	],
	[
		TYPE_POISON,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 1],
			[TYPE_EAU, 1],
			[TYPE_PLANTE, 2],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 1],
			[TYPE_POISON, 0.5],
			[TYPE_SOL, 0.5],
			[TYPE_VOL, 1],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 1],
			[TYPE_ROCHE, 0.5],
			[TYPE_SPECTRE, 0.5],
			[TYPE_DRAGON, 1],
			[TYPE_FEE, 2],
		]),
	],
	[
		TYPE_SOL,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 2],
			[TYPE_EAU, 1],
			[TYPE_PLANTE, 0.5],
			[TYPE_ELECTRIQUE, 2],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 1],
			[TYPE_POISON, 2],
			[TYPE_SOL, 1],
			[TYPE_VOL, 0.2],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 0.5],
			[TYPE_ROCHE, 2],
			[TYPE_SPECTRE, 1],
			[TYPE_DRAGON, 1],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_VOL,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 1],
			[TYPE_EAU, 1],
			[TYPE_PLANTE, 2],
			[TYPE_ELECTRIQUE, 0.5],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 2],
			[TYPE_POISON, 1],
			[TYPE_SOL, 1],
			[TYPE_VOL, 1],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 2],
			[TYPE_ROCHE, 0.5],
			[TYPE_SPECTRE, 1],
			[TYPE_DRAGON, 1],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_PSY,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 1],
			[TYPE_EAU, 1],
			[TYPE_PLANTE, 1],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 2],
			[TYPE_POISON, 2],
			[TYPE_SOL, 1],
			[TYPE_VOL, 1],
			[TYPE_PSY, 0.5],
			[TYPE_INSECTE, 1],
			[TYPE_ROCHE, 1],
			[TYPE_SPECTRE, 1],
			[TYPE_DRAGON, 1],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_INSECTE,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 0.5],
			[TYPE_EAU, 1],
			[TYPE_PLANTE, 2],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 0.5],
			[TYPE_POISON, 0.5],
			[TYPE_SOL, 1],
			[TYPE_VOL, 0.5],
			[TYPE_PSY, 2],
			[TYPE_INSECTE, 1],
			[TYPE_ROCHE, 1],
			[TYPE_SPECTRE, 0.5],
			[TYPE_DRAGON, 1],
			[TYPE_FEE, 0.5],
		]),
	],
	[
		TYPE_ROCHE,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 2],
			[TYPE_EAU, 1],
			[TYPE_PLANTE, 1],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 2],
			[TYPE_COMBAT, 0.5],
			[TYPE_POISON, 1],
			[TYPE_SOL, 0.5],
			[TYPE_VOL, 2],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 2],
			[TYPE_ROCHE, 1],
			[TYPE_SPECTRE, 1],
			[TYPE_DRAGON, 1],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_SPECTRE,
		new Map([
			[TYPE_NORMAL, 0.5],
			[TYPE_FEU, 1],
			[TYPE_EAU, 1],
			[TYPE_PLANTE, 1],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 1],
			[TYPE_POISON, 1],
			[TYPE_SOL, 1],
			[TYPE_VOL, 1],
			[TYPE_PSY, 0.2],
			[TYPE_INSECTE, 1],
			[TYPE_ROCHE, 1],
			[TYPE_SPECTRE, 2],
			[TYPE_DRAGON, 1],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_DRAGON,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 1],
			[TYPE_EAU, 1],
			[TYPE_PLANTE, 1],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 1],
			[TYPE_POISON, 1],
			[TYPE_SOL, 1],
			[TYPE_VOL, 1],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 1],
			[TYPE_ROCHE, 1],
			[TYPE_SPECTRE, 1],
			[TYPE_DRAGON, 2],
			[TYPE_FEE, 1],
		]),
	],
	[
		TYPE_FEE,
		new Map([
			[TYPE_NORMAL, 1],
			[TYPE_FEU, 0.5],
			[TYPE_EAU, 1],
			[TYPE_PLANTE, 1],
			[TYPE_ELECTRIQUE, 1],
			[TYPE_GLACE, 1],
			[TYPE_COMBAT, 2],
			[TYPE_POISON, 0.5],
			[TYPE_SOL, 1],
			[TYPE_VOL, 1],
			[TYPE_PSY, 1],
			[TYPE_INSECTE, 1],
			[TYPE_ROCHE, 1],
			[TYPE_SPECTRE, 1],
			[TYPE_DRAGON, 2],
			[TYPE_FEE, 1],
		]),
	],
]);
