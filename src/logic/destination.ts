import {PokemonOnBoard} from "../objects/pokemon";
import {Trainer} from "../data/trainers";
import {LevelConfig} from "./level";

export type Path = [dx:number, dy:number][];

export interface Intersection {
    ref: string;
    coordinates: [number, number],
    nextDestinations: { [destinationRef: string]: Path }
}

export enum DestinationType {
    ARENA = "ARENA",
    WILD = "WILD",
    SPECIAL = "SPECIAL"
}

export enum RoomType {
    ARENA,
    WILD,
    FREEWALK,
    SAFARI,
    TUTORIAL
}

export interface Destination {
    ref: string
    name: string
    type: DestinationType
    coordinates: [number, number]
    nextDestinations: { [destinationRef: string]: Path }
    icons: string[]
    subtext: string
    rooms: { [ref: string]: Room }
    shopId?: number
}

export interface RoomConfig {
    type: RoomType;
    name: string;
    music: string;
    nextRoom?: string;
}

export type Room = RoomWild | RoomArena | RoomFreewalk | RoomTutorial | RoomSafari

export interface RoomWild extends RoomConfig {
    type: RoomType.WILD
    map: string
    spawnOtherTeam: () => PokemonOnBoard[]
}

export interface RoomArena extends RoomConfig {
    type: RoomType.ARENA
    map: string
    spawnOtherTeam: () => PokemonOnBoard[]
    trainer: Trainer
}

export interface RoomFreewalk extends RoomConfig {
    type: RoomType.FREEWALK
    level: LevelConfig
}

export interface RoomTutorial extends RoomConfig {
    type: RoomType.TUTORIAL
    map: string
    spawnOtherTeam: () => PokemonOnBoard[]
    trainer: Trainer    
}

export interface RoomSafari extends RoomConfig {
    type: RoomType.SAFARI
}