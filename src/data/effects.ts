export interface Effect {
    key: string;
    frames: number[];
    frameRate: number;
    scale?: number;
    repeat: number;
    pattern?: string;
}

export const EFFECTS: { [name: string] : Effect} = {
    PISTOLET_A_O: {
        key: "pistolet_a_o",
        frames: [0],
        frameRate: 8,
        repeat: 0,
        scale: 0.5
    },
    PISTOLET_A_O_HIT: {
        key: "pistolet_a_o_hit",
        frames: [1,2],
        frameRate: 8,
        repeat: 0,
        scale: 0.5
    },
    HYDROCANON: {
        key: "hydrocanon",
        frames: [3,4,5,6],
        frameRate: 8,
        repeat: 2,
        scale: 1
    },
    TREMPETTE: {
        key: "trempette",
        frames: [7,8,9,10,11,12,13,14],
        frameRate: 8,
        repeat: 0,
        scale: 1
    },
    BULLES_D_O: {
        key: "bulles_d_o",
        frames: [15],
        frameRate: 8,
        repeat: 0,
        scale: 0.5
    },
    BULLES_D_O_HIT: {
        key: "bulles_d_o_hit",
        frames: [16,17,18],
        frameRate: 8,
        repeat: 0,
        scale: 0.5
    },
    SECRETION_HIT: {
        key: "secretion",
        frames: [19],
        frameRate: 1,
        repeat: 0,
        scale: 1
    },
    POUDREUSE: {
        key: "poudreuse",
        frames: [20,21,22,23,24,25,26],
        frameRate: 8,
        repeat: 0        
    },
    HYPNOSE: {
        key: "hypnose",
        frames: [27,28,29,30,31],
        frameRate: 6,
        repeat: 0,
        scale: 1
    },
    ECLATS_GLACE: {
        key: "eclats_glace",
        frames: [32,33,34,35],
        frameRate: 8,
        repeat: 0
    },
    LIGOTAGE: {
        key: "ligotage",
        frames: [36,37],
        frameRate: 6,
        repeat: 2,
        scale: 0.5
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
    BURN: {
        key: "burn",
        frames: [40,41,42,43,44,45,46,47],
        frameRate: 8,
        repeat: Infinity,
        scale: 1
    },
    FIRE_BLAST: {
        key: "fire_blast",
        frames: [48,49,50,51,52,53],
        frameRate: 8,
        repeat: 0
    },
    FLAMMECHE: {
        key: "flammeche",
        frames: [54,55,56,57,58],
        frameRate: 8,
        repeat: 0,
        scale: 1
    },
    CHARGE_HIT: {
        key: "charge_hit",
        frames: [59],
        frameRate: 8,
        repeat: 0,
        scale: 0.5  
    },
    LANCE_FLAMMES: {
        key: "lance_flammes",
        frames: [60,61,62,63,64],
        frameRate: 8,
        repeat: 0,
        scale: 1
    },
    CROCS_FEU: {
        key: "crocs_feu",
        frames: [65,66,67,68,69],
        frameRate: 8,
        repeat: 0,
        scale: 1
    },
    CROC_DE_MORT: {
        key: "croc_de_mort",
        frames: [70,71,72,73],
        frameRate: 8,
        repeat: 0
    },
    POUVOIR_ANTIQUE: {
        key: "pouvoir_antique",
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
    LANCE_SOLEIL: {
        key: "lance_soleil",
        frames: [89,90,91,92,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94],
        frameRate: 8,
        repeat: 0
    },
    CRUAILE: {
        key: "cruaile",
        frames: [95,96,97,98],
        frameRate: 8,
        repeat: 0
    },
    CHOC_MENTAL: {
        key: "choc_mental",
        frames: [99],
        frameRate: 8,
        repeat: 0
    },
    PIQURE:{
        key: "piqure",
        frames: [100,101,102,103],
        frameRate: 8,
        repeat: 0
    },
    SECRETION: {
        key: "secretion",
        frames: [104,105,106],
        frameRate: 8,
        repeat: 0
    },
    POUDRE_TOXIK: {
        key: "poudre_toxik",
        frames: [107,108,109,110,111,112,113,114],
        frameRate: 8,
        scale: 1,
        repeat: 0
    },
    PARALYSIE: {
        key: "paralysie",
        frames: [115,116,117,118],
        frameRate: 8,
        repeat: Infinity
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
    ECLAIR: {
        key: "eclair",
        frames: [125,126,127,128,129],
        frameRate: 16,
        repeat: 0,
        pattern: "eclair"
    },
    CAGE_ECLAIR: {
        key: "elec_ball",
        frames: [130,131,132,133,134,135],
        frameRate: 8,
        repeat: 2
    },
    VIVE_ATTAQUE: {
        key: "vive_attaque",
        frames: [136,137,138,139,140,141,142,143],
        frameRate: 16,
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
    RAFALE_PSY: {
        key: "rafale_psy",
        frames: [147],
        frameRate: 8,
        repeat: 0,
        scale: 1
    },
    PROVOCATED: {
        key: "provocated",
        frames: [148],
        frameRate: 8,
        repeat: 0
    },
    MASSDOS: {
        key: "massdos",
        frames: [149,150],
        frameRate: 8,
        repeat: Infinity
    },
    PROVOCATION: {
        key: "provocation",
        frames: [151,152,153,152,153],
        frameRate: 8,
        repeat: 0,
        scale: 1
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
    FOUET_LIANES: {
        key: "fouet_lianes",
        frames: [160,161,162,163,164],
        frameRate: 8,
        repeat: 0,
        scale: 0.75
    },
    TELEPORT: {
        key: "teleport",
        frames: [165,166,167,168,169],
        frameRate: 8,
        repeat: 0
    },
    ETINCELLE: {
        key: "etincelle",
        frames: [170,171,172,173,174,175,176],
        frameRate: 16,
        repeat: 0
    },
    POISON_BALL: {
        key: "poison_ball",
        frames: [177,178,179],
        frameRate: 8,
        repeat: 0
    },
    DARK_SLICE: {
        key: "dark_slice",
        frames: [180,181,182,183],
        frameRate: 8,
        repeat: 0
    },
    CIRCLE_HIT: {
        key: "circle_hit",
        frames: [184,185,186,187,188],
        frameRate: 8,
        repeat: 0
    },
    SOMMEIL: {
        key: "sommeil",
        frames: [189,190,191,190],
        frameRate: 4,
        repeat: Infinity
    },
    GRIFFE: {
        key: "griffe",
        frames: [192,193,194,195],
        frameRate: 8,
        repeat: 0,
        scale: 1
    },
    MORSURE: {
        key: "morsure",
        frames: [198,197,196,197,198,199],
        frameRate: 12,
        repeat: 0,
        scale: 0.5
    },
    VAMPIRISME: {
        key: "vampirisme",
        frames: [200,201,202],
        frameRate: 8,
        repeat: 0,
        scale: 1
    },
    SOIN: {
        key: "soin",
        frames: [203,204,205,206,207,208,209,210],
        frameRate: 8,
        repeat: Infinity,
        scale: 1
    },
    SURF: {
        key: "surf",
        frames: [211,212,213,214,215,216,217,218],
        frameRate: 8,
        repeat: Infinity,
        scale: 1
    },
    DARD_VENIN: {
        key: "dard_venin",
        frames: [219],
        frameRate: 8,
        repeat: 0,
        scale: 1
    },
    POISON: {
        key: "poison",
        frames: [220,221,222,223,224,225,226,227,228,229,230,231],
        frameRate: 10,
        repeat: Infinity,
        scale: 0.5
    },
    ACIDE: {
        key: "acide",
        frames: [232,233,234,235],
        frameRate: 8,
        repeat: 0        
    },
    ACIDE_HIT: {
        key: "acide_hit",
        frames: [236,237,238,239,240,241,242],
        frameRate: 8,
        repeat: 0
    },
    DARD_VENIN_HIT: {
        key: "dard_venin_hit",
        frames: [243],
        frameRate: 8,
        repeat: 0
    }
}