import { t } from "../../i18n";
import { startDialog } from "../../logic/dialog";

export const assistant1 = () => {
	return startDialog(
		[
			t("dialog.assistant1.0"),
			t("dialog.assistant1.1"),
			{
				[t("dialog.assistant1.q1")]: () => [t("dialog.assistant1.r1")],
				[t("dialog.assistant1.q2")]: () => [
					t("dialog.assistant1.r2"),
					t("dialog.assistant1.r3"),
				],
				[t("dialog.assistant1.q3")]: () => [
					t("dialog.assistant1.r4"),
					t("dialog.assistant1.r5"),
					t("dialog.assistant1.r6"),
					t("dialog.assistant1.r7"),
				],
			},
		],
		{ speaker: "assistant1" },
	);
};

export const assistant2 = () => {
	return startDialog(
		[
			t("dialog.assistant2.0"),
			t("dialog.assistant2.1"),
			t("dialog.assistant2.2"),
			t("dialog.assistant2.3"),
		],
		{ speaker: "assistant2" },
	);
};
