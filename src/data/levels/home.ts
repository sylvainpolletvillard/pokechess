import {LevelConfig} from "../../logic/level";

export const homeLevel: LevelConfig = {
    title: "Maison",
    tilemap: "home",
    tilesets: ["tileset_inside"],
    startAt: "home_exit",
    init() {

    }
}