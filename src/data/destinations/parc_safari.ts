import { preloadMusic } from "../../logic/audio";
import {Destination, DestinationType, RoomType} from "../../types/destination";
import { spawnSafariTeam } from "../../logic/spawns";
import { MyScene } from "../../scenes/MyScene";

export const PARC_SAFARI: Destination = {
    ref: "PARC_SAFARI",
    name: "Parc Safari",
    nextDestinations: {
        PARMANIE: [[0,2]],
    },
    coordinates: [200,212],
    type: DestinationType.SPECIAL,
    icons: ["safari"],
    subtext: "Capture à gogo",
    rooms: {
        safari: {
            type: RoomType.SAFARI,            
            name: "Parc Safari",            
            music: "music_safari",
            map: "safari1",
            maps: ["safari1","safari2","safari3"],
            spawnOtherTeam: spawnSafariTeam
        }
    },
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('safari1', 'assets/maps/safari1.json');
        scene.load.tilemapTiledJSON('safari2', 'assets/maps/safari2.json');
        scene.load.tilemapTiledJSON('safari3', 'assets/maps/safari3.json');
        preloadMusic("music_safari", "assets/audio/music/36 Casino.mp3");
    }
}