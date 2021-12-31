import {LevelConfig} from "../../logic/level";
import {gameState} from "../../logic/gamestate";
import {BOURG_PALETTE} from "../destinations/bourg_palette";
import {startDialog} from "../../logic/dialog";

export const chenLevel: LevelConfig = {
    title: "Laboratoire de Chen",
    tilemap: "map_labo_chen",
    tilesets: ["tileset_inside"],
    startAt: "labo_exit",
    canExit(){
        if(gameState.player.team.length === 0){
            startDialog([
                `Le prof Chen m'a promis de me confier mon premier Pokémon aujourd'hui.`,
                `Je ne compte pas repartir d'ici sans lui !`
            ], { speaker: "red" })
            return false;
        }
        /*if(gameState.player.inventory.pokeball === 0){
            startDialog([
                `Oh, j'allais oublier mes Pokéballs ! Le prof Chen doit en avoir.`
            ], { speaker: "red" })
            return false;
        }*/
        return true;
    },
    exit() {
        gameState.currentDestination = BOURG_PALETTE
    }
}