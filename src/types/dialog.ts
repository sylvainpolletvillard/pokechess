import type { VoiceConfig } from "../data/voices";
import type { Menu } from "../objects/menu";

export type DialogLine =
	| string
	| DialogChoice
	| DialogLine[]
	| null
	| Promise<DialogLine | void>
	| (() => DialogLine);

export interface Dialog {
	lines: DialogLine[];
	speaker: string;
	voice: VoiceConfig;
	params: DialogParams;
	dialogGroup: Phaser.GameObjects.Group;
	textSprite: Phaser.GameObjects.Text;
	bgSprite: Phaser.GameObjects.NineSlice;
	speech?: any;
	choice?: Menu;
	selectedChoice?: DialogChoice;
	onEnd?: () => void;
	waitBeforeNextLine?: boolean;
}

export interface DialogParams {
	speaker?: string;
	wait?: number;
}

export type DialogChoice = { [option: string]: DialogLine };

export interface DialogStacked {
	lines: DialogLine[];
	params: DialogParams;
	onEndCallback?: () => void;
}
