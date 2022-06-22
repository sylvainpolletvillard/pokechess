import {getNonLegendaryPokemons, getNonLegendaryPokemonsOfType, Pokemon, PokemonEntry} from "../data/pokemons";
import {POKEMON_TYPES, TYPE_NORMAL} from "../data/types";
import {gameState} from "./gamestate";
import {clamp, pickNRandomIn, pickRandomIn, randomInt} from "../utils/helpers";
import {PokemonOnBoard, putOnBoard} from "../objects/pokemon";
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
import { levelToXP } from "./xp";

export function spawnTeamByTypeFactor(typesFactors: {[typeRef: string]: number }): PokemonOnBoard[] {
    const types = Object.keys(typesFactors)

    const numberToSpawn = clamp(gameState.player.boardAndBox.length, 3, 6)
    
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
        const level = clamp(gameState.worldLevel - randomInt(0,5), 1, 50);

        let x: number, y: number;
        do {
            x = randomInt(0,6);
            y = randomInt(0,3);
        } while(team.some(p => p.x === x && p.y === y))

        team.push(
            putOnBoard(autoEvolve(new Pokemon(pokemonEntry, NO_OWNER, levelToXP(level), null)), x, y)
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
        let level = clamp(gameState.worldLevel + (i%5), 1,100)
        const entry = pokemons[i]
        const [x,y] = positions[i]
        team.push(
            putOnBoard(autoEvolve(new Pokemon(entry, OWNER_TRAINER, levelToXP(level), null)), x, y)
        )
    }

    return team
}

export function autoEvolve(pokemon: Pokemon): Pokemon {
    if(pokemon.entry.evolution && pokemon.entry.evolutionLevel && pokemon.level > pokemon.entry.evolutionLevel){
        pokemon.entry = pokemon.entry.evolution
        return autoEvolve(pokemon)
    }
    if(pokemon.entry.devolution && pokemon.level < pokemon.entry.devolution.evolutionLevel!){
        pokemon.entry = pokemon.entry.devolution
        return autoEvolve(pokemon)
    }
    return pokemon
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
            level = clamp(gameState.worldLevel + randomInt(-2,2), 3, 50)
            x = randomInt(0, 6)
            y = clamp(4 - entry.baseSkill.attackRange, 0, 3)
        } while(team.some(p => p.x === x && p.y === y))

        team.push(
            putOnBoard(autoEvolve(new Pokemon(entry, OWNER_TRAINER, levelToXP(level), null)), x, y)
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
        (entry: PokemonEntry, i: number) => new PokemonOnBoard(entry, NO_OWNER, levelToXP(1), null, 2*i + 1, (i%2) + 1)
    )
   
    return team
}

export function spawnTutoCaptureTeamStep2(entry: PokemonEntry): PokemonOnBoard[] {
    const cloneStarter = new PokemonOnBoard(entry, NO_OWNER, levelToXP(4), null, 3, 3)
    const team: PokemonOnBoard[] = [ cloneStarter ]
    return team
}

export function spawnSafariTeam(): PokemonOnBoard[] {
    const NUMBER_TO_SPAWN = 8
    const selection = pickNRandomIn(getNonLegendaryPokemons(), NUMBER_TO_SPAWN)

    const team: PokemonOnBoard[] = [];
    for(let i=0; i<NUMBER_TO_SPAWN; i++){
        const pokemonEntry = selection[i]
        const level = clamp(gameState.worldLevel + randomInt(-4, 4), 1, 50);

        let x: number, y: number;
        do {
            x = randomInt(0,6);
            y = randomInt(0,7);
        } while(team.some(p => p.x === x && p.y === y))

        team.push(
            putOnBoard(autoEvolve(new Pokemon(pokemonEntry, NO_OWNER, levelToXP(level), null)), x, y)
        )
    }

    return team    
}

export function spawnPensionTeam(): PokemonOnBoard[] {
    const NUMBER_TO_SPAWN = 5
    const selection = pickNRandomIn(getNonLegendaryPokemonsOfType(TYPE_NORMAL), NUMBER_TO_SPAWN)

    const team: PokemonOnBoard[] = [];
    for(let i=0; i<NUMBER_TO_SPAWN; i++){
        const pokemonEntry = selection[i]
        const level = 1;

        let x: number, y: number;
        do {
            x = randomInt(0,6);
            y = randomInt(0,3);
        } while(team.some(p => p.x === x && p.y === y))

        team.push(
            putOnBoard(autoEvolve(new Pokemon(pokemonEntry, NO_OWNER, levelToXP(level), null)), x, y)
        )
    }

    return team
}