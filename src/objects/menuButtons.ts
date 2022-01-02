import { addInteractiveElem, dragState, handleDragEnd } from './cursor';
import { addText } from '../utils/text';
import { addToBox } from '../logic/box';
import { cancelPokemonDrag } from '../logic/board';
import { closeMenu } from './menu';
import Game from '../scenes/GameScene';
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

export function drawMenuButtons(game: Game){
    menuButtonsGroup = game.add.group();

    pokedexButton = game.add.sprite(100, game.scale.height - 12, "buttons",2)
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
                    pokedexButtonText = addText(78, game.scale.height - 36,
                        `Voir ${pokemon.name}`,
                        { align: "center", color: "white", strokeThickness: 4, stroke: "black" })
                        .setOrigin(0.5)
                }
            } else {
                pokedexButtonText = addText(78, game.scale.height - 36, "POKEDEX",
                { align: "center", color: "white", strokeThickness: 4, stroke: "black" })
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

    boxButton = game.add.sprite(160, game.scale.height - 12, "buttons", 0)
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
                    boxButtonText = addText(game.scale.width/2, game.scale.height - 36,
                        `Retirer ${pokemon.name}`,
                        { align: "center", color: "white", strokeThickness: 4, stroke: "black" })
                        .setOrigin(0.5)
                }
            } else {
                boxButtonText = addText(136, game.scale.height - 36, "POKEMONS",
                    { align: "center", color: "white", strokeThickness: 4, stroke: "black" })
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
                addToBox(pokemon, game)
            }
        })
    addInteractiveElem(boxButton)
    menuButtonsGroup.add(boxButton)

    bagButton = game.add.sprite(220, game.scale.height - 12, "buttons",1)
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
                    bagButtonText = addText(204, game.scale.height - 36,
                        pokemon.item 
                            ? `Récupérer ${pokemon.item.name}`
                            : `${pokemon.name} ne tient pas d'objet`,
                        { align: "center", color: "white", strokeThickness: 4, stroke: "black" })
                        .setOrigin(0.5)
                } else if(item != null){
                    bagButtonText = addText(204, game.scale.height - 36,
                        `Ranger ${item.label}`,
                        { align: "center", color: "white", strokeThickness: 4, stroke: "black" })
                        .setOrigin(0.5)
                }
            } else {
                bagButtonText = addText(204, game.scale.height - 36, "ITEMS",
                    { align: "center", color: "white", strokeThickness: 4, stroke: "black" })
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
