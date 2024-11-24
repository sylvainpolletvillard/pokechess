import { Z } from "../data/depths";
import { OWNER_PLAYER } from "../data/owners";
import { gameState } from "../logic/gamestate";
import { getStats } from "../logic/stats";
import type { MyScene } from "../scenes/MyScene";
import { addText } from "../utils/text";
import { tweenFadeIn, tweenFadeOut } from "../utils/tweens";
import type { PokemonOnBoard } from "./pokemon";

let box: Phaser.GameObjects.Group | null;

export function drawFightStats() {
	const scene = gameState.activeScene as MyScene;

	box = scene.add.group();

	const oy = 7;
	const ox = 50;

	const stats = getStats();
	const playerTeam = stats.pokemons
		.filter((p) => p.owner === OWNER_PLAYER)
		.sort(
			(a, b) =>
				(stats.damageDone.get(b.uid) ?? 0) - (stats.damageDone.get(a.uid) ?? 0),
		);
	const otherTeam = stats.pokemons
		.filter((p) => p.owner !== OWNER_PLAYER)
		.sort(
			(a, b) =>
				(stats.damageDone.get(a.uid) ?? 0) - (stats.damageDone.get(b.uid) ?? 0),
		);
	const maxDamageDone = Math.max(...stats.damageDone.values());
	const maxDamageReceived = Math.max(...stats.damageReceived.values());
	const maxDamage = Math.max(maxDamageDone, maxDamageReceived, 100);

	for (let i = 0; i < 6; i++) {
		drawPokemonStats(playerTeam[i], ox, oy + 132 + 5 + i * 22, true);
	}
	for (let i = 0; i < 6; i++) {
		drawPokemonStats(otherTeam[i], ox, oy + 5 + i * 22, false);
	}

	function drawPokemonStats(
		pokemon: PokemonOnBoard,
		x: number,
		y: number,
		playerSide: boolean,
	) {
		if (!pokemon) return;
		const px = playerSide ? x : x + 220 - 64;
		const py = y - (pokemon.entry.portraitCropY ?? 16) + 1;

		const portraitBackground = scene.add.graphics().setDepth(Z.MENU_LAYOUT);
		portraitBackground
			.fillStyle(0xe8e1d1)
			.lineStyle(1, 0x4e4b46)
			.fillRect(px, y, 64, 22)
			.strokeRect(px, y, 64, 22);
		box?.add(portraitBackground);

		const sprite = scene.add.sprite(px, py, "pokemon_portraits");
		sprite.setOrigin(0, 0);
		sprite.setCrop(0, pokemon.entry.portraitCropY ?? 16, 64, 21);
		sprite.play(pokemon.entry.ref + "_portrait");
		sprite.setDepth(Z.MENU_OBJECTS);
		if (playerSide) sprite.flipX = true;
		box?.add(sprite);

		const maxWidth = 130;
		const damageDone = stats.damageDone.get(pokemon.uid) ?? 0;

		const rx = playerSide ? x + 64 : x + 220 - 65;
		const bars = scene.add.graphics();
		bars.setDepth(Z.MENU_OBJECTS).setScrollFactor(0);
		box?.add(bars);

		const numberStyle = { color: "white", stroke: "black", strokeThickness: 2 };

		const w1 = (maxWidth * damageDone) / maxDamage;
		bars
			.fillStyle(0xff0000)
			.lineStyle(1, 0x4e4b46)
			.fillRect(playerSide ? rx : rx - w1 + 1, y + 6, w1, 10)
			.strokeRect(playerSide ? rx : rx - w1 + 1, y + 6, w1, 10);
		const text1 = addText(
			playerSide ? rx + w1 + 2 : rx - w1 - 2,
			y + 11,
			damageDone.toFixed(0),
			numberStyle,
		)
			.setOrigin(playerSide ? 0 : 1, 0.5)
			.setDepth(Z.MENU_TOOLTIPS);
		box?.add(text1);

		/*const damageReceived = stats.damageReceived.get(pokemon.uid) ?? 0
        let w2 = maxWidth*damageReceived/maxDamage;
        bars.fillStyle(0x0094FF).fillRect(playerSide ? rx : rx-w2, y+11, w2, 10)
        let text2 = addText(playerSide ? rx+w2+2 : rx-w2-2, y+15, damageReceived.toFixed(0), numberStyle).setOrigin(playerSide ? 0 : 1, 0.5).setDepth(Z.MENU_TOOLTIPS)
        box?.add(text2)
        */
	}

	box.setDepth(Z.MENU);
	tweenFadeIn(scene, box, 500);
}

export function hideStatsBox() {
	if (!box) return;
	const scene = gameState.activeScene as MyScene;
	tweenFadeOut(scene, box, 500).then(() => {
		if (!box) return;
		box.destroy(true);
		box = null;
	});
}
