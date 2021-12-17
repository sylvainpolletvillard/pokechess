import {gameState} from "./gamestate";
import {Destination, DestinationType, RoomType} from "../model/destination";

export function enterDestination(destination: Destination){
    gameState.currentDestination = destination
    gameState.currentRoomIndex = 0;
    gameState.initRoom()
}