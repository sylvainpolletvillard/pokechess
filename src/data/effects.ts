export interface Effect {
    key: string;
    frames: number[];
    frameRate: number;
    scale?: number
    repeat: number;
}

export const EFFECTS: { [name: string] : Effect} = {
    WATER_BUBBLE: {
        key: "water_bubble",
        frames: [0],
        frameRate: 8,
        repeat: 0
    },
    WATER_BUBBLE_HIT: {
        key: "water_bubble_hit",
        frames: [1,2],
        frameRate: 8,
        repeat: 0
    },
    WATER_JET: {
        key: "water_jet",
        frames: [3,4,5,6],
        frameRate: 8,
        repeat: 0
    },
    WATER_DROP: {
        key: "water_drop",
        frames: [7,8,9,10,11,12,13,14],
        frameRate: 8,
        repeat: 0
    },
    WATER_BUBBLE_2: {
        key: "water_bubble2",
        frames: [15,16,17,18],
        frameRate: 8,
        repeat: 0
    },
    WATER_SHIELD: {
        key: "water_shield",
        frames: [19],
        frameRate: 8,
        repeat: 0
    },
    ICE_STAR: {
        key: "ice_star",
        frames: [20,21,22,23,24,25,26],
        frameRate: 8,
        repeat: 0
    },
    ICE_SQUARE: {
        key: "ice_square",
        frames: [27,28,29,30,31],
        frameRate: 5,
        repeat: 0
    },
    ICE_SHARD: {
        key: "ice_shard",
        frames: [32,33,34,35],
        frameRate: 8,
        repeat: 0
    },
    ICE_TEAR: {
        key: "ice_tear",
        frames: [36],
        frameRate: 8,
        repeat: 0
    },
    ICE_SHIELD: {
        key: "ice_shield",
        frames: [37],
        frameRate: 8,
        repeat: 0
    },
    ICE_CRYSTAL: {
        key: "ice_crystal",
        frames: [38],
        frameRate: 8,
        repeat: 0
    },
    FROZEN: {
        key: "frozen",
        frames: [39],
        frameRate: 8,
        repeat: 0
    },
    FIRE_BLAZE: {
        key: "fire_blaze",
        frames: [40,41,42,43,44,45,46,47],
        frameRate: 8,
        repeat: 0
    },
    FIRE_BLAST: {
        key: "fire_blast",
        frames: [48,49,50,51,52,53],
        frameRate: 8,
        repeat: 0
    },
    FIRE_BALL: {
        key: "fire_ball",
        frames: [54,55,56,57,58],
        frameRate: 8,
        repeat: 0,
        scale: 0.75
    },
    FIRE_ARROW: {
        key: "fire_arrow",
        frames: [59],
        frameRate: 8,
        repeat: 0
    },
    FIRE_JET: {
        key: "fire_jet",
        frames: [60,61,62,63,64],
        frameRate: 8,
        repeat: 0
    },
    FIRE_CLAW: {
        key: "fire_claw",
        frames: [65,66,67,68],
        frameRate: 8,
        repeat: 0
    },
    FIRE_GROUND_EXPLOSION: {
        key: "fire_ground_explosion",
        frames: [69,70,71,72,73],
        frameRate: 8,
        repeat: 0
    },
    FIRE_FLAMETHROWER: {
        key: "fire_flamethrower",
        frames: [74,75,76,77,78,79],
        frameRate: 8,
        repeat: 0
    },
    FIRE_EXPLOSION: {
        key: "fire_explosion",
        frames: [80,81,82,83],
        frameRate: 8,
        repeat: 0
    },
    FIRE_EXPLOSION_CIRCLE: {
        key: "fire_explosion_circle",
        frames: [84,85,86,87,88],
        frameRate: 8,
        repeat: 0
    },
    ENERGY_BALL: {
        key: "energy_ball",
        frames: [89,90,91,92,93,94],
        frameRate: 8,
        repeat: 0
    },
    FIRE_PIERCE: {
        key: "fire_pierce",
        frames: [95,96,97,98],
        frameRate: 8,
        repeat: 0
    },
    FIRE_HIT: {
        key: "fire_hit",
        frames: [99],
        frameRate: 8,
        repeat: 0
    },
    FIRE_SLICE:{
        key: "fire_slice",
        frames: [100,101,102,103],
        frameRate: 8,
        repeat: 0
    },
    FIRE_SWURL: {
        key: "fire_swurl",
        frames: [104,105,106,107,108],
        frameRate: 8,
        repeat: 0
    },
    DARK_SLICE: {
        key: "dark_slice",
        frames: [109,110,111,112,113],
        frameRate: 8,
        repeat: 0
    },
    HIT_STAR_BIG: {
        key: "hit_star_big",
        frames: [114],
        frameRate: 8,
        repeat: 0
    },
    PARALYZE: {
        key: "paralyze",
        frames: [115,116,117,118],
        frameRate: 8,
        repeat: 0
    },
    HIT_STAR: {
        key: "hit_star",
        frames: [119],
        frameRate: 8,
        repeat: 0
    },
    ELEC_SPARKS: {
        key: "elec_sparks",
        frames: [120,121,122,123,124],
        frameRate: 8,
        repeat: 0
    },
    ELEC_THUNDER: {
        key: "elec_thunder",
        frames: [125,126,127,128,129],
        frameRate: 16,
        repeat: 0
    },
    ELEC_BALL: {
        key: "elec_ball",
        frames: [130,131,132,133,134,135],
        frameRate: 8,
        repeat: 0
    },
    CLAW_LEFT: {
        key: "claw_left",
        frames: [136,137,138,139],
        frameRate: 8,
        repeat: 0
    },
    CLAW_RIGHT: {
        key: "claw_right",
        frames: [140,141,142,143],
        frameRate: 8,
        repeat: 0
    },
    FIST: {
        key: "fist",
        frames: [144],
        frameRate: 8,
        repeat: 0
    },
    PAW: {
        key: "paw",
        frames: [145],
        frameRate: 8,
        repeat: 0
    },
    FOOT: {
        key: "foot",
        frames: [146],
        frameRate: 8,
        repeat: 0
    },
    HAND: {
        key: "hand",
        frames: [147],
        frameRate: 8,
        repeat: 0
    },
    PROVOCATED: {
        key: "provocated",
        frames: [148],
        frameRate: 8,
        repeat: 0
    },
    PROVOCATION: {
        key: "provocation",
        frames: [151,152,153,152,153],
        frameRate: 8,
        repeat: 0
    },
    BONE: {
        key: "bone",
        frames: [149,150],
        frameRate: 8,
        repeat: 0
    },
    SWEEP: {
        key: "sweep",
        frames: [157,156,155,154],
        frameRate: 8,
        repeat: 0
    },
    VAMPIRE_SEED: {
        key: "vampire_seed",
        frames: [158,159],
        frameRate: 8,
        repeat: 0
    },
    VINE_WHIP: {
        key: "vine_whip",
        frames: [160,161,162,163,164],
        frameRate: 8,
        repeat: 0,
        scale: 0.75
    },
    THORN_SPEAR: {
        key: "thorn_spear",
        frames: [165,166,167,168,169],
        frameRate: 8,
        repeat: 0
    },
    ROOTS: {
        key: "roots",
        frames: [170,171,172,173,174,175,176],
        frameRate: 8,
        repeat: 0
    },
    POISON_BALL: {
        key: "poison_ball",
        frames: [177,178,179],
        frameRate: 8,
        repeat: 0
    }
}