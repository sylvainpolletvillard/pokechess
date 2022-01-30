import {PokemonOnBoard} from "../objects/pokemon";
import {Trainer} from "../data/trainers";
import {LevelConfig} from "./level";
import {Badge} from "../data/badges";
import {gameState} from "./gamestate";
import {BOURG_PALETTE} from "../data/destinations/bourg_palette";

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
    ARENA = "ARENA",
    WILD = "WILD",
    FREEWALK = "FREEWALK",
    TUTORIAL = "TUTORIAL",
    SAFARI = "SAFARI",
    PENSION = "PENSION"
}

export interface Destination {
    ref: string
    name: string
    type: DestinationType
    coordinates: [number, number]
    nextDestinations: { [destinationRef: string]: Path }
    icons: string[]
    subtext?: string
    rooms: { [ref: string]: Room }
    shopId?: number
}

export interface RoomConfig {
    type: RoomType;
    name: string;
    music: string;
}

export type Room = RoomWild | RoomArena | RoomFreewalk | RoomTutorial | RoomSafari | RoomPension

export interface RoomWild extends RoomConfig {
    type: RoomType.WILD
    map: string
    spawnOtherTeam: () => PokemonOnBoard[]
}

export interface RoomArena extends RoomConfig {
    type: RoomType.ARENA
    map: string
    spawnOtherTeam: () => PokemonOnBoard[]
    trainer: Trainer,
    badge?: Badge
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

export interface RoomPension extends RoomConfig {
    type: RoomType.PENSION
    map: string
    spawnOtherTeam: () => PokemonOnBoard[]
    trainer: Trainer,
}

export function enterDestination(destination: Destination){
    gameState.roomOrder = getRoomOrder(destination)
    gameState.currentDestination = destination
    gameState.currentRoomIndex = 0;
    gameState.initRoom()
}

export function getRoomOrder(destination: Destination): string[] {
    /*
    Dans les villes, le joueur passe au magasin avant d’affronter le Maître d’arène.  S’il a déjà vaincu le maître, il affronte un dresseur à la place.
    Hors des villes, le joueur rencontre des pokémons sauvages qu’il peut capturer. S’il a déjà capturé à cet emplacement au tour précédent, il affronte un dresseur à la place.
     */
    if(destination.type === DestinationType.ARENA){
        const arena = destination.rooms["arena"] as RoomArena
        if(arena.badge && gameState.player.badges.includes(arena.badge.ref)) return ["shop", "arena"].filter(room => room in destination.rooms)
        else return ["shop", "trainer"].filter(room => room in destination.rooms)
    }
    if(destination.type === DestinationType.WILD){
        if(gameState.lastCaptureDestination === destination){
            gameState.lastCaptureDestination = null;
            return ["trainer"]
        }
        return ["wild"]
    }
    else {
        return Object.keys(destination.rooms)
    }
}

export function getSubText(destination: Destination): string {
    if(destination.subtext) return destination.subtext
    if(destination.type === DestinationType.ARENA) return "Arène"
    if(destination.type === DestinationType.WILD){
        return gameState.lastCaptureDestination === destination ? "Combat" : "Capture"
    }
    return "???"
}