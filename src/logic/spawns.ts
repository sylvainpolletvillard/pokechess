import {getNonLegendaryPokemons, getNonLegendaryPokemonsOfType, Pokemon, PokemonEntry} from "../data/pokemons";
import {POKEMON_TYPES} from "../data/types";
import {gameState} from "./gamestate";
import {clamp, pickNRandomIn, pickRandomIn, randomInt} from "../utils/helpers";
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
import { getNumberMaxAllowedOnBoard } from "./board";

export function spawnTeamByTypeFactor(typesFactors: {[typeRef: string]: number }): PokemonOnBoard[] {
    const types = Object.keys(typesFactors)

    const numberToSpawn = clamp(getNumberMaxAllowedOnBoard(), 3, 8)
    
    const sumFactors = Object.values(typesFactors).reduce((a,b) => a+b, 0)

    const team: PokemonOnBoard[] = [];
    for(let i=0; i<numberToSpawn; i++){
        const rand = Math.random() * sumFactors
        let acc=0, factorIndex=0;
        while(acc < rand){
            acc += typesFactors[types[factorIndex]]
            factorIndex++;
         }

        const pokemonEntry = pickRandomIn(getNonLegendaryPokemonsOfType(POKEMON_TYPES[types[factorIndex-1]]))
        const level = clamp(Math.floor(gameState.worldLevel) + randomInt(-5,0), 1, 50);

        let x: number, y: number;
        do {
            x = randomInt(0,6);
            y = randomInt(0,3);
        } while(team.some(p => p.x === x && p.y === y))

        team.push(
            new PokemonOnBoard(
                autoEvolve(new Pokemon(pokemonEntry, 0, level)),
                x, y
            )
        )
    }

    return team;
}

export function spawnChampionTeam(pokemons: PokemonEntry[], positions: [number, number][]): PokemonOnBoard[] {
    const team: PokemonOnBoard[] = []

    const numberToSpawn = Math.min( 
        clamp(Math.floor(gameState.worldLevel / 6), 3, 8 ),
        positions.length,
        pokemons.length
    )

    for(let i=0; i<numberToSpawn; i++){
        let level = clamp(Math.floor(gameState.worldLevel) - 2 + (i%5), 1,100)
        const entry = pokemons[i]
        const [x,y] = positions[i]
        team.push(
            new PokemonOnBoard(
                autoEvolve(new Pokemon(entry, OWNER_TRAINER, level)),
                x, y
            )
        )
    }

    return team
}

export function autoEvolve(pokemon: Pokemon): Pokemon{
    if(pokemon.entry.evolution && pokemon.entry.evolutionLevel && pokemon.level > pokemon.entry.evolutionLevel) return autoEvolve(new Pokemon(pokemon.entry.evolution, pokemon.owner, pokemon.level))
    if(pokemon.entry.devolution && pokemon.level < pokemon.entry.devolution.evolutionLevel!) return autoEvolve(new Pokemon(pokemon.entry.devolution, pokemon.owner, pokemon.level))
    return pokemon
}

export function spawnTrainerTeam(pokemons: PokemonEntry[]): PokemonOnBoard[] {
    const team: PokemonOnBoard[] = []

    const numberToSpawn = Math.min(
        clamp(Math.floor(gameState.worldLevel / 6), 2, 8 ),
        pokemons.length
    )

    for(let i=0; i<numberToSpawn; i++){
        let x=0, y=0, entry, level
        do {
            entry = pickRandomIn(pokemons)
            level = clamp(Math.floor(gameState.worldLevel) - randomInt(1,5), 3, 50)
            x = randomInt(0, 6)
            y = clamp(4 - entry.baseSkill.attackRange, 0, 3)
        } while(team.some(p => p.x === x && p.y === y))

        team.push(
            new PokemonOnBoard(
                autoEvolve(new Pokemon(entry, OWNER_TRAINER, level)),
                x, y
            )
        )
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
        (entry: PokemonEntry, i: number) => new PokemonOnBoard(
            new Pokemon(entry, NO_OWNER, 1),
            2*i + 1, (i%2) + 1
        )
    )
   
    return team
}

export function spawnTutoCaptureTeamStep2(entry: PokemonEntry): PokemonOnBoard[] {
    const cloneStarter = new PokemonOnBoard(new Pokemon(entry, NO_OWNER, 4), 3, 3)
    const team: PokemonOnBoard[] = [ cloneStarter ]
    return team
}

export function spawnSafariTeam(): PokemonOnBoard[] {
    const NUMBER_TO_SPAWN = 8
    const selection = pickNRandomIn(getNonLegendaryPokemons(), NUMBER_TO_SPAWN)

    const team: PokemonOnBoard[] = [];
    for(let i=0; i<NUMBER_TO_SPAWN; i++){

        const pokemonEntry = selection[i]
        const level = clamp(Math.floor(gameState.worldLevel) + randomInt(-4,1), 1, 50);

        let x: number, y: number;
        do {
            x = randomInt(0,6);
            y = randomInt(0,7);
        } while(team.some(p => p.x === x && p.y === y))

        team.push(
            new PokemonOnBoard(
                autoEvolve(new Pokemon(pokemonEntry, NO_OWNER, level)),
                x, y
            )
        )
    }

    return team    
}