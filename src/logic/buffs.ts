import { type Alteration, AlterationType } from "../data/alterations";
import { EFFECTS } from "../data/effects";
import {
	ATTAQUE_PLUS,
	BAIE_MEPO,
	BAIE_ORAN,
	BAIE_SITRUS,
	BOULE_FUMEE,
	DEFENSE_PLUS,
	ENCENS_FLEUR,
	GRELOT_COQUE,
	ITEM_PARAPLUIE,
	MAX_ELIXIR,
	ORBE_FLAMME,
	ORBE_FOUDRE,
	ORBE_TOXIQUE,
	PV_PLUS,
	VITESSE_PLUS,
} from "../data/items";
import { OWNER_PLAYER } from "../data/owners";
import {
	TYPE_COMBAT,
	TYPE_DRAGON,
	TYPE_ELECTRIQUE,
	TYPE_FEE,
	TYPE_FEU,
	TYPE_GLACE,
	TYPE_PLANTE,
	TYPE_PSY,
	TYPE_ROCHE,
	TYPE_SOL,
	TYPE_SPECTRE,
	TYPE_VOL,
} from "../data/types";
import type { PokemonOnBoard } from "../objects/pokemon";
import type GameScene from "../scenes/GameScene";
import { defer, removeInArray, wait } from "../utils/helpers";
import { addAlteration } from "./alteration";
import { playSound } from "./audio";
import { getPokemonOnTile, isOnBoard } from "./board";
import { applyDamage, healPokemon } from "./fight";
import { gameState } from "./gamestate";
import type { Skill } from "./skill";
import { makeEffectSprite } from "./skill-anims";
import { tunnel } from "./specials";

export type OnHitEffect = (params: {
	attacker: PokemonOnBoard;
	target: PokemonOnBoard;
	damage: number;
	skill: Skill;
}) => void;

export type OnHitReceivedEffect = {
	(params: { damage: number; attacker: PokemonOnBoard; skill: Skill }): void;
	count?: number;
};
export type ClockEffect = () => void;

export interface Buffs {
	attack: (() => number)[];
	defense: (() => number)[];
	speed: (() => number)[];
	dodge: (() => number)[];
	onHit: OnHitEffect[];
	onHitReceived: OnHitReceivedEffect[];
	clock: ClockEffect[];
}

export function resetBuffs(): Buffs {
	return {
		onHit: [],
		onHitReceived: [],
		clock: [],
		attack: [],
		defense: [],
		speed: [],
		dodge: [],
	};
}

export function applyBuffs(pokemon: PokemonOnBoard) {
	const game = gameState.activeScene as GameScene;
	const alliances =
		pokemon.owner === OWNER_PLAYER
			? gameState.board.playerAlliances
			: gameState.board.otherTeamAlliances;
	pokemon.buffs = resetBuffs();

	// ITEMS

	// BAIES
	if (pokemon.item === BAIE_SITRUS) {
		const baie: OnHitReceivedEffect = ({ damage }) => {
			if (pokemon.pv - damage < 0.5 * pokemon.maxPV) {
				pokemon.item = null;
				playSound("heal_ailment");
				healPokemon(pokemon, 0.25 * pokemon.maxPV);
				defer(() => removeInArray(pokemon.buffs.onHitReceived, baie));
			}
		};
		pokemon.buffs.onHitReceived.push(baie);
	}

	if (pokemon.item === BAIE_ORAN) {
		const baie: OnHitReceivedEffect = ({ damage }) => {
			if (pokemon.pv - damage < 0.5 * pokemon.maxPV) {
				pokemon.item = null;
				playSound("heal_ailment");
				defer(() => removeInArray(pokemon.buffs.onHitReceived, baie));
				pokemon.buffs.defense.push(() => 0.3);
			}
		};
		pokemon.buffs.onHitReceived.push(baie);
	}

	if (pokemon.item === BAIE_MEPO) {
		const baie: OnHitReceivedEffect = () => {
			pokemon.item = null;
			playSound("heal_ailment");
			defer(() => removeInArray(pokemon.buffs.onHitReceived, baie));
			pokemon.buffs.onHitReceived.push(() => {
				pokemon.pp = Math.min(pokemon.pp + 2, pokemon.maxPP);
			});
		};
		pokemon.buffs.onHitReceived.push(baie);
	}

	// STATS BOOSTERS
	if (pokemon.item === ATTAQUE_PLUS) pokemon.buffs.attack.push(() => 0.2);
	if (pokemon.item === DEFENSE_PLUS) pokemon.buffs.defense.push(() => 0.2);
	if (pokemon.item === VITESSE_PLUS) pokemon.buffs.speed.push(() => 0.2);

	// ITEMS RANG 4
	if (pokemon.item === GRELOT_COQUE) {
		pokemon.buffs.onHit.push(({ damage }) => {
			healPokemon(pokemon, damage * 0.2);
		});
	}

	if (pokemon.item === BOULE_FUMEE) {
		const buff: OnHitReceivedEffect = ({ damage }) => {
			if (pokemon.pv - damage < 0.3 * pokemon.maxPV) {
				pokemon.makeUntargettable(3000);
				playSound("fly");
				const pokemonSprite = game.sprites.get(pokemon.uid);
				if (pokemonSprite)
					makeEffectSprite(
						EFFECTS.BROUILLARD,
						pokemonSprite.x,
						pokemonSprite.y,
						game,
					);
				removeInArray(pokemon.buffs.onHitReceived, buff);
			}
		};
		pokemon.buffs.onHitReceived.push(buff);
	}

	if (pokemon.item === MAX_ELIXIR) {
		pokemon.buffs.onHit.push(() => {
			pokemon.pp = Math.min(pokemon.pp + 4, pokemon.maxPP);
		});
	}

	// ITEMS RANG 5
	if (pokemon.item === ENCENS_FLEUR) {
		pokemon.buffs.clock.push(() => {
			const [i, j] = [pokemon.x, pokemon.y];
			const tilesImpacted = [
				[i - 1, j - 1],
				[i, j - 1],
				[i + 1, j - 1],
				[i - 1, j],
				[i, j],
				[i + 1, j],
				[i - 1, j + 1],
				[i, j + 1],
				[i + 1, j + 1],
			].filter(([i, j]) => isOnBoard(i, j));

			tilesImpacted.forEach(([i, j]) => {
				const target = getPokemonOnTile(i, j);
				if (target && target.owner === pokemon.owner) {
					healPokemon(target, target.maxPV * (1 / 100));
				}
			});
		});
	}

	if (pokemon.item === ORBE_TOXIQUE) {
		pokemon.buffs.onHit.push(({ target }) => {
			addAlteration(target, { type: AlterationType.POISON, stacks: 10 }, game);
		});
		pokemon.buffs.onHitReceived.push(({ attacker }) => {
			addAlteration(
				attacker,
				{ type: AlterationType.POISON, stacks: 10 },
				game,
			);
		});
	}

	if (pokemon.item === ORBE_FLAMME) {
		pokemon.buffs.onHit.push(({ target }) => {
			addAlteration(target, { type: AlterationType.BRULURE, stacks: 10 }, game);
		});
		pokemon.buffs.onHitReceived.push(({ attacker }) => {
			addAlteration(
				attacker,
				{ type: AlterationType.BRULURE, stacks: 10 },
				game,
			);
		});
	}

	if (pokemon.item === ORBE_FOUDRE) {
		pokemon.buffs.onHit.push(({ target }) => {
			addAlteration(
				target,
				{ type: AlterationType.PARALYSIE, stacks: 10 },
				game,
			);
		});
		pokemon.buffs.onHitReceived.push(({ attacker }) => {
			addAlteration(
				attacker,
				{ type: AlterationType.PARALYSIE, stacks: 10 },
				game,
			);
		});
	}

	// ITEMS CHAMPION
	if (pokemon.item === ITEM_PARAPLUIE) {
		pokemon.unalterable = true;
	}

	for (const allianceState of alliances) {
		// BONUS ALLIANCE FEU
		if (
			pokemon.hasType(TYPE_FEU) &&
			allianceState.type === TYPE_FEU &&
			allianceState.stepReached
		) {
			const effect: OnHitEffect = ({ target, attacker }) => {
				const alteration: Alteration = {
					type: AlterationType.BRULURE,
					stacks: allianceState.stepReachedN + 1,
					attacker,
				};
				addAlteration(target, alteration, game);
				/*console.log(
					`Buff FEU de ${pokemon.entry.ref}: ${alteration.stacks} stacks de brûlure`,
				);*/
			};
			pokemon.buffs.onHit.push(effect);
		}

		// BONUS ALLIANCE PSY
		if (
			pokemon.hasType(TYPE_PSY) &&
			allianceState.type === TYPE_PSY &&
			allianceState.stepReached
		) {
			const effect: OnHitEffect = ({ target }) => {
				target.pp = Math.max(0, target.pp - allianceState.stepReachedN * 2);
				/*console.log(
					`Buff PSY de ${pokemon.entry.ref}: la cible perd ${allianceState.stepReachedN * 2}PP`,
				);*/
			};
			pokemon.buffs.onHit.push(effect);
		}

		// BONUS ALLIANCE SPECTRE
		if (
			pokemon.hasType(TYPE_SPECTRE) &&
			allianceState.type === TYPE_SPECTRE &&
			allianceState.stepReached
		) {
			const effect: OnHitEffect = ({ target, attacker }) => {
				const alteration: Alteration = {
					type: AlterationType.PEUR,
					stacks: allianceState.stepReachedN * 2,
					attacker,
				};
				addAlteration(target, alteration, game);
				/*console.log(
					`Buff PEUR de ${pokemon.entry.ref}: ${alteration.stacks} stacks de peur`,
				);*/
			};
			pokemon.buffs.onHit.push(effect);
		}

		// BONUS ALLIANCE ELEC
		if (
			pokemon.hasType(TYPE_ELECTRIQUE) &&
			allianceState.type === TYPE_ELECTRIQUE &&
			allianceState.stepReached
		) {
			const effect: OnHitReceivedEffect = ({ attacker, skill }) => {
				if (skill.attackRange === 1) {
					applyDamage(allianceState.stepReachedN * 2, attacker, pokemon);
					/*console.log(
						`Choc ELEC sur ${attacker.entry.ref}: ${allianceState.stepReachedN * 2} dégats`,
					);*/
				}
			};
			pokemon.buffs.onHitReceived.push(effect);
			pokemon.buffs.speed.push(() => 0.1 * allianceState.stepReachedN);
		}

		// BONUS ALLIANCE VOL
		if (
			pokemon.hasType(TYPE_VOL) &&
			allianceState.type === TYPE_VOL &&
			allianceState.stepReached
		) {
			pokemon.buffs.dodge.push(() => 0.2 * allianceState.stepReachedN);
		}

		// BONUS ALLIANCE SOL
		if (
			pokemon.hasType(TYPE_SOL) &&
			allianceState.type === TYPE_SOL &&
			allianceState.stepReached
		) {
			const buffTunnel: OnHitReceivedEffect = ({ damage }) => {
				if (!buffTunnel.count || buffTunnel.count <= 0) return;
				const triggerPoint = [0.2, 0.5, 0.8][buffTunnel.count - 1];
				if (
					pokemon.pv - damage > 0 &&
					(pokemon.pv - damage) / pokemon.maxPV < triggerPoint
				) {
					tunnel(pokemon, null, game);
					buffTunnel.count--;
					/*console.log(
						`Buff SOL sur ${pokemon.entry.ref}, plus que ${buffTunnel.count} tunnel`,
					);*/
				}
			};
			buffTunnel.count = allianceState.stepReachedN;
			pokemon.buffs.onHitReceived.push(buffTunnel);
		}

		// BONUS ALLIANCE FEE
		if (allianceState.type === TYPE_FEE && allianceState.stepReached) {
			pokemon.buffs.clock.push(() => {
				pokemon.pp = Math.min(
					pokemon.entry.maxPP,
					pokemon.pp + allianceState.stepReachedN,
				);
				//console.log(`Buff FEE: +${allianceState.stepReachedN}PP sur ${pokemon.entry.ref}`)
			});
		}

		// BONUS ALLIANCE PLANTE
		if (
			pokemon.hasType(TYPE_PLANTE) &&
			allianceState.type === TYPE_PLANTE &&
			allianceState.stepReached
		) {
			pokemon.buffs.clock.push(() => {
				healPokemon(
					pokemon,
					(1 / 100) * allianceState.stepReachedN * pokemon.maxPV,
				);
				//console.log(`Buff PLANTE: +${(1/100)*allianceState.stepReachedN*pokemon.maxPV}PV sur ${pokemon.entry.ref}`)
			});
		}

		// BONUS ALLIANCE COMBAT
		if (
			pokemon.hasType(TYPE_COMBAT) &&
			allianceState.type === TYPE_COMBAT &&
			allianceState.stepReached
		) {
			function getNumberOfOpponentsTargetingMe() {
				return pokemon.opponents.filter((p) => p.nextAction.target === pokemon)
					.length;
			}
			const factors = [0.05, 0.1, 0.2];
			pokemon.buffs.attack.push(
				() =>
					getNumberOfOpponentsTargetingMe() *
					factors[allianceState.stepReachedN - 1],
			);
			pokemon.buffs.defense.push(
				() =>
					getNumberOfOpponentsTargetingMe() *
					factors[allianceState.stepReachedN - 1],
			);
		}

		// BONUS ALLIANCE GLACE
		if (
			pokemon.hasType(TYPE_GLACE) &&
			allianceState.type === TYPE_GLACE &&
			allianceState.stepReached
		) {
			pokemon.buffs.clock.push(() => {
				const [i, j] = [pokemon.x, pokemon.y];
				const tiles = [
					[i - 1, j - 1],
					[i, j - 1],
					[i + 1, j - 1],
					[i - 1, j],
					[i + 1, j],
					[i - 1, j + 1],
					[i, j + 1],
					[i + 1, j + 1],
				].filter(([i, j]) => isOnBoard(i, j));
				const affected = tiles
					.map(([i, j]) => getPokemonOnTile(i, j))
					.filter(
						(p) => p != null && p.owner !== pokemon.owner,
					) as PokemonOnBoard[];
				for (const opponent of affected) {
					const factor = [-0.2, -0.3, -0.4];
					const buff = () => factor[allianceState.stepReachedN] ?? 0;
					opponent.buffs.speed.push(buff);
					/*console.log(
						`DEBUFF GLACE ${allianceState.stepReachedN} sur ${opponent.entry.ref}`,
					);*/
					setTimeout(() => removeInArray(opponent.buffs.speed, buff), 1000);
				}
			});
		}

		// BONUS ALLIANCE DRAGON
		if (
			pokemon.hasType(TYPE_DRAGON) &&
			allianceState.type === TYPE_DRAGON &&
			allianceState.stepReached
		) {
			const isLastDragon = () => pokemon.team.length === 1;
			pokemon.buffs.attack.push(() =>
				isLastDragon() ? 0.1 * allianceState.stepReachedN : 0,
			);
			pokemon.buffs.defense.push(() =>
				isLastDragon() ? 0.1 * allianceState.stepReachedN : 0,
			);
			pokemon.buffs.speed.push(() =>
				isLastDragon() ? 0.1 * allianceState.stepReachedN : 0,
			);
		}
	}
}
