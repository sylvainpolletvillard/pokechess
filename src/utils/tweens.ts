import { wait } from "./helpers";

export function tweenPop(
	scene: Phaser.Scene,
	sprite: Phaser.GameObjects.Sprite,
	delay = 1000,
): Promise<void> {
	sprite.setAlpha(0).setScale(0);
	scene.add.timeline([
		{
			at: 0,
			tween: {
				targets: sprite,
				scale: 1,
				alpha: 1,
				ease: "Elastic",
				easeParams: [1.5, 0.8],
				duration: 400,
			},
		},
		{
			at: delay,
			tween: {
				targets: sprite,
				alpha: 0,
				scale: 1,
				duration: 400,
			},
		},
	]);
	return wait(delay + 400);
}

export function tweenFadeIn(
	scene: Phaser.Scene,
	object: Phaser.GameObjects.Sprite | Phaser.GameObjects.Group,
	duration = 400,
): Promise<void> {
	scene.tweens.add({
		targets:
			object instanceof Phaser.GameObjects.Group
				? object.getChildren()
				: object,
		alpha: {
			from: 0,
			to: 1,
		},
		duration,
	});
	return wait(duration);
}

export function tweenFadeOut(
	scene: Phaser.Scene,
	object: Phaser.GameObjects.Sprite | Phaser.GameObjects.Group,
	duration = 400,
): Promise<void> {
	scene.tweens.add({
		targets:
			object instanceof Phaser.GameObjects.Group
				? object.getChildren()
				: object,
		alpha: {
			from: 1,
			to: 0,
		},
		duration,
	});
	return wait(duration);
}

export function tweenFadeInOut(
	scene: Phaser.Scene,
	sprite: Phaser.GameObjects.Sprite,
	delay = 1000,
	duration = 400,
): Promise<void> {
	sprite.setAlpha(0);
	scene.add.timeline([
		{
			at: 0,
			tween: {
				targets: sprite,
				alpha: 1,
				duration,
			},
		},
		{
			at: delay,
			tween: {
				targets: sprite,
				alpha: 0,
				duration,
			},
		},
	]);
	return wait(delay + duration * 2);
}
