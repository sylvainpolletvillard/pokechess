import { Z } from "../data/depths";
import { POKEMONS, type Pokemon, type PokemonEntry } from "../data/pokemons";
import { AQUALI } from "../data/pokemons/aquali";
import { EVOLI } from "../data/pokemons/evoli";
import { PYROLI } from "../data/pokemons/pyroli";
import { VOLTALI } from "../data/pokemons/voltali";
import { POKEMON_TYPES, type PokemonType } from "../data/types";
import { t } from "../i18n";
import { playSound } from "../logic/audio";
import { gameState } from "../logic/gamestate";
import type GameScene from "../scenes/GameScene";
import { addText } from "../utils/text";
import {
	type InteractiveElem,
	addInteractiveElem,
	removeInteractiveElem,
	updateCursorHover,
} from "./cursor";
import { openMenu } from "./menu";

enum CursorZone {
	TYPES = 0,
	LIST = 1,
}

const ox = 36;
const oy = 30;

const list = {
	allPokemons: POKEMONS,
	selectedIndex: 0,
	pageStartIndex: 0,
	numberPerPage: 10,
	get filtered() {
		return this.allPokemons.filter(
			(pkm) =>
				currentTypeFilter === null || pkm.types.includes(currentTypeFilter),
		);
	},
	get page() {
		const startIndex = Math.max(0, list.pageStartIndex ?? 0);
		return this.filtered.slice(startIndex, startIndex + this.numberPerPage);
	},
	get selectedPokemon() {
		return this.filtered[this.selectedIndex ?? 0];
	},
	get pageSelectedIndex() {
		return this.page.indexOf(this.selectedPokemon);
	},
};

let typeSelectedIndex = 0;
let currentTypeFilter: PokemonType | null = null;
let cursorSprite: Phaser.GameObjects.Sprite | null = null;
let cursorZone: CursorZone = CursorZone.LIST;
let pokedexContainer: Phaser.GameObjects.Container | null = null;
let interactiveElems: InteractiveElem[] = [];

export function showPokedex(game: GameScene, pokemonToShow?: Pokemon) {
	playSound("menu_open");
	openMenu({
		ref: "pokedex",
		x: ox,
		y: oy,
		width: 280,
		height: 242,
		background: "box1",
		offset: 8,
		handleMove(moveVector) {
			playSound("tick");
			if (
				cursorZone === CursorZone.LIST &&
				list.selectedIndex != null &&
				pokedexContainer
			) {
				if (moveVector.y > 0) {
					selectInList(list.selectedIndex + 1);
				} else if (moveVector.y < 0) {
					if (list.selectedIndex === 0) {
						cursorZone = CursorZone.TYPES;
						selectType(Object.keys(POKEMON_TYPES).length - 1);
					} else {
						selectInList(list.selectedIndex - 1);
						game.sprites
							.get("cursor")
							?.setPosition(298, 60 + list.selectedIndex * 20);
					}
				}
			} else if (cursorZone === CursorZone.TYPES && pokedexContainer) {
				if (moveVector.y > 0) {
					cursorZone = CursorZone.LIST;
					list.selectedIndex = 0;
					list.pageStartIndex = 0;
					selectInList(list.selectedIndex);
				} else if (moveVector.x > 0) {
					selectType(typeSelectedIndex + 1);
				} else if (moveVector.x < 0) {
					selectType(typeSelectedIndex - 1);
				}
			}
			updateCursorHover(game);
		},
		draw(container) {
			list.selectedIndex = 0;
			if (pokemonToShow != null) {
				list.selectedIndex = list.filtered.findIndex(
					(p) => p.ref === pokemonToShow.entry.ref,
				);
				list.pageStartIndex = list.selectedIndex;
			}
			pokedexContainer = game.add.container(ox, oy);
			container.add(pokedexContainer);
			drawPokedex();
		},
	});
}

function drawPokedex() {
	const game = gameState.activeScene as GameScene;

	if (!pokedexContainer) return;
	pokedexContainer.removeAll(true);

	interactiveElems.forEach((elm) => removeInteractiveElem(elm));
	interactiveElems = [];

	// layout
	pokedexContainer.add(
		game.add
			.line(140, 28, 0, 0, 272, 0, 0x000000)
			.setLineWidth(0.5)
			.setDepth(Z.MENU_LAYOUT),
	);

	pokedexContainer.add(
		game.add
			.line(179, 132, 0, 0, 0, 210, 0x000000)
			.setLineWidth(0.5)
			.setDepth(Z.MENU_LAYOUT),
	);

	// types bar
	const types = Object.values(POKEMON_TYPES);
	const sortedTypes = Object.values(POKEMON_TYPES);
	if (currentTypeFilter != null) {
		sortedTypes.splice(sortedTypes.indexOf(currentTypeFilter), 1);
		sortedTypes.push(currentTypeFilter);
	}

	sortedTypes.forEach((type: PokemonType) => {
		const i = types.indexOf(type);
		if (currentTypeFilter === type) {
			pokedexContainer?.add(
				game.add
					.graphics()
					.lineStyle(4, 0x000000)
					.strokeCircle(20 + i * 16, 16, 8),
			);
		}
		const typeSprite = game.add.sprite(
			20 + i * 16,
			16,
			"icons16x16",
			type.frameIndex,
		);
		typeSprite.setDepth(Z.MENU_OBJECTS);
		addInteractiveElem(typeSprite);
		interactiveElems.push(typeSprite);
		typeSprite.on("over", () => selectType(i, false));
		typeSprite.on("click", () => activateTypeFilter(type));
		pokedexContainer?.add(typeSprite);
	});

	// pokemon list
	drawList();

	// pokemon info
	if (list.filtered.length > 0 && list.selectedIndex in list.filtered) {
		drawPokemonInfo(list.selectedPokemon);
	}

	// cursor
	if (cursorZone === CursorZone.LIST && list.pageSelectedIndex >= 0) {
		cursorSprite = game.add.sprite(
			180,
			42 + list.pageSelectedIndex * 20,
			"gui",
			16,
		);
		cursorSprite.setScale(0.5).setDepth(Z.MENU_CURSOR);
		pokedexContainer.add(cursorSprite);
	}

	pokedexContainer.setDepth(Z.MENU);
	updateCursorHover(game);
}

function drawList() {
	const scene = gameState.activeScene as GameScene;
	list.page.forEach((pokemon, i) => {
		const pokemonNum = POKEMONS.indexOf(pokemon) + 1;
		const bg = scene.add
			.rectangle(227, 42 + i * 20, 94, 20, i % 2 ? 0xffeedd : 0xeeddcc)
			.setDepth(Z.MENU_LAYOUT);
		addInteractiveElem(bg);
		interactiveElems.push(bg);
		bg.on("click", () => selectInList(list.filtered.indexOf(pokemon), false));
		const name = addText(
			188,
			35 + i * 20,
			`${pokemonNum}. ${t(`pokemon.${pokemon.ref}`).toUpperCase()}`,
		)!
			.setDepth(Z.MENU_OBJECTS)
			.setAlign("left");
		pokedexContainer?.add(bg);
		pokedexContainer?.add(name);
	});

	const bgArrowUp = scene.add
		.rectangle(225, 32, 90, 6, 0x000000)
		.setDepth(Z.MENU_LAYOUT)
		.setAlpha(0);
	addInteractiveElem(bgArrowUp);
	interactiveElems.push(bgArrowUp);
	bgArrowUp.on("click", () => {
		selectInList(list.selectedIndex - 1, false);
	});
	const arrowUp = scene.add
		.sprite(228, 33, "gui", 16)
		.setScale(0.5)
		.setAlpha(list.pageStartIndex === 0 ? 0 : 0.5)
		.setRotation(Phaser.Math.DegToRad(-90));

	pokedexContainer?.add(bgArrowUp);
	pokedexContainer?.add(arrowUp);

	const bgArrowDown = scene.add
		.rectangle(225, 234, 90, 6, 0x000000)
		.setDepth(Z.MENU_LAYOUT)
		.setAlpha(0);
	addInteractiveElem(bgArrowDown);
	interactiveElems.push(bgArrowDown);
	bgArrowDown.on("click", () => {
		selectInList(list.selectedIndex + 1, false);
	});
	const arrowDown = scene.add
		.sprite(228, 233, "gui", 16)
		.setScale(0.5)
		.setAlpha(
			list.pageStartIndex + list.numberPerPage >= list.filtered.length
				? 0
				: 0.5,
		)
		.setRotation(Phaser.Math.DegToRad(+90));
	pokedexContainer?.add(bgArrowDown);
	pokedexContainer?.add(arrowDown);
}

function selectInList(index: number, shouldMoveCursor = true) {
	const scene = gameState.activeScene as GameScene;
	if (index < 0 || index >= list.filtered.length) return;
	list.selectedIndex = index;
	if (index < list.pageStartIndex) list.pageStartIndex = index;
	else if (index > list.pageStartIndex + list.numberPerPage - 1)
		list.pageStartIndex = index - list.numberPerPage + 1;
	drawPokedex();
	if (shouldMoveCursor) {
		scene.sprites
			.get("cursor")
			?.setPosition(298, 63 + list.pageSelectedIndex * 20);
	}
}

let typeLabelText: Phaser.GameObjects.Text | null = null;

function selectType(index: number, shouldMoveCursor = true) {
	if (index < 0 || index >= Object.keys(POKEMON_TYPES).length) return;
	typeSelectedIndex = index;
	const type = Object.values(POKEMON_TYPES)[typeSelectedIndex];
	typeLabelText && pokedexContainer?.remove(typeLabelText, true);
	typeLabelText = addText(
		20 + 16 * typeSelectedIndex,
		-15,
		t(`type.${type.ref}`),
		{
			color: "white",
			align: "middle",
			strokeThickness: 4,
			stroke: "black",
		},
	);
	typeLabelText.setOrigin(0.5, 0).setDepth(Z.MENU_TOOLTIPS);
	pokedexContainer?.add(typeLabelText!);
	if (shouldMoveCursor) {
		const game = gameState.activeScene as GameScene;
		game.sprites.get("cursor")?.setPosition(50 + 16 * typeSelectedIndex, 44);
	}
}

function activateTypeFilter(type: PokemonType) {
	if (!pokedexContainer) return;
	if (type === currentTypeFilter) {
		currentTypeFilter = null;
	} else {
		currentTypeFilter = type;
	}
	list.selectedIndex = 0;
	list.pageStartIndex = 0;
	drawPokedex();
	playSound("tick");
}

function drawPokemonInfo(pokemon: PokemonEntry) {
	if (!pokedexContainer) return;
	const game = gameState.activeScene as GameScene;

	let cx = 40;
	let cy = 54;
	const portrait = game.add.sprite(cx, cy, "pokemon_portraits");
	portrait.play(`${pokemon.ref}_portrait`);
	pokedexContainer.add(portrait);

	const pokemonNameText = addText(
		cx + 36,
		cy - 18,
		t(`pokemon.${pokemon.ref}`),
		{
			fontSize: "14px",
		},
	);
	pokedexContainer.add(pokemonNameText);

	cx += 44;
	for (let i = 0; i < pokemon.types.length; i++) {
		const typeSprite = game.add.sprite(
			cx + i * 20,
			cy + 10,
			"icons16x16",
			pokemon.types[i].frameIndex,
		);
		pokedexContainer.add(typeSprite);
	}

	const headers = game.add.graphics().fillStyle(0x000000, 1);
	pokedexContainer.add(headers);

	cx = 4;
	cy += 24;

	headers.fillRoundedRect(cx, cy + 2, 60, 9, 4);
	pokedexContainer.add(
		addText(cx + 8, cy, "BASE STATS", { fontSize: "10px", color: "white" }),
	);
	cy += 3;

	const hpText = addText(cx + 14, cy + 10, `HP: ${pokemon.maxPV}`);
	pokedexContainer.add(hpText);

	const BAR_WIDTH = 4;
	const bars = game.add.graphics();
	bars.setDepth(Z.MENU_OBJECTS);
	bars
		.fillStyle(0x000000)
		.fillRoundedRect(cx + 4, cy + 14, BAR_WIDTH + 2, 6, 4);
	bars.fillStyle(0x00bb00, 1).fillRoundedRect(cx + 5, cy + 15, BAR_WIDTH, 4, 2);

	const ppText = addText(cx + 14, cy + 30, `PP: ${pokemon.maxPP}`);
	pokedexContainer.add(ppText);

	bars
		.fillStyle(0x000000)
		.fillRoundedRect(cx + 4, cy + 34, BAR_WIDTH + 2, 6, 4);
	bars.fillStyle(0x0000ff, 1).fillRoundedRect(cx + 5, cy + 35, BAR_WIDTH, 4, 2);
	pokedexContainer.add(bars);

	const statAttackIcon = game.add.sprite(cx + 50, cy + 10, "icons16x16", 16);
	statAttackIcon.setAlpha(0.25).setOrigin(0, 0);
	pokedexContainer.add(statAttackIcon);
	const statAttackText = addText(cx + 68, cy + 10, `ATK: ${pokemon.attack}`);
	pokedexContainer.add(statAttackText);

	const statDefenseIcon = game.add.sprite(cx + 50, cy + 30, "icons16x16", 17);
	statDefenseIcon.setAlpha(0.25).setOrigin(0, 0);
	pokedexContainer.add(statDefenseIcon);
	const statDefenseText = addText(cx + 68, cy + 30, `DEF: ${pokemon.defense}`);
	pokedexContainer.add(statDefenseText);

	const statSpeedIcon = game.add.sprite(cx + 110, cy + 10, "icons16x16", 18);
	statSpeedIcon.setAlpha(0.25).setOrigin(0, 0);
	pokedexContainer.add(statSpeedIcon);
	const statSpeedText = addText(cx + 128, cy + 10, `SPD: ${pokemon.speed}`);
	pokedexContainer.add(statSpeedText);

	const statRangeIcon = game.add.sprite(cx + 110, cy + 30, "icons16x16", 19);
	statRangeIcon.setAlpha(0.25).setOrigin(0, 0);
	pokedexContainer.add(statRangeIcon);
	const statRangeText = addText(
		cx + 128,
		cy + 30,
		`RNG: ${pokemon.baseSkill.attackRange}`,
	);
	pokedexContainer.add(statRangeText);

	cx = 10;
	cy += 45;

	headers.fillRoundedRect(cx - 6, cy, 60, 9, 4);
	pokedexContainer.add(
		addText(cx + 2, cy - 2, "CAPACITES", { fontSize: "10px", color: "white" }),
	);

	const attackTypeSprite = game.add.sprite(
		cx + 10,
		cy + 20,
		"icons16x16",
		pokemon.baseSkill.type.frameIndex,
	);
	pokedexContainer.add(attackTypeSprite);
	pokedexContainer.add(
		addText(cx + 22, cy + 14, t(`skill.${pokemon.baseSkill.ref}`)),
	);

	if (pokemon.ppSkill) {
		const effectTypeSprite = game.add.sprite(
			cx + 10,
			cy + 38,
			"icons16x16",
			pokemon.ppSkill.type.frameIndex,
		);
		pokedexContainer.add(effectTypeSprite);
		pokedexContainer.add(
			addText(cx + 22, cy + 31, t(`skill.${pokemon.ppSkill.ref}`), {
				color: "blue",
			}),
		);
		pokedexContainer.add(
			addText(cx + 10, cy + 46, t(`skill_desc.${pokemon.ppSkill.ref}`) ?? "", {
				color: "black",
				fontSize: "10px",
				wordWrap: { width: 160 },
			}),
		);
	} else {
		pokedexContainer.add(
			addText(
				cx + 10,
				cy + 28,
				t(`skill_desc.${pokemon.baseSkill.ref}`) ?? "",
				{
					color: "black",
					fontSize: "10px",
					wordWrap: { width: 160 },
				},
			),
		);
	}

	cx = 10;
	cy += 72;

	headers.fillRoundedRect(cx - 6, cy, 60, 9, 4);
	pokedexContainer.add(
		addText(cx + 2, cy - 2, "EVOLUTION", { fontSize: "10px", color: "white" }),
	);

	let family: PokemonEntry[] = [];
	let currentMember: PokemonEntry | undefined = pokemon;
	while (currentMember !== undefined) {
		family.unshift(currentMember);
		currentMember = currentMember.devolution;
	}
	currentMember = pokemon.evolution;
	while (currentMember !== undefined) {
		family.push(currentMember);
		currentMember = currentMember.evolution;
	}

	cy += 22;
	cx = 32;

	if (pokemon === EVOLI) family = [AQUALI, VOLTALI, PYROLI];

	for (const member of family) {
		const memberSprite = game.add.sprite(cx, cy, "pokemon");
		memberSprite.play(`${member.ref}_RIGHT`);
		pokedexContainer.add(memberSprite);
		if (member.evolution) {
			const arrow = game.add.sprite(cx + 30, cy, "gui", 16);
			arrow.setScale(0.5);
			pokedexContainer.add(arrow);
			pokedexContainer.add(
				addText(cx + 20, cy + 4, `Lv ${member.evolutionLevel ?? "?"}`, {
					align: "center",
					fontSize: "8px",
				}),
			);
		}
		cx += 60;
	}
}
