import { addInteractiveElem, drawCursor, handleClick } from '../objects/cursor';
import { ALL_BADGES, BADGE_CASCADE } from '../data/badges';
import { Destination, Intersection, Path } from '../types/destination';
import { DESTINATIONS, DestinationTypeHighlightTint, INTERSECTIONS } from '../data/destinations';
import {
    Direction,
    DirectionalData,
    emptyDirectionalData,
    getDeltaFromDirection,
    getDirectionFromDelta,
    getDirectionFromVector,
    getRotationAngle
    } from '../utils/directions';
import { drawTourCounter } from '../objects/tourCounter';
import { enterDestination } from '../logic/destination';
import { gameState } from '../logic/gamestate';
import {getMovementVector, handleCursor, setupInputs} from '../logic/inputs';
import { getPathLength } from '../utils/path';
import { hideDestinationPanel, showDestinationPanel } from '../objects/destinationPanel';
import { loadFonts } from '../data/fonts';
import { loadSprites } from '../data/sprites';
import { loadSpritesheets } from '../data/spritesheets';
import { loadTilemaps } from '../data/tilemaps';
import { MyScene } from './MyScene';
import { setupAnims } from '../logic/anims';
import { startMusic } from '../logic/audio';
import { defer, wait } from '../utils/helpers';
import { Z } from '../data/depths';
import { fadeIn } from '../utils/camera';
import { BOURG_PALETTE } from '../data/destinations/bourg_palette';
import { JADIELLE } from '../data/destinations/jadielle';
import { MONT_BRAISE } from '../data/destinations/mont_braise';
import { CRAMOISILE } from '../data/destinations/cramoisile';
import { ILES_ECUME } from '../data/destinations/iles_ecume';
import { PARMANIE } from '../data/destinations/parmanie';
import { MONT_SELENITE } from '../data/destinations/mont_selenite';
import { AZURIA } from '../data/destinations/azuria';
import { ARGENTA } from '../data/destinations/argenta';
import { CENTRALE } from '../data/destinations/centrale';
import { PENSION } from '../data/destinations/pension';
import { LAVANVILLE } from '../data/destinations/lavanville';
import { OCEANE_AZURIA, OCEANE_CRAMOISILE } from '../data/destinations/oceane';
import { clickEntry } from '../objects/menu';
import { showNextLine } from '../logic/dialog';


export default class MapScene extends MyScene {
    gameSpeed: number = 100;
    player?: Phaser.GameObjects.Sprite;
    isMoving: boolean = false;
    origin: Destination;
    originZone: Phaser.GameObjects.Sprite | null;
    availableDestinations: Destination[];
    destinationSelected: Destination | null;
    destinationReached: Destination | null;
    intersectionReached: Intersection | null;
    destinationsHighLightGroup: Phaser.GameObjects.Group | null;
    directions: DirectionalData;
    directionsGroup: Phaser.GameObjects.Group | null;
    destinationPanelTween: Phaser.Tweens.Tween | null;

    constructor() {
        super('MapScene');
        this.sprites = new Map();
        this.graphics = new Map();
        this.availableDestinations = [];
        this.intersectionReached = null;
        this.destinationSelected = null;
        this.destinationsHighLightGroup = null
        this.directionsGroup = null
        this.origin = gameState.currentDestination;
        this.destinationReached = this.origin;
        this.originZone = null;
        this.destinationPanelTween = null;
        this.isMoving = false;
        this.directions = emptyDirectionalData()
    }

    // noinspection JSUnusedGlobalSymbols
    preload() {
        loadFonts(this)
        loadSprites(this)
        loadSpritesheets(this);
        loadTilemaps(this);
    }

    create() {
        gameState.activeScene = this
        this.origin = gameState.currentDestination;
        this.intersectionReached = null;
        this.destinationReached = this.origin;
        this.destinationsHighLightGroup = this.add.group()
        this.directionsGroup = this.add.group()
        setupInputs(this)
        setupAnims(this.anims)
        this.drawMap();
        this.drawMapObjects();
        this.drawBadges();
        this.updateDestinations()
        this.updateDirections(this.origin.nextDestinations);
        showDestinationPanel(this.origin, this)
        drawTourCounter();
        //this.debugIntersections(); // DEBUG
        drawCursor()
        startMusic("music_overworld")
        fadeIn(250)
    }

    update(){
        if(this.isMoving) this.updatePlayerPosition();
        else {
            handleCursor(this)
            const { moveVector } = getMovementVector(this);
            if(moveVector.length() > 1){
                const dir = getDirectionFromVector(moveVector)
                if(dir != null && this.directions[dir] != null){
                    const destinations = this.intersectionReached?.nextDestinations
                        ?? this.destinationReached?.nextDestinations
                        ?? this.origin.nextDestinations;
                    const destinationChosen: Path = destinations[this.directions[dir]];
                    if(destinationChosen != null){
                        const origin = this.intersectionReached || this.destinationReached || this.origin
                        this.walkPath(destinationChosen, origin.coordinates);
                    }
                }
            }
        }
    }

    onPressA() {
        if(gameState.activeMenu != null) return clickEntry()
        else if (gameState.activeDialog) return showNextLine();

        if(!this.isMoving
            && this.destinationReached != null
            && (!this.destinationSelected || this.destinationSelected === this.destinationReached)
        ){
            enterDestination(this.destinationReached)
        }
    }

    onPressStart() {
        // TEMP
        this.destinationReached && this.changeOrigin(this.destinationReached)
    }

    onClick(){
        handleClick(this)
    }

    changeOrigin(newOrigin: Destination){
        this.origin = newOrigin;
        this.player?.setPosition(newOrigin.coordinates[0], newOrigin.coordinates[1]-4)
        this.destinationReached = newOrigin;
        this.updateDestinations()
        this.updateDirections(this.origin.nextDestinations);
    }

    debugIntersections(){
        const debugG = this.add.graphics().fillStyle(0xff0000, 0.5)
        this.originZone && debugG.fillRect(this.originZone.x-8, this.originZone.y-8, this.originZone.width, this.originZone.height)
        INTERSECTIONS.forEach(int => {
            debugG.fillCircle(int.coordinates[0], int.coordinates[1], 8).setDepth(9999)
        })
    }

    updatePlayerPosition(){
        if(this.player == null) return;
        const {x,y} = this.player;

        const intersectionReached = INTERSECTIONS.find(int => {
                const circle = new Phaser.Geom.Circle(int.coordinates[0], int.coordinates[1], 8)
                return circle.contains(x, y)
            })

        if(intersectionReached != null && !this.intersectionReached && !this.destinationSelected){
            this.destinationReached = null;
            this.intersectionReached = intersectionReached;
            this.player.emit("stop")            
            const onReach = intersectionReached.onReach || (() => Promise.resolve(true))
            return onReach().then((canStay: boolean) => {
                if(!canStay) this.walkPath(intersectionReached.nextDestinations[this.origin.ref], intersectionReached.coordinates)
                else {
                    wait(250).then(() => {
                        this.updateDirections(intersectionReached.nextDestinations)
                    })
                }
            })            
        }

        const isOnOrigin = this.originZone?.getBounds().contains(x, y+5)
        const destinationReached = isOnOrigin ? this.origin : this.availableDestinations
            .map(dest => this.sprites.get(`${dest.ref}_highlight`))
            .find(sprite => sprite && sprite.getBounds().contains(x, y+5))
            ?.getData("destination") ?? null

        if(this.destinationReached !== destinationReached){
            if(destinationReached == null && this.destinationReached != null) {
                //console.log(`leave ${this.destinationReached.ref}`)
                hideDestinationPanel(this)
            } else if(destinationReached != null) {
                //console.log(`reach ${destinationReached.ref}`)
                showDestinationPanel(destinationReached, this)
                if(!this.destinationSelected || this.destinationSelected === destinationReached){
                    wait(350).then(() => {
                        this.updateDirections(destinationReached.nextDestinations)
                        //this.changeOrigin(this.destinationReached)
                    })
                }
            }
            this.destinationReached = destinationReached
        }

    }

    drawMap(){
        const map = this.make.tilemap({ key:'overworld' });
        const tileset = map.addTilesetImage('overworld', 'overworld');
        map.createLayer("ground0", tileset);
        map.createLayer("ground1", tileset);
        map.createLayer("ground2", tileset);
        map.createLayer("top0", tileset);
    }

    drawMapObjects(){
        const [px,py] = gameState.currentDestination.coordinates;
        this.player = this.add.sprite(px,py-4, "characters")
        this.player.play("player_idle").setDepth(Z.PLAYER)
        this.sprites.set("player", this.player)

        if(!gameState.hasBadge(BADGE_CASCADE)){
            const cascade = this.add.sprite(216,8, "map").play("cascade")
            this.sprites.set("cascade", cascade)
        }        

        const [boatX, boatY] = this.getBoatCoordinates()
        const boat = this.add.sprite(boatX*16-8, boatY*16-8, "map").play("boat")
        this.sprites.set("boat", boat)

        if(!gameState.wokeUpRonflex){
            const ronflex = this.add.sprite(136,72, "map").play("ronflex")
            this.sprites.set("ronflex", ronflex)
        }
    }

    drawBadges(){
        const nbBadges = ALL_BADGES.length
        ALL_BADGES.forEach((badge, i) => {
            let x = 48 + (i%(nbBadges/2))*17, y = 12 + Math.floor(i/(nbBadges/2))*17;
            let frame = badge.frameIndex + (gameState.hasBadge(badge)? 0 : 10)
            const sprite = this.add.sprite(x,y, "badges").setFrame(frame)
            this.sprites.set(badge.ref, sprite)
        })
    }

    updateDestinations(){
        this.destinationsHighLightGroup?.clear(false, true)
        const undeclared = Object.keys(this.origin.nextDestinations).find(ref => !(ref in DESTINATIONS))
        if(undeclared) return console.error(`DESTINATION NOT DECLARED: ${undeclared}`)
        this.availableDestinations = Object.keys(this.origin.nextDestinations)
            .map(ref => DESTINATIONS[ref])
            .filter(dest => !dest.locked || !dest.locked())
            .concat(this.origin)
        for(let destination of this.availableDestinations){
            const [x,y] = destination.coordinates;
            const destinationHighlight = this.add.sprite(x,y, "map")
                .play("highlight")
                .setDepth(Z.MAP_HIGHLIGHT)
                .setAlpha(0.75)
                .setTint(DestinationTypeHighlightTint[destination.type] ?? 0xffffff)
            destinationHighlight.setData("destination", destination)

            this.sprites.set(`${destination.ref}_highlight`, destinationHighlight)
            this.registerDestination(destination, destinationHighlight)
            if(destination.preload){
                destination.preloading = true;
                destination.preload(this as MyScene)
                this.load.start()
                this.load.on("complete", () => { 
                    console.log(`finished preloading destination ${destination.name}`)
                    destination.preloading = false
                 })
            } 
        }
    }

    registerDestination(destination: Destination, marker: Phaser.GameObjects.Sprite | Phaser.GameObjects.Zone){
        addInteractiveElem(marker)
        this.destinationsHighLightGroup?.add(marker)
        marker.on("over", () => {
            showDestinationPanel(destination, this)
        })
        marker.on("out", () => {
            hideDestinationPanel(this)
        })
        marker.on("click", () => {
            if(this.isMoving || this.destinationReached === destination) return;
            this.destinationSelected = destination;
            const currentPos = this.destinationReached || this.intersectionReached || this.origin;
            if(destination.ref in currentPos.nextDestinations){
                // a direct path exists from your current position
                const path = currentPos.nextDestinations[destination.ref]
                this.walkPath(path, currentPos.coordinates)
            } else if(this.origin.ref in currentPos.nextDestinations){
                // travel from another destination or intersection
                // without direct path to selected destination
                // must go back to origin before
                const backToOrigin = currentPos.nextDestinations[this.origin.ref]
                const path = this.origin.nextDestinations[destination.ref]
                this.walkPath([...backToOrigin, ...path], currentPos.coordinates)
            }
        })
    }

    updateDirections(paths: { [ref: string]: Path }){
        this.directionsGroup?.clear(false, true)
        this.directions = emptyDirectionalData()
        Object.entries(paths).forEach(([ref, path]) => {
            if(this.destinationReached != null && this.destinationReached  !== this.origin && ref !== this.origin.ref) return; // can only go back
            const dir = getDirectionFromDelta(...path[0])
            const destination = DESTINATIONS[ref]
            if(dir != null && (!destination.locked || !destination.locked())){ this.directions[dir] = ref; }
        })
        Object.entries(this.directions).forEach(([dir, dest]) => {
            if(dest == null || !this.player) return;
            const [dx, dy] = getDeltaFromDirection(dir as Direction)
            const dirSprite = this.add.sprite(this.player.x + dx*12,this.player.y +dy*12,"map", 20).play("map_direction_arrow");
            dirSprite.setDepth(Z.MENU_OBJECTS).setRotation(getRotationAngle(dir as Direction))
            this.directionsGroup?.add(dirSprite);
            this.tweens.add({
                targets: [dirSprite],
                duration: 300,
                ease: Phaser.Math.Easing.Sine,
                x: "+="+(dx*4),
                y: "+="+(dy*4),
                yoyo: true,
                repeat: -1
            })
        })
    }

    walkPath(path: Path, from: [number, number]){
        const WALK_SPEED = 2.5;
        let STOP_FLAG = false;
        if(!this.player) return;

        let x = from[0], y = from[1];
        this.player.setPosition(x, y)
        this.player.off("stop");
        this.player.once("stop", () => {
            STOP_FLAG = true
            const reached = this.intersectionReached || this.destinationReached || this.origin            
            wait(200).then(() => {
                this.player?.play("player_idle")
                this.player?.setPosition(reached.coordinates[0], reached.coordinates[1])
                this.isMoving = false;
                STOP_FLAG = false;
            })
        })
        this.isMoving = true;
        this.directionsGroup?.clear(false, true)

        path.reduce(async (previousStep: Promise<any>, step) => {
            await previousStep;
            if(STOP_FLAG) return Promise.reject("STOP");
            const [dx, dy] = step;
            const stepDuration = getPathLength([step]) * 1000 / WALK_SPEED
            x += dx*16;
            y += dy*16
            this.tweens.add({
                targets: [this.player],
                t: 1,
                duration: stepDuration,
                x: "+="+(dx*16),
                y: "+="+(dy*16)
            })
            if(dy >= 1){ this.player?.play("player_down", true) }
            else if(dy <= -1){ this.player?.play("player_up", true) }
            else if(dx >= 1){ this.player?.play("player_right", true) }
            else if(dx <= -1){ this.player?.play("player_left", true) }

            return await wait(stepDuration);
        }, Promise.resolve()).then(() => {
            this.intersectionReached = null;
            this.destinationSelected = null;
            wait(200).then(() => { this.isMoving = false; })
            this.player?.play("player_idle")
            this.updatePlayerPosition()         
        }).catch(e => { if( e!=="STOP") throw e })
    }

    getBoatCoordinates(){
        if([
            BOURG_PALETTE, JADIELLE, MONT_BRAISE, 
            CRAMOISILE, ILES_ECUME, PARMANIE, OCEANE_CRAMOISILE
        ].includes(gameState.currentDestination)){
            return [4, 19] // cramoisile
        }
        if([
            MONT_SELENITE, AZURIA, ARGENTA,
            CENTRALE, PENSION, LAVANVILLE, OCEANE_AZURIA
        ].includes(gameState.currentDestination)){
            return [18, 1] // azuria
        }
        return [12, 11] // carmin sur mer
    }
}