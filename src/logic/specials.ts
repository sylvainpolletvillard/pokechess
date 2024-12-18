import Phaser from "phaser";
import { AlterationType } from "../data/alterations";
import { EFFECTS } from "../data/effects";
import { POKEMONS } from "../data/pokemons";
import { AQUALI } from "../data/pokemons/aquali";
import { PYROLI } from "../data/pokemons/pyroli";
import { VOLTALI } from "../data/pokemons/voltali";
import { SKILLS } from "../data/skills";
import { BLIZZARD_GRELON } from "../data/skills/blizzard";
import {
	TYPE_COMBAT,
	TYPE_DRAGON,
	TYPE_EAU,
	TYPE_ELECTRIQUE,
	TYPE_FEE,
	TYPE_FEU,
	TYPE_GLACE,
	TYPE_INSECTE,
	TYPE_NORMAL,
	TYPE_PLANTE,
	TYPE_POISON,
	TYPE_PSY,
	TYPE_ROCHE,
	TYPE_SOL,
	TYPE_SPECTRE,
	TYPE_VOL,
} from "../data/types";
import { drawPokeballsCounter } from "../objects/pokeballsCounter";
import {
	type PokemonOnBoard,
	makePokemonSprite,
	movePokemonSprite,
	removePokemonSprite,
} from "../objects/pokemon";
import type GameScene from "../scenes/GameScene";
import {
	Direction,
	getDeltaFromDirection,
	getDirectionFromDelta,
	getRotationAngle,
} from "../utils/directions";
import {
	clamp,
	pickNRandomIn,
	pickRandomIn,
	randomInt,
	wait,
} from "../utils/helpers";
import { addAlteration, removeAlteration } from "./alteration";
import {
	getCoordsFromPosition,
	getPokemonOnTile,
	getPositionFromCoords,
} from "./board";
import { applyDamage, calcDamage, healPokemon } from "./fight";
import { gameState } from "./gamestate";
import { distanceBetweenPokemon } from "./pathfinding";
import type { Skill } from "./skill";
import { makeEffectSprite, triggerSkill } from "./skill-anims";

export function triggerSpecial(
	specialMoveName: string,
	attacker: PokemonOnBoard,
	target: PokemonOnBoard,
	game: GameScene,
) {
	switch (specialMoveName) {
		case "teleport":
			return teleport(attacker, game);
		case "tunnel":
			return tunnel(attacker, target, game);
		case "eclair":
			return eclair(attacker, game);
		case "provoc":
			return provoc(attacker, game);
		case "encore":
			return encore(attacker, target, game);
		case "metronome":
			return metronome(attacker, target, game);
		case "e-coque":
			return eCoque(attacker, game);
		case "amnesie":
			return amnesie(attacker);
		case "ultralaser":
			return renderUltralaser(attacker, target, game);
		case "laser_glace":
			return renderLaserGlace(attacker, target, game);
		case "jackpot":
			return jackpot(attacker, game);
		case "morphing":
			return morphing(attacker, target, game);
		case "evolution":
			return evolution(attacker, target, game);
		case "psyko":
			return psyko(attacker, game);
		case "deflagration":
			return deflagration(attacker, game);
		case "blizzard":
			return blizzard(attacker, game);
		case "fatal_foudre":
			return fatalFoudre(attacker, game);
	}
}

export function teleport(pokemon: PokemonOnBoard, game: GameScene) {
	const { x: originX, y: originY } = pokemon;
	let x: number;
	let y: number;
	do {
		// find random empty tile
		x = randomInt(0, 6);
		y = randomInt(0, 7);
	} while (x === originX || y === originY || getPokemonOnTile(x, y) != null);

	pokemon.makeUntargettable(150);

	const [sceneX, sceneY] = getPositionFromCoords(x, y);
	const sprite = makeEffectSprite(EFFECTS.TELEPORT, sceneX, sceneY, game);
	sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
		sprite.destroy();
		movePokemonSprite(pokemon, x, y, game);
	});
}

export function tunnel(
	pokemon: PokemonOnBoard,
	target: PokemonOnBoard | null,
	game: GameScene,
) {
	const { x: originX, y: originY } = pokemon;
	let x: number;
	let y: number;
	do {
		// find random empty tile
		x = randomInt(0, 6);
		y = randomInt(0, 7);
	} while (x === originX || y === originY || getPokemonOnTile(x, y) != null);

	const pokemonSprite = game.sprites.get(
		pokemon.uid,
	) as Phaser.GameObjects.Sprite;
	game.tweens.add({
		targets: pokemonSprite,
		scale: 0,
		duration: 250,
		easing: "Linear",
	});
	makeEffectSprite(EFFECTS.TUNNEL, pokemonSprite.x, pokemonSprite.y + 8, game);

	wait(150).then(() => pokemon.makeUntargettable(850));

	if (target) {
		wait(450).then(() => {
			const targetSprite = game.sprites.get(
				target.uid,
			) as Phaser.GameObjects.Sprite;
			if (targetSprite)
				makeEffectSprite(
					EFFECTS.TUNNEL,
					targetSprite.x,
					targetSprite.y + 8,
					game,
				);
		});
	}

	wait(850).then(() => {
		if (!pokemon.alive) return; // too late im dead
		const [sceneX, sceneY] = getPositionFromCoords(x, y);
		makeEffectSprite(EFFECTS.TUNNEL, sceneX, sceneY, game);
		movePokemonSprite(pokemon, x, y, game);
		game.tweens.add({
			targets: pokemonSprite,
			scale: 1,
			duration: 250,
			easing: "Linear",
		});
	});
}

export function eclair(attacker: PokemonOnBoard, game: GameScene) {
	const randomTarget = pickRandomIn(gameState.board.otherTeam);
	const [x, y] = randomTarget.position;
	renderEclair(attacker, x, y, game);
	const damage = calcDamage(SKILLS.ECLAIR, randomTarget, attacker);
	applyDamage(damage, randomTarget, attacker);
	addAlteration(
		randomTarget,
		{ type: AlterationType.PARALYSIE, stacks: 50, attacker },
		game,
	);
	/*console.log(
		`Eclair sur ${randomTarget.entry.ref} ; ${randomTarget.entry.ref} receives ${damage} damage !`,
	);*/
}

export function renderEclair(
	attacker: PokemonOnBoard,
	x: number,
	y: number,
	game: GameScene,
) {
	y -= 16;
	while (y >= 0) {
		makeEffectSprite(EFFECTS.ECLAIR, x, y, game);
		y -= 32;
	}
}

export function provoc(attacker: PokemonOnBoard, game: GameScene) {
	const pokemonsProvocated = gameState.board.otherTeam.filter(
		(p) => distanceBetweenPokemon(attacker, p) <= Math.sqrt(8),
	);
	//console.log("PROVOC", { pokemonsProvocated })
	for (const pokemon of pokemonsProvocated) {
		const provocatedSprite = makeEffectSprite(
			EFFECTS.PROVOCATED,
			pokemon.x + 8,
			pokemon.y,
			game,
		);
		wait(500).then(() => provocatedSprite.destroy());
		if (pokemon.nextAction.timer) {
			wait(pokemon.nextAction.timer.getRemaining()).then(() => {
				pokemon.resetTarget(attacker);
			});
		} else {
			pokemon.resetTarget(attacker);
		}
	}
}

let lastSkillSeen: Skill = SKILLS.TREMPETTE;
export function recordLastSkillSeen(skill: Skill) {
	if (skill !== SKILLS.ENCORE) lastSkillSeen = skill;
}

export function encore(
	attacker: PokemonOnBoard,
	target: PokemonOnBoard,
	game: GameScene,
) {
	//console.log("Encore: " + lastSkillSeen.ref);
	return wait(500).then(() =>
		triggerSkill(lastSkillSeen, attacker, target, game),
	);
}

const PP_SKILLS = Object.values(SKILLS).filter((skill) =>
	POKEMONS.some((p) => p.ppSkill === skill),
);

export function metronome(
	attacker: PokemonOnBoard,
	target: PokemonOnBoard,
	game: GameScene,
) {
	const randomSkill = pickRandomIn(PP_SKILLS);
	lastSkillSeen = randomSkill;
	//console.log("Metronome: " + randomSkill.ref);
	return triggerSkill(randomSkill, attacker, target, game);
}

export function eCoque(attacker: PokemonOnBoard, game: GameScene) {
	attacker.team.forEach((pokemon) =>
		addAlteration(
			pokemon,
			{ type: AlterationType.SOIN, stacks: 60, attacker },
			game,
		),
	);
}

export function amnesie(pokemon: PokemonOnBoard) {
	pokemon.alterations.forEach((alt) => removeAlteration(pokemon, alt));
}

export function renderUltralaser(
	attacker: PokemonOnBoard,
	target: PokemonOnBoard,
	game: GameScene,
) {
	const direction =
		getDirectionFromDelta(target.x - attacker.x, target.y - attacker.y) ??
		Direction.UP;
	let [x, y] = attacker.position;
	const [dx, dy] = getDeltaFromDirection(direction);
	x += dx * 16;
	y += dy * 16;
	let part = 0;

	while (y >= 0 && y <= game.scale.height && x >= 0 && x <= game.scale.width) {
		const sprite = makeEffectSprite(
			part === 0 ? EFFECTS.ULTRALASER_START : EFFECTS.ULTRALASER_BEAM,
			x,
			y,
			game,
		);
		sprite.setRotation(getRotationAngle(direction));

		const [i, j] = getCoordsFromPosition(x, y);
		const pokemonOnTile = getPokemonOnTile(i, j);
		if (pokemonOnTile && pokemonOnTile.owner !== attacker.owner) {
			const damage = calcDamage(SKILLS.ULTRALASER, pokemonOnTile, attacker);
			/*console.log(
				`Ultralaser sur ${pokemonOnTile.entry.ref} ; ${pokemonOnTile.entry.ref} receives ${damage} damage !`,
			);*/
			applyDamage(damage, pokemonOnTile, attacker);
		}

		y += dy * 32;
		x += dx * 32;
		part++;
	}
}

export function renderLaserGlace(
	attacker: PokemonOnBoard,
	target: PokemonOnBoard,
	game: GameScene,
) {
	const direction =
		getDirectionFromDelta(target.x - attacker.x, target.y - attacker.y) ??
		Direction.UP;
	let [x, y] = attacker.position;
	const [dx, dy] = getDeltaFromDirection(direction);
	x += dx * 16;
	y += dy * 16;
	let part = 0;

	while (y >= 0 && y <= game.scale.height && x >= 0 && x <= game.scale.width) {
		const sprite = makeEffectSprite(
			part === 0 ? EFFECTS.LASER_GLACE_START : EFFECTS.LASER_GLACE_BEAM,
			x,
			y,
			game,
		);
		sprite.setRotation(getRotationAngle(direction));

		const [i, j] = getCoordsFromPosition(x, y);
		const pokemonOnTile = getPokemonOnTile(i, j);
		if (pokemonOnTile && pokemonOnTile.owner !== attacker.owner) {
			const damage = calcDamage(SKILLS.LASER_GLACE, pokemonOnTile, attacker);
			/*console.log(
				`Laser glace sur ${pokemonOnTile.entry.ref} ; ${pokemonOnTile.entry.ref} receives ${damage} damage !`,
			);*/
			applyDamage(damage, pokemonOnTile, attacker);
			addAlteration(
				pokemonOnTile,
				{ type: AlterationType.GEL, stacks: 50, attacker },
				game,
			);
		}

		y += dy * 32;
		x += dx * 32;
		part++;
	}
}

export function jackpot(attacker: PokemonOnBoard, game: GameScene) {
	const coinFlip = Math.random() < 1 / 2;
	const [x, y] = attacker.position;
	makeEffectSprite(
		coinFlip ? EFFECTS.JACKPOT_WIN : EFFECTS.JACKPOT_LOSE,
		x,
		y - 24,
		game,
	);

	if (coinFlip) {
		gameState.player.inventory.pokeball += 1;
		drawPokeballsCounter();
	}
}

export function morphing(
	attacker: PokemonOnBoard,
	target: PokemonOnBoard,
	game: GameScene,
) {
	attacker.initialEntry = attacker.entry;
	attacker.entry = target.entry;
	removePokemonSprite(attacker, game);
	const newSprite = makePokemonSprite(attacker, game);
	newSprite.play(`${attacker.entry.ref}_${attacker.facingDirection}`);
	game.sprites.set(attacker.uid, newSprite);
}

export function evolution(
	attacker: PokemonOnBoard,
	target: PokemonOnBoard,
	game: GameScene,
) {
	// choisir entre aquali voltali pyroli selon la cible
	const EVOLI_MAPPING = new Map([
		[TYPE_COMBAT, AQUALI],
		[TYPE_DRAGON, VOLTALI],
		[TYPE_EAU, VOLTALI],
		[TYPE_ELECTRIQUE, PYROLI],
		[TYPE_FEE, VOLTALI],
		[TYPE_FEU, AQUALI],
		[TYPE_GLACE, PYROLI],
		[TYPE_INSECTE, PYROLI],
		[TYPE_NORMAL, VOLTALI],
		[TYPE_PLANTE, PYROLI],
		[TYPE_POISON, VOLTALI],
		[TYPE_PSY, AQUALI],
		[TYPE_ROCHE, AQUALI],
		[TYPE_SOL, AQUALI],
		[TYPE_SPECTRE, PYROLI],
		[TYPE_VOL, VOLTALI],
	]);

	attacker.entry = EVOLI_MAPPING.get(target.types[0]) ?? PYROLI;
	healPokemon(attacker, 0.2 * attacker.maxPV);
	removePokemonSprite(attacker, game);
	const newSprite = makePokemonSprite(attacker, game);
	newSprite.play(`${attacker.entry.ref}_${attacker.facingDirection}`);
	game.sprites.set(attacker.uid, newSprite);
}

export function psyko(attacker: PokemonOnBoard, game: GameScene) {
	attacker.opponents.forEach((target) => {
		game.cameras.main.flash(250, 255, 0, 255);
		addAlteration(
			target,
			{ type: AlterationType.CONFUSION, stacks: 40, attacker },
			game,
		);
		wait(SKILLS.PSYKO.hitDelay).then(() => {
			const damage = calcDamage(SKILLS.PSYKO, target, attacker);
			/*console.log(
				`Psyko sur ${target.entry.ref} ; ${target.entry.ref} receives ${damage} damage !`,
			);*/
			applyDamage(damage, target, attacker);
		});
	});
}

export function deflagration(attacker: PokemonOnBoard, game: GameScene) {
	const eruptionsCoords: [number, number][] = [];
	attacker.opponents.forEach((target) => {
		addAlteration(
			target,
			{ type: AlterationType.BRULURE, stacks: 60, attacker },
			game,
		);
		eruptionsCoords.push([target.x, target.y]);
	});

	game.cameras.main.flash(250, 255, 0, 0);
	eruptionsCoords.reduce((promise: Promise<void>, [i, j]) => {
		return promise.then(() => {
			const [x, y] = getPositionFromCoords(i, j);
			const effectSprite = makeEffectSprite(
				EFFECTS.ERUPTION_PENDING,
				x,
				y - 16,
				game,
			);
			wait(1500)
				.then(() => {
					effectSprite.play(EFFECTS.ERUPTION);
				})
				.then(() => wait(100))
				.then(() => {
					const pokemonOnTile = getPokemonOnTile(i, j);
					if (pokemonOnTile) {
						const damage = calcDamage(
							SKILLS.DEFLAGRATION,
							pokemonOnTile,
							attacker,
						);
						/*console.log(
							`Eruption sur ${pokemonOnTile.entry.ref} ; ${pokemonOnTile.entry.ref} receives ${damage} damage !`,
						);*/
						applyDamage(damage, pokemonOnTile, attacker);
					}
				});

			return wait(100);
		});
	}, wait(10));
}

export function blizzard(attacker: PokemonOnBoard, game: GameScene) {
	const grelonsCoords: [number, number][] = [];
	attacker.opponents.forEach((target) => {
		addAlteration(
			target,
			{
				type: AlterationType.GEL,
				stacks: clamp(80 - target.speed, 20, 60),
				attacker,
			},
			game,
		);
		grelonsCoords.push([target.x, target.y]);
	});

	game.cameras.main.flash(250, 64, 128, 255);
	return grelonsCoords.reduce((promise: Promise<void>, [i, j]) => {
		const [targetX, targetY] = getPositionFromCoords(i, j);
		const originX = targetX - game.scale.width / 2;
		const originY = targetY - game.scale.height;

		return promise
			.then(() => wait(100))
			.then(() => {
				const grelonSprite = makeEffectSprite(
					EFFECTS.GRELON,
					originX,
					originY,
					game,
					true,
				);
				const tween = game.tweens.add({
					targets: grelonSprite,
					x: targetX,
					y: targetY,
					duration: 1500,
					ease: "Linear",
					onComplete() {
						game.tweens.remove(tween);
						if (BLIZZARD_GRELON.hitEffect) {
							grelonSprite.play(BLIZZARD_GRELON.hitEffect.key);
							grelonSprite.once(
								Phaser.Animations.Events.ANIMATION_COMPLETE,
								() => grelonSprite.destroy(),
							);
						}

						const pokemonOnTile = getPokemonOnTile(i, j);
						if (pokemonOnTile) {
							const damage = calcDamage(
								SKILLS.BLIZZARD,
								pokemonOnTile,
								attacker,
							);
							/*console.log(
								`Grelon sur ${pokemonOnTile.entry.ref} ; ${pokemonOnTile.entry.ref} receives ${damage} damage !`,
							);*/
							applyDamage(damage, pokemonOnTile, attacker);
						}
					},
				});
			});
	}, wait(10));
}

export function fatalFoudre(attacker: PokemonOnBoard, game: GameScene) {
	attacker.opponents.forEach((target) => {
		addAlteration(
			target,
			{ type: AlterationType.PARALYSIE, stacks: 40, attacker },
			game,
		);
	});
	const NUMBER_ECLAIRS = 3;
	const randomTargets = pickNRandomIn(attacker.opponents, NUMBER_ECLAIRS);

	game.cameras.main.flash(255, 255, 192, 192);
	return randomTargets.reduce((promise: Promise<void>, randomTarget) => {
		const [x, y] = randomTarget.position;
		return promise
			.then(() => {
				renderEclair(attacker, x, y, game);
				const damage = calcDamage(SKILLS.FATAL_FOUDRE, randomTarget, attacker);
				applyDamage(damage, randomTarget, attacker);
				/*console.log(
					`Fatal-foudre sur ${randomTarget.entry.ref} ; ${randomTarget.entry.ref} receives ${damage} damage !`,
				);*/
			})
			.then(() => wait(randomInt(300, 500)));
	}, wait(250));
}
