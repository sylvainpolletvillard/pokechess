import { pauseMusicAndPlaySound } from "../../logic/audio";
import { startDialog } from "../../logic/dialog";
import { gameState } from "../../logic/gamestate";
import { Trader } from "../../objects/character";
import { OWNER_PLAYER } from "../owners";
import { Pokemon } from "../pokemons";

export const TRADER = (character: Trader) => startDialog([
    () => {
        const pokemonGiven = character.pokemonToGive
        if(pokemonGiven == null) return [
            `Salut, tu veux échanger des Pokémon ?`,
            `Si tu as des Pokémon en réserve dans ta box, ça m'intéresserait de faire des échanges.`
        ]
        else {
            const pokemonReceived = new Pokemon(character.pokemonToReceive, OWNER_PLAYER, pokemonGiven.level)
            return [
                `Salut, tu veux échanger ton ${pokemonGiven.entry.name} contre mon ${pokemonReceived.entry.name} ?`,
                {
                    "Oui": () => [
                        () => {
                            pauseMusicAndPlaySound("pokemon_received")
                            const index = gameState.player.box.indexOf(pokemonGiven)
                            delete gameState.player.box[index]
                            gameState.player.box[index] = pokemonReceived
                            return startDialog([`Vous échangez ${pokemonGiven.entry.name} contre ${pokemonReceived.entry.name} !`], { speaker: "system" })                                            
                        },
                        `Trop cool, un ${pokemonGiven.entry.name} !`
                    ],
                    "Non": () => ["Ah, bon tant pis."]
                }
            ]
        }
    }
], {
    speaker: `character${6 + (gameState.currentDestination.shopId ?? 0) % 10}` 
})