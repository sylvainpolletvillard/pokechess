import Phaser from 'phaser';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader/src/webfont-loader';

import {startDebugAnims} from "./debug_anims";
import {GameState, gameState} from "./logic/gamestate";

import GameScene from './scenes/GameScene';
import TestAnimsScene from "./scenes/TestAnims";
import MapScene from "./scenes/MapScene";
import RoomScene from "./scenes/RoomScene";
import LoadingScene from "./scenes/LoadingScene";


export class Game extends Phaser.Game {
    state: GameState
    constructor(gameConfig: Phaser.Types.Core.GameConfig) {
        super(gameConfig);
        this.state = gameState
    }
}

function startGame(){
    const game = new Game({
        type: Phaser.AUTO,
        parent: 'game',
        backgroundColor: '#CACDB8',
        scale: {
            width: 320,
            height: 320,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        input: {
            gamepad: true,
            mouse: true,
            touch: true
        },
        render: {
            pixelArt: true
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: [LoadingScene, RoomScene, MapScene, GameScene, TestAnimsScene],
        plugins: {
            global: [
                NineSlicePlugin.DefaultCfg,
                {
                    key: 'WebFontLoader',
                    plugin: WebFontLoaderPlugin,
                    start: true
                }
            ],
        }
    });

    // @ts-ignore
    globalThis.game = game;
}


switch(window.location.pathname){
    case "/debug":
        startDebugAnims();
        break;
    default:
        startGame();
        break;
}
