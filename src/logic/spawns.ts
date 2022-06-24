import {getNonLegendaryPokemonsOfType, getPokemonsOfType, PokemonEntry, POKEMONS} from "../data/pokemons";
import {POKEMON_TYPES, TYPE_NORMAL} from "../data/types";
import {gameState} from "./gamestate";
import {clamp, pickNRandomIn, pickRandomIn, ponderatedRandomIn, randomInt} from "../utils/helpers";
import {PokemonOnBoard} from "../objects/pokemon";
import { NO_OWNER, OWNER_TRAINER } from "../data/owners";
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

export function spawnTeamByTypeFactor(typesFactors: {[typeRef: string]: number }): PokemonOnBoard[] {
    const types = Object.keys(typesFactors)
    const numberToSpawn = clamp(gameState.player.boardAndBox.length, 3, 6)

    const team: PokemonOnBoard[] = [];
    for(let i=0; i<numberToSpawn; i++){
        const type = ponderatedRandomIn(types, typeRef => typesFactors[typeRef])
      
        let x: number, y: number;
        do {
            x = randomInt(0,6);
            y = randomInt(0,3);
        } while(team.some(p => p.x === x && p.y === y))

        team.push(
            new PokemonOnBoard({
                entry: ponderatedRandomIn(getPokemonsOfType(POKEMON_TYPES[type]), p => p.wildEncounterChance),
                owner: NO_OWNER,
                level: clamp(Math.floor(gameState.player.averagePokemonLevel * 0.9) - randomInt(0,5), 1, 50),
                shouldAutoEvolve: true,
                x, y
            })
        )
    }

    return team;
}

export function spawnChampionTeam(pokemons: PokemonEntry[], positions: [number, number][]): PokemonOnBoard[] {
    const team: PokemonOnBoard[] = []

    const numberToSpawn = Math.min( 
        clamp(gameState.player.boardAndBox.length, 3, 6),
        positions.length,
        pokemons.length
    )

    for(let i=0; i<numberToSpawn; i++){
        const [x,y] = positions[i]
        team.push(new PokemonOnBoard({
            entry: pokemons[i],
            owner: OWNER_TRAINER,
            level: clamp((gameState.player.badges.length + 2) * 5 + (i%5), 1, 100),
            x, y
        }))
    }

    return team
}

export function spawnTrainerTeam(pokemons: PokemonEntry[]): PokemonOnBoard[] {
    const team: PokemonOnBoard[] = []

    const numberToSpawn = Math.min(
        clamp(gameState.player.boardAndBox.length, 2, 6),
        pokemons.length
    )

    for(let i=0; i<numberToSpawn; i++){
        let x=0, y=0, entry, level
        do {
            entry = pickRandomIn(pokemons)
            level = clamp(gameState.player.averagePokemonLevel + randomInt(-3,+1), 3, 50)
            x = randomInt(0, 6)
            y = clamp(4 - entry.baseSkill.attackRange, 0, 3)
        } while(team.some(p => p.x === x && p.y === y))

        team.push(new PokemonOnBoard({
            entry,
            level,
            owner: OWNER_TRAINER,
            shouldAutoEvolve: true,
            x, y
        }))
    }

    return team
}

export function spawnTutoCaptureTeam(): PokemonOnBoard[] {
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
        (entry: PokemonEntry, i: number) => new PokemonOnBoard({
            entry, 
            owner: NO_OWNER,
            level: 1,
            x: 2*i + 1,
            y:(i%2) + 1
        })
    )
   
    return team
}

export function spawnTutoCaptureTeamStep2(entry: PokemonEntry): PokemonOnBoard[] {
    const cloneStarter = new PokemonOnBoard({
        entry,
        owner: NO_OWNER,
        level: 4,
        x: 3, y:3
    })
    const team: PokemonOnBoard[] = [ cloneStarter ]
    return team
}

export function spawnSafariTeam(): PokemonOnBoard[] {
    const NUMBER_TO_SPAWN = 8
    const selection = Array.from({ length: NUMBER_TO_SPAWN }).map(() => ponderatedRandomIn(POKEMONS, p => p.wildEncounterChance))

    const team: PokemonOnBoard[] = [];
    for(let i=0; i<NUMBER_TO_SPAWN; i++){
        let x: number, y: number;
        do {
            x = randomInt(0,6);
            y = randomInt(0,7);
        } while(team.some(p => p.x === x && p.y === y))

        team.push(new PokemonOnBoard({
            entry: selection[i],
            level: clamp(Math.floor(gameState.player.averagePokemonLevel * 0.9) + randomInt(-4, 4), 1, 50),
            owner: NO_OWNER,
            shouldAutoEvolve: true,
            x, y
        }))
    }

    return team    
}

export function spawnPensionTeam(): PokemonOnBoard[] {
    const NUMBER_TO_SPAWN = 5
    const selection = pickNRandomIn(getNonLegendaryPokemonsOfType(TYPE_NORMAL), NUMBER_TO_SPAWN)

    const team: PokemonOnBoard[] = [];
    for(let i=0; i<NUMBER_TO_SPAWN; i++){
        let x: number, y: number;
        do {
            x = randomInt(0,6);
            y = randomInt(0,3);
        } while(team.some(p => p.x === x && p.y === y))

        team.push(new PokemonOnBoard({
            entry: selection[i],
            level: 1,
            owner: NO_OWNER,
            shouldAutoEvolve: true,
            x, y
        }))
    }

    return team
}