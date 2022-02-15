import { Z } from "../data/depths";
import { releasePokemon } from "../logic/box";
import { gameState } from "../logic/gamestate";
import { MyScene } from "../scenes/MyScene";
import { addText } from "../utils/text";
import { addInteractiveElem, dragState, handleDragEnd, removeInteractiveElem } from "./cursor";
import { PokemonOnBoard } from "./pokemon";

let pokemonReleaseBox: Phaser.GameObjects.Container | null;
let elements: Phaser.GameObjects.GameObject[] = [];
let dropZone: Phaser.GameObjects.Zone;

const WIDTH = 120, HEIGHT = 64;

export function displayPokemonReleaseBox(pokemon: PokemonOnBoard){
    const scene = gameState.activeScene as MyScene;

    pokemonReleaseBox = scene.add.container(
        scene.scale.width/2,
        -66
    );

    const bg = scene.add.nineslice(0, 0, WIDTH, HEIGHT, "box2",4)
    bg.setOrigin(0.5,0.5)
    pokemonReleaseBox.add(bg)

    const text = addText(0, 2, `Libérer ${pokemon.entry.name}`, { color: "#000" })
    text.setOrigin(0.5,0.5)
    text.setScrollFactor(0)
    pokemonReleaseBox.add(text)

    bg.setScrollFactor(0)
    bg.setDepth(Z.MENU_TOOLTIPS)
    text.setDepth(Z.MENU_TOOLTIPS+1)

    const pokeballCostSprite = scene.add.sprite(6,20, "pokeball", 25)
    pokeballCostSprite.play("POKEBALL_idle")
    const pokemonCostText = addText(-16, 14, `+${pokemon.cost}`)
    pokemonReleaseBox.add(pokeballCostSprite).add(pokemonCostText)

    pokemonReleaseBox.setDepth(Z.MENU);

    elements = [bg, text, pokeballCostSprite, pokemonCostText]

    scene.add.tween({
        targets: elements,
        duration: 400,
        y: `+=${HEIGHT + 6 }`,
        ease: 'Linear'
    })

    dropZone = scene.add.zone(scene.scale.width/2, 0, WIDTH, HEIGHT);
    dropZone.setData("type", "releaseZone")
    addInteractiveElem(dropZone)

    dropZone
        .on("click", () => {
            if(dragState.draggedElem != null){ handleDragEnd(scene) }
        })
        .on("over", () => {
            if(dragState.draggedElem != null){
            dragState.draggedElem.setAlpha(0.5)
            }
        })
        .on("out", () => {
            if(dragState.draggedElem != null){
                dragState.draggedElem.setAlpha(1)
            }
        })
        .on("dropReceived", (pokemonSprite: Phaser.GameObjects.Sprite) => {
            const pokemon = pokemonSprite.getData("pokemon");
            if(pokemon != null){
                releasePokemon(pokemon)            
            }
        })
}

export function hidePokemonReleaseInfo(){
    if(!pokemonReleaseBox || !elements) return;

    const scene = gameState.activeScene as MyScene;

    scene.add.tween({
        targets: elements,
        duration: 400,
        y: - HEIGHT - 2,
        ease: 'Linear',
        delay: 10,
        onComplete(){
            removeInteractiveElem(dropZone)
            dropZone.destroy()
            pokemonReleaseBox?.destroy(true)
            pokemonReleaseBox = null;
        }
    })
}


