import { getPokedexIndex, getPokemonCry, POKEMONS } from "./pokemons";

export const SOUNDS = {}

export function loadAudio(scene: Phaser.Scene) {
    /* MUSIC */

    scene.load.audio("music_overworld", ["assets/audio/music/02 Opening (part 2).mp3"]);
    scene.load.audio("music_labo_chen", ["assets/audio/music/32 Oak Research Lab.mp3"]);
    scene.load.audio("music_shop", ["assets/audio/music/05 Pokemon Center.mp3"]);    

    scene.load.audio("music_battle_wild", ["assets/audio/music/25 Battle (VS Wild Pokemon).mp3"]);
    scene.load.audio("music_battle_trainer", ["assets/audio/music/24 Battle (VS Trainer).mp3"]);
    scene.load.audio("music_battle_champion", ["assets/audio/music/23 Battle (VS Gym Leader).mp3"]);

    scene.load.audio("music_victory_wild", ["assets/audio/music/28 Victory (VS Wild Pokemon).mp3"]);
    scene.load.audio("music_victory_trainer", ["assets/audio/music/27 Victory (VS Trainer).mp3"]);
    scene.load.audio("music_victory_champion", ["assets/audio/music/29 Victory (VS Gym Leader).mp3"]);

    /* SOUND EFFECTS */

    scene.load.audio("success", ["assets/audio/sounds/success.ogg"]);
    scene.load.audio("item_received", ["assets/audio/sounds/item_received.ogg"]);
    scene.load.audio("pokemon_received", ["assets/audio/sounds/pokemon_received.ogg"]);
    scene.load.audio("level_up", ["assets/audio/sounds/level_up.ogg"]);
    
    scene.load.audio("press_ab", ["assets/audio/sounds/press_ab.ogg"]);
    scene.load.audio("tick", ["assets/audio/sounds/tick.ogg"]);
    scene.load.audio("refresh", ["assets/audio/sounds/refresh.ogg"]);
    scene.load.audio("menu_open", ["assets/audio/sounds/menu_open.ogg"]);
    scene.load.audio("menu_close", ["assets/audio/sounds/menu_close.ogg"]);

    scene.load.audio("ball_launch", ["assets/audio/sounds/ball_launch.ogg"]);
    scene.load.audio("ball_catch", ["assets/audio/sounds/ball_catch.ogg"]);

    scene.load.audio("door", ["assets/audio/sounds/door.ogg"]);
    scene.load.audio("run", ["assets/audio/sounds/run.ogg"]);
    scene.load.audio("oceane_horn", ["assets/audio/sounds/oceane_horn.ogg"]);

    loadCries(scene)
    
    /* UNUSED */

    //scene.load.audio("music_parc_safari", ["assets/audio/music/36 Casino.mp3"]);    
    //scene.load.audio("purchase", ["assets/audio/sounds/purchase.ogg"]);
}

function loadCries(scene: Phaser.Scene){
    POKEMONS.forEach(pokemon => {
        scene.load.audio(getPokemonCry(pokemon), [`assets/audio/sounds/cries/${getPokedexIndex(pokemon)}.ogg`]);
    })
}

export function addSounds() {
    Object.assign(SOUNDS, {
        ITEM_RECEIVED: game.sound.add("item_received"),
        SUCCESS: game.sound.add("success"),
        POKEMON_RECEIVED: game.sound.add("pokemon_received")
    })
}