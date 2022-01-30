import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import {DRESSEUR_GROTTE_AZUREE, DRESSEUR_LAVANVILLE, SALLY} from "../trainers";
import { GRODOUDOU } from "../pokemons/grodoudou";
import { LEVEINARD } from "../pokemons/leveinard";
import { MELODELFE } from "../pokemons/melodelfe";
import { MELOFEE } from "../pokemons/melofee";
import { MEW } from "../pokemons/mew";
import { RONDOUDOU } from "../pokemons/rondoudou";
import { MR_MIME } from "../pokemons/mrmime";
import { PAPILUSION } from "../pokemons/papilusion";
import {STARI} from "../pokemons/stari";
import {CARAPUCE} from "../pokemons/carapuce";
import {PSYKOKWAK} from "../pokemons/psykokwak";
import {PTITARD} from "../pokemons/ptitard";
import {OTARIA} from "../pokemons/otaria";
import {KOKIYAS} from "../pokemons/kokiyas";
import {KRABBY} from "../pokemons/krabby";
import {HYPOTREMPE} from "../pokemons/hypotrempe";
import {POISSIRENE} from "../pokemons/poissirene";
import {AQUALI} from "../pokemons/aquali";
import {LOKHLASS} from "../pokemons/lokhlass";
import {FANTOMINUS} from "../pokemons/fantominus";
import {MIAOUSS} from "../pokemons/miaouss";
import {CANINOS} from "../pokemons/caninos";
import {TAUROS} from "../pokemons/tauros";
import {EVOLI} from "../pokemons/evoli";
import {SHOP_JADIELLE} from "../levels/shops";

export const LAVANVILLE: Destination = {
    ref: "LAVANVILLE",
    name: "Lavanville",
    nextDestinations: {
        CENTRALE: [[0,-1],[-1,0],[0,-1],[-1,0]],
        TOUR_POKEMON: [[-3,0]],
        FALAISES: [[0,4]]
    },
    coordinates: [296,104],
    type: DestinationType.ARENA,
    icons: ["type_FEE"],
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène de Lavanville",
            map: "arene_lavanville",
            spawnOtherTeam() {
                return spawnChampionTeam([
                        MELOFEE,
                        MELODELFE,
                        RONDOUDOU,
                        GRODOUDOU,
                        MR_MIME,
                        LEVEINARD,
                        PAPILUSION,
                        MEW
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
            music: "music_lavanville",
            trainer: SALLY
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Arène de Lavanville",
            map: "arene_lavanville",
            music: "music_lavanville",
            trainer: DRESSEUR_LAVANVILLE,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    MELOFEE,
                    RONDOUDOU,
                    MR_MIME,
                    FANTOMINUS,
                    MIAOUSS,
                    CANINOS,
                    EVOLI,
                    TAUROS
                ])
            }
        },
        shop: {
            type: RoomType.FREEWALK,
            name: "Magasin de Lavanville",
            music: "music_shop",
            level: SHOP_JADIELLE
        }
    }
}