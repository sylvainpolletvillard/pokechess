import type { PokemonOnBoard } from "../objects/pokemon";
import type { MyScene } from "../scenes/MyScene";
import type { Badge } from "./badge";
import type { LevelConfig } from "./level";
import type { Trainer } from "./trainer";

export type Path = [dx: number, dy: number][];

export interface Intersection {
	ref: string;
	coordinates: [number, number];
	nextDestinations: { [destinationRef: string]: Path };
	onReach?: () => Promise<boolean>;
}

export enum DestinationType {
	ARENA = "ARENA",
	WILD = "WILD",
	SPECIAL = "SPECIAL",
}

export enum RoomType {
	ARENA = "ARENA",
	WILD = "WILD",
	FREEWALK = "FREEWALK",
	TUTORIAL = "TUTORIAL",
	SAFARI = "SAFARI",
	PENSION = "PENSION",
}

export interface Destination {
	ref: string;
	name: string;
	type: DestinationType;
	coordinates: [number, number];
	nextDestinations: { [destinationRef: string]: Path };
	icons: string[];
	subtext?: string;
	rooms: { [ref: string]: Room };
	shopId?: number;
	preloading?: boolean;
	preload?: (scene: MyScene) => void;
	locked?: () => boolean;
	customRoomOrder?: () => string[];
	onExit?: () => void;
}

export interface RoomConfig {
	type: RoomType;
	name: string;
	music: string;
	beforeExit?: () => Promise<void>;
}

export type Room =
	| RoomFreewalk
	| RoomWild
	| RoomArena
	| RoomTutorial
	| RoomSafari
	| RoomPension;

export interface RoomFreewalk extends RoomConfig {
	type: RoomType.FREEWALK;
	level: LevelConfig;
}

export interface RoomBoard extends RoomConfig {
	map: string;
	maps?: string[];
	mapIndex?: number;
	spawnOtherTeam: () => PokemonOnBoard[];
}

export interface RoomWild extends RoomBoard {
	type: RoomType.WILD;
}

export interface RoomArena extends RoomBoard {
	type: RoomType.ARENA;
	trainer: Trainer;
	badge?: Badge;
}

export interface RoomTutorial extends RoomBoard {
	type: RoomType.TUTORIAL;
	trainer: Trainer;
}

export interface RoomSafari extends RoomBoard {
	type: RoomType.SAFARI;
}

export interface RoomPension extends RoomBoard {
	type: RoomType.PENSION;
	trainer: Trainer;
}
