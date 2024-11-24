import { nanoid } from "nanoid";

import type { Skill } from "../logic/skill";
import { POKEBALLS, POKEBALL_COSTS } from "./pokeballs";
import {
	type PokemonType,
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

import { levelToXP, xpToLevel } from "../logic/xp";
import type { PokemonOnBoard } from "../objects/pokemon";
import { ABO } from "./pokemons/abo";
import { ABRA } from "./pokemons/abra";
import { AEROMITE } from "./pokemons/aeromite";
import { AKWAKWAK } from "./pokemons/akwakwak";
import { ALAKAZAM } from "./pokemons/alakazam";
import { AMONISTAR } from "./pokemons/amonistar";
import { AMONITA } from "./pokemons/amonita";
import { AQUALI } from "./pokemons/aquali";
import { ARBOK } from "./pokemons/arbok";
import { ARCANIN } from "./pokemons/arcanin";
import { ARTIKODIN } from "./pokemons/artikodin";
import { ASPICOT } from "./pokemons/aspicot";
import { BOUSTIFLOR } from "./pokemons/boustiflor";
import { BULBIZARRE } from "./pokemons/bulbizarre";
import { CANARTICHO } from "./pokemons/canarticho";
import { CANINOS } from "./pokemons/caninos";
import { CARABAFFE } from "./pokemons/carabaffe";
import { CARAPUCE } from "./pokemons/carapuce";
import { CHENIPAN } from "./pokemons/chenipan";
import { CHETIFLOR } from "./pokemons/chetiflor";
import { CHRYSACIER } from "./pokemons/chrysacier";
import { COCONFORT } from "./pokemons/coconfort";
import { COLOSSINGE } from "./pokemons/colossinge";
import { CRUSTABRI } from "./pokemons/crustabri";
import { DARDARGNAN } from "./pokemons/dardargnan";
import { DODRIO } from "./pokemons/dodrio";
import { DODUO } from "./pokemons/doduo";
import { DRACAUFEU } from "./pokemons/dracaufeu";
import { DRACO } from "./pokemons/draco";
import { DRACOLOSSE } from "./pokemons/dracolosse";
import { ECTOPLASMA } from "./pokemons/ectoplasma";
import { ELECTHOR } from "./pokemons/electhor";
import { ELECTRODE } from "./pokemons/electrode";
import { ELEKTEK } from "./pokemons/elektek";
import { EMPIFLOR } from "./pokemons/empiflor";
import { EVOLI } from "./pokemons/evoli";
import { EXCELANGUE } from "./pokemons/excelangue";
import { FANTOMINUS } from "./pokemons/fantominus";
import { FEROSINGE } from "./pokemons/ferosinge";
import { FEUNARD } from "./pokemons/feunard";
import { FLAGADOSS } from "./pokemons/flagadoss";
import { FLORIZARRE } from "./pokemons/florizarre";
import { GALOPA } from "./pokemons/galopa";
import { GOUPIX } from "./pokemons/goupix";
import { GRAVALANCH } from "./pokemons/gravalanch";
import { GRODOUDOU } from "./pokemons/grodoudou";
import { GROLEM } from "./pokemons/grolem";
import { GROTADMORV } from "./pokemons/grotadmorv";
import { HERBIZARRE } from "./pokemons/herbizarre";
import { HYPNOMADE } from "./pokemons/hypnomade";
import { HYPOCEAN } from "./pokemons/hypocean";
import { HYPOTREMPE } from "./pokemons/hypotrempe";
import { INSECATEUR } from "./pokemons/insecateur";
import { KABUTO } from "./pokemons/kabuto";
import { KABUTOPS } from "./pokemons/kabutops";
import { KADABRA } from "./pokemons/kadabra";
import { KANGOUREX } from "./pokemons/kangourex";
import { KICKLEE } from "./pokemons/kicklee";
import { KOKIYAS } from "./pokemons/kokiyas";
import { KRABBOSS } from "./pokemons/krabboss";
import { KRABBY } from "./pokemons/krabby";
import { LAMANTINE } from "./pokemons/lamantine";
import { LEVEINARD } from "./pokemons/leveinard";
import { LEVIATOR } from "./pokemons/leviator";
import { LIPPOUTOU } from "./pokemons/lippoutou";
import { LOKHLASS } from "./pokemons/lokhlass";
import { MACHOC } from "./pokemons/machoc";
import { MACHOPEUR } from "./pokemons/machopeur";
import { MACKOGNEUR } from "./pokemons/mackogneur";
import { MAGICARPE } from "./pokemons/magicarpe";
import { MAGMAR } from "./pokemons/magmar";
import { MAGNETI } from "./pokemons/magneti";
import { MAGNETON } from "./pokemons/magneton";
import { MELODELFE } from "./pokemons/melodelfe";
import { MELOFEE } from "./pokemons/melofee";
import { METAMORPH } from "./pokemons/metamorph";
import { MEW } from "./pokemons/mew";
import { MEWTWO } from "./pokemons/mewtwo";
import { MIAOUSS } from "./pokemons/miaouss";
import { MIMITOSS } from "./pokemons/mimitoss";
import { MINIDRACO } from "./pokemons/minidraco";
import { MR_MIME } from "./pokemons/mrmime";
import { MYSTHERBE } from "./pokemons/mystherbe";
import { NIDOKING } from "./pokemons/nidoking";
import { NIDOQUEEN } from "./pokemons/nidoqueen";
import { NIDORAN_FEMALE } from "./pokemons/nidoranf";
import { NIDORAN_MALE } from "./pokemons/nidoranm";
import { NIDORINA } from "./pokemons/nidorina";
import { NIDORINO } from "./pokemons/nidorino";
import { NOADKOKO } from "./pokemons/noadkoko";
import { NOEUFNOEUF } from "./pokemons/noeufnoeuf";
import { NOSFERALTO } from "./pokemons/nosferalto";
import { NOSFERAPTI } from "./pokemons/nosferapti";
import { ONIX } from "./pokemons/onix";
import { ORTIDE } from "./pokemons/ortide";
import { OSSATUEUR } from "./pokemons/ossatueur";
import { OSSELAIT } from "./pokemons/osselait";
import { OTARIA } from "./pokemons/otaria";
import { PAPILUSION } from "./pokemons/papilusion";
import { PARAS } from "./pokemons/paras";
import { PARASECT } from "./pokemons/parasect";
import { PERSIAN } from "./pokemons/persian";
import { PIAFABEC } from "./pokemons/piafabec";
import { PIKACHU } from "./pokemons/pikachu";
import { POISSIRENE } from "./pokemons/poissirene";
import { POISSOROY } from "./pokemons/poissoroy";
import { PONYTA } from "./pokemons/ponyta";
import { PORYGON } from "./pokemons/porygon";
import { PSYKOKWAK } from "./pokemons/psykokwak";
import { PTERA } from "./pokemons/ptera";
import { PTITARD } from "./pokemons/ptitard";
import { PYROLI } from "./pokemons/pyroli";
import { RACAILLOU } from "./pokemons/racaillou";
import { RAFFLESIA } from "./pokemons/rafflesia";
import { RAICHU } from "./pokemons/raichu";
import { RAMOLOSS } from "./pokemons/ramoloss";
import { RAPASDEPIC } from "./pokemons/rapasdepic";
import { RATTATA } from "./pokemons/rattata";
import { RATTATAC } from "./pokemons/rattatac";
import { REPTINCEL } from "./pokemons/reptincel";
import { RHINOCORNE } from "./pokemons/rhinocorne";
import { RHINOFEROS } from "./pokemons/rhinoferos";
import { RONDOUDOU } from "./pokemons/rondoudou";
import { RONFLEX } from "./pokemons/ronflex";
import { ROUCARNAGE } from "./pokemons/roucarnage";
import { ROUCOOL } from "./pokemons/roucool";
import { ROUCOUPS } from "./pokemons/roucoups";
import { SABELETTE } from "./pokemons/sabelette";
import { SABLAIREAU } from "./pokemons/sablaireau";
import { SALAMECHE } from "./pokemons/salameche";
import { SAQUEDENEU } from "./pokemons/saquedeneu";
import { SCARABRUTE } from "./pokemons/scarabrute";
import { SMOGO } from "./pokemons/smogo";
import { SMOGOGO } from "./pokemons/smogogo";
import { SOPORIFIK } from "./pokemons/soporifik";
import { SPECTRUM } from "./pokemons/spectrum";
import { STARI } from "./pokemons/stari";
import { STAROSS } from "./pokemons/staross";
import { SULFURA } from "./pokemons/sulfura";
import { TADMORV } from "./pokemons/tadmorv";
import { TARTARD } from "./pokemons/tartard";
import { TAUPIQUEUR } from "./pokemons/taupiqueur";
import { TAUROS } from "./pokemons/tauros";
import { TENTACOOL } from "./pokemons/tentacool";
import { TENTACRUEL } from "./pokemons/tentacruel";
import { TETARTE } from "./pokemons/tetarte";
import { TORTANK } from "./pokemons/tortank";
import { TRIOPIKEUR } from "./pokemons/triopikeur";
import { TYGNON } from "./pokemons/tygnon";
import { VOLTALI } from "./pokemons/voltali";
import { VOLTORBE } from "./pokemons/voltorbe";

import {
	GEMME_CIEL,
	GEMME_DRACO,
	GEMME_FLAMME,
	GEMME_GLACE,
	GEMME_GRISE,
	GEMME_HERBE,
	GEMME_HYDRO,
	GEMME_INSECTE,
	GEMME_OMBRE,
	GEMME_PIXIE,
	GEMME_POING,
	GEMME_PSY,
	GEMME_ROC,
	GEMME_TERRE,
	GEMME_TOXIC,
	GEMME_VOLT,
	type Item,
	PV_PLUS,
} from "./items";

export interface PokemonEntry {
	ref: string;
	types: PokemonType[];
	maxPV: number;
	maxPP: number;
	attack: number;
	defense: number;
	speed: number;
	baseSkill: Skill;
	ppSkill?: Skill;
	evolution?: PokemonEntry;
	evolutionLevel?: number;
	devolution?: PokemonEntry;
	rank: number;
	wildEncounterChance: number;
	portraitCropY?: number;
}

export function autoEvolve(entry: PokemonEntry, level: number): PokemonEntry {
	if (entry.evolution && entry.evolutionLevel && level > entry.evolutionLevel) {
		return autoEvolve(entry.evolution, level);
	}
	if (entry.devolution && level < entry.devolution.evolutionLevel!) {
		return autoEvolve(entry.devolution, level);
	}
	return entry;
}

export interface PokemonConstructor {
	entry: PokemonEntry;
	owner: number;
	xp?: number;
	level?: number;
	item?: Item;
	uid?: string;
	shouldAutoEvolve?: boolean;
}

export class Pokemon {
	uid: string;
	owner: number;
	pv: number;
	pp: number;
	item: Item | null;
	level: number;
	entry: PokemonEntry;
	xp: number;

	constructor({
		entry,
		owner,
		xp,
		level,
		item,
		uid,
		shouldAutoEvolve,
	}: PokemonConstructor) {
		this.uid = uid ?? nanoid();
		this.owner = owner;
		this.xp = xp || levelToXP(level ?? 1);
		this.level = xpToLevel(this.xp);
		this.entry = shouldAutoEvolve ? autoEvolve(entry, this.level) : entry;
		this.item = item ?? null;
		this.pv = this.maxPV;
		this.pp = 0;
	}

	get pokeball(): string {
		return POKEBALLS[this.entry.rank - 1];
	}

	get baseXP(): number {
		//TODO: this.baseXP = entry.baseXP; // see https://pwo-wiki.info/index.php/Base_Experience
		switch (this.entry.rank) {
			case 1:
				return 60;
			case 2:
				return 130;
			case 3:
				return 200;
			case 4:
				return 260;
			case 5:
			default:
				return 320;
		}
	}

	get maxPV(): number {
		let maxPV = Math.round((this.entry.maxPV * this.level) / 50 + 10);
		if (this.item === PV_PLUS) maxPV *= 1.2;
		return maxPV;
	}

	get maxPP(): number {
		return this.entry.maxPP;
	}

	get attack(): number {
		return Math.round((this.entry.attack * this.level) / 50 + 5);
	}

	get defense(): number {
		return Math.round((this.entry.defense * this.level) / 50 + 5);
	}

	get speed(): number {
		return Math.round((this.entry.speed * this.level) / 50 + 5);
	}

	get cost() {
		return POKEBALL_COSTS[this.pokeball];
	}

	get types() {
		const types = [...this.entry.types];
		if (this.item === GEMME_DRACO) types.push(TYPE_DRAGON);
		if (this.item === GEMME_HYDRO) types.push(TYPE_EAU);
		if (this.item === GEMME_FLAMME) types.push(TYPE_FEU);
		if (this.item === GEMME_HERBE) types.push(TYPE_PLANTE);
		if (this.item === GEMME_VOLT) types.push(TYPE_ELECTRIQUE);
		if (this.item === GEMME_TERRE) types.push(TYPE_SOL);
		if (this.item === GEMME_INSECTE) types.push(TYPE_INSECTE);
		if (this.item === GEMME_PIXIE) types.push(TYPE_FEE);
		if (this.item === GEMME_CIEL) types.push(TYPE_VOL);
		if (this.item === GEMME_POING) types.push(TYPE_COMBAT);
		if (this.item === GEMME_GLACE) types.push(TYPE_GLACE);
		if (this.item === GEMME_PSY) types.push(TYPE_PSY);
		if (this.item === GEMME_TOXIC) types.push(TYPE_POISON);
		if (this.item === GEMME_ROC) types.push(TYPE_ROCHE);
		if (this.item === GEMME_OMBRE) types.push(TYPE_SPECTRE);
		if (this.item === GEMME_GRISE) types.push(TYPE_NORMAL);
		return types;
	}

	hasType(type: PokemonType) {
		return this.types.includes(type);
	}
}

export enum PokemonTypeAction {
	MOVE = "MOVE",
	ATTACK = "ATTACK",
	IDLE = "IDLE",
	JUMP = "JUMP",
}

export interface PokemonAction {
	type: PokemonTypeAction;
	path?: [x: number, y: number][];
	target?: PokemonOnBoard;
	timer?: Phaser.Time.TimerEvent;
}

export const POKEMONS: PokemonEntry[] = [
	BULBIZARRE,
	HERBIZARRE,
	FLORIZARRE,
	SALAMECHE,
	REPTINCEL,
	DRACAUFEU,
	CARAPUCE,
	CARABAFFE,
	TORTANK,
	CHENIPAN,
	CHRYSACIER,
	PAPILUSION,
	ASPICOT,
	COCONFORT,
	DARDARGNAN,
	ROUCOOL,
	ROUCOUPS,
	ROUCARNAGE,
	RATTATA,
	RATTATAC,
	PIAFABEC,
	RAPASDEPIC,
	ABO,
	ARBOK,
	PIKACHU,
	RAICHU,
	SABELETTE,
	SABLAIREAU,
	NIDORAN_FEMALE,
	NIDORINA,
	NIDOQUEEN,
	NIDORAN_MALE,
	NIDORINO,
	NIDOKING,
	MELOFEE,
	MELODELFE,
	GOUPIX,
	FEUNARD,
	RONDOUDOU,
	GRODOUDOU,
	NOSFERAPTI,
	NOSFERALTO,
	MYSTHERBE,
	ORTIDE,
	RAFFLESIA,
	PARAS,
	PARASECT,
	MIMITOSS,
	AEROMITE,
	TAUPIQUEUR,
	TRIOPIKEUR,
	MIAOUSS,
	PERSIAN,
	PSYKOKWAK,
	AKWAKWAK,
	FEROSINGE,
	COLOSSINGE,
	CANINOS,
	ARCANIN,
	PTITARD,
	TETARTE,
	TARTARD,
	ABRA,
	KADABRA,
	ALAKAZAM,
	MACHOC,
	MACHOPEUR,
	MACKOGNEUR,
	CHETIFLOR,
	BOUSTIFLOR,
	EMPIFLOR,
	TENTACOOL,
	TENTACRUEL,
	RACAILLOU,
	GRAVALANCH,
	GROLEM,
	PONYTA,
	GALOPA,
	RAMOLOSS,
	FLAGADOSS,
	MAGNETI,
	MAGNETON,
	CANARTICHO,
	DODUO,
	DODRIO,
	OTARIA,
	LAMANTINE,
	TADMORV,
	GROTADMORV,
	KOKIYAS,
	CRUSTABRI,
	FANTOMINUS,
	SPECTRUM,
	ECTOPLASMA,
	ONIX,
	SOPORIFIK,
	HYPNOMADE,
	KRABBY,
	KRABBOSS,
	VOLTORBE,
	ELECTRODE,
	NOEUFNOEUF,
	NOADKOKO,
	OSSELAIT,
	OSSATUEUR,
	KICKLEE,
	TYGNON,
	EXCELANGUE,
	SMOGO,
	SMOGOGO,
	RHINOCORNE,
	RHINOFEROS,
	LEVEINARD,
	SAQUEDENEU,
	KANGOUREX,
	HYPOTREMPE,
	HYPOCEAN,
	POISSIRENE,
	POISSOROY,
	STARI,
	STAROSS,
	MR_MIME,
	INSECATEUR,
	LIPPOUTOU,
	ELEKTEK,
	MAGMAR,
	SCARABRUTE,
	TAUROS,
	MAGICARPE,
	LEVIATOR,
	LOKHLASS,
	METAMORPH,
	EVOLI,
	AQUALI,
	VOLTALI,
	PYROLI,
	PORYGON,
	AMONITA,
	AMONISTAR,
	KABUTO,
	KABUTOPS,
	PTERA,
	RONFLEX,
	ARTIKODIN,
	ELECTHOR,
	SULFURA,
	MINIDRACO,
	DRACO,
	DRACOLOSSE,
	MEWTWO,
	MEW,
];

POKEMONS.forEach((pokemon) => {
	const devolution = POKEMONS.find((p) => p.evolution === pokemon);
	if (devolution) {
		pokemon.devolution = devolution;
	}
});

export function getPokemonsOfType(type: PokemonType) {
	return POKEMONS.filter((p) => p.types.includes(type));
}

export function getNonLegendaryPokemons() {
	return POKEMONS.filter((p) => p.rank < 5);
}

export function getNonLegendaryPokemonsOfType(type: PokemonType) {
	return getPokemonsOfType(type).filter((p) => p.rank < 5);
}

export function getPokedexIndex(pokemon: PokemonEntry) {
	return ("00" + (POKEMONS.indexOf(pokemon) + 1)).slice(-3);
}

export function getPokemonCry(pokemon: PokemonEntry) {
	return `cry${getPokedexIndex(pokemon)}`;
}
