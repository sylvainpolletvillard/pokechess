export function loadTilemaps(scene: Phaser.Scene) {
	scene.load.image("overworld", "assets/maps/Overworld_Tileset.png");
	scene.load.image("interior", "assets/maps/interior_sd.png");
	scene.load.image("ground", "assets/maps/ground.png");

	scene.load.tilemapTiledJSON("overworld", "assets/maps/overworld.json");
	scene.load.tilemapTiledJSON("labo_chen", "assets/maps/labo_chen.json");
	scene.load.tilemapTiledJSON(
		"foret_de_jade",
		"assets/maps/foret_de_jade.json",
	);
	scene.load.tilemapTiledJSON(
		"shop_jadielle",
		"assets/maps/shop_jadielle.json",
	);
}
