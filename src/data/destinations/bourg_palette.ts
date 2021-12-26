import {Destination, DestinationType, RoomType, RoomWild} from "../../model/destination";
import {homeLevel} from "../levels/home";
import {chenLevel} from "../levels/labo_chen";
import {gameState} from "../../logic/gamestate";
import {spawnTutoCaptureTeam, spawnWildTeamByType} from "../../logic/spawns";

export const BOURG_PALETTE: Destination = {
    ref: "BOURG_PALETTE",
    name: "Bourg Palette",
    getRoomOrder(){
        if(gameState.day === 0) return ["labo"]
        else return ["home"]
    },
    rooms: {
        home: {
            name: "Maison de Red",
            type: RoomType.FREEWALK,
            level: homeLevel,
            music: "music_labo_chen"
        },
        labo: {
            name: "Laboratoire de Chen",
            type: RoomType.FREEWALK,
            level: chenLevel,
            music: "music_labo_chen"
        }
    },
    nextDestinations: {
        JADIELLE: [[0,-3]],
        CRAMOISILE: [[1,0],[0,1.5],[0,2.5]],
        MONT_BRAISE: [[1,0],[0,1.5],[-3,0.5]]
    },
    coordinates: [72,230],
    type: DestinationType.SPECIAL,
    icons: ["gift"],
    subtext: "Maman",
}

export const TEST_ROOM: RoomWild = {
    type: RoomType.WILD,
    name: "testing Room",
    map: "foret_de_jade",
    music: "music_foret_jade",
    spawnOtherTeam() {
        return spawnTutoCaptureTeam()
    }
}