import { t } from "../../i18n";
import { startDialog } from "../../logic/dialog";
import { gameState } from "../../logic/gamestate";

export const CHEN_DIALOG_STATE = {
	hello: 0,
	after_hello: 1,
	after_starter_choice: 2,
	end: 3,
};

export const CHEN: () => Promise<void> = () => {
	if (gameState.dialogStates.chen === CHEN_DIALOG_STATE.hello) {
		return startDialog(
			[
				t("dialog.chen.0"),
				t("dialog.chen.1"),
				t("dialog.chen.2"),
				t("dialog.chen.3"),
				t("dialog.chen.4"),
				t("dialog.chen.5"),
				t("dialog.chen.6"),
				t("dialog.chen.7"),
			],
			{ speaker: "chen" },
		).then(() => {
			gameState.dialogStates.chen = CHEN_DIALOG_STATE.after_hello;
		});
	}

	if (gameState.dialogStates.chen === CHEN_DIALOG_STATE.after_hello) {
		return startDialog([t("dialog.chen.8")], { speaker: "chen" });
	}

	if (gameState.dialogStates.chen === CHEN_DIALOG_STATE.after_starter_choice) {
		gameState.dialogStates.chen = CHEN_DIALOG_STATE.end;
		return startDialog(
			[
				t("dialog.chen.9", {
					pokemon: t("pokemon." + gameState.player.team[0].entry.ref),
				}),
				t("dialog.chen.10"),
				t("dialog.chen.11"),
				t("dialog.chen.12"),
				t("dialog.chen.13"),
				t("dialog.chen.14"),
			],
			{ speaker: "chen" },
		);
	}

	return startDialog([t("dialog.chen.15"), t("dialog.chen.16")], {
		speaker: "chen",
	});
};

export const CHEN_END_DIALOG_STATE = {
	hello: 0,
	after_hello: 1,
};

export const CHEN_END: () => Promise<void> = () => {
	if (gameState.dialogStates.chen === CHEN_DIALOG_STATE.after_hello) {
		return startDialog([t("dialog.chen.17")], { speaker: "chen" });
	}

	return startDialog(
		[
			t("dialog.chen.18"),
			t("dialog.chen.19"),
			t("dialog.chen.20"),
			t("dialog.chen.21"),
			t("dialog.chen.22"),
		],
		{ speaker: "chen" },
	).then(() => {
		gameState.dialogStates.chen = CHEN_DIALOG_STATE.after_hello;
	});
};
