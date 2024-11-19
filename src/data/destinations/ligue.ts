import {Destination, DestinationType, RoomArena, RoomType} from "../../types/destination";
import { preloadMusic } from "../../logic/audio";
import { PokemonOnBoard } from "../../objects/pokemon";
import { LAMANTINE } from "../pokemons/lamantine";
import { OWNER_TRAINER } from "../owners";
import { LIPPOUTOU } from "../pokemons/lippoutou";
import { CRUSTABRI } from "../pokemons/crustabri";
import { FLAGADOSS } from "../pokemons/flagadoss";
import { LOKHLASS } from "../pokemons/lokhlass";
import { AGATHA, ALDO, OLGA, PETER, RIVAL } from "../trainers";
import { KICKLEE } from "../pokemons/kicklee";
import { ONIX } from "../pokemons/onix";
import { TYGNON } from "../pokemons/tygnon";
import { MACKOGNEUR } from "../pokemons/mackogneur";
import { ARBOK } from "../pokemons/arbok";
import { ECTOPLASMA } from "../pokemons/ectoplasma";
import { NOSFERALTO } from "../pokemons/nosferalto";
import { SPECTRUM } from "../pokemons/spectrum";
import { DRACO } from "../pokemons/draco";
import { DRACOLOSSE } from "../pokemons/dracolosse";
import { LEVIATOR } from "../pokemons/leviator";
import { PTERA } from "../pokemons/ptera";
import { SHOP_LIGUE } from "../levels/shops";
import { COLOSSINGE } from "../pokemons/colossinge";
import { SABLAIREAU } from "../pokemons/sablaireau";
import { ALAKAZAM } from "../pokemons/alakazam";
import { NOADKOKO } from "../pokemons/noadkoko";
import { FEUNARD } from "../pokemons/feunard";
import { MAGNETON } from "../pokemons/magneton";
import { AQUALI } from "../pokemons/aquali";
import { END_ROOM } from "../levels/endroom";
import { t } from "../../i18n";

const ARENE_OLGA: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_ligue1",
    music: "music_route_victoire",
    name: t("destination.LIGUE_FLOOR1"),
    trainer: OLGA,    
    spawnOtherTeam(){
        return [
            new PokemonOnBoard({ entry: LAMANTINE, owner: OWNER_TRAINER, level: 54, x:0, y:1 }),
            new PokemonOnBoard({ entry: LAMANTINE, owner: OWNER_TRAINER, level: 54, x:6, y:1 }),
            new PokemonOnBoard({ entry: CRUSTABRI, owner: OWNER_TRAINER, level: 53, x:3, y:3 }),
            new PokemonOnBoard({ entry: FLAGADOSS, owner: OWNER_TRAINER, level: 54, x:4, y:3 }),
            new PokemonOnBoard({ entry: LIPPOUTOU, owner: OWNER_TRAINER, level: 56, x:2, y:3 }),
            new PokemonOnBoard({ entry: LOKHLASS, owner: OWNER_TRAINER, level: 56, x:5, y:2 }),
        ]
    }
}

const ARENE_ALDO: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_ligue2",
    music: "music_route_victoire",
    name: t("destination.LIGUE_FLOOR2"),
    trainer: ALDO,    
    spawnOtherTeam(){
        return [
            new PokemonOnBoard({ entry: ONIX, owner: OWNER_TRAINER, level: 53, x:0, y:3 }),
            new PokemonOnBoard({ entry: TYGNON, owner: OWNER_TRAINER, level: 55, x:1, y:3 }),
            new PokemonOnBoard({ entry: COLOSSINGE, owner: OWNER_TRAINER, level: 56, x:2, y:3 }),
            new PokemonOnBoard({ entry: MACKOGNEUR, owner: OWNER_TRAINER, level: 58, x:4, y:3 }),
            new PokemonOnBoard({ entry: KICKLEE, owner: OWNER_TRAINER, level: 55, x:5, y:3 }),
            new PokemonOnBoard({ entry: ONIX, owner: OWNER_TRAINER, level: 56, x:6, y:3 }),
        ]
    }
}

const ARENE_AGATHA: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_ligue3",
    music: "music_route_victoire",
    name: t("destination.LIGUE_FLOOR3"),
    trainer: AGATHA,    
    spawnOtherTeam(){
        return [
            new PokemonOnBoard({ entry: ECTOPLASMA, owner: OWNER_TRAINER, level: 56, x:3, y:3 }),
            new PokemonOnBoard({ entry: ARBOK, owner: OWNER_TRAINER, level: 58, x:1, y:3 }),
            new PokemonOnBoard({ entry: NOSFERALTO, owner: OWNER_TRAINER, level: 56, x:3, y:1 }),
            new PokemonOnBoard({ entry: SPECTRUM, owner: OWNER_TRAINER, level: 55, x:4, y:2 }),
            new PokemonOnBoard({ entry: SPECTRUM, owner: OWNER_TRAINER, level: 55, x:2, y:2 }),
            new PokemonOnBoard({ entry: ECTOPLASMA, owner: OWNER_TRAINER, level: 60, x:5, y:3 }),
        ]
    }
}

const ARENE_PETER: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_ligue4",
    music: "music_route_victoire",
    name: t("destination.LIGUE_FLOOR4"),
    trainer: PETER,    
    spawnOtherTeam(){
        return [
            new PokemonOnBoard({ entry: LEVIATOR, owner: OWNER_TRAINER, level: 58, x:2, y:2 }),
            new PokemonOnBoard({ entry: PTERA, owner: OWNER_TRAINER, level: 60, x:3, y:2 }),
            new PokemonOnBoard({ entry: LEVIATOR, owner: OWNER_TRAINER, level: 58, x:4, y:2 }),
            new PokemonOnBoard({ entry: DRACO, owner: OWNER_TRAINER, level: 56, x:0, y:0 }),
            new PokemonOnBoard({ entry: DRACO, owner: OWNER_TRAINER, level: 56, x:6, y:0 }),
            new PokemonOnBoard({ entry: DRACOLOSSE, owner: OWNER_TRAINER, level: 62, x:3, y:1 }),
        ]
    }
}

const ARENE_RIVAL: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_ligue5",
    music: "music_route_victoire",
    name: t("destination.LIGUE_FLOOR5"),
    trainer: RIVAL,    
    spawnOtherTeam(){
        //TODO: adapter la team en fonction du starter choisi
        //https://www.pokepedia.fr/Blue_(jeux_vidéo)/Équipes_dans_Pokémon_Jaune
        return [
            new PokemonOnBoard({ entry: SABLAIREAU, owner: OWNER_TRAINER, level: 61, x:0, y:3 }),
            new PokemonOnBoard({ entry: ALAKAZAM, owner: OWNER_TRAINER, level: 59, x:1, y:1 }),
            new PokemonOnBoard({ entry: MAGNETON, owner: OWNER_TRAINER, level: 63, x:3, y:3 }),
            new PokemonOnBoard({ entry: FEUNARD, owner: OWNER_TRAINER, level: 61, x:5, y:2 }),
            new PokemonOnBoard({ entry: NOADKOKO, owner: OWNER_TRAINER, level: 61, x:6, y:2 }),
            new PokemonOnBoard({ entry: AQUALI, owner: OWNER_TRAINER, level: 65, x:4, y:1 }),
        ]
    }
}

export const LIGUE: Destination = {
    ref: "LIGUE",
    name: t("destination.LIGUE"),
    subtext: t("destination_subtext.CONSEIL_DES_4"),
    nextDestinations: {
        ROUTE_VICTOIRE_SORTIE: [[0,1],[-1,0],[0,-1]]
    },
    coordinates: [2*16 -8, 3*16 -8],
    type: DestinationType.ARENA,
    icons: ["icon_ligue"],
    rooms: {
        olga: ARENE_OLGA,
        aldo: ARENE_ALDO,
        agatha: ARENE_AGATHA,
        peter: ARENE_PETER,
        rival: ARENE_RIVAL,
        shop: {
            type: RoomType.FREEWALK,
            name: t("destination.LIGUE_HALL"),
            music: "music_route_victoire",
            level: SHOP_LIGUE,
        },
        endroom: {
            type: RoomType.FREEWALK,
            name: t("destination.LIGUE_FLOOR5"),
            music: "music_ending",
            level: END_ROOM
        }
    },
    customRoomOrder(){
        return ["shop","olga","aldo","agatha","peter", "rival", "endroom"]
    },
    shopId: 10,
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('shop_ligue', 'assets/maps/shop_ligue.json');
        scene.load.tilemapTiledJSON('arene_ligue1', 'assets/maps/arene_ligue1.json');
        scene.load.tilemapTiledJSON('arene_ligue2', 'assets/maps/arene_ligue2.json');
        scene.load.tilemapTiledJSON('arene_ligue3', 'assets/maps/arene_ligue3.json');
        scene.load.tilemapTiledJSON('arene_ligue4', 'assets/maps/arene_ligue4.json');
        scene.load.tilemapTiledJSON('arene_ligue5', 'assets/maps/arene_ligue5.json');
        scene.load.tilemapTiledJSON('endroom', 'assets/maps/endroom.json');
        preloadMusic("music_route_victoire", "assets/audio/music/22 The Last Road.mp3");
        preloadMusic("music_ending", "assets/audio/music/30 Ending.mp3")
    }
}
