import { pauseMusicAndPlaySound } from "../../logic/audio";
import { startDialog } from "../../logic/dialog";
import { gameState } from "../../logic/gamestate";
import { Trader } from "../../objects/character";
import { OWNER_PLAYER } from "../owners";
import { Pokemon } from "../pokemons";

export const TRADER = (character: Trader) => startDialog([
    () => {
        const pokemonGiven = character.pokemonToGive
        if(character.hasExchanged){
            return `Trop cool, un ${character.pokemonToReceive.name} !`
        }
        else if(pokemonGiven == null) return [
            `Salut, tu veux échanger des Pokémon ?`,
            `Si tu as des Pokémon en réserve dans ta box, on peut se les échanger !`
        ]
        else {
            const pokemonReceived = new Pokemon({
                entry: character.pokemonToReceive, 
                owner: OWNER_PLAYER,
                xp: pokemonGiven.xp,
                item: pokemonGiven.item ?? undefined,
                shouldAutoEvolve: true           
            })
            return [
                `Salut, tu veux échanger ton ${pokemonGiven.entry.name} contre mon ${pokemonReceived.entry.name} ?`,
                {
                    "OUI": () => [
                        () => {
                            pauseMusicAndPlaySound("pokemon_received")
                            const index = gameState.player.box.indexOf(pokemonGiven)
                            delete gameState.player.box[index]
                            gameState.player.box[index] = pokemonReceived
                            character.hasExchanged = true
                            return startDialog([`Vous échangez ${pokemonGiven.entry.name} contre ${pokemonReceived.entry.name} !`], { speaker: "system" })                                            
                        },
                        `Trop cool, un ${pokemonGiven.entry.name} !`
                    ],
                    "NON": () => ["Ah, bon tant pis."]
                }
            ]
        }
    }
], {
    speaker: `character${6 + (gameState.currentDestination.shopId ?? 0) % 10}` 
})