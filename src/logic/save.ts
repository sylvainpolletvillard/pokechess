import {Player} from "./player";
import {setupPlayerIdleBoard} from "./board";
import {GameStage, gameState} from "./gamestate";
import {DESTINATIONS} from "../data/destinations";
import {PokemonOnBoard} from "../objects/pokemon";
import {HoldableItem, Pokemon, POKEMONS} from "../data/pokemons";
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
    pension: SerializedPokemonOnBoard[]
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
        lastCaptureDestinationRef: gameState.lastCaptureDestination?.ref,
        pension: gameState.pension.map(p => serializePokemonOnBoard(p))
    }
    localStorage.setItem("save", JSON.stringify(save))
}

export function loadSave(): boolean {
    const saveJSON = localStorage.getItem("save")
    if(!saveJSON) return false

    let save;
    const loadedState: any = {}
    try {
        save = JSON.parse(saveJSON) as Save
        
        loadedState.day = save.day
        loadedState.currentDestination = DESTINATIONS[save.currentDestinationRef]
        loadedState.currentRoomIndex = save.currentRoomIndex;
        loadedState.roomOrder = save.roomOrder
        loadedState.players = save.players.map(p => parseSerializedPlayer(p))
        loadedState.board = setupPlayerIdleBoard(parseSerializedPlayer(save.players[0]))
        loadedState.stage = save.stage as GameStage
        loadedState.dialogStates = save.dialogStates
        loadedState.seed = save.seed;
        loadedState.lastCaptureDestination = save.lastCaptureDestinationRef ? DESTINATIONS[save.lastCaptureDestinationRef] : null
        loadedState.pension = save.pension.map(p => parseSerializedPokemonOnBoard(p))
    } catch(e){
        console.error(`Corrupted save :${e}`)
        return false;
    }

    Object.assign(gameState, loadedState)
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
    owner: number
    item?: HoldableItem
}

function serializePokemon(p: Pokemon): SerializedPokemon {
    return { ref: p.entry.ref, xp: p.xp, item: p.item, owner: p.owner }
}

function parseSerializedPokemon(p: SerializedPokemon): Pokemon {
    const level = xpToLevel(p.xp)
    const pokemon = new Pokemon(POKEMONS.find(q => q.ref === p.ref) ?? MAGICARPE, p.owner, level)
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
