import {Destination, DestinationType, RoomType} from "../../types/destination";
import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import { preloadMusic } from "../../logic/audio";
import {SHOP_JADIELLE, SHOP_SAFRANIA} from "../levels/shops";
import { MyScene } from "../../scenes/MyScene";
import { DRESSEUR_SAFRANIA, MORGANE} from "../trainers";
import { KADABRA } from "../pokemons/kadabra";
import { AEROMITE } from "../pokemons/aeromite";
import { MR_MIME } from "../pokemons/mrmime";
import { ALAKAZAM } from "../pokemons/alakazam";
import { LIPPOUTOU } from "../pokemons/lippoutou";
import { HYPNOMADE } from "../pokemons/hypnomade";
import { NOADKOKO } from "../pokemons/noadkoko";
import { SOPORIFIK } from "../pokemons/soporifik";
import { ABRA } from "../pokemons/abra";
import { NOEUFNOEUF } from "../pokemons/noeufnoeuf";
import { PSYKOKWAK } from "../pokemons/psykokwak";
import { AKWAKWAK } from "../pokemons/akwakwak";
import { BADGE_MARAIS } from "../badges";

export const SAFRANIA: Destination = {
    ref: "SAFRANIA",
    name: "Safrania",
    nextDestinations: {
        PENSION: [[0,-2]],
        DOJO: [[-2,0]],
        TOUR_POKEMON: [[2,0]],
        MAISON_PSY: [[0,1.5]]
    },
    coordinates: [14*16 -8, 7*16 -8],
    type: DestinationType.ARENA,
    icons: ["badge_marais", "type_PSY"],
    rooms: {
        arena: {
            name: "Arène de Safrania",
            type: RoomType.ARENA,
            map: "arene_safrania",
            music: "music_argenta_safrania", // meme musique que argenta
            trainer: MORGANE,
            badge: BADGE_MARAIS,
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
            map: "arene_safrania",
            music: "music_argenta_safrania", // meme musique que argenta
            trainer: DRESSEUR_SAFRANIA,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    ABRA,
                    SOPORIFIK,
                    NOEUFNOEUF,
                    KADABRA,
                    HYPNOMADE,
                    PSYKOKWAK,
                    AKWAKWAK,
                    MR_MIME
                ])
            }
        },
        shop: {
            type: RoomType.FREEWALK,
            name: "Magasin de Safrania",
            music: "music_shop",
            level: SHOP_SAFRANIA
        }
    },
    shopId: 5,
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('arene_safrania', 'assets/maps/arene_safrania.json');
        scene.load.tilemapTiledJSON('shop_safrania', 'assets/maps/shop_safrania.json');
        preloadMusic("music_argenta_safrania", "assets/audio/music/07 Pewter City's Theme.mp3");
    }
}