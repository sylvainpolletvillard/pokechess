import { Alteration, AlterationType } from "../data/alterations"
import { TYPE_ELECTRIQUE, TYPE_FEU, TYPE_PSY, TYPE_ROCHE, TYPE_SPECTRE, TYPE_VOL } from "../data/types"
import { PokemonOnBoard } from "../objects/pokemon"
import GameScene from "../scenes/GameScene"
import { addAlteration } from "./alteration"
import { applyDamage } from "./fight"
import { gameState } from "./gamestate"
import { getAlliancesState } from "./player"

export type OnHitEffect = (params: { attacker: PokemonOnBoard, target: PokemonOnBoard }) => void

export type OnHitReceivedEffect = (params: { damage: number , attacker: PokemonOnBoard}) => ({ damage: number })
        
export type AuraEffect = () => {}

export type ClockEffect = () => {}

export interface Buffs {    
    attack: (() => number)[],
    defense: (() => number)[],
    speed: (() => number)[],
    dodge: (() => number)[],
    onHit: OnHitEffect[],
    onHitReceived: OnHitReceivedEffect[],
    auras: AuraEffect[],
    clock: ClockEffect[]
}

export function resetBuffs(): Buffs {
    return {
        onHit: [],
        onHitReceived: [],
        auras: [],
        clock: [],
        attack: [],
        defense: [],
        speed: [],
        dodge: []
    }
}

export function applyBuffs(pokemon: PokemonOnBoard){
    const game = gameState.activeScene as GameScene    
    const alliances = getAlliancesState(pokemon.team)
    pokemon.buffs = {
        onHit: [],
        onHitReceived: [],
        auras: [],
        clock: [],
        attack: [],
        defense: [],
        speed: [],
        dodge: []
    }
    
    alliances.forEach(allianceState => {
        // BONUS ALLIANCE FEU
        if(pokemon.hasType(TYPE_FEU) && allianceState.type === TYPE_FEU && allianceState.stepReached){
            const effect: OnHitEffect = ({ target }) => {
                const alteration: Alteration = { type: AlterationType.BRULURE, stacks: allianceState.stepReachedN+1 }
                addAlteration(target, alteration, game)
                console.log(`Buff FEU de ${pokemon.entry.name}: ${alteration.stacks} stacks de brûlure`)
            }
            pokemon.buffs.onHit.push(effect)
        }

        // BONUS ALLIANCE PSY
        if(pokemon.hasType(TYPE_PSY) && allianceState.type === TYPE_PSY && allianceState.stepReached){
            const effect: OnHitEffect = ({ target }) => {
                target.pp = Math.max(0, target.pp - allianceState.stepReachedN*2)
                console.log(`Buff PSY de ${pokemon.entry.name}: la cible perd ${allianceState.stepReachedN*2}PP`)
            }
            pokemon.buffs.onHit.push(effect)
        }

        // BONUS ALLIANCE SPECTRE
        if(pokemon.hasType(TYPE_SPECTRE) && allianceState.type === TYPE_SPECTRE && allianceState.stepReached){
            const effect: OnHitEffect = ({ target }) => {
                const alteration: Alteration = { type: AlterationType.PEUR, stacks: allianceState.stepReachedN*2 }
                addAlteration(target, alteration, game)
                console.log(`Buff PEUR de ${pokemon.entry.name}: ${alteration.stacks} stacks de peur`)
            }
            pokemon.buffs.onHit.push(effect)
        }

        // BONUS ALLIANCE ELEC
        if(pokemon.hasType(TYPE_ELECTRIQUE) && allianceState.type === TYPE_ELECTRIQUE && allianceState.stepReached){
            const effect: OnHitReceivedEffect = ({ attacker, damage }) => {
                applyDamage(allianceState.stepReachedN * 2, attacker)
                console.log(`Choc ELEC sur ${attacker.entry.name}: ${allianceState.stepReachedN*2} dégats`)
                return { damage }
            }
            pokemon.buffs.onHitReceived.push(effect)
            pokemon.buffs.speed.push(() => 0.2 * allianceState.stepReachedN)
        }
        
        // BONUS ALLIANCE VOL
        if(pokemon.hasType(TYPE_VOL) && allianceState.type === TYPE_VOL && allianceState.stepReached){
            pokemon.buffs.dodge.push(() =>  0.2 * allianceState.stepReachedN)
        }

        // BONUS ALLIANCE ROCHE
        if(pokemon.hasType(TYPE_ROCHE) && allianceState.type === TYPE_ROCHE && allianceState.stepReached){
            pokemon.buffs.defense.push(() =>  0.2 * allianceState.stepReachedN)
        }


    })
}