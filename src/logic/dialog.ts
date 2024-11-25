import { Z } from "../data/depths";
import { DIALOGS } from "../data/dialogs";
import { DEFAULT_VOICE, VOICES_BY_ACTOR } from "../data/voices";
import { CHARACTER_STATE, type Character } from "../objects/character";
import { closeMenu, openMenu } from "../objects/menu";
import type { MyScene } from "../scenes/MyScene";
import { RoomType } from "../types/destination";
import type { DialogChoice, DialogLine, DialogParams } from "../types/dialog";
import { wait } from "../utils/helpers";
import { addText } from "../utils/text";
import { launchSpeech } from "./audio";
import { gameState } from "./gamestate";

const dialogStack: DialogStacked = [];

export function startDialog(
	lines: DialogLine[] | (() => DialogLine[]),
	params: DialogParams = {},
	onEndCallback?: () => Promise<void>,
): Promise<void> {
	const scene = gameState.activeScene;
	if (!scene) return Promise.reject("No scene");

	const speaker = params.speaker ?? "system";

	const voice = Object.assign(
		{},
		DEFAULT_VOICE,
		VOICES_BY_ACTOR[speaker ?? "red"],
		params,
	);

	const ox = 60;
	const oy = scene.scale.height - 38;
	const W = 220;
	const H = 34;

	const dialogGroup = scene.add.group().setOrigin(0, 0);

	const bgSprite = scene.add
		.nineslice(
			ox,
			oy, // this is the starting x/y location
			"box2", // a key to an already loaded image,
			undefined, // an optional frame from the Texture this Game Object is rendering with.
			W,
			H, // the width and height of your object
			4,
			4,
			4,
			4, // offset
		)
		.setOrigin(0, 0)
		.setScrollFactor(0)
		.setDepth(Z.DIALOG);
	dialogGroup.add(bgSprite);

	const textSprite = addText(ox + 8, oy + 4, "", {
		wordWrap: { width: W - 8 },
	})
		.setScrollFactor(0)
		.setResolution(2);
	dialogGroup?.add(textSprite)?.setDepth(Z.DIALOG);

	if (typeof lines === "function") lines = lines();

	if (gameState.activeDialog != null) {
		gameState.activeDialog.dialogGroup?.destroy(true, true);
		dialogStack.push({
			lines: gameState.activeDialog.lines,
			params: gameState.activeDialog.params,
			onEndCallback: gameState.activeDialog.onEnd,
		});
	}

	gameState.activeDialog = {
		lines: [...lines],
		params,
		speaker,
		voice,
		dialogGroup,
		textSprite,
		bgSprite,
	};

	const dialogPromise: Promise<void> = new Promise((resolve) => {
		gameState.activeDialog!.onEnd =
			onEndCallback || (() => wait(0).then(resolve));
	});

	showNextLine();

	return dialogPromise;
}

export function waitBeforeNextLine(delay: number) {
	if (gameState.activeDialog) {
		gameState.activeDialog.waitBeforeNextLine = true;
		setTimeout(() => {
			if (gameState.activeDialog) {
				gameState.activeDialog.waitBeforeNextLine = false;
			}
		}, delay);
	}
}

export async function showNextLine() {
	if (
		!gameState.activeDialog ||
		!gameState.activeScene ||
		gameState.activeDialog.waitBeforeNextLine
	)
		return;
	if (gameState.activeDialog.speech) {
		gameState.activeDialog.speech.stop();
		delete gameState.activeDialog.speech;
		return;
	}

	let line = gameState.activeDialog.lines.shift();

	while (
		typeof line === "function" ||
		Array.isArray(line) ||
		line instanceof Promise
	) {
		if (typeof line === "function") line = line();
		if (line instanceof Promise) line = await line;
		if (Array.isArray(line)) {
			gameState.activeDialog.lines.unshift(...line);
			line = gameState.activeDialog.lines.shift();
		}
	}

	if (typeof line === "string") {
		sayLine(line);
	} else if (typeof line === "object" && line !== null) {
		startChoice(line);
	} else {
		endDialog();
	}
}

export function sayLine(line: string) {
	if (!gameState.activeDialog) return;
	if (
		!["me", "system"].includes(gameState.activeDialog.speaker) &&
		gameState.currentRoom.type !== RoomType.FREEWALK
	) {
		gameState.activeDialog.bgSprite.setPosition(48, 2);
		gameState.activeDialog.textSprite.setPosition(56, 6);
	}

	if (gameState.activeDialog.voice.skipSpeech) {
		gameState.activeDialog.textSprite.text = line;
		return;
	}

	gameState.activeDialog.speech = launchSpeech(line);
}

export function endDialog() {
	if (gameState.activeDialog) {
		gameState.activeDialog.dialogGroup?.destroy(true, true);
		gameState.activeDialog.onEnd?.();
		gameState.activeDialog = null;
		if (dialogStack.length > 0) {
			const dialogStacked = dialogStack.pop();
			wait(0).then(() =>
				startDialog(
					dialogStacked.lines,
					dialogStacked.params,
					dialogStacked.onEndCallback,
				),
			);
		}
	}
}

export function startChoice(choice: DialogChoice) {
	const options = Object.keys(choice);
	const scene = gameState.activeScene as MyScene;

	const width = Math.max(...options.map((text) => text.length)) * 8 + 16;
	const height = 8 + 16 * options.length;
	const ox = scene.scale.width - width - 28;
	const oy = scene.scale.height - 32 - height;

	gameState.activeDialog!.choice = openMenu({
		ref: "dialogChoice",
		x: ox,
		y: oy,
		width,
		height,
		entries: Object.entries(choice).map(([label, value], i) => ({
			label,
			value,
			x: 4,
			y: i * 16,
		})),
		handleChoice,
		handleCancel() {
			if ("NON" in choice) handleChoice({ value: choice["NON"] });
			else closeMenu();
		},
	});
}

function handleChoice(selectedChoice) {
	if (!gameState.activeDialog?.choice) return;
	delete gameState.activeDialog.choice;
	closeMenu();
	gameState.activeDialog.lines.unshift(
		selectedChoice?.value || selectedChoice?.label,
	);
	showNextLine();
}

let talkingTo: string | null = null;
export function talkTo(pnj: Character, playerState: CHARACTER_STATE) {
	if (talkingTo != null) return; // already talking to someone

	// talk to someone
	switch (playerState) {
		case CHARACTER_STATE.LEFT:
		case CHARACTER_STATE.WALKING_LEFT:
			pnj.state = CHARACTER_STATE.RIGHT;
			break;
		case CHARACTER_STATE.RIGHT:
		case CHARACTER_STATE.WALKING_RIGHT:
			pnj.state = CHARACTER_STATE.LEFT;
			break;
		case CHARACTER_STATE.UP:
		case CHARACTER_STATE.WALKING_UP:
			pnj.state = CHARACTER_STATE.DOWN;
			break;
		case CHARACTER_STATE.DOWN:
		case CHARACTER_STATE.WALKING_DOWN:
			pnj.state = CHARACTER_STATE.UP;
			break;
	}

	if (!gameState.dialogStates.hasOwnProperty(pnj.name)) {
		gameState.dialogStates[pnj.name] = 0;
	}

	if (!DIALOGS.hasOwnProperty(pnj.name)) {
		DIALOGS[pnj.name] = () => startDialog(["..?"]);
	}

	talkingTo = pnj.name;
	return DIALOGS[pnj.name](pnj).then(() => {
		talkingTo = null;
	});
}
