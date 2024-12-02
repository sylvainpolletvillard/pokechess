import { t } from "../../i18n";
import { startDialog } from "../../logic/dialog";
import { gameState } from "../../logic/gamestate";
import type { DialogLine } from "../../types/dialog";
import { clamp, pickRandomIn } from "../../utils/helpers";
import {
	ATTAQUE_PLUS,
	BAIE_CERIZ,
	BAIE_MEPO,
	BAIE_ORAN,
	BAIE_SITRUS,
	BOULE_FUMEE,
	DEFENSE_PLUS,
	ENCENS_FLEUR,
	GEMME_CIEL,
	GEMME_DRACO,
	GEMME_FLAMME,
	GEMME_GLACE,
	GEMME_GRISE,
	GEMME_HERBE,
	GEMME_HYDRO,
	GEMME_INSECTE,
	GEMME_OMBRE,
	GEMME_PIXIE,
	GEMME_POING,
	GEMME_PSY,
	GEMME_ROC,
	GEMME_TERRE,
	GEMME_TOXIC,
	GEMME_VOLT,
	GRELOT_COQUE,
	ITEM_POKEBALL,
	MAX_ELIXIR,
	MULTI_EXP,
	ORBE_FLAMME,
	ORBE_FOUDRE,
	ORBE_TOXIQUE,
	PV_PLUS,
	SUPER_BONBON,
	VITESSE_PLUS,
} from "../items";
import { receiveItem } from "./descriptions";

export const MAM_DIALOG_STATE = {
	hello: 0,
	after_gift: 1,
};

export const MAM = () => {
	if (gameState.dialogStates.mam === MAM_DIALOG_STATE.after_gift)
		return startDialog([t("dialog.mom.after_gift")], { speaker: "mam" });

	const ITEMS_1 = [BAIE_CERIZ, BAIE_MEPO, BAIE_ORAN, BAIE_SITRUS];
	const ITEMS_2 = [ATTAQUE_PLUS, DEFENSE_PLUS, VITESSE_PLUS, PV_PLUS];
	const ITEMS_3 = [
		GEMME_DRACO,
		GEMME_POING,
		GEMME_CIEL,
		GEMME_VOLT,
		GEMME_HERBE,
		GEMME_HYDRO,
		GEMME_FLAMME,
		GEMME_TOXIC,
		GEMME_PSY,
		GEMME_INSECTE,
		GEMME_ROC,
		GEMME_OMBRE,
		GEMME_GLACE,
		GEMME_GRISE,
		GEMME_PIXIE,
		GEMME_TERRE,
	];
	const ITEMS_4 = [GRELOT_COQUE, BOULE_FUMEE, MULTI_EXP, MAX_ELIXIR];
	const ITEMS_5 = [
		ENCENS_FLEUR,
		ORBE_TOXIQUE,
		ORBE_FLAMME,
		ORBE_FOUDRE,
		SUPER_BONBON,
	];

	const elapsedDays = gameState.day - gameState.lastTourMam;
	return startDialog(
		[
			t("dialog.mom.hello"),
			() => {
				let lines: DialogLine[];
				if (elapsedDays <= 3)
					lines = [
						t("dialog.mom.gift1"),
						() => receiveItem(ITEM_POKEBALL, clamp(elapsedDays - 1, 1, 3)),
					];
				else if (elapsedDays < 9)
					lines = [
						t("dialog.mom.gift2"),
						t("dialog.mom.gift3"),
						() =>
							receiveItem(
								pickRandomIn(ITEMS_1),
								clamp(Math.ceil(elapsedDays / 3), 1, 3),
							),
					];
				else if (elapsedDays < 20)
					lines = [
						t("dialog.mom.gift4"),
						t("dialog.mom.gift5"),
						() => receiveItem(pickRandomIn(ITEMS_2)),
					];
				else if (elapsedDays < 30)
					lines = [
						t("dialog.mom.gift6"),
						t("dialog.mom.gift7"),
						t("dialog.mom.gift8"),
						() => receiveItem(pickRandomIn(ITEMS_3)),
						t("dialog.mom.gift9"),
						t("dialog.mom.gift10"),
						t("dialog.mom.gift11"),
					];
				else if (elapsedDays < 40)
					lines = [
						t("dialog.mom.gift12"),
						t("dialog.mom.gift13"),
						() => receiveItem(pickRandomIn(ITEMS_4)),
						t("dialog.mom.gift14"),
						t("dialog.mom.gift15"),
					];
				else
					lines = [
						t("dialog.mom.gift16"),
						t("dialog.mom.gift17"),
						t("dialog.mom.gift18"),
						() => receiveItem(pickRandomIn(ITEMS_5)),
						t("dialog.mom.gift19"),
						t("dialog.mom.gift20"),
					];

				return lines;
			},
		],
		{ speaker: "mam" },
	).then(() =>
		startDialog(
			[
				() => {
					gameState.lastTourMam = gameState.day;
					gameState.dialogStates.mam = MAM_DIALOG_STATE.after_gift;
					return t("dialog.mom.after_gift");
				},
			],
			{ speaker: "mam" },
		),
	);
};
