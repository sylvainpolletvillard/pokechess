import {Destination, DestinationType, RoomType} from "../../types/destination";
import {DRESSEUR_AZURIA, ONDINE} from "../trainers";
import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";

import { AKWAKWAK } from "../pokemons/akwakwak";
import { AQUALI } from "../pokemons/aquali";
import { HYPOCEAN } from "../pokemons/hypocean";
import { LEVIATOR } from "../pokemons/leviator";
import { LOKHLASS } from "../pokemons/lokhlass";
import { STARI } from "../pokemons/stari";
import { STAROSS } from "../pokemons/staross";
import { PSYKOKWAK } from "../pokemons/psykokwak";
import {CARAPUCE} from "../pokemons/carapuce";
import {PTITARD} from "../pokemons/ptitard";
import {OTARIA} from "../pokemons/otaria";
import {KOKIYAS} from "../pokemons/kokiyas";
import {KRABBY} from "../pokemons/krabby";
import {HYPOTREMPE} from "../pokemons/hypotrempe";
import {POISSIRENE} from "../pokemons/poissirene";
import {SHOP_AZURIA} from "../levels/shops";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";
import { BADGE_CASCADE } from "../badges";
import { t } from "../../i18n";

export const AZURIA: Destination = {
    ref: "AZURIA",
    name: t("destination.AZURIA"),
    nextDestinations: {
        GROTTE_AZUREE: [[0,-2]],
        COL_DE_MONTAGNE: [[-4,0],[-2,0]],
        MONT_SELENITE: [[-4,0],[0,-1]],
        OCEANE_AZURIA: [[2,0],[0,-1],[1,0],[0,-1]],
        CENTRALE: [[2,0],[0,1],[1,0],[0,1]],
        PENSION: [[0,2]]
    },
    coordinates: [14*16 -8, 3*16 -8],
    type: DestinationType.ARENA,
    icons: ["badge_cascade", "type_EAU"],
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: t("destination.AZURIA_ARENA"),
            map: "arene_azuria",
            spawnOtherTeam(){
                return spawnChampionTeam([
                        STARI,
                        STAROSS,
                        PSYKOKWAK,
                        AKWAKWAK,
                        AQUALI,
                        LOKHLASS,
                        LEVIATOR,
                        HYPOCEAN
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
            },
            music: "music_azuria",
            trainer: ONDINE,
            badge: BADGE_CASCADE
        },
        trainer: {
            type: RoomType.ARENA,
            name: t("destination.AZURIA_ARENA"),
            map: "arene_azuria",
            music: "music_azuria",
            trainer: DRESSEUR_AZURIA,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    STARI,
                    CARAPUCE,
                    PSYKOKWAK,
                    PTITARD,
                    OTARIA,
                    KOKIYAS,
                    KRABBY,
                    HYPOTREMPE,
                    POISSIRENE,
                    AQUALI,
                    LOKHLASS
                ])
            }
        },
        shop: {
            type: RoomType.FREEWALK,
            name: t("destination.AZURIA_SHOP"),
            music: "music_shop",
            level: SHOP_AZURIA
        }
    },
    shopId: 3,
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('shop_azuria', 'assets/maps/shop_azuria.json');
        scene.load.tilemapTiledJSON('arene_azuria', 'assets/maps/arene_azuria.json');
        preloadMusic("music_azuria", "assets/audio/music/08 Cerulean City's Theme.mp3");
    }
}