import { t } from "../../i18n";
import { pauseMusicAndPlaySound } from "../../logic/audio";
import { startDialog, waitBeforeNextLine } from "../../logic/dialog";
import { gameState } from "../../logic/gamestate";
import { loadRecord, saveNewRecord } from "../../logic/save";
import { pickStarter } from "../../logic/starters";
import type { Description } from "../../objects/description";
import { drawPokeballsCounter } from "../../objects/pokeballsCounter";
import type { DialogLine } from "../../types/dialog";
import { fadeOut } from "../../utils/camera";
import { splitInGroups, wait } from "../../utils/helpers";
import { ITEM_POKEBALL, type Item } from "../items";
import { type PokemonEntry, getNonLegendaryPokemons } from "../pokemons";

export function receiveItem(
	item: Item,
	quantity = 1,
	shouldPlaySound = true,
	source = "trainer",
): Promise<void> {
	shouldPlaySound && pauseMusicAndPlaySound("item_received");
	if (
		!Object.prototype.hasOwnProperty.call(gameState.player.inventory, item.ref)
	) {
		gameState.player.inventory[item.ref] = 0;
	}
	gameState.player.inventory[item.ref] += quantity;
	const label = item.label ?? "???";
	if (item === ITEM_POKEBALL) drawPokeballsCounter();
	waitBeforeNextLine(2000);
	return startDialog(
		[
			t("dialog.item_received", {
				verb: source === "finding" ? t("dialog.find") : t("dialog.receive"),
				label,
				quantity: quantity > 1 ? `x${quantity}` : "",
			}),
		],
		{
			speaker: "system",
		},
	);
}

let bookIndex = 0;

export const DESCRIPTIONS: {
	[name: string]: DialogLine[] | ((d: Description) => DialogLine[]);
} = {
	unknown: ["..?"],
	tv: [
		t("descriptions.tv.0"),
		t("descriptions.tv.1"),
		() =>
			[t("descriptions.tv.2"), t("descriptions.tv.3"), t("descriptions.tv.4")][
				++bookIndex % 3
			],
		t("descriptions.tv.5"),
	],
	frigo: [t("descriptions.frigo.0")],
	book: [
		t("descriptions.book.0"),
		() => {
			const conseils = [
				t("descriptions.book.1"),
				t("descriptions.book.2"),
				t("descriptions.book.3"),
				t("descriptions.book.4"),
				t("descriptions.book.5"),
				t("descriptions.book.6"),
				t("descriptions.book.7"),
				t("descriptions.book.8"),
				t("descriptions.book.9"),
				t("descriptions.book.10"),
				t("descriptions.book.11"),
				t("descriptions.book.12"),
				t("descriptions.book.13"),
				t("descriptions.book.14"),
				t("descriptions.book.15"),
			];
			return conseils[++bookIndex % conseils.length];
		},
	],
	book_insect: [
		t("descriptions.book_insect.0"),
		() => {
			let pokemons = gameState.player.boardAndBox
				.map((p) => p.entry)
				.filter((p) => p.evolution != null);
			if (pokemons.length === 0)
				pokemons = getNonLegendaryPokemons().filter((p) => p.evolution != null);
			const pokemon: PokemonEntry = pokemons[bookIndex % pokemons.length];
			bookIndex++;
			return t("descriptions.book_insect.1", {
				name: t(`pokemon.${pokemon.ref}`),
				level: pokemon.evolutionLevel,
			});
		},
		t("descriptions.book_insect.2"),
	],
	map: [t("descriptions.map")],
	bed: [t("descriptions.bed")],
	boat: [t("descriptions.boat")],

	starter1: pickStarter(0),
	starter2: pickStarter(1),
	starter3: pickStarter(2),

	pc_end: [
		t("descriptions.pc_end.0"),
		{
			[t("yes")]: () => [
				t("descriptions.pc_end.1"),
				() => {
					saveNewRecord();
					wait(2000)
						.then(() => fadeOut(2000))
						.then(() => {
							gameState.activeScene!.scene.start("GameOverScene");
						});
					return t("descriptions.pc_end.2");
				},
			],
			[t("no")]: () => {
				return [t("descriptions.pc_end.3")];
			},
		},
	],

	pc_record: [
		t("descriptions.pc_record.0"),
		() => {
			const record = loadRecord();
			if (!record) return t("descriptions.pc_record.1");
			return [
				t("descriptions.pc_record.2", { nbTours: record.nbTours }),
				t("descriptions.pc_record.3", {
					nbCaptured: record.pokedexCaptured,
					nbSeen: record.pokedexSeen,
				}),
				t("descriptions.pc_record.4"),
				...splitInGroups(
					record.team.map(
						(p) => `${t(`pokemon.${p.entry.ref}`)} lvl ${p.level}`,
					),
					2,
				).map((pair: string[]) => `${pair[0]}\n${pair[1]}`),
			];
		},
		t("descriptions.pc_record.5"),
	],
};
