import {
	type PokemonType,
	type PokemonTypeRef,
	TYPE_COMBAT,
	TYPE_DRAGON,
	TYPE_EAU,
	TYPE_ELECTRIQUE,
	TYPE_FEE,
	TYPE_FEU,
	TYPE_GLACE,
	TYPE_INSECTE,
	TYPE_NORMAL,
	TYPE_PLANTE,
	TYPE_POISON,
	TYPE_PSY,
	TYPE_ROCHE,
	TYPE_SOL,
	TYPE_SPECTRE,
	TYPE_VOL,
} from "./types";

export type AllianceBonus = {
	steps: AllianceBonusStep[];
};

export type AllianceBonusStep = {
	numberRequired: number;
	ref: string;
};

export type AllianceState = {
	ref?: string;
	type: PokemonType;
	steps: AllianceBonusStep[];
	stepReached: AllianceBonusStep | null;
	stepReachedN: number;
	numberOfThatTypeInTeam: number;
};

const BONUS_ALLIANCE_COMBAT: AllianceBonus = {
	steps: [
		{
			numberRequired: 2,
			ref: "COMBAT2",
		},
		{
			numberRequired: 4,
			ref: "COMBAT4",
		},
		{
			numberRequired: 6,
			ref: "COMBAT6",
		},
	],
};

const BONUS_ALLIANCE_DRAGON: AllianceBonus = {
	steps: [
		{
			numberRequired: 1,
			ref: "DRAGON1",
		},
		{
			numberRequired: 2,
			ref: "DRAGON2",
		},
		{
			numberRequired: 3,
			ref: "DRAGON3",
		},
	],
};

const BONUS_ALLIANCE_EAU: AllianceBonus = {
	steps: [
		{ numberRequired: 2, ref: "EAU2" },
		{ numberRequired: 4, ref: "EAU4" },
		{ numberRequired: 6, ref: "EAU6" },
	],
};

const BONUS_ALLIANCE_ELECTRIQUE: AllianceBonus = {
	steps: [
		{
			numberRequired: 2,
			ref: "ELEC2",
		},
		{
			numberRequired: 4,
			ref: "ELEC4",
		},
		{
			numberRequired: 6,
			ref: "ELEC6",
		},
	],
};

const BONUS_ALLIANCE_FEE: AllianceBonus = {
	steps: [
		{ numberRequired: 1, ref: "FEE1" },
		{ numberRequired: 2, ref: "FEE2" },
		{ numberRequired: 3, ref: "FEE3" },
	],
};

const BONUS_ALLIANCE_FEU: AllianceBonus = {
	steps: [
		{ numberRequired: 2, ref: "FEU2" },
		{ numberRequired: 4, ref: "FEU4" },
		{ numberRequired: 6, ref: "FEU6" },
	],
};

const BONUS_ALLIANCE_GLACE: AllianceBonus = {
	steps: [
		{ numberRequired: 2, ref: "GLACE2" },
		{ numberRequired: 3, ref: "GLACE3" },
		{ numberRequired: 4, ref: "GLACE4" },
	],
};

const BONUS_ALLIANCE_INSECTE: AllianceBonus = {
	steps: [
		{
			numberRequired: 2,
			ref: "INSECTE2",
		},
		{
			numberRequired: 4,
			ref: "INSECTE4",
		},
		{
			numberRequired: 6,
			ref: "INSECTE6",
		},
	],
};

const BONUS_ALLIANCE_NORMAL: AllianceBonus = {
	steps: [
		{
			numberRequired: 2,
			ref: "NORMAL2",
		},
		{
			numberRequired: 4,
			ref: "NORMAL4",
		},
		{
			numberRequired: 6,
			ref: "NORMAL6",
		},
	],
};

const BONUS_ALLIANCE_PLANTE: AllianceBonus = {
	steps: [
		{
			numberRequired: 2,
			ref: "PLANTE2",
		},
		{
			numberRequired: 4,
			ref: "PLANTE4",
		},
		{
			numberRequired: 6,
			ref: "PLANTE6",
		},
	],
};

const BONUS_ALLIANCE_POISON: AllianceBonus = {
	steps: [
		{
			numberRequired: 2,
			ref: "POISON2",
		},
		{
			numberRequired: 4,
			ref: "POISON4",
		},
		{
			numberRequired: 6,
			ref: "POISON6",
		},
	],
};

const BONUS_ALLIANCE_PSY: AllianceBonus = {
	steps: [
		{
			numberRequired: 2,
			ref: "PSY2",
		},
		{
			numberRequired: 4,
			ref: "PSY4",
		},
		{
			numberRequired: 6,
			ref: "PSY6",
		},
	],
};

const BONUS_ALLIANCE_ROCHE: AllianceBonus = {
	steps: [
		{
			numberRequired: 2,
			ref: "ROCHE2",
		},
		{
			numberRequired: 4,
			ref: "ROCHE4",
		},
		{
			numberRequired: 6,
			ref: "ROCHE6",
		},
	],
};

const BONUS_ALLIANCE_SOL: AllianceBonus = {
	steps: [
		{ numberRequired: 2, ref: "SOL2" },
		{
			numberRequired: 4,
			ref: "SOL4",
		},
		{
			numberRequired: 6,
			ref: "SOL6",
		},
	],
};

const BONUS_ALLIANCE_SPECTRE: AllianceBonus = {
	steps: [
		{
			numberRequired: 2,
			ref: "SPECTRE2",
		},
		{
			numberRequired: 4,
			ref: "SPECTRE4",
		},
		{
			numberRequired: 6,
			ref: "SPECTRE6",
		},
	],
};

const BONUS_ALLIANCE_VOL: AllianceBonus = {
	steps: [
		{ numberRequired: 2, ref: "VOL2" },
		{ numberRequired: 4, ref: "VOL4" },
		{ numberRequired: 6, ref: "VOL6" },
	],
};

export const ALLIANCES: { [type: PokemonTypeRef]: AllianceBonus } = {
	[TYPE_COMBAT.ref]: BONUS_ALLIANCE_COMBAT,
	[TYPE_DRAGON.ref]: BONUS_ALLIANCE_DRAGON,
	[TYPE_EAU.ref]: BONUS_ALLIANCE_EAU,
	[TYPE_ELECTRIQUE.ref]: BONUS_ALLIANCE_ELECTRIQUE,
	[TYPE_FEE.ref]: BONUS_ALLIANCE_FEE,
	[TYPE_FEU.ref]: BONUS_ALLIANCE_FEU,
	[TYPE_GLACE.ref]: BONUS_ALLIANCE_GLACE,
	[TYPE_INSECTE.ref]: BONUS_ALLIANCE_INSECTE,
	[TYPE_NORMAL.ref]: BONUS_ALLIANCE_NORMAL,
	[TYPE_PLANTE.ref]: BONUS_ALLIANCE_PLANTE,
	[TYPE_POISON.ref]: BONUS_ALLIANCE_POISON,
	[TYPE_PSY.ref]: BONUS_ALLIANCE_PSY,
	[TYPE_ROCHE.ref]: BONUS_ALLIANCE_ROCHE,
	[TYPE_SOL.ref]: BONUS_ALLIANCE_SOL,
	[TYPE_SPECTRE.ref]: BONUS_ALLIANCE_SPECTRE,
	[TYPE_VOL.ref]: BONUS_ALLIANCE_VOL,
};
