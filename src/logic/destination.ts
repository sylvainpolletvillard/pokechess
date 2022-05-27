import {gameState} from "./gamestate";
import { playSound } from "./audio";
import { Destination, DestinationType, RoomArena } from "../types/destination";
import { OCEANE_CARMIN, OCEANE_CRAMOISILE, OCEANE_AZURIA } from "../data/destinations/oceane";
import { fadeOut } from "../utils/camera";
import { FAST_TRAVEL_DESTINATIONS } from "../data/destinations";
import { MONT_SELENITE } from "../data/destinations/mont_selenite";

export function enterDestination(destination: Destination){
    if([OCEANE_CARMIN, OCEANE_CRAMOISILE, OCEANE_AZURIA].includes(destination)) playSound("oceane_horn")
    else playSound("door")
    gameState.roomOrder = getRoomOrder(destination)
    gameState.currentDestination = destination
    gameState.currentRoomIndex = 0;
    fadeOut(250).then(() => gameState.initRoom())
}

export function getRoomOrder(destination: Destination): string[] {
    /*
    Dans les villes, le joueur passe au magasin avant d’affronter le Maître d’arène.  S’il a déjà vaincu le maître, il affronte un dresseur à la place.
    Hors des villes, le joueur rencontre des Pokémon sauvages qu’il peut capturer. S’il a déjà capturé à cet emplacement au tour précédent, il affronte un dresseur à la place.
     */
    if(destination.type === DestinationType.ARENA){
        const arena = destination.rooms["arena"] as RoomArena
        if(arena.badge && gameState.hasBadge(arena.badge)) return ["shop", "trainer"].filter(room => room in destination.rooms)
        else return ["shop", "arena"].filter(room => room in destination.rooms)
    }    
    if(destination.type === DestinationType.WILD || FAST_TRAVEL_DESTINATIONS.includes(destination) || destination === MONT_SELENITE){
        if(gameState.lastCaptureDestination === destination){
            gameState.lastCaptureDestination = null;
            return ["trainer"]
        }
        gameState.lastCaptureDestination = destination
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