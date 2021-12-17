import {startDialog} from "../../logic/dialog";
import {receiveItem} from "./descriptions";
import {SUPER_BONBON} from "../items";

export const MAM = () => {
    return startDialog([
      "Bonjour mon chéri !",
      "Je t'ai acheté un cadeau !"
    ])
    .then(() => receiveItem(SUPER_BONBON))
    .then(() => startDialog([
        "Bon courage dans ton aventure !"
    ]))
}