import {MAM} from "./mam";
import {CHEN} from "./chen";
import {assistant1, assistant2} from "./chen_assistants";
import {SELLER_MALE, SELLER_FEMALE} from "./sellers";

export const DIALOGS: { [name: string]: () => Promise<any> } = {
    mam: MAM,
    chen: CHEN,
    assistant1,
    assistant2,
    seller_male: SELLER_MALE,
    seller_female: SELLER_FEMALE
}