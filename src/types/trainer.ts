import type { DialogLine } from "./dialog";

export interface Trainer {
	ref: string;
	frameIndex: number;
	introFrameIndex: number | null;
	dialogs: {
		start: DialogLine[] | (() => DialogLine[]);
		[other: string]: DialogLine[] | (() => DialogLine[]);
	};
}
