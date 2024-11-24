import { Dialog, type DialogLine } from "./dialog";

export interface Trainer {
	ref: string;
	name: string;
	frameIndex: number;
	introFrameIndex: number | null;
	dialogs: {
		start: DialogLine[] | (() => DialogLine[]);
		[other: string]: DialogLine[] | (() => DialogLine[]);
	};
}
