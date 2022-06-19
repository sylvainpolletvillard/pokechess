import { startDialog } from "../../logic/dialog";
import { gameState } from "../../logic/gamestate";

export const TRADER = () => startDialog([
    "Salut, tu veux échanger ton Vulvizarre contre mon Carapute ?"
], {
    speaker: `character${6 + (gameState.currentDestination.shopId ?? 0) % 10}` 
})