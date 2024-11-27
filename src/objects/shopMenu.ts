import { receiveItem } from "../data/dialogs/descriptions";
import { ITEMS, type Item } from "../data/items";
import { t } from "../i18n";
import { playSound } from "../logic/audio";
import { endDialog, startDialog, waitBeforeNextLine } from "../logic/dialog";
import { gameState } from "../logic/gamestate";
import { canAfford, getShopContent, spend } from "../logic/shop";
import { wait } from "../utils/helpers";
import { addText } from "../utils/text";
import { hideItemDescription, showItemDescription } from "./itemDescriptionBox";
import { type MenuEntry, closeMenu, openMenu, type Menu } from "./menu";
import { drawPokeballsCounter } from "./pokeballsCounter";

export function openBuyMenu(seller: string): Menu | void {
	if (!gameState.currentDestination.shopId) {
		console.error("Missing shopId");
		return;
	}
	drawPokeballsCounter();
	const rowHeight = 20;
	const width = 144;
	const height = 6 * rowHeight + 8;
	const ox = 320 - width - 8;
	const oy = 8;
	const items = getShopContent(gameState.currentDestination.shopId);
	const entries: MenuEntry[] = Object.entries(items).map(
		([itemRef, quantity], i) => ({
			x: 4,
			y: 4 + i * rowHeight,
			label: t(`item.${itemRef}`),
			value: itemRef,
		}),
	);
	entries.push({
		x: 4,
		y: 4 + entries.length * rowHeight,
		label: t("menu.quit"),
	});

	playSound("menu_open");
	return openMenu({
		ref: "shop_buy",
		x: ox,
		y: oy,
		width,
		height,
		background: "box1",
		offset: 8,
		entries,
		draw(container) {
			entries.forEach((entry, i) => {
				if (!entry.value) return;
				const item = ITEMS[entry.value];
				const pokeball = container.scene.add
					.sprite(ox + 114, oy + 15 + i * rowHeight, "pokeball", 0)
					.play("POKEBALL_idle")
					.setScrollFactor(0);
				const cost = addText(320 - 28, 17 + i * rowHeight, `x${item.cost}`, {
					color: canAfford(item.cost!) ? "black" : "red",
				});
				container.add(pokeball);
				container.add(cost);
			});
		},
		handleChoice(choice) {
			hideItemDescription();

			if (!choice.value) return; // Quitter

			const item = ITEMS[choice.value] as Item;
			if (!item.cost) return;

			waitBeforeNextLine(1600);
			startDialog(
				[
					t("dialog.shop.confirm", {
						item: t(`item.${item.ref}`),
						count: item.cost,
					}),
					{
						[t("yes")]: () => {
							if (!canAfford(item.cost!)) return t("dialog.shop.nomoney");
							endDialog();
							spend(item.cost!);
							return receiveItem(item, 1, true, "shop").then(() => {
								openBuyMenu(seller);
							});
						},
						[t("no")]: () =>
							wait(100).then(() => {
								endDialog();
								openBuyMenu(seller);
							}),
					},
				],
				{ speaker: seller },
			);
		},
		handleCancel() {
			hideItemDescription();
			closeMenu();
		},
		onSelect(entry) {
			if (!entry.value) return;
			const item = ITEMS[entry.value];
			if (item) showItemDescription(item);
			else hideItemDescription();
		},
	});
}
