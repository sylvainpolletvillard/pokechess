import { FAST_TRAVEL_DESTINATIONS } from "../data/destinations";
import { MONT_SELENITE } from "../data/destinations/mont_selenite";
import {
	OCEANE_AZURIA,
	OCEANE_CARMIN,
	OCEANE_CRAMOISILE,
} from "../data/destinations/oceane";
import { t } from "../i18n";
import { closeMenu } from "../objects/menu";
import {
	type Destination,
	DestinationType,
	type RoomArena,
} from "../types/destination";
import { fadeOut } from "../utils/camera";
import { addText } from "../utils/text";
import { playSound } from "./audio";
import { gameState } from "./gamestate";

export function enterDestination(destination: Destination) {
	const scene = gameState.activeScene as MyScene;

	if (destination.preloading) {
		const loadingText = addText(
			scene.scale.width / 2,
			scene.scale.height - 30,
			t("loading"),
			{ align: "center", color: "white", strokeThickness: 4, stroke: "black" },
		).setOrigin(0.5);
		const enterAfterLoad = () => {
			destination.preloading = false;
			loadingText.destroy();
			enterDestination(destination);
			scene.load.off("complete", enterAfterLoad);
		};
		scene.load.on("complete", enterAfterLoad);
		scene.load.start();
		return;
	}

	if ([OCEANE_CARMIN, OCEANE_CRAMOISILE, OCEANE_AZURIA].includes(destination))
		playSound("oceane_horn");
	else playSound("door");
	gameState.roomOrder = getRoomOrder(destination);
	gameState.currentDestination = destination;
	gameState.currentRoomIndex = 0;
	if (gameState.activeMenu != null) closeMenu();
	fadeOut(250).then(() => gameState.initRoom());
}

export function getRoomOrder(destination: Destination): string[] {
	if (destination.customRoomOrder) return destination.customRoomOrder();
	/*
    Dans les villes, le joueur passe au magasin avant d’affronter le Maître d’arène.  S’il a déjà vaincu le maître, il affronte un dresseur à la place.
    Hors des villes, le joueur rencontre des Pokémon sauvages qu’il peut capturer. S’il a déjà capturé à cet emplacement au tour précédent, il affronte un dresseur à la place.
     */
	if (destination.type === DestinationType.ARENA) {
		const arena = destination.rooms["arena"] as RoomArena;
		if (arena.badge && gameState.hasBadge(arena.badge))
			return ["shop", "trainer"].filter((room) => room in destination.rooms);
		else return ["shop", "arena"].filter((room) => room in destination.rooms);
	}
	if (
		destination.type === DestinationType.WILD ||
		FAST_TRAVEL_DESTINATIONS.includes(destination) ||
		destination === MONT_SELENITE
	) {
		if (gameState.lastCaptureDestination === destination) {
			gameState.lastCaptureDestination = null;
			return ["trainer"];
		}
		gameState.lastCaptureDestination = destination;
		return ["wild"];
	} else {
		return Object.keys(destination.rooms);
	}
}

export function getSubText(destination: Destination): string {
	if (destination.subtext) return destination.subtext;
	if (destination.type === DestinationType.ARENA)
		return t("destination_subtext.ARENA");
	if (destination.type === DestinationType.WILD) {
		return gameState.lastCaptureDestination === destination
			? t("destination_subtext.FIGHT")
			: t("destination_subtext.CAPTURE");
	}
	return "???";
}
