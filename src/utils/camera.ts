import { gameState } from "../logic/gamestate";
import { wait } from "./helpers";

export function fadeOut(durationMs: number): Promise<void> {
	gameState.activeScene?.cameras.main?.fadeOut(durationMs, 202, 205, 184);
	return wait(durationMs);
}

export function fadeIn(durationMs: number): Promise<void> {
	gameState.activeScene?.cameras.main?.fadeIn(durationMs, 202, 205, 184);
	return wait(durationMs);
}
