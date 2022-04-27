import { Alteration, AlterationType } from "../data/alterations"
import { OWNER_PLAYER } from "../data/owners"
import { TYPE_FEU, TYPE_PSY, TYPE_SPECTRE } from "../data/types"
import { PokemonOnBoard } from "../objects/pokemon"
import GameScene from "../scenes/GameScene"
import { addAlteration } from "./alteration"
import { gameState } from "./gamestate"
import { getAlliancesState } from "./player"

export type OnHitEffect = (params: { attacker: PokemonOnBoard, target: PokemonOnBoard }) => void

export type OnHitReceivedEffect = (params: { damage: number }) => ({ damage: number })
        
export type AuraEffect = () => {}

export type ClockEffect = () => {}

export function applyBuffs(pokemon: PokemonOnBoard){
    const game = gameState.activeScene as GameScene
    const team = pokemon.owner === OWNER_PLAYER ? gameState.board.playerTeam : gameState.board.otherTeam
    const alliances = getAlliancesState(team)
    pokemon.buffs.onHit = []
    
    alliances.forEach(allianceState => {
        // BONUS ALLIANCE FEU
        if(allianceState.type === TYPE_FEU && allianceState.stepReached){
            const effect: OnHitEffect = ({ target }) => {
                const alteration: Alteration = { type: AlterationType.BRULURE, stacks: allianceState.stepReachedN+1 }
                addAlteration(target, alteration, game)
                console.log(`Buff FEU de ${pokemon.entry.name}: ${alteration.stacks} stacks de brûlure`)
            }
            pokemon.buffs.onHit.push(effect)
        }

        // BONUS ALLIANCE PSY
        if(allianceState.type === TYPE_PSY && allianceState.stepReached){
            const effect: OnHitEffect = ({ target }) => {
                target.pp = Math.max(0, target.pp - allianceState.stepReachedN*2)
                console.log(`Buff PSY de ${pokemon.entry.name}: la cible perd ${allianceState.stepReachedN*2}PP`)
            }
            pokemon.buffs.onHit.push(effect)
        }

        // BONUS ALLIANCE SPECTRE
        if(allianceState.type === TYPE_SPECTRE && allianceState.stepReached){
            const effect: OnHitEffect = ({ target }) => {
                const alteration: Alteration = { type: AlterationType.PEUR, stacks: allianceState.stepReachedN*2 }
                addAlteration(target, alteration, game)
                console.log(`Buff PEUR de ${pokemon.entry.name}: ${alteration.stacks} stacks de peur`)
            }
            pokemon.buffs.onHit.push(effect)
        }


    })
}