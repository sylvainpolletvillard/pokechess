import {Z} from "./depths";
import {PARASPORE} from "./skills/paraSpore";

export interface Effect {
    key: string;
    frames: number[];
    frameRate: number;
    scale?: number;
    repeat: number;
    pattern?: string;
    tint?: number;
    depth?: number;
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
        key: "secretion_hit",
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
    CHARGE_HIT: {
        key: "charge_hit",
        frames: [38],
        frameRate: 8,
        repeat: 0,
        scale: 0.5
    },
    FROZEN: {
        key: "frozen",
        frames: [39],
        frameRate: 8,
        repeat: 0
    },
    LANCE_FLAMMES: {
        key: "lance_flammes",
        frames: [40,41,42,43,44,45,46,47,48],
        frameRate: 8,
        repeat: 0,
        scale: 1
    },
    LECHOUILLE: {
        key: "lechouille",
        frames: [49,50,51,52,51,50],
        frameRate: 8,
        repeat: 0
    },
    DEVOREVE: {
        key: "devoreve",
        frames: [53,54],
        frameRate: 16,
        repeat: 3
    },
    FLAMMECHE: {
        key: "flammeche",
        frames: [55,56,57,58,59],
        frameRate: 8,
        repeat: 0,
        scale: 1
    },
    BURN: {
        key: "burn",
        frames: [60,61,62,63],
        frameRate: 8,
        repeat: Infinity,
        scale: 1,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON
    },
    TORGNOLES: {
        key: "torgnoles",
        frames: [64],
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
    DESTRUCTION: {
        key: "destruction",
        frames: [80,81,82,83],
        frameRate: 8,
        repeat: 0,
        scale: 2
    },
    NITROCHARGE_HIT: {
        key: "nitrocharge_hit",
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
    PARASPORE: {
        key: "paraspore",
        frames: [107,108,109,110,111,112,113,114],
        frameRate: 6,
        scale: 1,
        repeat: 0,
        tint: 0xff9900
    },
    PARALYSIE: {
        key: "paralysie",
        frames: [115,116,117,118],
        frameRate: 8,
        repeat: Infinity
    },
    CHOC_MENTAL: {
        key: "choc_mental",
        frames: [119],
        frameRate: 8,
        repeat: 0
    },
    JET_PIERRES: {
        key: "jet_pierres",
        frames: [120],
        frameRate: 8,
        repeat: 0,
        scale: 0.5
    },
    JET_PIERRES_HIT: {
        key: "jet_pierres_hit",
        frames: [120,121,122,123,124],
        frameRate: 8,
        repeat: 0,
        scale: 0.5
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
    POING_KARATE: {
        key: "poing_karate",
        frames: [99,144],
        frameRate: 8,
        repeat: 0
    },
    DOUBLE_PIED: {
        key: "double_pied",
        frames: [145,146],
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
    FURIE: {
        key: "furie",
        frames: [157,156,155,154],
        frameRate: 8,
        repeat: 0
    },
    PINCE_MASSE: {
        key: "pince_masse",
        frames: [158,159,158],
        frameRate: 8,
        repeat: 0,
        scale: 0.5
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
    DETRITUS: {
        key: "detritus",
        frames: [177,178,179],
        frameRate: 8,
        repeat: 0
    },
    GUILLOTINE: {
        key: "guillotine",
        frames: [180,181,182,183],
        frameRate: 4,
        repeat: 0
    },
    ULTRASON: {
        key: "ultrason",
        frames: [184,185,186,187,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188],
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
        repeat: 0,
        scale: 0.5
    },
    ACIDE: {
        key: "acide",
        frames: [232,233,232,234],
        frameRate: 8,
        repeat: Infinity
    },
    ACIDE_HIT: {
        key: "acide_hit",
        frames: [235,236,237,238],
        frameRate: 8,
        repeat: 0,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON
    },
    DARD_VENIN_HIT: {
        key: "dard_venin_hit",
        frames: [239],
        frameRate: 8,
        repeat: 0
    },
    VOL_VIE: {
        key: "vol_vie",
        frames: [240,241,242,243],
        frameRate: 8,
        repeat: Infinity
    },
    COUD_BOUE: {
        key: "coud_boue",
        frames: [244],
        frameRate: 8,
        repeat: 0
    },
    COUD_BOUE_HIT: {
        key: "coud_boue_hit",
        frames: [245,246,247,248,249,250],
        frameRate: 8,
        repeat: 0
    },
    JET_DE_SABLE: {
        key: "jet_de_sable",
        frames: [246,247,248,249,250],
        frameRate: 8,
        repeat: 0,
        tint: 0xffdd90,
        scale: 1.5
    },
    BOMB_BEURK: {
        key: "bomb_beurk",
        frames: [251,252,253,254,255,256,257,258],
        frameRate: 8,
        repeat: Infinity
    },
    METRONOME: {
        key: "metronome",
        frames: [259],
        frameRate: 1,
        repeat: 0
    },
    BOMB_BEURK_HIT: {
        key: "bomb_beurk_hit",
        frames: [260,261,262,263,264,265],
        frameRate: 8,
        repeat: 0,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON
    },
    OURAGAN: {
        key: "ouragan",
        frames: [266,267,268],
        frameRate: 8,
        repeat: Infinity
    },
    PEUR: {
        key: "peur",
        frames: [269,270,271,270],
        frameRate: 8,
        repeat: Infinity
    },
    ARMURE: {
        key: "armure",
        frames: [272,273,274,275,276,277,278],
        frameRate: 12,
        repeat: 0
    },
    HATE: {
        key: "hate",
        frames: [280,281,282],
        frameRate: 8,
        repeat: 0
    },
    DANSE_LAMES: {
        key: "danse_lames",
        frames: [283,284,285,286,287,288],
        frameRate: 8,
        repeat: 0
    },
    PICPIC: {
        key: "picpic",
        frames: [289,290,291,292,293],
        frameRate: 8,
        repeat: 0
    },
    DRACORAGE: {
        key: "dracorage",
        frames: [294,295,296,297],
        frameRate: 12,
        repeat: 3,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON
    },
    DRACOCHARGE: {
        key: "dracocharge",
        frames: [298,299],
        frameRate: 8,
        repeat: Infinity
    },
    DANSE_FLAMMES: {
        key: "danseflammes",
        frames: [300,301,302],
        frameRate: 8,
        repeat: 5
    },
    BERCEUSE: {
        key: "berceuse",
        frames: [303,304,305,304],
        frameRate: 8,
        repeat: 5
    },
    ENCORE: {
        key: "encore",
        frames: [306,307,308,307],
        frameRate: 8,
        repeat: 1
    },
    TONNERRE: {
        key: "tonnerre",
        frames: [309,310,311,312,313,314],
        frameRate: 8,
        repeat: 0
    },
    ULTIMAPOING: {
        key: "ultimapoing",
        frames: [315,316,315,316,317],
        frameRate: 8,
        repeat: 0
    },
    BROUILLARD: {
        key: "brouillard",
        frames: [318,319,320,321,322,323,324],
        frameRate: 8,
        repeat: 0
    },
    BALAYAGE: {
        key: "balayage",
        frames: [325,326,327,328],
        frameRate: 8,
        repeat: 0
    }
}