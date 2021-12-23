import {Pokemon, PokemonEntry, POKEMONS} from "../data/pokemons";
import {POKEMON_TYPES} from "../data/types";
import {gameState} from "./gamestate";
import {clamp, pickRandomIn, randomInt} from "../utils/helpers";
import {PokemonOnBoard} from "../objects/pokemon";
import {BULBIZARRE} from "../data/pokemons/bulbizarre";
import {SALAMECHE} from "../data/pokemons/salameche";
import {CARAPUCE} from "../data/pokemons/carapuce";
import {CHEN_DIALOG_STATE} from "../data/dialogs/chen";
import {NO_OWNER, OWNER_ARENA_CHAMPION, OWNER_CHEN} from "./player";
import {displayPokemonInfo, hidePokemonInfo} from "../objects/pokemonInfoBox";
import {addToTeam} from "./box";
import {Description} from "../objects/description";
import {pauseMusicAndPlaySound} from "./audio";
import {startDialog} from "./dialog";

export function spawnWildTeamByType(typesFactors: {[typeRef: string]: number }){
    const types = Object.keys(typesFactors)
    const pokemonsByTypes = types.map(typeRef => POKEMONS.filter(p => p.types.includes(POKEMON_TYPES[typeRef])))

    const numberToSpawn = Math.min(8, Math.floor((10 + gameState.player.boxScore) / 10))
    
    const sumFactors = Object.values(typesFactors).reduce((a,b) => a+b, 0)

    const team: PokemonOnBoard[] = [];
    for(let i=0; i<numberToSpawn; i++){
        const rand = Math.random() * sumFactors
        let acc=0, factorIndex=0;
        while(acc < rand){
            acc += typesFactors[types[factorIndex]]
            factorIndex++;
         }

        const pokemonEntry = pickRandomIn(pokemonsByTypes[factorIndex-1])
        const level = gameState.player.averagePokemonLevel;

        let x: number, y: number;
        do {
            x = randomInt(0,6);
            y = randomInt(0,3);
        } while(team.some(p => p.x === x && p.y === y))

        team.push(
            new PokemonOnBoard( new Pokemon(pokemonEntry, 0,level + randomInt(-2,3)), x, y)
        )
    }

    return team;
}

const STARTERS = [
    BULBIZARRE,
    SALAMECHE,
    /*CARAPUCE,
    NIDORAN,
    CHENIPAN,
    PIKACHU,
    MINIDRACO,
    MELOFEE,
    MACHOC,
    ROUCOOL,
    FANTOMINUS,
    SABELETTE,
    OTARIA,
    MIAOUSS,
    ABRA,
    RACAILLOU*/
]

export function pickStarters(): Pokemon[] {
    //TODO: pick 3 starters
    return [
        BULBIZARRE,
        SALAMECHE,
        CARAPUCE
    ].map(entry => new Pokemon(entry, OWNER_CHEN, 5))
}

export const pickStarter = (index: number) => (desc: Description) => {
    if(gameState.player.team.length > 0) return [`J'aurais peut-être dû prendre ${gameState.starters[index].name}...`]; // already picked one starter
    return [() => {
        const starter = gameState.starters[index]
        displayPokemonInfo(starter)
        return `Choisir ${starter.name} comme starter ?`
    }, {
        "OUI": () => {
            const starter = gameState.starters[index]
            addToTeam(new PokemonOnBoard(starter, 3, 6))
            hidePokemonInfo()
            desc.sprite.destroy(true)
            gameState.dialogStates.chen = CHEN_DIALOG_STATE.after_starter_choice
            pauseMusicAndPlaySound("pokemon_received")
            return startDialog([`Vous choisissez ${starter.name} !`], { wait: 2000 })
        },
        "NON": () => hidePokemonInfo()
    }]
}

export function spawnChampionTeam(pokemons: PokemonEntry[], positions: [number, number][]) {
    const team: PokemonOnBoard[] = []

    const numberToSpawn = Math.min( clamp(Math.floor((gameState.player.boxScore) / 10), 3, 8 ), positions.length, pokemons.length)
    const level = gameState.player.averagePokemonLevel;

    for(let i=0; i<numberToSpawn; i++){
        const entry = pokemons[i]
        const [x,y] = positions[i]
        team.push(
            new PokemonOnBoard(
                new Pokemon(entry, OWNER_ARENA_CHAMPION, level),
                x, y
            )
        )
    }

    return team
}

export function spawnTutoCaptureTeam(){
    const cloneStarter = new PokemonOnBoard(new Pokemon(gameState.player.team[0].entry, NO_OWNER, 3), 3, 3)
    const team: PokemonOnBoard[] = [ cloneStarter ]
    return team
}