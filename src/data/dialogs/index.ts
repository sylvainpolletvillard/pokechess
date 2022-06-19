import {MAM} from "./mam";
import {CHEN, CHEN_END} from "./chen";
import {assistant1, assistant2} from "./chen_assistants";
import {SELLER_MALE, SELLER_FEMALE} from "./sellers";
import { TRADER } from "./traders";
import { GUIDE, HEALER } from "./guides";

export const DIALOGS: { [name: string]: () => Promise<any> } = {
    mam: MAM,
    chen: CHEN,
    chen_end: CHEN_END,
    assistant1,
    assistant2,
    seller_male: SELLER_MALE,
    seller_female: SELLER_FEMALE,
    trader: TRADER,
    info: GUIDE,
    healer: HEALER
}