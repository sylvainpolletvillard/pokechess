import { Z } from "../data/depths";
import type { Item } from "../data/items";
import type { Pokemon } from "../data/pokemons";
import { t } from "../i18n";
import { playSound } from "../logic/audio";
import {
	cancelPokemonDrag,
	drawPokemonsOnBoard,
	drawTeamSizeCounter,
} from "../logic/board";
import { addToBox, removeFromTeam } from "../logic/box";
import { startDialog } from "../logic/dialog";
import { gameState } from "../logic/gamestate";
import { removeFromPension } from "../logic/pension";
import { canAfford } from "../logic/shop";
import type GameScene from "../scenes/GameScene";
import {
	type RoomPension,
	type RoomSafari,
	RoomType,
} from "../types/destination";
import { fadeOut } from "../utils/camera";
import { addText } from "../utils/text";
import { addInteractiveElem, dragState, handleDragEnd } from "./cursor";
import { openItemMenu } from "./itemBox";
import { closeMenu } from "./menu";
import { drawPokeballsCounter } from "./pokeballsCounter";
import { showPokedex } from "./pokedex";
import { openBox } from "./pokemonBox";

let menuButtonsGroup: Phaser.GameObjects.Group;

export function drawMenuButtons(game: GameScene) {
	if (gameState.currentRoom.type === RoomType.SAFARI)
		return drawSafariButtons(game);
	if (gameState.currentRoom.type === RoomType.PENSION)
		return drawPensionButtons(game);
	menuButtonsGroup = game.add.group();

	drawPokedexButton(game);
	drawBoxButton(game);
	drawBagButton(game);

	const fightButton = game.add.sprite(
		295,
		game.scale.height - 12,
		"buttons_big",
		0,
	);
	fightButton
		.on("over", () => {
			fightButton.setFrame(1);
		})
		.on("out", () => {
			fightButton.setFrame(0);
		})
		.on("click", () => {
			game.launchFight();
		});
	addInteractiveElem(fightButton);
	game.sprites.set("fightButton", fightButton);
	menuButtonsGroup.add(fightButton);
	menuButtonsGroup.setDepth(Z.GUI_BUTTON);
}

export function drawSafariButtons(game: GameScene) {
	menuButtonsGroup = game.add.group();

	drawBoxButton(game);
	if (canAfford(1)) drawRefreshButton(game);

	const quitButton = game.add.sprite(
		295,
		game.scale.height - 12,
		"buttons_big",
		2,
	);
	quitButton
		.on("over", () => {
			quitButton.setFrame(3);
		})
		.on("out", () => {
			quitButton.setFrame(2);
		})
		.on("click", () => {
			playSound("run");
			fadeOut(400).then(() => gameState.exitDestination());
		});
	addInteractiveElem(quitButton);
	game.sprites.set("quitButton", quitButton);
	menuButtonsGroup.add(quitButton);
	menuButtonsGroup.setDepth(Z.GUI_BUTTON);
}

export function drawPensionButtons(game: GameScene) {
	menuButtonsGroup = game.add.group();

	drawBoxButton(game);

	const quitButton = game.add.sprite(
		295,
		game.scale.height - 12,
		"buttons_big",
		2,
	);
	quitButton
		.on("over", () => {
			quitButton.setFrame(3);
		})
		.on("out", () => {
			quitButton.setFrame(2);
		})
		.on("click", async () => {
			const room = gameState.currentRoom as RoomPension;
			await startDialog(room.trainer.dialogs.bye, {
				speaker: room.trainer.ref,
			});
			playSound("run");
			await fadeOut(400);
			gameState.exitDestination();
		});
	addInteractiveElem(quitButton);
	game.sprites.set("quitButton", quitButton);
	menuButtonsGroup.add(quitButton);
	menuButtonsGroup.setDepth(Z.GUI_BUTTON);
}

export function drawPokedexButton(game: GameScene) {
	const pokedexButtonX = 100;
	const pokedexButton = game.add.sprite(
		pokedexButtonX,
		game.scale.height - 12,
		"buttons",
		2,
	);
	pokedexButton.setData("type", "pokedexButton");
	let pokedexButtonText: Phaser.GameObjects.Text | null;
	pokedexButton
		.on("click", () => {
			if (gameState.activeMenu?.ref === "pokedex") {
				return closeMenu(); // close pokedex
			}
			closeMenu(); // close other menu before opening Pokédex
			if (dragState.draggedElem != null) {
				handleDragEnd(game);
			} else showPokedex(game);
		})
		.on("over", () => {
			const dyText = 30;
			pokedexButton.setTint(0xffdddd);
			if (dragState.draggedElem != null) {
				const pokemon = dragState.draggedElem.getData("pokemon");
				if (pokemon != null) {
					pokedexButtonText = addText(
						pokedexButtonX,
						game.scale.height - dyText,
						t("menu.see_pokemon", { name: t(`pokemon.${pokemon.entry.ref}`) }),
						{
							align: "center",
							color: "white",
							strokeThickness: 4,
							stroke: "black",
						},
					).setOrigin(0.5);
				}
			} else {
				pokedexButtonText = addText(
					pokedexButtonX,
					game.scale.height - dyText,
					"POKEDEX",
					{
						align: "center",
						color: "white",
						strokeThickness: 4,
						stroke: "black",
					},
				).setOrigin(0.5);
			}
		})
		.on("out", () => {
			pokedexButton.setTint(0xffffff);
			pokedexButtonText?.destroy();
		})
		.on("dropReceived", (pokemonSprite: Phaser.GameObjects.Sprite) => {
			const pokemon = pokemonSprite.getData("pokemon");
			if (pokemon != null) {
				showPokedex(game, pokemon);
				cancelPokemonDrag();
			}
		});
	addInteractiveElem(pokedexButton);
	menuButtonsGroup.add(pokedexButton);
}

export function drawBoxButton(game: GameScene) {
	const boxButtonX = game.scale.width / 2;
	const boxButton = game.add.sprite(
		boxButtonX,
		game.scale.height - 12,
		"buttons",
		0,
	);
	boxButton.setData("type", "boxButton");
	let boxButtonText: Phaser.GameObjects.Text | null;
	boxButton
		.on("click", () => {
			if (dragState.draggedElem != null) {
				handleDragEnd(game);
			} else if (gameState.activeMenu?.ref === "box") {
				return closeMenu(); // close box
			} else {
				closeMenu(); // close other menu before opening box
				openBox(game);
			}
		})
		.on("over", () => {
			const dyText = 30;
			boxButton.setTint(0xccffcc);
			if (dragState.draggedElem != null) {
				const pokemon = dragState.draggedElem.getData("pokemon");
				if (pokemon != null) {
					boxButtonText = addText(
						boxButtonX,
						game.scale.height - dyText,
						t("menu.remove_pokemon", {
							name: t(`pokemon.${pokemon.entry.ref}`),
						}),
						{
							align: "center",
							color: "white",
							strokeThickness: 4,
							stroke: "black",
						},
					).setOrigin(0.5);
				}
			} else {
				boxButtonText = addText(
					boxButtonX,
					game.scale.height - dyText,
					"POKEMONS",
					{
						align: "center",
						color: "white",
						strokeThickness: 4,
						stroke: "black",
					},
				).setOrigin(0.5);
			}
		})
		.on("out", () => {
			boxButton.setTint(0xffffff);
			boxButtonText?.destroy();
		})
		.on("dropReceived", (pokemonSprite: Phaser.GameObjects.Sprite) => {
			const pokemon = pokemonSprite.getData("pokemon");
			if (pokemon != null) {
				boxButtonText?.destroy();
				if (gameState.pension.includes(pokemon)) removeFromPension(pokemon);
				else removeFromTeam(pokemon, gameState.board.playerTeam);
				addToBox(pokemon);
				drawTeamSizeCounter();
			}
		});
	addInteractiveElem(boxButton);
	menuButtonsGroup.add(boxButton);
}

export function drawBagButton(game: GameScene) {
	const bagButtonX = 220;
	const bagButton = game.add.sprite(
		bagButtonX,
		game.scale.height - 12,
		"buttons",
		1,
	);
	bagButton.setData("type", "bagButton");
	let bagButtonText: Phaser.GameObjects.Text | null;
	bagButton
		.on("click", () => {
			if (dragState.draggedElem != null) {
				handleDragEnd(game);
			} else if (gameState.activeMenu?.ref === "items_box") {
				return closeMenu(); // close box
			} else {
				closeMenu(); // close other menu before opening box
				openItemMenu(game);
			}
		})
		.on("over", () => {
			const dyText = 30;
			bagButton.setTint(0xffffcc);
			if (dragState.draggedElem != null) {
				const pokemon: Pokemon = dragState.draggedElem.getData("pokemon");
				const item: Item = dragState.draggedElem.getData("item");
				if (pokemon != null) {
					bagButtonText = addText(
						bagButtonX,
						game.scale.height - dyText,
						pokemon.item
							? t("menu.retrieve_item", { item: t(`item.${pokemon.item.ref}`) })
							: t("menu.no_item", { name: t(`pokemon.${pokemon.entry.ref}`) }),
						{
							align: "center",
							color: "white",
							strokeThickness: 4,
							stroke: "black",
						},
					).setOrigin(0.5);
				} else if (item != null) {
					bagButtonText = addText(
						bagButtonX,
						game.scale.height - dyText,
						t("menu.stock_item", { item: t(`item.${item.ref}`) }),
						{
							align: "center",
							color: "white",
							strokeThickness: 4,
							stroke: "black",
						},
					).setOrigin(0.5);
				}
			} else {
				bagButtonText = addText(
					bagButtonX,
					game.scale.height - dyText,
					"ITEMS",
					{
						align: "center",
						color: "white",
						strokeThickness: 4,
						stroke: "black",
					},
				).setOrigin(0.5);
			}
		})
		.on("out", () => {
			bagButton.setTint(0xffffff);
			bagButtonText?.destroy();
		})
		.on("dropReceived", (sprite: Phaser.GameObjects.Sprite) => {
			const pokemon = sprite.getData("pokemon");
			const item: Item = sprite.getData("item");
			if (pokemon != null) {
				bagButtonText?.destroy();
				if (pokemon.item != null) {
					gameState.player.inventory[pokemon.item.ref] += 1;
					pokemon.item = null;
				}
				cancelPokemonDrag();
			} else if (item != null) {
				bagButtonText?.destroy();
				sprite.destroy(); // range l'item
			}
		});

	addInteractiveElem(bagButton);
	menuButtonsGroup.add(bagButton);
}

export function drawRefreshButton(game: GameScene) {
	const refreshButtonX = 100;
	const refreshButton = game.add.sprite(
		refreshButtonX,
		game.scale.height - 12,
		"buttons",
		3,
	);
	refreshButton.setData("type", "refreshButton");
	let refreshButtonText: Phaser.GameObjects.Text | null;
	refreshButton
		.on("click", () => {
			if (!canAfford(1)) return;
			gameState.player.inventory.pokeball -= 1;
			playSound("refresh");
			game.drawMap();
			for (const pokemon of gameState.board.otherTeam) {
				game.sprites.get(pokemon.uid)?.destroy(true);
			}
			gameState.board.otherTeam = (
				gameState.currentRoom as RoomSafari
			).spawnOtherTeam();
			drawPokemonsOnBoard(game);
			drawPokeballsCounter();
			if (gameState.player.inventory.pokeball === 0) refreshButton.destroy();
		})
		.on("over", () => {
			const dyText = 30;
			refreshButton.setTint(0xffffcc);
			refreshButtonText = addText(
				refreshButtonX,
				game.scale.height - dyText,
				t("menu.change_place"),
				{
					align: "center",
					color: "white",
					strokeThickness: 4,
					stroke: "black",
				},
			).setOrigin(0.5);
		})
		.on("out", () => {
			refreshButton.setTint(0xffffff);
			refreshButtonText?.destroy();
		});

	addInteractiveElem(refreshButton);
	menuButtonsGroup.add(refreshButton);
}

export function hideMenuButtons() {
	menuButtonsGroup.destroy(true);
}

export function updateFightButton() {
	const scene = gameState.activeScene as GameScene;
	scene.sprites.get("fightButton")?.setVisible(scene.canLaunchFight);
}
