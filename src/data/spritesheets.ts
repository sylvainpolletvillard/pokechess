export function loadSpritesheets(scene: Phaser.Scene) {
	scene.load.spritesheet("pokemon", "assets/sprites/pokemon_gen1.png", {
		frameWidth: 32,
		frameHeight: 32,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet(
		"pokemon_portraits",
		"assets/sprites/pokemon_portraits.png",
		{
			frameWidth: 64,
			frameHeight: 64,
			spacing: 1,
			margin: 0,
		},
	);

	scene.load.spritesheet("effects", "assets/sprites/effects.png", {
		frameWidth: 64,
		frameHeight: 64,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet("pokeball", "assets/sprites/pokeballs.png", {
		frameWidth: 64,
		frameHeight: 64,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet("trainer", "assets/sprites/trainers.png", {
		frameWidth: 64,
		frameHeight: 64,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet(
		"trainers_intros",
		"assets/sprites/trainers_intros.png",
		{
			frameWidth: 320,
			frameHeight: 128,
			spacing: 0,
			margin: 0,
		},
	);

	scene.load.spritesheet("gui", "assets/sprites/gui.png", {
		frameWidth: 32,
		frameHeight: 32,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet("icons16x16", "assets/sprites/icons_16x16.png", {
		frameWidth: 16,
		frameHeight: 16,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet("buttons", "assets/sprites/buttons.png", {
		frameWidth: 64,
		frameHeight: 32,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet("buttons_big", "assets/sprites/buttons_big.png", {
		frameWidth: 96,
		frameHeight: 32,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet("texts", "assets/sprites/texts.png", {
		frameWidth: 256,
		frameHeight: 64,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet("map", "assets/sprites/map.png", {
		frameWidth: 16,
		frameHeight: 16,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet("characters", "assets/sprites/characters.png", {
		frameWidth: 24,
		frameHeight: 24,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet("interactions", "assets/sprites/interactions.png", {
		frameWidth: 16,
		frameHeight: 16,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet("collisions", "assets/sprites/collisions.png", {
		frameWidth: 16,
		frameHeight: 16,
		spacing: 0,
		margin: 0,
	});

	scene.load.spritesheet("items", "assets/sprites/items.png", {
		frameWidth: 32,
		frameHeight: 32,
		spacing: 1,
		margin: 0,
	});
}
