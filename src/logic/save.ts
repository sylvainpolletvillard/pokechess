import {Player} from "./player";
import {setupPlayerIdleBoard} from "./board";
import {GameStage, gameState} from "./gamestate";
import {DESTINATIONS} from "../data/destinations";
import {PokemonOnBoard} from "../objects/pokemon";
import {HoldableItem, Pokemon, POKEMONS} from "../data/pokemons";
import {OWNER_PLAYER} from "../data/owners";
import {MAGICARPE} from "../data/pokemons/magicarpe";
import {xpToLevel} from "./xp";

interface Save {
    day: number
    currentDestinationRef: string
    currentRoomIndex: number
    roomOrder: string[]
    players: SerializedPlayer[]
    stage: string
    dialogStates: { [pnjName: string]: number }
    seed: number
    lastCaptureDestinationRef: string
}


export function saveState(){
    const save = {
        day: gameState.day,
        currentDestinationRef: gameState.currentDestination.ref,
        currentRoomIndex: gameState.currentRoomIndex,
        roomOrder: gameState.roomOrder,
        players: gameState.players.map(p => serializePlayer(p)),
        stage: gameState.stage,
        dialogStates: gameState.dialogStates,
        seed: gameState.seed,
        lastCaptureDestinationRef: gameState.lastCaptureDestination?.ref
    }
    localStorage.setItem("save", JSON.stringify(save))
}

export function loadSave(): boolean {
    const saveJSON = localStorage.getItem("save")
    if(!saveJSON) return false

    let save;
    try {
        save = JSON.parse(saveJSON) as Save
    } catch(e){
        console.error(`Corrupted save :${e}`)
        return false;
    }

    gameState.day = save.day
    gameState.currentDestination = DESTINATIONS[save.currentDestinationRef]
    gameState.currentRoomIndex = save.currentRoomIndex;
    gameState.roomOrder = save.roomOrder
    gameState.players = save.players.map(p => parseSerializedPlayer(p))
    gameState.board = setupPlayerIdleBoard(parseSerializedPlayer(save.players[0]))
    gameState.stage = save.stage as GameStage
    gameState.dialogStates = save.dialogStates
    gameState.seed = save.seed;
    gameState.lastCaptureDestination = save.lastCaptureDestinationRef ? DESTINATIONS[save.lastCaptureDestinationRef] : null

    return true
}

interface SerializedPlayer {
    ref: number;
    name: string;
    team: SerializedPokemonOnBoard[];
    box: (SerializedPokemon | null)[];
    inventory: { [itemRef: string]: number };
    badges: string[];
}

function serializePlayer(player: Player): SerializedPlayer {
    return {
        ref: player.ref,
        name: player.name,
        team: player.team.map(p => serializePokemonOnBoard(p)),
        box: player.box.map(p => p ? serializePokemon(p) : null),
        inventory: player.inventory,
        badges: player.badges
    }
}

function parseSerializedPlayer(player: SerializedPlayer): Player {
    return Object.assign(new Player(player.ref), {
        name: player.name,
        team: player.team.map(p => parseSerializedPokemonOnBoard(p)),
        box: player.box.map(p => p ? parseSerializedPokemon(p) : null),
        inventory: player.inventory,
        badges: player.badges
    })
}

interface SerializedPokemon {
    ref: string
    xp: number
    item?: HoldableItem
}

function serializePokemon(p: Pokemon): SerializedPokemon {
    return { ref: p.entry.ref, xp: p.xp, item: p.item }
}

function parseSerializedPokemon(p: SerializedPokemon): Pokemon {
    const level = xpToLevel(p.xp)
    const pokemon = new Pokemon(POKEMONS.find(q => q.ref === p.ref) ?? MAGICARPE, OWNER_PLAYER, level)
    pokemon.xp = p.xp
    pokemon.item = p.item
    return pokemon
}

interface SerializedPokemonOnBoard extends SerializedPokemon {
    x: number
    y: number
}

function serializePokemonOnBoard(p: PokemonOnBoard): SerializedPokemonOnBoard {
    return { ...serializePokemon(p), x: p.placementX, y: p.placementY }
}

function parseSerializedPokemonOnBoard(p: SerializedPokemonOnBoard): PokemonOnBoard {
    return new PokemonOnBoard(parseSerializedPokemon(p), p.x, p.y)
}
