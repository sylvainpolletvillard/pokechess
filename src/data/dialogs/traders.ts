import { t } from "../../i18n";
import { pauseMusicAndPlaySound } from "../../logic/audio";
import { startDialog } from "../../logic/dialog";
import { gameState } from "../../logic/gamestate";
import type { Trader } from "../../objects/character";
import { OWNER_PLAYER } from "../owners";
import { Pokemon } from "../pokemons";

export const TRADER = (character: Trader) =>
	startDialog(
		[
			() => {
				const pokemonGiven = character.pokemonToGive;
				if (character.hasExchanged) {
					return t("dialog.trader.aftertrade", {
						name: t("pokemon." + character.pokemonToReceive.ref),
					});
				}

				if (pokemonGiven == null)
					return [
						t("dialog.trader.nopokemon.0"),
						t("dialog.trader.nopokemon.1"),
					];

				const pokemonReceived = new Pokemon({
					entry: character.pokemonToReceive,
					owner: OWNER_PLAYER,
					xp: pokemonGiven.xp,
					item: pokemonGiven.item ?? undefined,
					shouldAutoEvolve: true,
				});
				return [
					t("dialog.trader.tradepropose", {
						given: t("pokemon." + pokemonGiven.entry.ref),
						received: t("pokemon." + pokemonReceived.entry.ref),
					}),
					{
						OUI: () => [
							() => {
								pauseMusicAndPlaySound("pokemon_received");
								const index = gameState.player.box.indexOf(pokemonGiven);
								delete gameState.player.box[index];
								gameState.player.box[index] = pokemonReceived;
								character.hasExchanged = true;
								return startDialog(
									[
										t("dialog.trader.tradeaccepted", {
											given: t("pokemon." + pokemonGiven.entry.ref),
											received: t("pokemon." + pokemonReceived.entry.ref),
										}),
									],
									{ speaker: "system" },
								);
							},
							t("dialog.trader.aftertrade", {
								name: t("pokemon." + pokemonGiven.entry.ref),
							}),
						],
						NON: () => ["Ah, bon tant pis."],
					},
				];
			},
		],
		{
			speaker: `character${6 + ((gameState.currentDestination.shopId ?? 0) % 10)}`,
		},
	);
