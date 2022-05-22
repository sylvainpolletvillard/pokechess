import {DialogLine} from "./dialog";

export interface Trainer {
    ref: string;
    name: string;
    frameIndex: number,
    introFrameIndex: number | null,
    dialogs: {
        start: DialogLine[],
        [other: string]: DialogLine[]
    }
}
