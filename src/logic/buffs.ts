import { Alteration, AlterationType } from "../data/alterations"
import { OWNER_PLAYER } from "../data/owners"
import { TYPE_COMBAT, TYPE_DRAGON, TYPE_ELECTRIQUE, TYPE_FEE, TYPE_FEU, TYPE_GLACE, TYPE_PLANTE, TYPE_PSY, TYPE_ROCHE, TYPE_SOL, TYPE_SPECTRE, TYPE_VOL } from "../data/types"
import { PokemonOnBoard } from "../objects/pokemon"
import GameScene from "../scenes/GameScene"
import { removeInArray } from "../utils/helpers"
import { addAlteration } from "./alteration"
import { getPokemonOnTile, isOnBoard } from "./board"
import { applyDamage, healPokemon } from "./fight"
import { gameState } from "./gamestate"
import { tunnel } from "./specials"

export type OnHitEffect = (params: { attacker: PokemonOnBoard, target: PokemonOnBoard }) => void

export type OnHitReceivedEffect = {
    (params: { damage: number , attacker: PokemonOnBoard}): void
    count?: number;
}
export type ClockEffect = () => void

export interface Buffs {    
    attack: (() => number)[],
    defense: (() => number)[],
    speed: (() => number)[],
    dodge: (() => number)[],
    onHit: OnHitEffect[],
    onHitReceived: OnHitReceivedEffect[],
    clock: ClockEffect[]
}

export function resetBuffs(): Buffs {
    return {
        onHit: [],
        onHitReceived: [],
        clock: [],
        attack: [],
        defense: [],
        speed: [],
        dodge: []
    }
}

export function applyBuffs(pokemon: PokemonOnBoard){
    const game = gameState.activeScene as GameScene    
    const alliances = pokemon.owner === OWNER_PLAYER ? gameState.board.playerAlliances : gameState.board.otherTeamAlliances
    pokemon.buffs = resetBuffs()
    
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
            const effect: OnHitReceivedEffect = ({ attacker }) => {
                applyDamage(allianceState.stepReachedN * 2, attacker, pokemon)
                console.log(`Choc ELEC sur ${attacker.entry.name}: ${allianceState.stepReachedN*2} dégats`)
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

        // BONUS ALLIANCE SOL
        if(pokemon.hasType(TYPE_SOL) && allianceState.type === TYPE_SOL && allianceState.stepReached){
            const buffTunnel:OnHitReceivedEffect = ({ damage }) => {
                if(!buffTunnel.count || buffTunnel.count <= 0) return;
                const triggerPoint = [0.2,0.5,0.8][buffTunnel.count-1]                
                if((pokemon.pv - damage) > 0 && (pokemon.pv - damage) / pokemon.maxPV < triggerPoint){
                    tunnel(pokemon, null, game)
                    buffTunnel.count--;
                    console.log(`Buff SOL sur ${pokemon.entry.name}, plus que ${buffTunnel.count} tunnel`)
                }
            }
            buffTunnel.count = allianceState.stepReachedN
            pokemon.buffs.onHitReceived.push(buffTunnel)
        }

        // BONUS ALLIANCE FEE
        if(allianceState.type === TYPE_FEE && allianceState.stepReached){
            pokemon.buffs.clock.push(() => {
                pokemon.pp = Math.min(pokemon.entry.maxPP, pokemon.pp + allianceState.stepReachedN)
                //console.log(`Buff FEE: +${allianceState.stepReachedN}PP sur ${pokemon.entry.name}`)
            })
        }

        // BONUS ALLIANCE PLANTE
        if(pokemon.hasType(TYPE_PLANTE) && allianceState.type === TYPE_PLANTE && allianceState.stepReached){
            pokemon.buffs.clock.push(() => {
                healPokemon(pokemon, (2/100)*allianceState.stepReachedN*pokemon.maxPV)
                //console.log(`Buff PLANTE: +${(2/100)*allianceState.stepReachedN*pokemon.maxPV}PV sur ${pokemon.entry.name}`)
            })
        }

        // BONUS ALLIANCE COMBAT
        if(pokemon.hasType(TYPE_COMBAT) && allianceState.type === TYPE_COMBAT && allianceState.stepReached){
            function getNumberOfOpponentsTargetingMe(){                
                return pokemon.opponents.filter(p => p.nextAction.target === pokemon).length                
            }
            const factors = [0.02, 0.05, 0.08]
            pokemon.buffs.attack.push(() => getNumberOfOpponentsTargetingMe() * factors[allianceState.stepReachedN-1])
            pokemon.buffs.defense.push(() => getNumberOfOpponentsTargetingMe() * factors[allianceState.stepReachedN-1])
        }

        // BONUS ALLIANCE GLACE
        if(pokemon.hasType(TYPE_GLACE) && allianceState.type === TYPE_GLACE && allianceState.stepReached){
            pokemon.buffs.clock.push(() => {
                let [i,j] = [pokemon.x, pokemon.y]
                const tiles = [
                    [i-1, j-1], [i, j-1], [i+1, j-1],
                    [i-1, j], [i+1, j],
                    [i-1, j+1], [i, j+1], [i+1, j+1]
                ].filter(([i,j]) => isOnBoard(i,j))
                const affected = tiles.map(([i,j]) => getPokemonOnTile(i,j)).filter(p => p != null && p.owner !== OWNER_PLAYER) as PokemonOnBoard[]
                affected.forEach(opponent => {
                    const factor = [-0.2, -0.3, -0.4]
                    const buff = () => factor[allianceState.stepReachedN] ?? 0
                    opponent.buffs.speed.push(buff)
                    setTimeout(() => removeInArray(opponent.buffs.speed, buff), 1000)
                })
            })
        }

        // BONUS ALLIANCE DRAGON
        if(pokemon.hasType(TYPE_DRAGON) && allianceState.type === TYPE_DRAGON && allianceState.stepReached){
            const isLastDragon = () => pokemon.team.length === 1;
            pokemon.buffs.attack.push(() => isLastDragon() ? 0.1 * allianceState.stepReachedN : 0);
            pokemon.buffs.defense.push(() => isLastDragon() ? 0.1 * allianceState.stepReachedN : 0);
            pokemon.buffs.speed.push(() => isLastDragon() ? 0.1 * allianceState.stepReachedN : 0);            
        }

    })
}