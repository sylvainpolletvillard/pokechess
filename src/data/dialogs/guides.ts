import { t } from "../../i18n";
import { pauseMusicAndPlaySound } from "../../logic/audio";
import { addToBox } from "../../logic/box";
import { startDialog } from "../../logic/dialog";
import { gameState } from "../../logic/gamestate";
import type { DialogLine } from "../../types/dialog";
import { ARGENTA } from "../destinations/argenta";
import { AZURIA } from "../destinations/azuria";
import { CARMIN } from "../destinations/carmin";
import { CELADOPOLE } from "../destinations/celadopole";
import { CRAMOISILE } from "../destinations/cramoisile";
import { JADIELLE } from "../destinations/jadielle";
import { LAVANVILLE } from "../destinations/lavanville";
import { LIGUE } from "../destinations/ligue";
import { PARMANIE } from "../destinations/parmanie";
import { SAFRANIA } from "../destinations/safrania";
import {
	FOSSILES,
	FOSSILE_AMONITA,
	FOSSILE_KABUTO,
	FOSSILE_PTERA,
} from "../items";
import { OWNER_PLAYER } from "../owners";
import { Pokemon } from "../pokemons";
import { AMONITA } from "../pokemons/amonita";
import { KABUTO } from "../pokemons/kabuto";
import { PTERA } from "../pokemons/ptera";

export const GUIDE = () =>
	startDialog(GUIDES[gameState.currentDestination.ref] || [t("dialog.salut")], {
		speaker: `character${16 + ((gameState.currentDestination.shopId ?? 0) % 10)}`,
	});

export const GUIDES: { [destination: string]: DialogLine[] } = {
	[JADIELLE.ref]: [
		t("dialog.guide.jadielle.0"),
		t("dialog.guide.jadielle.1"),
		t("dialog.guide.jadielle.2"),
	],
	[ARGENTA.ref]: [
		t("dialog.guide.argenta.0"),
		t("dialog.guide.argenta.1"),
		t("dialog.guide.argenta.2"),
		t("dialog.guide.argenta.3"),
	],
	[AZURIA.ref]: [
		t("dialog.guide.azuria.0"),
		t("dialog.guide.azuria.1"),
		t("dialog.guide.azuria.2"),
		t("dialog.guide.azuria.3"),
	],
	[LAVANVILLE.ref]: [
		t("dialog.guide.lavanville.0"),
		t("dialog.guide.lavanville.1"),
	],
	[SAFRANIA.ref]: [
		t("dialog.guide.safrania.0"),
		t("dialog.guide.safrania.1"),
		t("dialog.guide.safrania.2"),
	],
	[CELADOPOLE.ref]: [
		t("dialog.guide.celadopole.0"),
		t("dialog.guide.celadopole.1"),
		t("dialog.guide.celadopole.2"),
		t("dialog.guide.celadopole.3"),
	],
	[CARMIN.ref]: [t("dialog.guide.carmin.0"), t("dialog.guide.carmin.1")],
	[PARMANIE.ref]: [
		t("dialog.guide.parmanie.0"),
		t("dialog.guide.parmanie.1"),
		t("dialog.guide.parmanie.2"),
		t("dialog.guide.parmanie.3"),
	],
	[CRAMOISILE.ref]: [
		t("dialog.guide.cramoisile.0"),
		t("dialog.guide.cramoisile.1"),
		() => {
			const fossile = FOSSILES.find(
				(item) => gameState.player.inventory[item.ref] > 0,
			);
			if (fossile && gameState.player.box.some((slot) => slot === null)) {
				return [
					t("dialog.guide.cramoisile.2"),
					t("dialog.guide.cramoisile.3"),
					"...",
					t("dialog.guide.cramoisile.4"),
					t("dialog.guide.cramoisile.5"),
					t("dialog.guide.cramoisile.6"),
					{
						[t("yes")]: () => {
							return [
								t("dialog.guide.cramoisile.7"),
								() => {
									gameState.activeScene!.cameras.main.flash(1000, 0, 0, 0);
									gameState.player.inventory[fossile.ref] -= 1;
									const FOSSILE_MAPPING = {
										[FOSSILE_AMONITA.ref]: AMONITA,
										[FOSSILE_KABUTO.ref]: KABUTO,
										[FOSSILE_PTERA.ref]: PTERA,
									};
									const pokemon = new Pokemon({
										entry: FOSSILE_MAPPING[fossile.ref]!,
										owner: OWNER_PLAYER,
										level: 30,
									});
									addToBox(pokemon);
									return [
										"!!!",
										t("dialog.guide.cramoisile.8"),
										t("dialog.guide.cramoisile.9", {
											name: t(`pokemon.${pokemon.entry.ref}`),
										}),
										t("dialog.guide.cramoisile.10"),
										t("dialog.guide.cramoisile.11"),
										() => {
											pauseMusicAndPlaySound("pokemon_received");
											return startDialog(
												[
													t("dialog.guide.cramoisile.12", {
														name: t(`pokemon.${pokemon.entry.ref}`),
													}),
												],
												{ speaker: "system" },
											);
										},
										t("dialog.guide.cramoisile.13"),
									];
								},
							];
						},
						[t("no")]: () => {
							return [t("dialog.guide.cramoisile.14")];
						},
					},
				];
			}

			return [t("dialog.guide.cramoisile.15"), t("dialog.guide.cramoisile.16")];
		},
	],

	[LIGUE.ref]: [
		t("dialog.guide.ligue.0"),
		{
			[t("yes")]: () => [
				t("dialog.guide.ligue.1"),
				t("dialog.guide.ligue.2"),
				t("dialog.guide.ligue.3"),
				t("dialog.guide.ligue.4"),
				t("dialog.guide.ligue.5"),
				t("dialog.guide.ligue.6"),
				t("dialog.guide.ligue.7"),
				t("dialog.guide.ligue.8"),
				t("dialog.guide.ligue.9"),
				t("dialog.guide.ligue.10"),
				t("dialog.guide.ligue.11"),
			],
			[t("no")]: () => [t("dialog.guide.ligue.12")],
		},
	],
};

export const HEALER = () =>
	startDialog([t("dialog.healer.0"), t("dialog.healer.1")], {
		speaker: "female2",
	});
