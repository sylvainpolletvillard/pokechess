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
import { SULFURA } from "../pokemons/sulfura";
import { gameState } from "../../logic/gamestate";
import { PokemonOnBoard } from "../../objects/pokemon";
import { NO_OWNER } from "../owners";
import { t } from "../../i18n";

export const MONT_BRAISE: Destination = {
    ref: "MONT_BRAISE",
    name: t("destination.MONT_BRAISE"),
    nextDestinations: {
        BOURG_PALETTE: [[3,-0.5], [0,-1.5], [-1,0]],
        CRAMOISILE: [[3,-0.5],[0,2.5]]
    },
    coordinates: [3*16 -8, 17*16 -8],
    type: DestinationType.WILD,
    icons: ["type_FEU"],
    rooms: {
        wild: {
            name: t("destination.MONT_BRAISE"),
            map: "mont_braise",
            type: RoomType.WILD,
            music: "music_mont_braise",
            spawnOtherTeam(){
                if(!gameState.pokedexSeen.has(SULFURA.ref) && gameState.day >= 20 && Math.random() < 10/100){
                    return [ new PokemonOnBoard({
                        entry: SULFURA, 
                        owner: NO_OWNER, 
                        level: 50,
                        x: 3, y: 1
                    }) ]
                }
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
            name: t("destination.MONT_BRAISE"),
            map: "mont_braise",
            music: "music_mont_braise",
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