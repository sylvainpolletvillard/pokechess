import {Destination, DestinationType, RoomType} from "../../types/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import {TYPE_DRAGON, TYPE_EAU, TYPE_GLACE, TYPE_ROCHE, TYPE_SPECTRE} from "../types";
import {DRESSEUR_GROTTE_AZUREE} from "../trainers";
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
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";
import { gameState } from "../../logic/gamestate";
import { BADGE_CASCADE } from "../badges";
import { MEWTWO } from "../pokemons/mewtwo";
import { PokemonOnBoard } from "../../objects/pokemon";
import { NO_OWNER } from "../owners";
import { Pokemon } from "../pokemons";
import { levelToXP } from "../../logic/xp";

export const GROTTE_AZUREE: Destination = {
    ref: "GROTTE_AZUREE",
    name: "Grotte Azurée",
    nextDestinations: {
        AZURIA: [[0,2]]
    },
    coordinates: [14*16 -8, 8],
    type: DestinationType.WILD,
    icons: ["type_GLACE"],
    locked(){
        return !gameState.hasBadge(BADGE_CASCADE)
    },
    rooms: {
        wild: {
            type: RoomType.WILD,
            music: "music_grotte_azuree",
            name: "Grotte Azurée",
            map: "grotte_azuree",
            spawnOtherTeam(){
                if(!gameState.pokedexSeen.has(MEWTWO.ref) && Math.random() < 5/100){
                    return [ new PokemonOnBoard(MEWTWO, NO_OWNER, levelToXP(50), null, 3, 3) ]
                }
                return spawnTeamByTypeFactor({
                    [TYPE_GLACE.ref]: 0.5,
                    [TYPE_EAU.ref]: 0.5,
                    [TYPE_DRAGON.ref]: 0.3,
                    [TYPE_ROCHE.ref]: 0.2,
                    [TYPE_SPECTRE.ref]: 0.1,
                })
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Grotte Azurée",
            map: "grotte_azuree",
            music: "music_grotte_azuree",
            trainer: DRESSEUR_GROTTE_AZUREE,
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
        }
    },
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('grotte_azuree', 'assets/maps/grotte_azuree.json');
        preloadMusic("music_grotte_azuree", "assets/audio/music/40 Pokemon Mansion.mp3");
    }
}