import {Destination, DestinationType, RoomType} from "../../types/destination";
import { TYPE_NORMAL, TYPE_PSY, TYPE_SPECTRE} from "../types";
import {spawnTrainerTeam, spawnTeamByTypeFactor} from "../../logic/spawns";
import { DRESSEUR_TOUR_POKEMON} from "../trainers";
import {FANTOMINUS} from "../pokemons/fantominus";
import {OSSELAIT} from "../pokemons/osselait";
import {NOSFERAPTI} from "../pokemons/nosferapti";
import {MELOFEE} from "../pokemons/melofee";
import {GOUPIX} from "../pokemons/goupix";
import {ABRA} from "../pokemons/abra";
import {RATTATA} from "../pokemons/rattata";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";
import { t } from "../../i18n";

export const TOUR_POKEMON: Destination = {
    ref: "TOUR_POKEMON",
    name: t("destination.TOUR_POKEMON"),
    nextDestinations: {
        SAFRANIA: [[-2,0]],
        LAVANVILLE: [[3,0]]
    },
    coordinates: [16*16 -8, 7*16 -8],
    type: DestinationType.WILD,
    icons: ["type_SPECTRE"],
    rooms: {
        wild: {
            name: t("destination.TOUR_POKEMON"),
            type: RoomType.WILD,
            map: "tour_pokemon",
            music: "music_tour_pokemon",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_SPECTRE.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_PSY.ref]: 0.2
                })
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: t("destination.TOUR_POKEMON"),
            map: "tour_pokemon",
            music: "music_tour_pokemon",
            trainer: DRESSEUR_TOUR_POKEMON,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    FANTOMINUS,
                    FANTOMINUS,
                    FANTOMINUS,
                    OSSELAIT,
                    NOSFERAPTI,
                    GOUPIX,
                    MELOFEE,
                    ABRA,
                    RATTATA
                ])
            }
        }
    },
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('tour_pokemon', 'assets/maps/tour_pokemon.json');
        preloadMusic("music_tour_pokemon", "assets/audio/music/41 Pokemon Tower.mp3");    
    }
}