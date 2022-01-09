import {PokemonEntry, POKEMONS} from "../data/pokemons";
import {EFFECTS} from "../data/effects";
import Game from "../scenes/GameScene";
import {POKEBALLS} from "../data/pokeballs";
import {POKEMON_TYPES} from "../data/types";
import {PokemonOnBoard} from "../objects/pokemon";
import {Direction} from "../utils/directions";
import {declareAnims} from "../utils/anims";
import {HitSkill, ProjectileSkill, SkillBehavior} from "./skill";
import {wait} from "../utils/helpers";
import {launchProjectile} from "./projectile";
import { applyDamage, calcDamage } from "./fight";
import { Z } from "../data/depths";
import { addAlteration } from "./alteration";

export const DIRECTIONS = [Direction.UP, Direction.LEFT, Direction.DOWN, Direction.RIGHT]

export function getDirection(dx: number, dy:number){
    return dx > 0 ? Direction.RIGHT : dx < 0 ? Direction.LEFT : dy < 0 ? Direction.UP : Direction.DOWN
}

export function setupAnims(anims: Phaser.Animations.AnimationManager, debug?: boolean){
    generatePokemonsAnims(anims)
    generatePokeballAnims(anims, debug)
    setupEffects(anims, debug)
    setupTrainerAnims(anims, debug)
    setupMapAnims(anims, debug)
    setupInteractionsAnims(anims, debug)
    setupGUI(anims, debug)
}


export function setupEffects(anims: Phaser.Animations.AnimationManager, debug?: boolean){
    Object.values(EFFECTS).forEach(effect => {
        anims.create({
            key: effect.key,
            frames: anims.generateFrameNumbers('effects',{ frames: effect.frames }),
            frameRate: effect.frameRate,
            repeat: debug ? -1 : effect.repeat
        })
    })
}

export function generatePokemonsAnims(anims: Phaser.Animations.AnimationManager){
    POKEMONS.forEach((pokemon: PokemonEntry, dp: number) => {
        anims.create({
            key: `${pokemon.ref}_portrait`,
            frames: anims.generateFrameNumbers('pokemon_portraits', { start: dp, end: dp })
        })

        DIRECTIONS.forEach((dir, dd) => {
            const frame_top_left = (dp % 15) * 2 + Math.floor(dp / 15) * 120
            anims.create({
                key: `${pokemon.ref}_${dir}`,
                frames: anims.generateFrameNumbers('pokemon', {
                    frames: [
                        frame_top_left + (dd % 2) + (dd > 1 ? 60 : 0) ,
                        frame_top_left + 30 + (dd % 2) + (dd > 1 ? 60 : 0)
                    ]
                }),
                frameRate: 5,
                repeat: -1
            });
        })
    })
}

export function generatePokeballAnims(anims: Phaser.Animations.AnimationManager, debug?: boolean){
    POKEBALLS.forEach((ball, i) => {
        anims.create({
            key: `${ball}_idle`,
            frames: anims.generateFrameNumbers('pokeball', {
                frames: [i+3*5]
            }),
        })
        anims.create({
            key: `${ball}_launch`,
            frames: anims.generateFrameNumbers('pokeball', {
                frames: Array.from({ length: 3 }).map((_,j) => j*5 + i)
            }),
            frameRate: 12,
            repeat: -1
        })
        anims.create({
            key: `${ball}_in`,
            frames: anims.generateFrameNumbers('pokeball', {
                frames: [
                    ...Array.from({ length: 12 }).map((_,j) => (j+3)*5 + i),
                    i+3*5
                ]
            }),
            frameRate: 16,
            repeat: debug ? -1 : 0
        })
        anims.create({
            key: `${ball}_jiggle`,
            frames: anims.generateFrameNumbers('pokeball', {
                frames: Array.from({ length: 5 }).map((_,j) => (j+15)*5 + i)
            }),
            frameRate: 16,
            repeat: -1,
            yoyo: true
        })
        anims.create({
            key: `${ball}_jiggle_once`,
            frames: anims.generateFrameNumbers('pokeball', {
                frames: [
                    i+17*5,
                    i+16*5,
                    i+15*5,
                    i+16*5,
                    i+3*5
                ]
            }),
            frameRate: 16,
            repeat: 0
        })
        anims.create({
            key: `${ball}_out`,
            frames: anims.generateFrameNumbers('pokeball', {
                frames: Array.from({ length: 6 }).map((_,j) => (j+20)*5 + i)
            }),
            frameRate: 16,
            repeat: debug ? -1 : 0
        })
        anims.create({
            key: `${ball}_catch`,
            frames: anims.generateFrameNumbers('pokeball', {
                frames: [
                    ...Array.from({ length: 5 }).map((_,j) => (j+26)*5 + i),
                    i+3*5
                ]
            }),
            frameRate: 16,
            repeat: debug ? -1 : 0
        })
    })
}

export function setupTrainerAnims(anims: Phaser.Animations.AnimationManager, debug?: boolean){
    anims.create({
        key: "trainer_launch",
        frames: anims.generateFrameNumbers('trainer',{ frames: [0,1,2,3,4,0] }),
        frameRate: 8,
        repeat: debug ? -1 : 0
    })
    anims.create({
        key: "trainer_idle",
        frames: anims.generateFrameNumbers('trainer',{ frames: [0] }),
    })
    anims.create({
        key: "trainer_victory",
        frames: anims.generateFrameNumbers('trainer',{ frames: [5] }),
    })
    anims.create({
        key: "trainer_defeat",
        frames: anims.generateFrameNumbers('trainer',{ frames: [6] }),
    })
}

export function faceTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, game: Game){
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    pokemon.facingDirection = getDirection(target.x - pokemon.x, target.y - pokemon.y)
    sprite.play(`${pokemon.ref}_${pokemon.facingDirection}`)
}

export function renderAttack(pokemon: PokemonOnBoard, target: PokemonOnBoard, game: Game) {
    faceTarget(pokemon, target, game);
    let skill = pokemon.baseSkill;
    if(pokemon.ppSkill && pokemon.pp >= pokemon.maxPP){
        skill = pokemon.ppSkill
        pokemon.pp = 0
    }
    
    if(skill.behavior === SkillBehavior.DIRECT_HIT){
        return renderDirectHitAttack(skill as HitSkill, pokemon, target, game)
    } else if(pokemon.baseSkill.behavior === SkillBehavior.PROJECTILE) {
        return launchProjectile(skill as ProjectileSkill, pokemon, target, game)
    }
    console.error(`Not yet implemented: ${skill.name}`)

}

export function renderDirectHitAttack(skill: HitSkill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: Game){
    let [x, y] = target.position, dx=0, dy=0, angle=0
    if(skill.effectOrigin === "source"){
        [x,y] = attacker.position
        angle = Math.atan2(target.y - attacker.y, target.x - attacker.x)
        dx = Math.round(Math.cos(angle) * 8)
        dy = Math.round(Math.sin(angle) * 8)
    } else if(skill.effectOrigin === "target"){
        angle = Math.atan2(attacker.y - target.y, attacker.x - target.x)
        dx = Math.round(Math.cos(angle) * 8)
        dy = Math.round(Math.sin(angle) * 8)
    } else if(skill.effectOrigin === "ground"){
        dy= -16 * (skill.effect.scale ?? 0.5)
    }
    
    const sprite = game.add.sprite(x + dx, y + dy, "effects")    

    if(skill.rotateSprite){
        sprite.rotation = angle;
    }    
    sprite.scale = skill.effect.scale ?? 0.5;
    sprite.blendMode = Phaser.BlendModes.OVERLAY
    if(skill.effectOrigin === "ground"){
        sprite.setDepth(Z.GROUND_SKILL_EFFECT)
    } else {
        sprite.setDepth(Z.SKILL_EFFECT)
    }

    sprite.play(skill.effect.key)
    sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        sprite.destroy()
    })

    if(skill.triggerAlteration) addAlteration(target, skill.triggerAlteration, game)
        
    wait(skill.hitDelay).then(() => {
        const damage = calcDamage(skill, target, attacker)
        console.log(`${attacker.name} is attacking ${target.name} for ${damage} damage !`)
        applyDamage(damage, target)
    })
}

export function setupGUI(anims: Phaser.Animations.AnimationManager, debug?: boolean){
    anims.create({
        key: "cursor_wave",
        frames: anims.generateFrameNumbers('gui',{ frames: [0,1] }),
        frameRate: 8,
        repeat: debug ? -1 : 0
    })
    anims.create({
        key: "cursor_drag",
        frames: anims.generateFrameNumbers('gui',{ frames: [2,3,4,5] }),
        frameRate: 16,
        repeat: debug ? -1 : 0
    })
    anims.create({
        key: "cursor_drop",
        frames: anims.generateFrameNumbers('gui',{ frames: [5,4,3,2,6] }),
        frameRate: 16,
        repeat: debug ? -1 : 0
    })
    anims.create({
        key: "cursor_click",
        frames: anims.generateFrameNumbers('gui',{ frames: [7,8,9,6] }),
        frameRate: 16,
        repeat: debug ? -1 : 0
    })
    anims.create({
        key: "cursor_point",
        frames: anims.generateFrameNumbers('gui',{ frames: [6] }),
        frameRate: 8,
        repeat: debug ? -1 : 0
    })
    anims.create({ key: "stat_attack", frames: anims.generateFrameNumbers('gui',{ frames: [10] }) })
    anims.create({ key: "stat_speed", frames: anims.generateFrameNumbers('gui',{ frames: [11] }) })
    anims.create({ key: "stat_defense", frames: anims.generateFrameNumbers('gui',{ frames: [12] }) })
    anims.create({ key: "stat_range", frames: anims.generateFrameNumbers('gui',{ frames: [13] }) })

    Object.values(POKEMON_TYPES).forEach((type) => {
        anims.create({ key: `type_${type.ref}`, frames: anims.generateFrameNumbers('icons16x16',{ frames: [type.frameIndex] }) })
    })

    anims.create({ key: `icon_pokeball`, frames: anims.generateFrameNumbers('icons16x16',{ frames: [20] }) })

    anims.create({ key: "text_victoire", frames: anims.generateFrameNumbers('texts',{ frames: [0] }) })
    anims.create({ key: "text_defaite", frames: anims.generateFrameNumbers('texts',{ frames: [1] }) })
    anims.create({ key: "text_fight", frames: anims.generateFrameNumbers('texts',{ frames: [2] }) })
    anims.create({ key: "text_capture", frames: anims.generateFrameNumbers('texts',{ frames: [3] }) })
}

export function setupMapAnims(anims: Phaser.Animations.AnimationManager, debug?: boolean){
    declareAnims(anims, "map", [
        ["player_idle", [4]],
        ["player_right", [0,1],8,-1],
        ["player_left", [2,3],8,-1],
        ["player_down", [5,6], 8, -1],
        ["player_up_idle", [7]],
        ["player_up",[8,9],8,-1],
        ["cascade", [10,11,12,13], 8, -1],
        ["boat", [14,15], 1, -1],
        ["ronflex", [16]],
        ["highlight", [17,18,19],4,-1],
        ["map_direction_arrow", [20]],
        ["gift", [21]],
        ["safari", [22]],
        ["cave_entrance",[23]]
    ])
}

export function setupInteractionsAnims(anims: Phaser.Animations.AnimationManager, debug?: boolean){
    declareAnims(anims, "interactions", [
        ["interaction_talk",[0,1,2,3], 3, -1],
        ["interaction_loot", [4,5,6,7,6,5], 6, -1]
    ])
}