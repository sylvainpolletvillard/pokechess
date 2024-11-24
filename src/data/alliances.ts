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
	description: string;
	steps: AllianceBonusStep[];
};

export type AllianceBonusStep = {
	numberRequired: number;
	ref: string;
	description: string;
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
	description:
		"Les Pokémon Combat ne connaissent pas la peur et ont leurs stats augmentées avec le nombre d'adversaires les ciblant.",
	steps: [
		{
			numberRequired: 2,
			ref: "COMBAT2",
			description: "+5% ATK et DEF par adversaire",
		},
		{
			numberRequired: 4,
			ref: "COMBAT4",
			description: "+10% ATK et DEF par adversaire",
		},
		{
			numberRequired: 6,
			ref: "COMBAT6",
			description: "+20% ATK et DEF par adversaire",
		},
	],
};

const BONUS_ALLIANCE_DRAGON: AllianceBonus = {
	description:
		"Quand un Pokémon Dragon est le dernier Pokémon de l'équipe sur le plateau, il gagne de gros bonus à toutes ses statistiques.",
	steps: [
		{
			numberRequired: 1,
			ref: "DRAGON1",
			description: "+20% aux stats du dernier dragon",
		},
		{
			numberRequired: 2,
			ref: "DRAGON2",
			description: "+40% aux stats du dernier dragon",
		},
		{
			numberRequired: 3,
			ref: "DRAGON3",
			description: "+60% aux stats du dernier dragon",
		},
	],
};

const BONUS_ALLIANCE_EAU: AllianceBonus = {
	description:
		"Les Pokémon Eau sont insensibles aux Brûlures. Les compétences Eau peuvent repousser la cible d'une ou plusieurs cases.",
	steps: [
		{ numberRequired: 2, ref: "EAU2", description: "Repousse d'une case" },
		{ numberRequired: 4, ref: "EAU4", description: "Repousse de 2 cases" },
		{ numberRequired: 6, ref: "EAU6", description: "Repousse de 3 cases" },
	],
};

const BONUS_ALLIANCE_ELECTRIQUE: AllianceBonus = {
	description:
		"Les Pokémon Electrique gagnent en Vitesse et infligent des dégats électriques à chaque coup reçu au contact.",
	steps: [
		{
			numberRequired: 2,
			ref: "ELEC2",
			description: "+10% VIT ; 2 dégats par coup reçu",
		},
		{
			numberRequired: 4,
			ref: "ELEC4",
			description: "+20% VIT ; 4 dégats par coup reçu",
		},
		{
			numberRequired: 6,
			ref: "ELEC6",
			description: "+30% VIT ; 6 dégats par coup reçu",
		},
	],
};

const BONUS_ALLIANCE_FEE: AllianceBonus = {
	description:
		"Les Pokémon Fée font gagner progressivement des PP à toute votre équipe.",
	steps: [
		{ numberRequired: 1, ref: "FEE1", description: "+1 PP par seconde" },
		{ numberRequired: 2, ref: "FEE2", description: "+2 PP par seconde" },
		{ numberRequired: 3, ref: "FEE3", description: "+3 PP par seconde" },
	],
};

const BONUS_ALLIANCE_FEU: AllianceBonus = {
	description:
		"Les Pokémon Feu sont insensibles au Gel. Leurs attaques appliquent une brûlure qui inflige des dégâts sur la durée et réduit de 50% l'efficacité des soins.",
	steps: [
		{ numberRequired: 2, ref: "FEU2", description: "2 brûlures par attaque" },
		{ numberRequired: 4, ref: "FEU4", description: "3 brûlures par attaque" },
		{ numberRequired: 6, ref: "FEU6", description: "4 brûlures par attaque" },
	],
};

const BONUS_ALLIANCE_GLACE: AllianceBonus = {
	description:
		"Les Pokémon Glace sont entourés d'une aura de gel qui ralentit les adversaires des cases adjacentes.",
	steps: [
		{ numberRequired: 2, ref: "GLACE2", description: "-20% vitesse" },
		{ numberRequired: 3, ref: "GLACE3", description: "-30% vitesse" },
		{ numberRequired: 4, ref: "GLACE4", description: "-40% vitesse" },
	],
};

const BONUS_ALLIANCE_INSECTE: AllianceBonus = {
	description:
		"Les Pokémon Insecte grandissent et évoluent plus rapidement. Ils gagnent un bonus d'expérience à chaque combat.",
	steps: [
		{
			numberRequired: 2,
			ref: "INSECTE2",
			description: "+20% aux gains d'expérience",
		},
		{
			numberRequired: 4,
			ref: "INSECTE4",
			description: "+40% aux gains d'expérience",
		},
		{
			numberRequired: 6,
			ref: "INSECTE6",
			description: "+60% aux gains d'expérience",
		},
	],
};

const BONUS_ALLIANCE_NORMAL: AllianceBonus = {
	description:
		"Les Pokémon normaux réduisent les pénalités de dégâts reçus liés aux faiblesses de types.",
	steps: [
		{
			numberRequired: 2,
			ref: "NORMAL2",
			description: "-30% de dégâts de faiblesse reçus",
		},
		{
			numberRequired: 4,
			ref: "NORMAL4",
			description: "-60% de dégâts de faiblesse reçus",
		},
		{
			numberRequired: 6,
			ref: "NORMAL6",
			description: "-90% de dégâts de faiblesse reçus",
		},
	],
};

const BONUS_ALLIANCE_PLANTE: AllianceBonus = {
	description:
		"Les Pokémon Plante ne peuvent pas être repoussés par les compétences adverses et se regénèrent naturellement.",
	steps: [
		{
			numberRequired: 2,
			ref: "PLANTE2",
			description: "Regen 1% des HP max par seconde",
		},
		{
			numberRequired: 4,
			ref: "PLANTE4",
			description: "Regen 2% des HP max par seconde",
		},
		{
			numberRequired: 6,
			ref: "PLANTE6",
			description: "Regen 3% des HP max par seconde",
		},
	],
};

const BONUS_ALLIANCE_POISON: AllianceBonus = {
	description:
		"Les Pokémon Poison empoisonnent leurs cibles, infligeant des dégâts sur la durée proportionnels à leurs PV max.",
	steps: [
		{
			numberRequired: 2,
			ref: "POISON2",
			description: "Dégâts de poison infligés +40%",
		},
		{
			numberRequired: 4,
			ref: "POISON4",
			description: "Dégâts de poison infligés +80%",
		},
		{
			numberRequired: 6,
			ref: "POISON6",
			description: "Dégâts de poison infligés +120%",
		},
	],
};

const BONUS_ALLIANCE_PSY: AllianceBonus = {
	description:
		"Les Pokémon Psy sont insensibles à la Confusion, et leurs attaques font perdre des PP à leur cible.",
	steps: [
		{
			numberRequired: 2,
			ref: "PSY2",
			description: "La cible perd 2 PP par attaque",
		},
		{
			numberRequired: 4,
			ref: "PSY4",
			description: "La cible perd 4 PP par attaque",
		},
		{
			numberRequired: 6,
			ref: "PSY6",
			description: "La cible perd 6 PP par attaque",
		},
	],
};

const BONUS_ALLIANCE_ROCHE: AllianceBonus = {
	description:
		"Les Pokémon Roche réduisent les dégâts reçus liés aux altérations (poison, brûlure).",
	steps: [
		{
			numberRequired: 2,
			ref: "ROCHE2",
			description: "-30% dégats d'altération",
		},
		{
			numberRequired: 4,
			ref: "ROCHE4",
			description: "-60% dégats d'altération",
		},
		{
			numberRequired: 6,
			ref: "ROCHE6",
			description: "-90% dégats d'altération",
		},
	],
};

const BONUS_ALLIANCE_SOL: AllianceBonus = {
	description:
		"Les Pokémon Sol creusent un tunnel pour se protéger temporairement lorsqu'ils tombent sous un certain seuil de PV.",
	steps: [
		{ numberRequired: 2, ref: "SOL2", description: "Tunnel à 20% des PV" },
		{
			numberRequired: 4,
			ref: "SOL4",
			description: "Tunnel à 20% et 50% des PV",
		},
		{
			numberRequired: 6,
			ref: "SOL6",
			description: "Tunnel à 20%, 50% et 80% des PV",
		},
	],
};

const BONUS_ALLIANCE_SPECTRE: AllianceBonus = {
	description:
		"Les Pokémon Spectre ne peuvent pas être endormis et leurs attaques effrayent leur cible, réduisant leur attaque.",
	steps: [
		{
			numberRequired: 2,
			ref: "SPECTRE2",
			description: "2 stacks de Peur par attaque",
		},
		{
			numberRequired: 4,
			ref: "SPECTRE4",
			description: "4 stacks de Peur par attaque",
		},
		{
			numberRequired: 6,
			ref: "SPECTRE6",
			description: "6 stacks de Peur par attaque",
		},
	],
};

const BONUS_ALLIANCE_VOL: AllianceBonus = {
	description:
		"Les Pokémon Vol s'envolent à l'opposé du plateau au début du combat, et peuvent esquiver les attaques reçues.",
	steps: [
		{ numberRequired: 2, ref: "VOL2", description: "20% de chances d'esquive" },
		{ numberRequired: 4, ref: "VOL4", description: "40% de chances d'esquive" },
		{ numberRequired: 6, ref: "VOL6", description: "60% de chances d'esquive" },
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
