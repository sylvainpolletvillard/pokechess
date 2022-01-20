import {Destination, RoomType} from "../logic/destination";
import {addText} from "../utils/text";
import {Z} from "../data/depths";
import MapScene from "../scenes/MapScene";
import {openMenu} from "./menu";
import {gameState} from "../logic/gamestate";

let destinationPanel: Phaser.GameObjects.Container | null = null;
let destinationMenuOpened: Destination | null = null;

export function showDestinationPanel(destination: Destination, scene: MapScene){
    if(destinationMenuOpened) return;

    destinationPanel?.destroy(true)
    destinationPanel = scene.add.container(scene.scale.width - 8, scene.scale.height - 6)    

    const destName = addText(-4, 3, destination.name)
        .setOrigin(1,0)
        .setDepth(Z.MENU_TOOLTIPS)

   /* const subtextColor = DestinationTypeSubtextColor[destination.type as DestinationType]
    const subtext = addText(
        - 6 - (destination.icon ? 16 : 0),
        + 16,
        destination.subtext,
        { color: subtextColor }
    ).setOrigin(1,0).setDepth(Z.MENU_TOOLTIPS)*/

    const width = destName.width + destination.icons.length * 16 + 12
    const destinationPanelBg = scene.add.nineslice(-width, 0, width, 20, 'box2',4).setOrigin(0,0).setDepth(Z.MENU_LAYOUT)
    destinationPanel?.add(destinationPanelBg)
    destinationPanel?.add(destName)

    destination.icons.forEach((icon: string, i:number) => {
        const iconSprite = scene.add.sprite(
            -width + 12 - i*16,
            10,
            "gui", 0)
        iconSprite
            .play(icon)
            .setDepth(Z.MENU_OBJECTS)
        destinationPanel?.add(iconSprite)
    })

    scene.tweens.add({
        targets: [destinationPanel],
        y: "-=20",
        duration: 200
    })
}

export function hideDestinationPanel(scene: MapScene){
    if(!destinationPanel || destinationMenuOpened) return;
    let panel = destinationPanel
    scene.tweens.add({
        targets: [panel],
        y: "+=40",
        delay: 100,
        duration: 100,
        onComplete(){ panel?.destroy(true )}
    })
    destinationPanel = null
}

export function openDestinationMenu(destination: Destination, scene: MapScene){
    destinationMenuOpened = destination
    const entries = Object.entries(destination.rooms).map(([name, room]) => {
        let label = room.name
        if(room.type === RoomType.ARENA) label = "Arène"
        if(room.type === RoomType.WILD) label = "Capture"
        if(room.type === RoomType.SAFARI) label = "Safari"
        if(room.name.startsWith("Magasin")) label = "Magasin"
        return { label, value: name }
    })
    entries.push({ label: "Quitter", value: "Quitter" })
    const height = entries.length*20 + 10

    openMenu({
        ref: "destination_actions",
        x: scene.scale.width - 100,
        y: scene.scale.height - height - 28,
        width: 96,
        height,
        background: "box1",
        offset: 8,
        entries: entries.map(({ label, value },i) => ({
            x: 4,
            y: 4+i*20,
            label,
            value
        })),
        handleChoice(choice){
            if(choice.value === "Quitter"){ 
                scene.changeOrigin(destination)                
            } else {
                gameState.currentDestination = destination
                gameState.initRoom(choice.value)
            }
        },
        handleCancel(){
            scene.updateDestinations()
            scene.updateDirections(destination.nextDestinations)
        },
        onClose(){
            destinationMenuOpened = null
        }
    })
}