import {NO_OWNER, OWNER_CHANGING, Player} from "./player";
import {addToBox, addToTeam} from "./box";
import Game from "../scenes/GameScene";
import Phaser from "phaser";
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
import {DestinationType, RoomArena, RoomType, RoomWild} from "../model/destination";
import {displayPokemonCaptureInfo, hidePokemonCaptureInfo} from "../objects/pokemonCaptureBox";
import {spend} from "./shop";

export interface Board {
    mapName: string;
    width: number;
    height: number;
    playerTeam: PokemonOnBoard[]
    otherTeam: PokemonOnBoard[]
    activeTile: number[] | null
}

export function setupPlayerIdleBoard(player: Player, room: RoomArena | RoomWild){
    return {
        mapName: room.map,
        width: 7,
        height: 8,
        playerTeam: [...player.team],
        otherTeam: [],
        activeTile: null
    }
}

export function setupPlayerFightBoard(p1: Player, p2: Player, room: RoomArena){
    return {
        mapName: room.map,
        width: 7,
        height: 8,
        playerTeam: [...p1.team],
        otherTeam: [...p2.team],
        activeTile: null
    }
}

export function setupRoomBoard(p1: Player, room: RoomArena | RoomWild){
    return {
        mapName: room.map,
        width: 7,
        height: 8,
        playerTeam: p1.resetTeam(),
        otherTeam: room.spawnOtherTeam(),
        activeTile: null
    }
}

export function initPlacement(game: Game){
    gameState.stage = GameStage.PLACEMENT
    drawGrid(game)
    drawCursor(game)
    for (let pokemon of gameState.player.team) {
        const sprite = makePokemonSprite(pokemon, game)
        sprite.setAlpha(0.5)
    }

    for (let pokemon of gameState.board.otherTeam) {
        const sprite = makePokemonSprite(pokemon, game)
        sprite.anims.resume()
    }
}

export function clearPlacement(game: Game){
    for (let pokemon of gameState.player.team) {
        game.sprites.get(pokemon.uid)?.destroy()
    }
    if(gameState.currentRoom.type === RoomType.ARENA) {
        for (let pokemon of gameState.board.otherTeam) {
            game.sprites.get(pokemon.uid)?.destroy(true)
        }
    }
    game.graphics.get("grid")?.destroy();
}

export function getPositionFromCoords(i: number, j:number): [number, number]{
    return [32 * i + 64, 32 * j + 48]
}

export function getCoordsFromPosition(x: number, y:number): [number, number]{
    return [ Math.floor((x-64)/32), Math.floor((y-48)/32) ]
}

export function getPokemonOnTile(i: number, j:number, board: Board){
    return [ ...board.playerTeam, ...board.otherTeam]
        .find(pokemon => pokemon.x === i && pokemon.y === j)
}

export function launchPokeball(player: number, pokeballType: string, x:number, y:number, game: Game){
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

export function spawnPokemon(pokemon: PokemonOnBoard, game: Game){
    const [x,y] = pokemon.positionPlacement;
    launchPokeball(pokemon.owner, pokemon.pokeball, x, y, game)
        .then((pokeball) => {
            pokeball.play(`${pokemon.pokeball}_out`)
            pokeball.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                pokeball.destroy()
                const sprite = makePokemonSprite(pokemon, game)
                sprite.play(`${pokemon.ref}_${pokemon.facingDirection}`)
            })
        })
}

export async function capturePokemon(
    pokemon: PokemonOnBoard,
    pokemonSprite: Phaser.GameObjects.Sprite,
    game: Game
){
    hidePokemonInfo()
    hidePokemonCaptureInfo(game)
    pokemon.owner = OWNER_CHANGING // temp owner while waiting for end anim
    spend(pokemon.cost)

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
        addToBox(pokemon, game)
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
        if(gameState.board.otherTeam.length === 0) gameState.endCapture(game)
    })
}

export function drawGrid(game: Game){
    const grid = game.add.graphics();
    game.graphics.set("grid", grid);
    grid.setDepth(Z.GRID);
    grid.lineStyle(1, 0x000000, 0.1);
    for(let x=1; x <= gameState.board.width+1; x++) {
        grid.lineBetween(x*32 + 16, 32, x*32 + 16, 288)
    }
    for(let y=1; y <= gameState.board.height+1; y++) {
        grid.lineBetween(48, y*32 + 32, 272, y*32 + 32)
    }
    /*grid.lineStyle(1, 0x000000, 0.25);
    grid.lineBetween(48, 4*32 + 31, 272, 4*32 + 31)*/

    const gridActiveTile = game.add.graphics();
    game.graphics.set("gridActiveTile", gridActiveTile);
    grid.setDepth(Z.GRID_ACTIVE_TILE);
    grid.lineStyle(1, 0xffffff, 0.25);

    for(let x=0; x < gameState.board.width; x++) {
        for(let y=0; y < gameState.board.height; y++) {
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

export function setActiveTile(zone: Phaser.GameObjects.Zone, game: Game){
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

    const gridActiveTile = game.graphics.get("gridActiveTile")
    if(gameState.stage === GameStage.PLACEMENT && gridActiveTile != null){
        gridActiveTile
            .lineStyle(2, 0x000000, 0.1)
            .moveTo(x-16,y-16).lineTo(x+16, y-16).lineTo(x+16, y+16).lineTo(x-16, y+16).lineTo(x-16,y-16)
            .stroke()
    }

    const pokemonOnTile = getPokemonOnTile(i, j, gameState.board)
    if(pokemonOnTile == null){
        if (gameState.activeMenu == null || (gameState.activeMenu?.ref == "box" && j > 4)){
            hidePokemonInfo()
        }
    } else if(!dragState.draggedElem
        && (gameState.activeMenu == null || gameState.activeMenu?.ref == "box")){

        if(pokemonOnTile.owner === 1
            || gameState.currentRoom.type === RoomType.WILD
            || gameState.currentRoom.type === RoomType.ARENA
            || gameState.stage === GameStage.FIGHT){
            displayPokemonInfo(pokemonOnTile)
        }

        if([RoomType.WILD, RoomType.TUTORIAL].includes(gameState.currentRoom.type)
        && pokemonOnTile.owner === NO_OWNER
        && gameState.activeMenu == null
        && gameState.stage === GameStage.PLACEMENT){
            displayPokemonCaptureInfo(pokemonOnTile, game)
        }

    }
}

export function clearActiveTile(game: Game){
    if(gameState.board.activeTile == null) return;
    const gridActiveTile = game.graphics.get("gridActiveTile")
    gridActiveTile?.clear()
    hidePokemonInfo();
    hidePokemonCaptureInfo(game)
    gameState.board.activeTile = null
}

export function dropPokemonOnBoard(sprite: Phaser.GameObjects.Sprite, x:number, y:number, game: Game){
    let pokemonOnBoard: PokemonOnBoard;
    let pokemon: Pokemon = sprite.getData("pokemon")
    if(!pokemon) return;

    const pokemonOnTile = getPokemonOnTile(x, y, gameState.board)
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
}

export function cancelPokemonDrag(){
    if(dragState.draggedElem != null){
        const pokemonDragged = dragState.draggedElem.getData("pokemon")
        if(!pokemonDragged) return;
        dragState.draggedElem.setPosition(...pokemonDragged.positionPlacement)
        dragState.draggedElem.emit('drop')
        dragState.draggedElem = null;
    }
}