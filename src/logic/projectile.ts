import { Z } from "../data/depths";
import type { PokemonOnBoard } from "../objects/pokemon";
import type GameScene from "../scenes/GameScene";
import { addAlteration } from "./alteration";
import { applyDamage, calcDamage } from "./fight";
import { gameState } from "./gamestate";
import type { ProjectileSkill } from "./skill";
import { knockbackTarget, makeEffectSprite } from "./skill-anims";

export interface Projectile {
	sprite: Phaser.GameObjects.Sprite;
	skill: ProjectileSkill;
	attacker: PokemonOnBoard;
	impactedPokemonIds: string[];
	tween?: Phaser.Tweens.Tween;
}

export const projectiles: Set<Projectile> = new Set();

export function launchProjectile(
	skill: ProjectileSkill,
	attacker: PokemonOnBoard,
	target: PokemonOnBoard,
	game: GameScene,
) {
	if (!skill.effect) return console.error("Missing projectile effect", skill);
	const [originX, originY] = attacker.position;
	const angle = Math.atan2(target.y - attacker.y, target.x - attacker.x);
	// cible dans la direction de la cible, mais suffisamment loin pour sortir de l'écran
	const targetX = Math.round(originX + Math.cos(angle) * 12 * 32);
	const targetY = Math.round(originY + Math.sin(angle) * 12 * 32);

	renderProjectile(skill, attacker, originX, originY, targetX, targetY, game);
}

export function renderProjectile(
	skill: ProjectileSkill,
	attacker: PokemonOnBoard,
	originX: number,
	originY: number,
	targetX: number,
	targetY: number,
	game: GameScene,
) {
	const projectile: Projectile = {
		sprite: makeEffectSprite(skill.effect, originX, originY, game, true),
		skill,
		attacker,
		impactedPokemonIds: [],
	};

	projectiles.add(projectile);

	if (skill.rotateProjectile) {
		const angle = Math.atan2(targetY - originY, targetX - originX);
		projectile.sprite.rotation = angle;
	}

	const travelTime = (1000 * 12) / skill.travelSpeed;
	projectile.tween = game.tweens.add({
		targets: projectile.sprite,
		x: targetX,
		y: targetY,
		duration: travelTime,
		ease: "Linear",
		onComplete() {
			if (projectiles.has(projectile)) destroyProjectile(projectile);
		},
	});

	return projectile;
}

export function destroyProjectile(projectile: Projectile) {
	if (!projectiles.has(projectile)) return; // alreayd destroyed
	const game = gameState.activeScene as GameScene;
	projectiles.delete(projectile);
	projectile.tween && game.tweens.remove(projectile.tween);
	if (projectile.skill.hitEffect) {
		projectile.sprite.setDepth(
			projectile.skill.hitEffect.depth ?? Z.SKILL_EFFECT_ABOVE_POKEMON,
		);
		projectile.sprite.play(projectile.skill.hitEffect.key);
		projectile.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
			projectile.sprite.destroy();
		});
	} else {
		projectile.sprite.destroy();
	}
}

export function checkProjectilesImpact(game: GameScene) {
	for (const projectile of projectiles) {
		let { x, y } = projectile.sprite;
		x += 8;
		y += 8; // try to better center for collision detection
		const r = projectile.skill.projectileRadius;
		const { attacker, skill } = projectile;
		const targets = attacker.opponents;
		const targetsTouched = targets.filter((p) => {
			const [px, py] = p.position;
			const distance = Math.sqrt((px - x) ** 2 + (py - y) ** 2);
			return distance < r + 10 && !p.untargettable;
		});

		for (const target of targetsTouched) {
			if (!projectile.impactedPokemonIds.includes(target.uid)) {
				projectile.impactedPokemonIds.push(target.uid);
				const damage = calcDamage(projectile.skill, target, attacker);
				for (const buff of attacker.buffs.onHit) {
					buff({ target, attacker, damage, skill });
				}
				for (const buff of target.buffs.onHitReceived) {
					buff({ damage, attacker, skill });
				}
				applyDamage(damage, target, attacker);
				/*console.log(
					`Projectile from ${attacker.entry.ref} ; ${target.entry.ref} receives ${damage} damage !`,
				);*/
				const { hitAlteration, pierceThrough, knockback } = projectile.skill;
				if (hitAlteration)
					addAlteration(target, { ...hitAlteration, attacker }, game);
				if (!pierceThrough) destroyProjectile(projectile);
				if (knockback) {
					const angle = Math.atan2(
						attacker.y - target.y,
						target.x - attacker.x,
					);
					knockbackTarget(target, angle, game);
				}
			}
		}
	}
}
