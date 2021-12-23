import {GameStage, gameState} from "../logic/gamestate";
import {updatePokemonBars} from "./pokemonBar";
import Game from "../scenes/GameScene";
import {drawAlliancesInfo} from "./alliancesInfo";
import {addText} from "../utils/text";
import {showPokedex} from "./pokedex";
import {addInteractiveElem, dragState, handleDragEnd} from "./cursor";
import {closeMenu} from "./menu";
import {openBox} from "./pokemonBox";
import {addToBox} from "../logic/box";
import {Z} from "../data/depths";
import {DestinationType, RoomArena, RoomType} from "../model/destination";
import {wait} from "../utils/helpers";
import {startDialog} from "../logic/dialog";
import {tweenFade, tweenPop} from "../utils/tweens";
import {Champion} from "../data/champions";
import {MyScene} from "../scenes/MyScene";
import {cancelPokemonDrag} from "../logic/board";
import RoomScene from "../scenes/RoomScene";
import {openItemMenu} from "./itemBox";

export function updateGUI(game: Game){
    if(gameState.stage === GameStage.FIGHT){
        for (let pokemon of gameState.board.playerTeam) {
            updatePokemonBars(pokemon, game)
        }
        for (let pokemon of gameState.board.otherTeam) {
            updatePokemonBars(pokemon, game)
        }
    }
}

let menuButtonsGroup: Phaser.GameObjects.Group;
let pokeballsCounterGroup: Phaser.GameObjects.Group;
let pokedexButton: Phaser.GameObjects.Sprite;
let bagButton: Phaser.GameObjects.Sprite;
let boxButton: Phaser.GameObjects.Sprite;
let fightButton: Phaser.GameObjects.Sprite;

export function drawGUI(game: Game){
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
            pokedexButtonText = addText(78, game.scale.height - 36, "POKEDEX",
                { align: "center", color: "white", strokeThickness: 4, stroke: "black" })
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
                    boxButtonText = addText(game.scale.width/2, game.scale.height - 30,
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
                addToBox(pokemon, game)
            }
        })
    addInteractiveElem(boxButton)

    bagButton = game.add.sprite(220, game.scale.height - 12, "buttons",1)
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
                const pokemon = dragState.draggedElem.getData("pokemon")
                if(pokemon != null){
                    bagButtonText = addText(204, game.scale.height - 30,
                        `Retirer objet de ${pokemon.name}`,
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
        .on("dropReceived", (pokemonSprite: Phaser.GameObjects.Sprite) => {
            const pokemon = pokemonSprite.getData("pokemon");
            if(pokemon != null){
                //TODO: prendre l'objet tenu par le pokemon
            }
        })

    addInteractiveElem(bagButton)

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

    menuButtonsGroup.add(pokedexButton)
    menuButtonsGroup.add(boxButton)
    menuButtonsGroup.add(bagButton)
    menuButtonsGroup.add(fightButton)
    menuButtonsGroup.setDepth(Z.GUI_BUTTON);
}

export function hideMenuButtons(){
    menuButtonsGroup.destroy(true)
}

export function drawPlayers(game: Game){
    const player = game.add.sprite(32,game.scale.height - 32, "player").setDepth(Z.PLAYER)
    game.sprites.set("player", player)
    player.play("trainer_idle");

    if(game.state.currentRoom.type === RoomType.ARENA){
        const arena = game.state.currentRoom as RoomArena
        const champion = game.add.sprite(game.scale.width - 24, 32, "trainer")
            .setDepth(Z.CHAMPION)
            .setFrame(arena.champion.frameIndex)
        game.sprites.set("opponent", champion)
    }

    drawAlliancesInfo(0)
    //drawAlliancesInfo(1, game)
}

export function drawIntro(game: Game): Promise<any>{
    drawRoomNamePanel()
    drawPlayers(game)

    if(gameState.currentRoom.type === RoomType.WILD){
        return wait(1000).then(() => {
            drawPokeballsCounter(game)
            return showCenterText("text_capture", game)
        })
    }

    if(gameState.currentRoom.type === RoomType.ARENA || gameState.currentRoom.type === RoomType.TUTORIAL){
        const arena = gameState.currentRoom as RoomArena
        showTrainerIntro(arena.champion, game).then(() => {})
        return wait(2000).then(() => startDialog(arena.champion.dialogs.start, { speaker: arena.champion.name }))
    }

    return Promise.resolve()
}

export function drawRoomNamePanel(){
    const scene = gameState.activeScene as MyScene;
    const room = gameState.currentRoom
    const roomNameBg = scene.add.nineslice(scene.scale.width/2, -32,160,0,"box2",4)
    roomNameBg.setOrigin(0.5,0.5)

    const roomNameText = addText(scene.scale.width/2, -30, room.name, {
        color: "#000"
    })
    roomNameText.setOrigin(0.5,0.5)
    roomNameText.setScrollFactor(0)

    roomNameBg.setSize(roomNameText.width+24,roomNameText.height+12)
    roomNameBg.setScrollFactor(0)
    roomNameBg.setDepth(Z.MENU_TOOLTIPS)
    roomNameText.setDepth(Z.MENU_TOOLTIPS+1)

    scene.add.tween({
        targets: [roomNameBg, roomNameText],
        duration: 400,
        y: "+=38",
        ease: 'Linear'
    })
    scene.add.tween({
        targets: [roomNameBg, roomNameText],
        duration: 400,
        y:-36,
        ease: 'Linear',
        delay: 2000
    })
}

export function drawTourCounter(){
    const scene = gameState.activeScene as MyScene;
    const bg = scene.add.nineslice(scene.scale.width/2, -32,160,0,"box2",4)
    bg.setOrigin(0.5,0.5)

    const text = addText(scene.scale.width/2, -30, `Tour ${gameState.day}`, { color: "#000" })
    text.setOrigin(0.5,0.5)
    text.setScrollFactor(0)

    bg.setSize(text.width+24,text.height+12)
    bg.setScrollFactor(0)
    bg.setDepth(Z.MENU_TOOLTIPS)
    text.setDepth(Z.MENU_TOOLTIPS+1)

    scene.add.tween({
        targets: [bg, text],
        duration: 400,
        y: "+=38",
        ease: 'Linear'
    })
    scene.add.tween({
        targets: [bg, text],
        duration: 400,
        y:-36,
        ease: 'Linear',
        delay: 2000
    })
}

export function drawPokeballsCounter(scene: MyScene){
    if(pokeballsCounterGroup != null) pokeballsCounterGroup.destroy(true, true)

    let pokeballPos = [game.scale.width - 64, -16],
        counterPos = [game.scale.width - 24, 8];
    if(scene instanceof RoomScene){
      counterPos = [28, 8];
      pokeballPos = [32, 48];
    }
    const pokeball = scene.add.sprite(pokeballPos[0], pokeballPos[1], "pokeball", 0)
    pokeball.play(`POKEBALL_${pokeballsCounterGroup ? 'jiggle_once' : 'in'}`)
        .once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => pokeball.play(`POKEBALL_idle`))
        .setOrigin(0,0)

    scene.sprites.set("pokeball", pokeball)
    const pokeballCount = addText(counterPos[0], counterPos[1], gameState.player.inventory.pokeball.toString(), {
        align: "left",
        color: "white"
    })
    pokeballCount.setStroke("#000000", 3);
    pokeballsCounterGroup = scene.add.group([pokeball, pokeballCount])
}

export function showCenterText(animName: string, game: Game){
    const text = game.add.sprite(game.scale.width/2, game.scale.height/2, "texts")
    text.setDepth(Z.CENTER_TEXT).play(animName)
    game.sprites.set("centerText", text)
    return tweenPop(game, text, 500);
}

export function showTrainerIntro(champion: Champion, game: Game){
    if(champion.introFrameIndex === null) return Promise.resolve(); // no intro
    const portrait = game.add.sprite(game.scale.width/2, game.scale.height/2, "trainers_intros")
    portrait.setDepth(Z.CENTER_TEXT).setFrame(champion.introFrameIndex)
    game.sprites.set("centerIntro", portrait)
    return tweenFade(game, portrait, 2000);
}