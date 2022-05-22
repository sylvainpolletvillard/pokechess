import {Destination, DestinationType, RoomType} from "../../types/destination";
import {TYPE_FEU, TYPE_NORMAL, TYPE_ROCHE, TYPE_SOL} from "../types";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import {DRESSEUR_MONT_BRAISE} from "../trainers";
import {SALAMECHE} from "../pokemons/salameche";
import {MAGMAR} from "../pokemons/magmar";
import {CANINOS} from "../pokemons/caninos";
import {PONYTA} from "../pokemons/ponyta";
import {PYROLI} from "../pokemons/pyroli";
import {GOUPIX} from "../pokemons/goupix";
import {MACHOC} from "../pokemons/machoc";
import {TAUROS} from "../pokemons/tauros";
import { MyScene } from "../../scenes/MyScene";
import { preloadMusic } from "../../logic/audio";

export const MONT_BRAISE: Destination = {
    ref: "MONT_BRAISE",
    name: "Mont Braise",
    nextDestinations: {
        BOURG_PALETTE: [[3,-0.5], [0,-1.5], [-1,0]],
        CRAMOISILE: [[3,-0.5],[0,2.5]]
    },
    coordinates: [3*16-8, 320-3.5*16],
    type: DestinationType.WILD,
    icons: ["type_FEU"],
    rooms: {
        wild: {
            name: "Mont Braise",
            map: "mont_braise",
            type: RoomType.WILD,
            music: "music_battle_wild",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_FEU.ref]: 1,
                    [TYPE_SOL.ref]: 0.1,
                    [TYPE_ROCHE.ref]: 0.1,
                    [TYPE_NORMAL.ref]: 0.1
                })
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Mont Braise",
            map: "mont_braise",
            music: "music_battle_wild",
            trainer: DRESSEUR_MONT_BRAISE,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    SALAMECHE,
                    MAGMAR,
                    CANINOS,
                    PONYTA,
                    PYROLI,
                    GOUPIX,
                    MACHOC,
                    TAUROS
                ])
            }
        }
    },
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('mont_braise', 'assets/maps/mont_braise.json');
        preloadMusic("music_mont_braise", "assets/audio/music/49 Unknown Song.mp3");
    }
}