import { t } from "../../i18n";
import { startDialog } from "../../logic/dialog";
import type { Menu } from "../../objects/menu";
import { openBuyMenu } from "../../objects/shopMenu";

export const SELLER_MALE: () => Promise<Menu | void> = () => {
	return startDialog([t("dialog.sellerm.hello")], {
		speaker: "seller_male",
	}).then(() => openBuyMenu("seller_male"));
};

export const SELLER_FEMALE: () => Promise<Menu | void> = () => {
	return startDialog([t("dialog.sellerf.hello")], {
		speaker: "seller_female",
	}).then(() => openBuyMenu("seller_female"));
};
