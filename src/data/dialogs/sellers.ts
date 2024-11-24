import { startDialog } from "../../logic/dialog";
import { openBuyMenu } from "../../objects/shopMenu";

export const SELLER_MALE: () => Promise<any> = () => {
	return startDialog([t("dialog.sellerm.hello")], {
		speaker: "seller_male",
	}).then(() => openBuyMenu("seller_male"));
};

export const SELLER_FEMALE: () => Promise<any> = () => {
	return startDialog([t("dialog.sellerf.hello")], {
		speaker: "seller_female",
	}).then(() => openBuyMenu("seller_female"));
};
