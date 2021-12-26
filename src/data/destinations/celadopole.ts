import { spawnChampionTeam } from "../../logic/spawns";
import {Destination, DestinationType, RoomType} from "../../model/destination";
import { ERIKA } from "../champions";
import { BOUSTIFLOR } from "../pokemons/boustiflor";
import { EMPIFLOR } from "../pokemons/empiflor";
import { FLORIZARRE } from "../pokemons/florizarre";
import { HERBIZARRE } from "../pokemons/herbizarre";
import { NOADKOKO } from "../pokemons/noadkoko";
import { ORTIDE } from "../pokemons/ortide";
import { RAFFLESIA } from "../pokemons/rafflesia";
import { SAQUEDENEU } from "../pokemons/saquedeneu";

export const CELADOPOLE: Destination = {
    ref: "CELADOPOLE",
    name: "Céladopole",
    nextDestinations: {
        ARGENTA: [[0,-2],[-2,0]],
        COLLINE_ROYALE: [[0,-2],[2,0]],
        DOJO: [[3,0]],
        PISTE_CYCLABLE: [[0,5]]
    },
    coordinates: [136,104],
    type: DestinationType.ARENA,
    icons: ["type_PLANTE"],
    subtext: "Arène",
    getRoomOrder(){ return ["arena"] },
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène de Céladopole",
            map: "arene_celadopole",
            spawnOtherTeam() {
                return spawnChampionTeam([
                        SAQUEDENEU,
                        ORTIDE,
                        BOUSTIFLOR,
                        HERBIZARRE,
                        NOADKOKO,
                        RAFFLESIA,
                        EMPIFLOR,
                        FLORIZARRE
                    ],
                    [
                        [2, 3],
                        [4, 3],
                        [3, 3],
                        [0, 2],
                        [1, 2],
                        [6, 2],
                        [5, 2],
                        [3, 0]
                    ])
            },
            music: "music_celadopole",
            champion: ERIKA
        }
    }
}