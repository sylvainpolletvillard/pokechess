import {Destination, DestinationType, RoomType} from "../../types/destination";
import {spawnTutoCaptureTeam} from "../../logic/spawns";
import {SCIENTIFIQUE_TUTO} from "../trainers";
import {homeLevel} from "../levels/home";
import {chenLevel} from "../levels/labo_chen";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";

export const BOURG_PALETTE: Destination = {
    ref: "BOURG_PALETTE",
    name: "Bourg Palette",    
    rooms: {
        home: {
            name: "Chez Maman",
            type: RoomType.FREEWALK,
            level: homeLevel,
            music: "music_labo_chen"
        },
        labo: {
            name: "Laboratoire de Chen",
            type: RoomType.FREEWALK,
            level: chenLevel,
            music: "music_labo_chen"
        },
        tuto:  {
            name: "Route de Bourg Palette",
            type: RoomType.TUTORIAL,
            map: "foret_de_jade",
            music: "music_labo_chen",
            trainer: SCIENTIFIQUE_TUTO,
            spawnOtherTeam(){
                return spawnTutoCaptureTeam()
            }
        },
    },
    nextDestinations: {
        JADIELLE: [[0,-3]],
        CRAMOISILE: [[1,0],[0,1.5],[0,2.5]],
        MONT_BRAISE: [[1,0],[0,1.5],[-3,0.5]]
    },
    coordinates: [5*16 -8, 15*16-8],
    type: DestinationType.SPECIAL,
    icons: ["gift"],
    subtext: "Maman",
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('bourg_palette', 'assets/maps/bourg_palette.json');        
        preloadMusic("music_labo_chen", "assets/audio/music/32 Oak Research Lab.mp3")
    },
}