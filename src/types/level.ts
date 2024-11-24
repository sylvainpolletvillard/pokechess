export interface LevelConfig {
	title: string;
	tilemap: string;
	tilesets: string[];
	startAt: string;
	init?(): any;
	exit?(): any;
	canExit?(): any;
}
