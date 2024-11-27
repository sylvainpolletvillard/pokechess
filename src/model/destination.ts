import type { PokemonOnBoard } from "../objects/pokemon";
import type { LevelConfig } from "../types/level";
import type { Trainer } from "../types/trainer";

export type Path = [dx: number, dy: number][];

export interface Intersection {
	ref: string;
	coordinates: [number, number];
	nextDestinations: { [destinationRef: string]: Path };
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
	SAFARI = "SAFARI",
	TUTORIAL = "TUTORIAL",
}

export interface Destination {
	ref: string;
	name: string;
	type: DestinationType;
	coordinates: [number, number];
	nextDestinations: { [destinationRef: string]: Path };
	icons: string[];
	subtext: string;
	rooms: { [ref: string]: Room };
	getRoomOrder: () => string[];
	shopId: number;
}

export interface RoomConfig {
	type: RoomType;
	name: string;
	music: string;
}

export type Room = RoomWild | RoomArena | RoomFreewalk | RoomTutorial;

export interface RoomWild extends RoomConfig {
	type: RoomType.WILD;
	map: string;
	spawnOtherTeam: () => PokemonOnBoard[];
}

export interface RoomArena extends RoomConfig {
	type: RoomType.ARENA;
	map: string;
	spawnOtherTeam: () => PokemonOnBoard[];
	champion: Trainer;
}

export interface RoomFreewalk extends RoomConfig {
	type: RoomType.FREEWALK;
	level: LevelConfig;
}

export interface RoomTutorial extends RoomConfig {
	type: RoomType.TUTORIAL;
	map: string;
	spawnOtherTeam: () => PokemonOnBoard[];
	champion: Trainer;
}
