import { CHEN_DIALOG_STATE } from "../data/dialogs/chen";
import { OWNER_CHEN, OWNER_PLAYER } from "../data/owners";
import { Pokemon, type PokemonEntry } from "../data/pokemons";
import { ABRA } from "../data/pokemons/abra";
import { BULBIZARRE } from "../data/pokemons/bulbizarre";
import { CARAPUCE } from "../data/pokemons/carapuce";
import { CHENIPAN } from "../data/pokemons/chenipan";
import { FANTOMINUS } from "../data/pokemons/fantominus";
import { MACHOC } from "../data/pokemons/machoc";
import { MELOFEE } from "../data/pokemons/melofee";
import { MIAOUSS } from "../data/pokemons/miaouss";
import { MINIDRACO } from "../data/pokemons/minidraco";
import { NIDORAN_MALE } from "../data/pokemons/nidoranm";
import { OTARIA } from "../data/pokemons/otaria";
import { PIKACHU } from "../data/pokemons/pikachu";
import { RACAILLOU } from "../data/pokemons/racaillou";
import { ROUCOOL } from "../data/pokemons/roucool";
import { SABELETTE } from "../data/pokemons/sabelette";
import { SALAMECHE } from "../data/pokemons/salameche";
import { t } from "../i18n";
import type { Description } from "../objects/description";
import { PokemonOnBoard } from "../objects/pokemon";
import { displayPokemonInfo, hidePokemonInfo } from "../objects/pokemonInfoBox";
import { pickNRandomIn } from "../utils/helpers";
import { pauseMusicAndPlaySound } from "./audio";
import { addToTeam } from "./box";
import { waitBeforeNextLine } from "./dialog";
import { gameState } from "./gamestate";

const STARTERS = [
	BULBIZARRE,
	SALAMECHE,
	CARAPUCE,
	NIDORAN_MALE,
	CHENIPAN,
	PIKACHU,
	MINIDRACO,
	MELOFEE,
	MACHOC,
	ROUCOOL,
	FANTOMINUS,
	SABELETTE,
	OTARIA,
	MIAOUSS,
	ABRA,
	RACAILLOU,
];

export function pickStarters(): PokemonEntry[] {
	return pickNRandomIn(STARTERS, 3);
}

export const pickStarter = (index: number) => (desc: Description) => {
	if (gameState.player.team.length > 0)
		return [
			t("dialog.starter.after", {
				name: t(`pokemon.${gameState.starters[index].ref}`),
			}),
		]; // already picked one starter
	return [
		() => {
			const starter = gameState.starters[index];
			displayPokemonInfo(
				new Pokemon({
					entry: starter,
					owner: OWNER_CHEN,
					level: 5,
				}),
			);
			return t("dialog.starter.choose", { name: t(`pokemon.${starter.ref}`) });
		},
		{
			[t("yes")]: () => {
				const starter = gameState.starters[index];
				addToTeam(
					new PokemonOnBoard({
						entry: starter,
						owner: OWNER_PLAYER,
						level: 5,
						x: 3,
						y: 6,
					}),
				);
				hidePokemonInfo();
				desc.sprite.destroy(true);
				gameState.dialogStates.chen = CHEN_DIALOG_STATE.after_starter_choice;
				pauseMusicAndPlaySound("pokemon_received");
				waitBeforeNextLine(2000);
				return t("dialog.starter.chosen", {
					name: t(`pokemon.${starter.ref}`),
				});
			},
			[t("no")]: () => hidePokemonInfo(),
		},
	];
};
