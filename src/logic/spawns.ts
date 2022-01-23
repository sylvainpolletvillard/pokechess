import {Pokemon, PokemonEntry, POKEMONS} from "../data/pokemons";
import {POKEMON_TYPES} from "../data/types";
import {gameState} from "./gamestate";
import {clamp, pickNRandomIn, pickRandomIn, randomInt} from "../utils/helpers";
import {PokemonOnBoard} from "../objects/pokemon";
import {NO_OWNER, OWNER_TRAINER} from "../data/owners";
import { RATTATA } from "../data/pokemons/rattata";
import { NIDORAN_FEMALE } from "../data/pokemons/nidoranf";
import { CHETIFLOR } from "../data/pokemons/chetiflor";
import { PTITARD } from "../data/pokemons/ptitard";
import { EVOLI } from "../data/pokemons/evoli";
import { FEROSINGE } from "../data/pokemons/ferosinge";
import { MAGNETI } from "../data/pokemons/magneti";
import { RONDOUDOU } from "../data/pokemons/rondoudou";
import { SOPORIFIK } from "../data/pokemons/soporifik";
import { NOSFERAPTI } from "../data/pokemons/nosferapti";

export function spawnWildTeamByType(typesFactors: {[typeRef: string]: number }){
    const types = Object.keys(typesFactors)
    const pokemonsByTypes = types.map(typeRef => POKEMONS.filter(p => p.types.includes(POKEMON_TYPES[typeRef])))

    const numberToSpawn = Math.min(8, gameState.player.teamSize + 1)
    
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
        const level = Math.min(Math.floor(gameState.worldLevel/2), 50);

        let x: number, y: number;
        do {
            x = randomInt(0,6);
            y = randomInt(0,3);
        } while(team.some(p => p.x === x && p.y === y))

        team.push(
            new PokemonOnBoard( new Pokemon(pokemonEntry, 0,level + randomInt(-5,0)), x, y)
        )
    }

    return team;
}

export function spawnChampionTeam(pokemons: PokemonEntry[], positions: [number, number][]) {
    const team: PokemonOnBoard[] = []

    const numberToSpawn = Math.min( 
        clamp(Math.floor(gameState.worldLevel / 12), 3, 8 ),
        positions.length,
        pokemons.length
    )

    for(let i=0; i<numberToSpawn; i++){
        let level = clamp(Math.floor(gameState.worldLevel/2), 1,50) + (i%5)
        const entry = pokemons[i]
        const [x,y] = positions[i]
        team.push(
            new PokemonOnBoard(
                new Pokemon(entry, OWNER_TRAINER, level),
                x, y
            )
        )
    }

    return team
}

export function spawnTrainerTeam(pokemons: PokemonEntry[]) {
    const team: PokemonOnBoard[] = []

    const numberToSpawn = Math.min(
        clamp(Math.floor(gameState.worldLevel / 15), 2, 8 ),
        pokemons.length
    )

    for(let i=0; i<numberToSpawn; i++){
        let x=0, y=0, entry, level
        do {
            entry = pickRandomIn(pokemons)
            level = clamp(Math.floor(gameState.worldLevel/2) - randomInt(1,5), 3, 50)
            x = randomInt(0, 6)
            y = clamp(4 - entry.baseSkill.attackRange, 0, 3)
        } while(team.some(p => p.x === x && p.y === y))

        team.push(
            new PokemonOnBoard(
                new Pokemon(entry, OWNER_TRAINER, level),
                x, y
            )
        )
    }

    return team
}

export function spawnTutoCaptureTeam(){
    const SECONDERS: PokemonEntry[] = [
        RATTATA,
        NIDORAN_FEMALE,
        CHETIFLOR,
        PTITARD,
        FEROSINGE,
        MAGNETI,
        EVOLI,
        RONDOUDOU,
        SOPORIFIK,
        NOSFERAPTI
    ]
    const selection = pickNRandomIn(SECONDERS, 3)
    const team: PokemonOnBoard[] = selection.map(
        (entry: PokemonEntry, i: number) => new PokemonOnBoard(
            new Pokemon(entry, NO_OWNER, 1),
            2*i + 1, (i%2) + 1
        )
    )
   
    return team
}

export function spawnTutoCaptureTeamStep2(){
    const cloneStarter = new PokemonOnBoard(new Pokemon(gameState.player.team[0].entry, NO_OWNER, 4), 3, 3)
    const team: PokemonOnBoard[] = [ cloneStarter ]
    return team
}