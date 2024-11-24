import { CHEN, CHEN_END } from "./chen";
import { assistant1, assistant2 } from "./chen_assistants";
import { GUIDE, HEALER } from "./guides";
import { MAM } from "./mam";
import { SELLER_FEMALE, SELLER_MALE } from "./sellers";
import { TRADER } from "./traders";

export const DIALOGS: { [name: string]: () => Promise<void> } = {
	mam: MAM,
	chen: CHEN,
	chen_end: CHEN_END,
	assistant1,
	assistant2,
	seller_male: SELLER_MALE,
	seller_female: SELLER_FEMALE,
	trader: TRADER,
	info: GUIDE,
	healer: HEALER,
};
