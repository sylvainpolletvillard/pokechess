import { addInteractiveElem, dragState, handleDragEnd } from './cursor';
import { addText } from '../utils/text';
import { addToBox, removeFromTeam } from '../logic/box';
import { cancelPokemonDrag } from '../logic/board';
import { closeMenu } from './menu';
import GameScene from '../scenes/GameScene';
import { gameState } from '../logic/gamestate';
import { Item } from '../data/items';
import { openBox } from './pokemonBox';
import { openItemMenu } from './itemBox';
import { Pokemon } from '../data/pokemons';
import { showPokedex } from './pokedex';
import { Z } from '../data/depths';

let menuButtonsGroup: Phaser.GameObjects.Group;
let pokedexButton: Phaser.GameObjects.Sprite;
let bagButton: Phaser.GameObjects.Sprite;
let boxButton: Phaser.GameObjects.Sprite;
let fightButton: Phaser.GameObjects.Sprite;

export function drawMenuButtons(game: GameScene){
    menuButtonsGroup = game.add.group();
    let dyText = 30

    let pokedexButtonX = 100
    pokedexButton = game.add.sprite(pokedexButtonX, game.scale.height - 12, "buttons",2)
    pokedexButton.setData("type", "pokedexButton")
    let pokedexButtonText: Phaser.GameObjects.Text | null;
    pokedexButton
        .on("click", () => {
            if(gameState.activeMenu?.ref === "pokedex"){
                return closeMenu() // close pokedex
            } else {
                closeMenu() // close other menu before opening pokedex
            }
            if(dragState.draggedElem != null){ handleDragEnd(game) }
            else showPokedex(game)
        })
        .on("over", () => {
            pokedexButton.setTint(0xffdddd)
            if(dragState.draggedElem != null){
                const pokemon = dragState.draggedElem.getData("pokemon")
                if(pokemon != null){
                    pokedexButtonText = addText(pokedexButtonX, game.scale.height - dyText,
                        `Voir ${pokemon.name}`,
                        { align: "center", color: "white", strokeThickness: 4, stroke: "black" }).setOrigin(0.5)                        
                }
            } else {
                pokedexButtonText = addText(pokedexButtonX, game.scale.height - dyText, "POKEDEX",
                { align: "center", color: "white", strokeThickness: 4, stroke: "black" }).setOrigin(0.5)
            }            
        })
        .on("out", () => {
            pokedexButton.setTint(0xffffff)
            pokedexButtonText?.destroy()
        })
        .on("dropReceived", (pokemonSprite: Phaser.GameObjects.Sprite) => {
            const pokemon = pokemonSprite.getData("pokemon");
            if(pokemon != null){
                showPokedex(game, pokemon)
                cancelPokemonDrag();
            }
        })
    addInteractiveElem(pokedexButton)
    menuButtonsGroup.add(pokedexButton)


    let boxButtonX = game.scale.width/2
    boxButton = game.add.sprite(boxButtonX, game.scale.height - 12, "buttons", 0)
    boxButton.setData("type", "boxButton")
    let boxButtonText: Phaser.GameObjects.Text | null;
    boxButton
        .on("click", () => {
            if(dragState.draggedElem != null){ handleDragEnd(game) }
            else if(gameState.activeMenu?.ref === "box"){
                return closeMenu() // close box
            } else {
                closeMenu() // close other menu before opening box
                openBox(game)
            }
        })
        .on("over", () => {
            boxButton.setTint(0xccffcc)
            if(dragState.draggedElem != null){
                const pokemon = dragState.draggedElem.getData("pokemon")
                if(pokemon != null){
                    boxButtonText = addText(boxButtonX, game.scale.height - dyText,
                        `Retirer ${pokemon.name}`,
                        { align: "center", color: "white", strokeThickness: 4, stroke: "black" }).setOrigin(0.5)                        
                }
            } else {
                boxButtonText = addText(boxButtonX, game.scale.height - dyText, "POKEMONS",
                    { align: "center", color: "white", strokeThickness: 4, stroke: "black" }).setOrigin(0.5)                    
            }
        })
        .on("out", () => {
            boxButton.setTint(0xffffff)
            boxButtonText?.destroy()
        })
        .on("dropReceived", (pokemonSprite: Phaser.GameObjects.Sprite) => {
            const pokemon = pokemonSprite.getData("pokemon");
            if(pokemon != null){
                boxButtonText?.destroy()
                removeFromTeam(pokemon)
                addToBox(pokemon, game)
            }
        })
    addInteractiveElem(boxButton)
    menuButtonsGroup.add(boxButton)


    let bagButtonX = 220
    bagButton = game.add.sprite(bagButtonX, game.scale.height - 12, "buttons", 1)
    bagButton.setData("type", "bagButton")
    let bagButtonText: Phaser.GameObjects.Text | null;
    bagButton
        .on("click", () => {
            if(dragState.draggedElem != null){ handleDragEnd(game) }
            else if(gameState.activeMenu?.ref === "items_box"){
                return closeMenu() // close box
            } else {
                closeMenu() // close other menu before opening box
                openItemMenu(game)
            }
        })
        .on("over", () => {
            bagButton.setTint(0xffffcc)
            if(dragState.draggedElem != null){
                const pokemon: Pokemon = dragState.draggedElem.getData("pokemon")
                const item: Item = dragState.draggedElem.getData("item")
                if(pokemon != null){
                    bagButtonText = addText(bagButtonX, game.scale.height - dyText,
                        pokemon.item 
                            ? `Récupérer ${pokemon.item.name}`
                            : `${pokemon.name} ne tient pas d'objet`,
                        { align: "center", color: "white", strokeThickness: 4, stroke: "black" }).setOrigin(0.5)                        
                } else if(item != null){
                    bagButtonText = addText(bagButtonX, game.scale.height - dyText,
                        `Ranger ${item.label}`,
                        { align: "center", color: "white", strokeThickness: 4, stroke: "black" }).setOrigin(0.5)                        
                }
            } else {
                bagButtonText = addText(bagButtonX, game.scale.height - dyText, "ITEMS",
                    { align: "center", color: "white", strokeThickness: 4, stroke: "black" }).setOrigin(0.5)
            }
        })
        .on("out", () => {
            bagButton.setTint(0xffffff)
            bagButtonText?.destroy()
        })
        .on("dropReceived", (sprite: Phaser.GameObjects.Sprite) => {
            const pokemon = sprite.getData("pokemon");
            const item: Item = sprite.getData("item")
            if(pokemon != null){
                bagButtonText?.destroy()
                //TODO: prendre l'objet tenu par le pokemon
                cancelPokemonDrag();                
            } else if(item != null){
                bagButtonText?.destroy()           
                sprite.destroy(); // range l'item
            }
        })
        
    addInteractiveElem(bagButton)
    menuButtonsGroup.add(bagButton)

    fightButton = game.add.sprite(295, game.scale.height - 12, "buttons_big",0)
    fightButton
        .on("over", () => {
            fightButton.setFrame(1)
        })
        .on("out", () => {
            fightButton.setFrame(0)
        })
        .on("click", () => {
            hideMenuButtons()
            game.launchFight()
        })
    addInteractiveElem(fightButton)
    menuButtonsGroup.add(fightButton)
    
    menuButtonsGroup.setDepth(Z.GUI_BUTTON);
}

export function hideMenuButtons(){
    menuButtonsGroup.destroy(true)
}
