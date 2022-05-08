export const SOUNDS = {}

export function loadAudio(scene: Phaser.Scene) {
    scene.load.audio("music_overworld", ["assets/audio/music/02 Opening (part 2).mp3"]);
    scene.load.audio("music_labo_chen", ["assets/audio/music/32 Oak Research Lab.mp3"]);
    scene.load.audio("music_bourg_palette", ["assets/audio/music/04 Pallet Town's Theme.mp3"]);
    scene.load.audio("music_shop", ["assets/audio/music/05 Pokemon Center.mp3"]);
    scene.load.audio("music_jadielle", ["assets/audio/music/06 Pokemon Gym.mp3"]);
    scene.load.audio("music_foret_jade", ["assets/audio/music/38 Viridian Forest.mp3"]);
    scene.load.audio("music_argenta", ["assets/audio/music/07 Pewter City's Theme.mp3"]);
    scene.load.audio("music_azuria", ["assets/audio/music/08 Cerulean City's Theme.mp3"]);
    scene.load.audio("music_carmin", ["assets/audio/music/11 Vermilion City's Theme.mp3"]);
    scene.load.audio("music_celadopole", ["assets/audio/music/09 Celadon City's Theme.mp3"]);
    scene.load.audio("music_parmanie", ["assets/audio/music/06 Pokemon Gym.mp3"]); // fuschia ?
    scene.load.audio("music_safrania", ["assets/audio/music/06 Pokemon Gym.mp3"]); // saffron ?
    scene.load.audio("music_cramoisile", ["assets/audio/music/10 Cinnabar Island's Theme.mp3"]);
    scene.load.audio("music_celadopole", ["assets/audio/music/09 Celadon City's Theme.mp3"]);
    scene.load.audio("music_lavanville", ["assets/audio/music/12 Lavender Town's Theme.mp3"]);
    scene.load.audio("music_oceane", ["assets/audio/music/13 St. Anne.mp3"]);
    scene.load.audio("music_tour_pokemon", ["assets/audio/music/41 Pokemon Tower.mp3"]);
    scene.load.audio("music_battle_wild", ["assets/audio/music/25 Battle (VS Wild Pokemon).mp3"]);
    scene.load.audio("music_battle_trainer", ["assets/audio/music/24 Battle (VS Trainer).mp3"]);
    scene.load.audio("music_battle_champion", ["assets/audio/music/23 Battle (VS Gym Leader).mp3"]);
    scene.load.audio("music_victory_wild", ["assets/audio/music/28 Victory (VS Wild Pokemon).mp3"]);
    scene.load.audio("music_victory_trainer", ["assets/audio/music/27 Victory (VS Trainer).mp3"]);
    scene.load.audio("music_victory_champion", ["assets/audio/music/29 Victory (VS Gym Leader).mp3"]);

    scene.load.audio("success", ["assets/audio/sounds/success.mp3"]);
    scene.load.audio("item_received", ["assets/audio/sounds/item_received.mp3"]);
    scene.load.audio("pokemon_received", ["assets/audio/sounds/pokemon_received.mp3"]);
}

export function addSounds() {
    Object.assign(SOUNDS, {
        ITEM_RECEIVED: game.sound.add("item_received"),
        SUCCESS: game.sound.add("success"),
        POKEMON_RECEIVED: game.sound.add("pokemon_received")
    })
}