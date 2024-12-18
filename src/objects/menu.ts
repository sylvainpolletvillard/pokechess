import { Z } from "../data/depths";
import { playSound } from "../logic/audio";
import { gameState } from "../logic/gamestate";
import type { MyScene } from "../scenes/MyScene";
import type { DialogLine } from "../types/dialog";
import { addText } from "../utils/text";
import { addInteractiveElem } from "./cursor";

let menuCursorPos = 0;
let cursorSprite: Phaser.GameObjects.Sprite | null = null;

export interface MenuEntry {
	label: string;
	value?: DialogLine;
	x: number;
	y: number;
	color?: string;
}

export interface Menu {
	ref: string;
	x: number;
	y: number;
	width: number;
	height: number;
	background?: string;
	offset?: number;
	entries?: MenuEntry[];
	draw?: (container: Phaser.GameObjects.Container) => any;
	handleMove?: (moveVector: Phaser.Math.Vector2) => any;
	handleCancel?: () => void;
	handleChoice?: (selectedEntry: MenuEntry) => void | false;
	onSelect?: (selectedEntry: MenuEntry) => void;
	onClose?: () => void;
	container?: Phaser.GameObjects.Container;
}

export function selectEntry(index: number) {
	if (gameState.activeMenu === null || !gameState.activeMenu.entries) return;
	menuCursorPos =
		(index + gameState.activeMenu.entries.length) %
		gameState.activeMenu.entries.length;
	cursorSprite?.setPosition(
		gameState.activeMenu.x + gameState.activeMenu.entries[menuCursorPos].x + 2,
		gameState.activeMenu.y + gameState.activeMenu.entries[menuCursorPos].y + 12,
	);
	playSound("tick");
	if (gameState.activeMenu.onSelect) {
		gameState.activeMenu.onSelect(gameState.activeMenu.entries[menuCursorPos]);
	}
}

export function getSelectedMenuEntry(): MenuEntry | null {
	if (!gameState.activeMenu?.entries) return null;
	return gameState.activeMenu.entries[menuCursorPos];
}

export function clickEntry(): boolean {
	if (!gameState.activeMenu) return false;
	let selectedEntry: MenuEntry | null = null;
	if (gameState.activeMenu?.entries)
		selectedEntry = gameState.activeMenu.entries[menuCursorPos];
	const menu = gameState.activeMenu;

	let shouldCloseMenu = false;
	if (menu.handleChoice && selectedEntry) {
		shouldCloseMenu = menu.handleChoice(selectedEntry) !== false;
		if (shouldCloseMenu) closeMenu();
		return true;
	}
	playSound(shouldCloseMenu ? "menu_close" : "press_ab");
	return false;
}

export function openMenu(menu: Menu) {
	menu = Object.assign(
		{
			handleMove: defaultHandleMove,
			handleCancel: () => closeMenu(),
			background: "box2",
			offset: 4,
		},
		menu,
	);

	const scene = gameState.activeScene as MyScene;
	//game.sprites.get("cursor")?.setVisible(false)
	gameState.activeMenu = menu;
	menu.container = scene.add.container();

	const menuBackground = scene.add
		.nineslice(
			menu.x,
			menu.y, // this is the starting x/y location
			menu.background!, // a key to an already loaded image
			undefined,
			menu.width,
			menu.height, // the width and height of your object
			menu.offset!,
			menu.offset!,
			menu.offset!,
			menu.offset!, // the width and height to offset for a corner slice
		)
		.setOrigin(0, 0)
		.setScrollFactor(0);

	menu.container.add(menuBackground);
	if (menu.draw) menu.draw(menu.container);

	if (menu.entries != null) {
		menuCursorPos = 0;
		cursorSprite = scene.add.sprite(
			menu.x + menu.entries[menuCursorPos].x + 2,
			menu.y + menu.entries[menuCursorPos].y + 12,
			"gui",
			16,
		);
		scene.sprites.set("menuCursor", cursorSprite);
		cursorSprite.setScrollFactor(0).setScale(0.5);
		menu.container.add(cursorSprite);

		menu.entries.forEach((entry, i) => {
			const menuAction = addText(
				menu.x + 8 + entry.x,
				menu.y + 4 + entry.y,
				entry.label,
				{
					color: entry.color ?? "black",
				},
			);
			menuAction.setInteractive();
			addInteractiveElem(menuAction);
			menuAction.on("pointerover", () => selectEntry(i));
			menuAction.on("click", () => clickEntry());
			menu.container!.add(menuAction);
		});

		if (menu.onSelect) {
			menu.onSelect(menu.entries[0]);
		}
	}

	menu.container.setDepth(Z.MENU);
	return menu;
}

export function closeMenu() {
	if (!gameState.activeMenu || !gameState.activeMenu.container) return;
	playSound("menu_close");
	gameState.activeMenu.onClose?.();
	gameState.activeMenu.container.destroy(true);
	gameState.activeMenu = null;
}

function defaultHandleMove(moveVector: Phaser.Math.Vector2) {
	if (moveVector.y > 0) {
		selectEntry(menuCursorPos + 1);
	} else if (moveVector.y < 0) {
		selectEntry(menuCursorPos - 1);
	}
}
