import {Pokemon} from "../data/pokemons";
import {BULBIZARRE} from "../data/pokemons/bulbizarre";
import {HERBIZARRE} from "../data/pokemons/herbizarre";
import {FLORIZARRE} from "../data/pokemons/florizarre";
import {DRACAUFEU} from "../data/pokemons/dracaufeu";
import {SALAMECHE} from "../data/pokemons/salameche";
import {REPTINCEL} from "../data/pokemons/reptincel";
import {PokemonOnBoard} from "../objects/pokemon";
import {ITEM_POKEBALL} from "../data/items";
import {ALLIANCES, AllianceState} from "../data/alliances";
import {PokemonType} from "../data/types";

export class Player {
    ref: number;
    name: string;
    team: PokemonOnBoard[];
    box: (Pokemon | null)[];
    inventory: { [itemRef: string]: number };
    badges: string[];

    constructor(ref: number) {
        this.ref = ref;
        this.name = `Player ${ref}`
        this.team = [];
        this.inventory = { [ITEM_POKEBALL.ref]: 0 };
        this.box = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ];
        this.badges = [];
    }

    setupTeam(owner: number){
        if(owner === 1){
            return [
                new PokemonOnBoard( new Pokemon(BULBIZARRE, owner, 1), 6, 7),
                new PokemonOnBoard( new Pokemon(HERBIZARRE, owner,10), 2, 5),
                new PokemonOnBoard( new Pokemon(FLORIZARRE, owner,20), 3 ,7),
                new PokemonOnBoard( new Pokemon(DRACAUFEU, owner, 50), 4 ,6),
            ]
        } else {
            return [
                new PokemonOnBoard( new Pokemon(SALAMECHE, owner,1), 1, 3),
                new PokemonOnBoard( new Pokemon(REPTINCEL, owner,1), 5, 1),
                new PokemonOnBoard( new Pokemon(DRACAUFEU, owner,1), 6 ,1)
            ]
        }
    }

    resetTeam(): PokemonOnBoard[] {
        return this.team.map((pokemon: PokemonOnBoard) => pokemon.reset())
    }

    get averagePokemonLevel(): number {
        const top8: Pokemon[] = [...this.team, ...this.box]
            .sort((a,b) => (b ? b.level : 0) - (a ? a.level : 0))
            .slice(0,8)
            .filter(p => p instanceof Pokemon) as Pokemon[]
        const sumOfBest = top8.reduce((total, p) => total + p.level, 0)
        return Math.max(1, Math.floor(sumOfBest / top8.length))
    }

    get teamSize(): number {
        return [...this.team, ...this.box]
            .reduce((total, p) => { 
                if(!p) return total
                return total + 1
            }, 0)
    }

    get boxScore(): number {
        return [...this.team, ...this.box]
            .reduce((total, p) => { 
                if(!p) return total
                return total + p.level
            }, 0)
    }

    get hasBoxFull(){
        return this.box.every(slot => slot != null)
    }

    get boardAndBox(): Pokemon[] {
        return [...this.team, ...(this.box.filter(p => p != null) as Pokemon[])]
    }
}

export function getAlliancesState(team: Pokemon[]): AllianceState[] {
    const teamTypes = new Set(team.map(pokemon => pokemon.entry.types).flat())
    return [...teamTypes].map(type => getAllianceState(team, type))
}

export function getAllianceState(team: Pokemon[], type: PokemonType){
    const alliance = ALLIANCES[type.ref]
    const numberOfThatTypeInTeam = team.filter((p: Pokemon) => p.hasType(type)).length
    const stepReached = [...alliance.steps].reverse().find(step => step.numberRequired <= numberOfThatTypeInTeam) || null
    return {
        type,
        ref: stepReached?.ref,
        steps: alliance.steps,
        stepReached: stepReached,
        stepReachedN: stepReached ? alliance.steps.indexOf(stepReached) + 1 : 0,
        numberOfThatTypeInTeam
    }
}