import {Destination, DestinationType, RoomArena, RoomType} from "../../types/destination";
import { preloadMusic } from "../../logic/audio";
import { PokemonOnBoard } from "../../objects/pokemon";
import { Pokemon } from "../pokemons";
import { LAMANTINE } from "../pokemons/lamantine";
import { OWNER_TRAINER } from "../owners";
import { LIPPOUTOU } from "../pokemons/lippoutou";
import { CRUSTABRI } from "../pokemons/crustabri";
import { FLAGADOSS } from "../pokemons/flagadoss";
import { LOKHLASS } from "../pokemons/lokhlass";
import { AGATHA, ALDO, OLGA, PETER } from "../trainers";
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

const ARENE_OLGA: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_ligue1",
    music: "music_route_victoire",
    name: "Ligue Indigo - Étage 1",
    trainer: OLGA,    
    spawnOtherTeam(){
        return [
            new PokemonOnBoard(new Pokemon(LAMANTINE, OWNER_TRAINER, 54), 0,1),
            new PokemonOnBoard(new Pokemon(LAMANTINE, OWNER_TRAINER, 54), 6,1),
            new PokemonOnBoard(new Pokemon(CRUSTABRI, OWNER_TRAINER, 53), 3,3),
            new PokemonOnBoard(new Pokemon(FLAGADOSS, OWNER_TRAINER, 54), 4,3),
            new PokemonOnBoard(new Pokemon(LIPPOUTOU, OWNER_TRAINER, 56), 2,3),
            new PokemonOnBoard(new Pokemon(LOKHLASS, OWNER_TRAINER, 56), 5,2),
        ]
    }
}

const ARENE_ALDO: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_ligue2",
    music: "music_route_victoire",
    name: "Ligue Indigo - Étage 2",
    trainer: ALDO,    
    spawnOtherTeam(){
        return [
            new PokemonOnBoard(new Pokemon(ONIX, OWNER_TRAINER, 53), 0,3),
            new PokemonOnBoard(new Pokemon(TYGNON, OWNER_TRAINER, 55), 1,3),
            new PokemonOnBoard(new Pokemon(COLOSSINGE, OWNER_TRAINER, 56), 2,3),
            new PokemonOnBoard(new Pokemon(MACKOGNEUR, OWNER_TRAINER, 58), 4,3),
            new PokemonOnBoard(new Pokemon(KICKLEE, OWNER_TRAINER, 55), 5,3),            
            new PokemonOnBoard(new Pokemon(ONIX, OWNER_TRAINER, 56), 6,3),
        ]
    }
}

const ARENE_AGATHA: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_ligue3",
    music: "music_route_victoire",
    name: "Ligue Indigo - Étage 3",
    trainer: AGATHA,    
    spawnOtherTeam(){
        return [
            new PokemonOnBoard(new Pokemon(ECTOPLASMA, OWNER_TRAINER, 56), 3,3),
            new PokemonOnBoard(new Pokemon(ARBOK, OWNER_TRAINER, 58), 1,3),
            new PokemonOnBoard(new Pokemon(NOSFERALTO, OWNER_TRAINER, 56), 3,1),
            new PokemonOnBoard(new Pokemon(SPECTRUM, OWNER_TRAINER, 55), 4,2),
            new PokemonOnBoard(new Pokemon(SPECTRUM, OWNER_TRAINER, 55), 2,2),
            new PokemonOnBoard(new Pokemon(ECTOPLASMA, OWNER_TRAINER, 60), 5,3),
        ]
    }
}

const ARENE_PETER: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_ligue4",
    music: "music_route_victoire",
    name: "Ligue Indigo - Étage 4",
    trainer: PETER,    
    spawnOtherTeam(){
        return [
            new PokemonOnBoard(new Pokemon(LEVIATOR, OWNER_TRAINER, 58), 2,2),
            new PokemonOnBoard(new Pokemon(PTERA, OWNER_TRAINER, 60), 3,2),
            new PokemonOnBoard(new Pokemon(LEVIATOR, OWNER_TRAINER, 58), 4,2),
            new PokemonOnBoard(new Pokemon(DRACO, OWNER_TRAINER, 56), 0,0),
            new PokemonOnBoard(new Pokemon(DRACO, OWNER_TRAINER, 56), 6,0),
            new PokemonOnBoard(new Pokemon(DRACOLOSSE, OWNER_TRAINER, 62), 3,1),
        ]
    }
}

export const LIGUE: Destination = {
    ref: "LIGUE",
    name: "Ligue Indigo",
    subtext: "Conseil des 4",
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
        shop: {
            type: RoomType.FREEWALK,
            name: "Hall de la Ligue",
            music: "music_route_victoire",
            level: SHOP_LIGUE
        }
    },
    customRoomOrder(){
        return ["shop","olga","aldo","agatha","peter"]
    },
    shopId: 10,
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('shop_ligue', 'assets/maps/shop_ligue.json');
        scene.load.tilemapTiledJSON('arene_ligue1', 'assets/maps/arene_ligue1.json');
        scene.load.tilemapTiledJSON('arene_ligue2', 'assets/maps/arene_ligue2.json');
        scene.load.tilemapTiledJSON('arene_ligue3', 'assets/maps/arene_ligue3.json');
        scene.load.tilemapTiledJSON('arene_ligue4', 'assets/maps/arene_ligue4.json');
        preloadMusic("music_route_victoire", "assets/audio/music/22 The Last Road.mp3");
    }
}
