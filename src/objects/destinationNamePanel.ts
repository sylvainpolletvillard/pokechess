import {Destination, DestinationType} from "../model/destination";
import {DestinationTypeSubtextColor} from "../data/destinations";
import {addText} from "../utils/text";
import {Z} from "../data/depths";
import MapScene from "../scenes/MapScene";

let destinationPanel: Phaser.GameObjects.Container | null = null;

export function showDestinationNamePanel(destination: Destination, scene: MapScene){
    destinationPanel?.destroy(true)
    const DESTNAME_HEIGHT = 32;
    destinationPanel = scene.add.container(scene.scale.width - 8, scene.scale.height - 6)

    const subtextColor = DestinationTypeSubtextColor[destination.type as DestinationType]

    const destName = addText(- 4,2 , destination.name)
        .setOrigin(1,0)
        .setDepth(Z.MENU_TOOLTIPS)

    const subtext = addText(
        - 6 - destination.icons.length * 16,
        + 16,
        destination.subtext,
        { color: subtextColor }
    ).setOrigin(1,0).setDepth(Z.MENU_TOOLTIPS)

    const width = Math.max(destName.width, subtext.width + destination.icons.length * 16)+12
    const bg = scene.add.nineslice(-width, 0, 'box2', undefined, width, DESTNAME_HEIGHT,4,4,4,4)
        .setDepth(Z.MENU_LAYOUT)

    destinationPanel?.add(bg)
    destinationPanel?.add(subtext)
    destinationPanel?.add(destName)

    destination.icons.forEach((icon: string, i:number) => {
        const iconSprite = scene.add.sprite(
            - 12 - i*16,
            22,
            "gui", 0)
        iconSprite
            .play(icon)
            .setDepth(Z.MENU_OBJECTS)
        destinationPanel?.add(iconSprite)
    })

    scene.tweens.add({
        targets: [destinationPanel],
        y: "-=34",
        duration: 200
    })
}

export function hideDestinationNamePanel(scene: MapScene){
    if(!destinationPanel) return;
    scene.tweens.add({
        targets: [destinationPanel],
        y: "+=40",
        delay: 100,
        duration: 100
    })
    destinationPanel = null
}
