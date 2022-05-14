import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import { DRESSEUR_SAFRANIA, MORGANE} from "../trainers";
import { KADABRA } from "../pokemons/kadabra";
import { AEROMITE } from "../pokemons/aeromite";
import { MR_MIME } from "../pokemons/mrmime";
import { ALAKAZAM } from "../pokemons/alakazam";
import { LIPPOUTOU } from "../pokemons/lippoutou";
import { HYPNOMADE } from "../pokemons/hypnomade";
import { NOADKOKO } from "../pokemons/noadkoko";
import { SOPORIFIK } from "../pokemons/soporifik";
import {RACAILLOU} from "../pokemons/racaillou";
import {ONIX} from "../pokemons/onix";
import {CANINOS} from "../pokemons/caninos";
import {RHINOCORNE} from "../pokemons/rhinocorne";
import {SALAMECHE} from "../pokemons/salameche";
import {PIAFABEC} from "../pokemons/piafabec";
import {SAQUEDENEU} from "../pokemons/saquedeneu";
import {SABELETTE} from "../pokemons/sabelette";
import {SHOP_JADIELLE} from "../levels/shops";

export const SAFRANIA: Destination = {
    ref: "SAFRANIA",
    name: "Safrania",
    nextDestinations: {
        PENSION: [[0,-2]],
        DOJO: [[-2,0]],
        TOUR_POKEMON: [[2,0]],
        MAISON_PSY: [[0,1.5]]
    },
    coordinates: [216,104],
    type: DestinationType.ARENA,
    icons: ["type_PSY"],
    rooms: {
        arena: {
            name: "Arène de Safrania",
            type: RoomType.ARENA,
            map: "safrania",
            music: "music_argenta", // meme musique que argenta
            trainer: MORGANE,
            spawnOtherTeam(){
                return spawnChampionTeam([
                        KADABRA,
                        MR_MIME,
                        SOPORIFIK,
                        HYPNOMADE,
                        ALAKAZAM,
                        LIPPOUTOU,
                        AEROMITE,
                        NOADKOKO
                    ],
                    [
                        [2,3],
                        [4,3],
                        [3,3],
                        [0,2],
                        [1,2],
                        [6,2],
                        [5,2],
                        [3,0]
                    ])
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Arène de Safrania",
            map: "safrania",
            music: "music_argenta", // meme musique que argenta
            trainer: DRESSEUR_SAFRANIA,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    RACAILLOU,
                    ONIX,
                    CANINOS,
                    RHINOCORNE,
                    SALAMECHE,
                    PIAFABEC,
                    SAQUEDENEU,
                    SABELETTE
                ])
            }
        },
        shop: {
            type: RoomType.FREEWALK,
            name: "Magasin de Safrania",
            music: "music_shop",
            level: SHOP_JADIELLE
        }
    },
    shopId: 5
}