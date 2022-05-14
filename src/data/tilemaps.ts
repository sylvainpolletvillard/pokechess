export function loadTilemaps(scene: Phaser.Scene){
    scene.load.image('overworld', 'assets/maps/Overworld_Tileset.png');
    scene.load.image('interior', 'assets/maps/interior_sd.png');
    scene.load.image('ground', 'assets/maps/ground.png');

    // Load the export Tiled JSON
    scene.load.tilemapTiledJSON('arene_argenta', 'assets/maps/arene_argenta.json');
    scene.load.tilemapTiledJSON('arene_azuria', 'assets/maps/arene_azuria.json');
    scene.load.tilemapTiledJSON('arene_carmin', 'assets/maps/arene_carmin.json');
    scene.load.tilemapTiledJSON('arene_celadopole', 'assets/maps/arene_celadopole.json');
    scene.load.tilemapTiledJSON('arene_jadielle', 'assets/maps/arene_jadielle.json');
    scene.load.tilemapTiledJSON('arene_lavanville', 'assets/maps/arene_lavanville.json');
    scene.load.tilemapTiledJSON('arene_parmanie', 'assets/maps/arene_parmanie.json');
    scene.load.tilemapTiledJSON('bourg_palette', 'assets/maps/bourg_palette.json');
    scene.load.tilemapTiledJSON('camp_nomade', 'assets/maps/camp_nomade.json');
    scene.load.tilemapTiledJSON('cave_taupiqueur', 'assets/maps/cave_taupiqueur.json');
    scene.load.tilemapTiledJSON('centrale', 'assets/maps/centrale.json');
    scene.load.tilemapTiledJSON('champs_verdoyants', 'assets/maps/champs_verdoyants.json');
    scene.load.tilemapTiledJSON('col_de_montagne', 'assets/maps/col_de_montagne.json');
    scene.load.tilemapTiledJSON('cramoisile', 'assets/maps/cramoisile.json');
    scene.load.tilemapTiledJSON('falaises', 'assets/maps/falaises.json');
    scene.load.tilemapTiledJSON('foret_de_jade', 'assets/maps/foret_de_jade.json');
    scene.load.tilemapTiledJSON('grotte_azuree', 'assets/maps/grotte_azuree.json');    
    scene.load.tilemapTiledJSON('iles_ecume', 'assets/maps/iles_ecume.json');
    scene.load.tilemapTiledJSON('labo_chen', 'assets/maps/labo_chen.json');
    scene.load.tilemapTiledJSON('mont_braise', 'assets/maps/mont_braise.json');
    scene.load.tilemapTiledJSON('mont_selenite', 'assets/maps/mont_selenite.json');
    scene.load.tilemapTiledJSON('overworld', 'assets/maps/overworld.json')    
    scene.load.tilemapTiledJSON('shop_jadielle', 'assets/maps/shop_jadielle.json');
    scene.load.tilemapTiledJSON('tour_pokemon', 'assets/maps/tour_pokemon.json');
}