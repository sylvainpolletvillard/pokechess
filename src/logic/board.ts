import {Player} from "./player";
import {addToBox, addToTeam, removeFromTeam} from "./box";
import GameScene from "../scenes/GameScene";
import Phaser, { Game } from "phaser";
import {displayPokemonInfo, getCurrentPokemonInfoDisplayed, hidePokemonInfo} from "../objects/pokemonInfoBox";
import {GameStage, gameState} from "./gamestate";
import {
    addInteractiveElem,
    dragState,
    drawCursor,
    handleDragEnd,
    handleDragStart,
    testIfCanBeDragged
} from "../objects/cursor";
import {makePokemonSprite, PokemonOnBoard} from "../objects/pokemon";
import {Pokemon} from "../data/pokemons";
import {wait} from "../utils/helpers";
import {Z} from "../data/depths";
import { NO_OWNER, OWNER_CHANGING, OWNER_PLAYER } from "../data/owners";
import { RoomArena, RoomType, RoomWild} from "./destination";
import {displayPokemonCaptureInfo, hidePokemonCaptureInfo} from "../objects/pokemonCaptureBox";
import {spend} from "./shop";
import { calcXpEarnedOnDefeat } from "./xp";
import { startDialog } from "./dialog";
import { hidePokemonReleaseInfo } from "../objects/pokemonReleaseBox";
import { drawAlliancesInfo } from "../objects/alliancesInfo";
import { updateFightButton } from "../objects/menuButtons";
import { applyBuffs } from "./buffs";

export const BOARD_WIDTH = 7
export const BOARD_HEIGHT = 8

export interface Board {
    playerTeam: PokemonOnBoard[]
    otherTeam: PokemonOnBoard[]
    activeTile: number[] | null
    xpEarned?: number
}

export function setupPlayerIdleBoard(player: Player): Board {
    return {
        playerTeam: [...player.team],
        otherTeam: [],
        activeTile: null
    }
}

export function setupPlayerFightBoard(p1: Player, p2: Player){
    return {
        playerTeam: [...p1.team],
        otherTeam: [...p2.team],
        activeTile: null
    }
}

export function setupRoomBoard(p1: Player, room: RoomArena | RoomWild){
    return {
        playerTeam: p1.resetTeam(),
        otherTeam: room.spawnOtherTeam(),
        activeTile: null
    }
}

export function initPlacement(game: GameScene){
    gameState.stage = GameStage.PLACEMENT
    drawGrid()
    drawCursor()
    drawTeamSizeCounter()
    if(gameState.currentRoom.type === RoomType.ARENA){
        drawAlliancesInfo(gameState.board.otherTeam)
    }
    
    for (let pokemon of gameState.player.team) {
        const sprite = makePokemonSprite(pokemon, game)
        sprite.setAlpha(0.5)
    }

    for (let pokemon of gameState.board.otherTeam) {
        const sprite = makePokemonSprite(pokemon, game)
        sprite.anims.resume()
    }
}

export function clearPlacement(game: GameScene){
    for (let pokemon of gameState.player.team) {
        game.sprites.get(pokemon.uid)?.destroy()
    }
    if(gameState.currentRoom.type === RoomType.ARENA) {
        for (let pokemon of gameState.board.otherTeam) {
            game.sprites.get(pokemon.uid)?.destroy(true)
        }
    }
    game.objects.get("grid")?.destroy();
    hidePokemonReleaseInfo();
}

export function getPositionFromCoords(i: number, j:number): [number, number]{
    return [32 * i + 64, 32 * j + 48]
}

export function getCoordsFromPosition(x: number, y:number): [number, number]{
    return [ Math.floor((x-64)/32), Math.floor((y-48)/32) ]
}

export function getPokemonOnTile(i: number, j:number){
    const board = gameState.board
    return [ ...board.playerTeam, ...board.otherTeam]
        .find(pokemon => pokemon.x === i && pokemon.y === j)
}

export function launchPokeball(player: number, pokeballType: string, x:number, y:number, game: GameScene){
    return new Promise<Phaser.GameObjects.Sprite>(resolve => {
        let playerX, playerY;
        if(player === 1){
            playerX = 50;
            playerY = 280;
        } else {
            playerX = 280;
            playerY = 40;
        }

        const pokeball = game.add.sprite(playerX, playerY, "pokeball");
        pokeball.play(`${pokeballType}_launch`)
        pokeball.setRotation(Math.random() * Math.PI * 2);
        game.add.tween({
            targets: pokeball,
            x, y,
            duration: 400 + Phaser.Math.Distance.Between(playerX, playerY, x, y) * 3,
            ease: 'Sine.Out',
            onComplete: () => {
                pokeball.setRotation(0);
                resolve(pokeball)
            }
        })
    })
}

export function spawnPokemon(pokemon: PokemonOnBoard, game: GameScene){
    const [x,y] = pokemon.position;
    applyBuffs(pokemon)
    launchPokeball(pokemon.owner, pokemon.pokeball, x, y, game)
        .then((pokeball) => {
            pokeball.play(`${pokemon.pokeball}_out`)
            pokeball.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                pokeball.destroy()
                const sprite = makePokemonSprite(pokemon, game)
                sprite.play(`${pokemon.entry.ref}_${pokemon.facingDirection}`)
            })
        })
}

export async function capturePokemon(
    pokemon: PokemonOnBoard,
    pokemonSprite: Phaser.GameObjects.Sprite,
    game: GameScene
){
    hidePokemonInfo()
    hidePokemonCaptureInfo(game)
    pokemon.owner = OWNER_CHANGING // temp owner while waiting for end anim
    spend(pokemon.cost)
    gameState.lastCaptureDestination = gameState.currentDestination

    const player = game.sprites.get("player")
    player?.play("trainer_launch");
    await wait(400)
    const [x,y] = pokemon.position;
    const pokeball = await launchPokeball(1, pokemon.pokeball, x, y, game)

    pokeball.play(`${pokemon.pokeball}_in`)
    game.add.tween({
        targets: pokemonSprite,
        scale: 0.1,
        alpha: 0,
        duration: 1000
    })
    pokeball.once(Phaser.Animations.Events.ANIMATION_COMPLETE, async () => {
        pokeball.play(`${pokemon.pokeball}_jiggle`)
        await wait(1100)
        pokeball.play(`${pokemon.pokeball}_catch`)

        if(getCurrentPokemonInfoDisplayed() == pokemon){
            hidePokemonInfo()
        }
        await wait(500)
        pokeball.setDepth(Z.SPRITE_DRAGGED)
        game.add.tween({
            targets: pokeball,
            x: game.scale.width / 2,
            y: game.scale.height - 10,
            duration: 400
        })
        game.add.tween({
            targets: pokeball,
            alpha: 0,
            duration: 400,
            delay: 400
        })
        await wait(800)
        pokeball.destroy()
        removeFromTeam(pokemon)

        const pokemons = gameState.player.boardAndBox
        const myPokemon = pokemons.find(p => p.entry.ref === pokemon.entry.ref)
        if(myPokemon != null){
            await wait(100).then(() => startDialog([
                `Le ${myPokemon.entry.name} sauvage partage son expérience avant d'être relaché.`,
                `Votre ${myPokemon.entry.name} gagne ${pokemon.xp} XP`
            ])).then(() => {
                const oldLvl = myPokemon.level
                myPokemon.gainXP(pokemon.xp)
                if(oldLvl !== myPokemon.level){
                    return startDialog([`${myPokemon.entry.name} passe au niveau ${myPokemon.level}`])
                }
            })
        } else {
            addToBox(pokemon)
        }

        if(gameState.board.otherTeam.length === 0) await gameState.endCapture()
    })
}

export function drawGrid(){
    const game = gameState.activeScene as GameScene
    const grid = game.add.graphics();
    game.objects.set("grid", grid);
    grid.setDepth(Z.GRID);
    grid.lineStyle(1, 0x000000, 0.1);
    for(let x=1; x <= BOARD_WIDTH+1; x++) {
        grid.lineBetween(x*32 + 16, 32, x*32 + 16, 288)
    }
    for(let y=1; y <= BOARD_HEIGHT+1; y++) {
        grid.lineBetween(48, y*32 + 32, 272, y*32 + 32)
    }
    /*grid.lineStyle(1, 0x000000, 0.25);
    grid.lineBetween(48, 4*32 + 31, 272, 4*32 + 31)*/

    const gridActiveTile = game.add.graphics();
    game.objects.set("gridActiveTile", gridActiveTile);
    grid.setDepth(Z.GRID_ACTIVE_TILE);
    grid.lineStyle(1, 0xffffff, 0.25);

    for(let x=0; x < BOARD_WIDTH; x++) {
        for(let y=0; y < BOARD_HEIGHT; y++) {
            const gridTile = game.add.zone(x*32 + 64, y*32 + 48, 32, 32)
            //game.add.rectangle(x*32 + 64, y*32 + 48, 32, 32, (y+x)%2?0xff0000:0xff00ff)
            gridTile.setData("type", "gridTile")
            gridTile.setData("position", [x,y])
            addInteractiveElem(gridTile)
            gridTile.on("over", () => setActiveTile(gridTile, game))
            gridTile.on("out", () => {
                const [i,j] = getCoordsFromPosition(gridTile.x+16, gridTile.y+16)
                if(gameState.board.activeTile != null
                && gameState.board.activeTile[0] === i
                && gameState.board.activeTile[1] === j) {
                    clearActiveTile(game)
                }
            })
            gridTile.on("click", () => {
                if(dragState.draggedElem != null){ handleDragEnd(game) }
            })
            gridTile.on("dropReceived", (droppedSprite: Phaser.GameObjects.Sprite) => {
                dropPokemonOnBoard(droppedSprite, x, y, game)
            })
        }
    }
}

export function setActiveTile(zone: Phaser.GameObjects.Zone, game: GameScene){
    const {x,y} = zone;
    const [i,j] = getCoordsFromPosition(x+16, y+16)

    // prevent changing active tile if menu is opened
    if(gameState.activeMenu?.ref === "pokedex") return;
    else if(gameState.activeMenu?.ref === "box" && j>=2 && j<=3) return; // ignore tiles below pokemon box menu

    if(gameState.board.activeTile != null
        && (gameState.board.activeTile[0] !== i || gameState.board.activeTile[1] !== j)){
        clearActiveTile(game)
    }
    gameState.board.activeTile = [i,j]

    const gridActiveTile = game.objects.get("gridActiveTile") as Phaser.GameObjects.Graphics;
    if(gameState.stage === GameStage.PLACEMENT && gridActiveTile != null){
        gridActiveTile
            .lineStyle(2, 0x000000, 0.1)
            .moveTo(x-16,y-16).lineTo(x+16, y-16).lineTo(x+16, y+16).lineTo(x-16, y+16).lineTo(x-16,y-16)
            .stroke()
    }

    const pokemonOnTile = getPokemonOnTile(i, j)
    if(pokemonOnTile == null){
        if (gameState.activeMenu == null || (gameState.activeMenu?.ref == "box" && j > 4)){
            hidePokemonInfo()
        }
    } else if(!dragState.draggedElem
        && (gameState.activeMenu == null || gameState.activeMenu?.ref == "box")){

        if(pokemonOnTile.owner === OWNER_PLAYER
            || [RoomType.WILD, RoomType.ARENA, RoomType.TUTORIAL].includes(gameState.currentRoom.type)            
            || gameState.stage === GameStage.FIGHT){
            displayPokemonInfo(pokemonOnTile)
        }

        if([RoomType.WILD, RoomType.TUTORIAL].includes(gameState.currentRoom.type)
        && pokemonOnTile.owner === NO_OWNER
        && gameState.activeMenu == null
        && (gameState.stage === GameStage.PLACEMENT || gameState.stage === GameStage.TUTO_CAPTURE)){
            displayPokemonCaptureInfo(pokemonOnTile, game)
        }
    }
}

export function clearActiveTile(game: GameScene){
    if(gameState.board.activeTile == null) return;
    const gridActiveTile = game.objects.get("gridActiveTile") as Phaser.GameObjects.Graphics
    gridActiveTile?.clear()
    hidePokemonInfo();
    hidePokemonCaptureInfo(game)
    gameState.board.activeTile = null
}

export function dropPokemonOnBoard(sprite: Phaser.GameObjects.Sprite, x:number, y:number, game: GameScene){
    let pokemonOnBoard: PokemonOnBoard;
    let pokemon: Pokemon = sprite.getData("pokemon")
    if(!pokemon) return;

    const pokemonOnTile = getPokemonOnTile(x, y)
    if(pokemonOnTile != null && pokemonOnTile !== pokemon){
        const newPokemonSprite = game.sprites.get(pokemonOnTile.uid)
        if(newPokemonSprite && testIfCanBeDragged(newPokemonSprite)){
            wait().then(() => handleDragStart(newPokemonSprite, game))
        }
    }

    if(!(pokemon instanceof PokemonOnBoard)) {
        // dropped from box to board
        pokemonOnBoard = new PokemonOnBoard(pokemon, x, y)
        addToTeam(pokemonOnBoard)
    } else {
        // moved position on board
        pokemonOnBoard = pokemon
    }

    pokemonOnBoard.x = x;
    pokemonOnBoard.y = y;
    pokemonOnBoard.placementX = x;
    pokemonOnBoard.placementY = y;
    sprite.setData("pokemon", pokemonOnBoard)
    sprite.setPosition(...pokemonOnBoard.position)
    displayPokemonInfo(pokemonOnBoard)
    drawTeamSizeCounter()
}

export function cancelPokemonDrag(){
    if(dragState.draggedElem != null){
        const pokemonDragged = dragState.draggedElem.getData("pokemon")
        if(!pokemonDragged) return;
        if(!(pokemonDragged instanceof PokemonOnBoard)) {
            // dragged from box to pokedex
            addToBox(pokemonDragged)
        } else {
            // dragged from board to pokedex
            dragState.draggedElem.setPosition(...pokemonDragged.positionPlacement)
            dragState.draggedElem.emit('drop')
            dragState.draggedElem = null;
        }
    }
}

export function calcXpBoard(){ 
    return gameState.board.otherTeam.reduce((total, pokemon) => {
        return total + calcXpEarnedOnDefeat(pokemon)
    }, 0)
}

export function getNumberMaxAllowedOnBoard(){
    return 2 + gameState.player.badges.length
}

export function drawTeamSizeCounter(){
    const scene = gameState.activeScene as GameScene
    let text = scene.objects.get("teamSizeCounter") as Phaser.GameObjects.Text
    if(!text){
        text = scene.add.text(scene.scale.width/2, scene.scale.height * 2/3, "", {
            align: "center",
            color: "white",
            stroke: "black",
            fontSize: "64px",
            fontFamily: 'Pokemon',
            fontStyle: "italic",
            strokeThickness: 4,
        })
        text.setScrollFactor(0)
        text.setDepth(Z.TEAM_SIZE_COUNTER)
        text.setOrigin(0.5)
        text.setAlpha(0.15)
        scene.objects.set("teamSizeCounter", text)
    }

    const numberOnBoard = gameState.board.playerTeam.length;
    const max = getNumberMaxAllowedOnBoard()
    text.setText(` ${numberOnBoard} / ${max} `)

    if(numberOnBoard > max){
        text.setAlpha(0.3)
        text.setTint(0xff0000)
    } else {
        text.setTint(0xffffff)

        if(numberOnBoard === max){ text.setAlpha(0) }
        else { text.setAlpha(0.15) }
    }
    updateFightButton()
}