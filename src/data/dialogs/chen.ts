import {startDialog} from "../../logic/dialog";
import {gameState} from "../../logic/gamestate";

export const CHEN_DIALOG_STATE = {
    hello: 0,
    after_hello: 1,
    after_starter_choice: 2,
    end: 3
}

export const CHEN: () => Promise<any> = () => {
    if(gameState.dialogStates.chen === CHEN_DIALOG_STATE.hello){
        return startDialog([
            "Bonjour Red ! Alors c'est aujourd'hui le grand jour !",
            "Le jour de ton voyage initiatique comme dresseur Pokémon !",
            "Tu vas voyager à travers tout Kanto, capturer des Pokemon,",
            "monter une équipe et affronter les 8 champions d'arènes.",
            "Peut-être même te confronter à la ligue Pokémon si tu en es capable !",
            "Mais d'abord, il te faut adopter ton premier Pokémon.",
            "Nous en avons capturé trois dans les pokeballs derrière moi.",
            "Il y en a un pour toi. Allez ! Choisis-en un !"
        ], { speaker: "chen" })
        .then(() => { gameState.dialogStates.chen = CHEN_DIALOG_STATE.after_hello})
    } 
    else if(gameState.dialogStates.chen === CHEN_DIALOG_STATE.after_hello){
        return startDialog([
            "Vas-y, tu peux prendre une des pokéballs sur la table derrière moi."
        ], { speaker: "chen" })
    } 
    else if(gameState.dialogStates.chen === CHEN_DIALOG_STATE.after_starter_choice){
        gameState.dialogStates.chen = CHEN_DIALOG_STATE.end
        return startDialog([
            `${gameState.player.team[0].entry.name} ? Excellent choix !`,
            "Ton Pokémon te protégera des Pokémon sauvages.",
            "Mais tout seul il ne sera pas de taille face aux champions d'arène!",
            "Il te faudra capturer des Pokémon sauvages pour composer une équipe.",
            "Chaque espèce de Pokémon a ses forces et faiblesses. N'oublie pas ça:",
            "La clé de la victoire est une équipe équilibrée et bien positionnée."
        ], { speaker: "chen" })
    } 
    else {
        return startDialog([
            `Tu devrais te rendre dans une ville voisine pour capturer d'autres Pokémon.`,
            "Bon voyage et bonne chance !"
        ], { speaker: "chen" })
    }
}