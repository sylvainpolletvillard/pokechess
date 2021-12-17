import {LevelConfig} from "../../logic/level";

export const homeLevel: LevelConfig = {
    title: "Maison",
    tilemap: "map_home",
    tilesets: ["tileset_inside"],
    startAt: "home_exit",
    init() {

    }
}