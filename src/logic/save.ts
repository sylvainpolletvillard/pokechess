import {Player} from "./player";
import {setupPlayerIdleBoard} from "./board";
import {GameStage, gameState} from "./gamestate";
import {DESTINATIONS} from "../data/destinations";
import {PokemonOnBoard} from "../objects/pokemon";
import { Pokemon, POKEMONS} from "../data/pokemons";
import {MAGICARPE} from "../data/pokemons/magicarpe";
import {xpToLevel} from "./xp";
import { ITEMS } from "../data/items";

const KEY_SAVE = "pokechess_save"
const KEY_RECORD = "pokechess_record"

interface Save {
    day: number
    currentDestinationRef: string
    currentRoomIndex: number
    roomOrder: string[]
    players: SerializedPlayer[]
    stage: string
    dialogStates: { [pnjName: string]: number }
    seed: number
    lastCaptureDestinationRef?: string
    lastTourMam: number
    pension: SerializedPokemonOnBoard[]
    pokedexSeen: string[]
    pokedexCaptured: string[]
    wokeUpRonflex: boolean
}

interface SerializedRecord {
    team: SerializedPokemonOnBoard[]
    pokedexSeen: number
    pokedexCaptured: number
    nbTours: number;
}

interface Record {
    team: PokemonOnBoard[]
    pokedexSeen: number
    pokedexCaptured: number
    nbTours: number;
}

export function saveState(){
    const save: Save = {
        day: gameState.day,
        currentDestinationRef: gameState.currentDestination.ref,
        currentRoomIndex: gameState.currentRoomIndex,
        roomOrder: gameState.roomOrder,
        players: gameState.players.map(p => serializePlayer(p)),
        stage: gameState.stage,
        dialogStates: gameState.dialogStates,
        seed: gameState.seed,
        lastCaptureDestinationRef: gameState.lastCaptureDestination?.ref,
        lastTourMam: gameState.lastTourMam,
        pension: gameState.pension.map(p => serializePokemonOnBoard(p)),
        pokedexSeen: [...gameState.pokedexSeen],
        pokedexCaptured: [...gameState.pokedexCaptured],
        wokeUpRonflex: gameState.wokeUpRonflex
    }
    localStorage.setItem(KEY_SAVE, JSON.stringify(save))
}

export function hasSave(){
    return localStorage.getItem(KEY_SAVE) != null
}

export function loadSave(): boolean {
    const saveJSON = localStorage.getItem(KEY_SAVE)
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
    gameState.lastTourMam = save.lastTourMam
    gameState.pension = save.pension.map(p => parseSerializedPokemonOnBoard(p))
    gameState.pokedexCaptured = new Set(save.pokedexCaptured)
    gameState.pokedexSeen = new Set(save.pokedexSeen)
    gameState.wokeUpRonflex = save.wokeUpRonflex
    return true
}

export function loadRecord(): Record | null {
    const recordJSON = localStorage.getItem(KEY_RECORD)
    if(!recordJSON) return null

    let record
    try {
        record = JSON.parse(recordJSON) as SerializedRecord
        return {
            team: record.team.map(p => parseSerializedPokemonOnBoard(p)),
            pokedexSeen: record.pokedexSeen,
            pokedexCaptured: record.pokedexCaptured,
            nbTours: record.nbTours
        }
    } catch(e){
        console.error(`Corrupted record save :${e}`)
        return null;
    }
}

export function saveNewRecord(){
    const record: SerializedRecord = {
        team: gameState.player.team.map(p => serializePokemonOnBoard(p)),
        pokedexSeen: gameState.pokedexSeen.size,
        pokedexCaptured: gameState.pokedexCaptured.size,
        nbTours: gameState.day
    }

    localStorage.setItem(KEY_RECORD, JSON.stringify(record))
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
    itemRef?: string
}

function serializePokemon(p: Pokemon): SerializedPokemon {
    return { ref: p.entry.ref, xp: p.xp, itemRef: p.item?.ref, owner: p.owner }
}

function parseSerializedPokemon(p: SerializedPokemon): Pokemon {
    const pokemon = new Pokemon({
        entry: POKEMONS.find(q => q.ref === p.ref) ?? MAGICARPE,
        owner: p.owner, 
        xp: p.xp,
        item: p.itemRef ? ITEMS[p.itemRef] : undefined
    })
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
    return new PokemonOnBoard({
        entry: POKEMONS.find(q => q.ref === p.ref) ?? MAGICARPE,
        owner: p.owner, 
        xp: p.xp,
        item: p.itemRef ? ITEMS[p.itemRef] : undefined,
        x: p.x,
        y: p.y
    })
}