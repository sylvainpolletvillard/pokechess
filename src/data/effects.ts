import {Z} from "./depths";

export interface Effect {
    key: string;
    frames: number[];
    frameRate: number;
    scale?: number;
    repeat?: number;
    pattern?: string;
    tint?: number;
    depth?: number;
    opacity?: number;
    delta?: number;
    position?: "source" | "target" | "source_ground" | "target_ground" | "target_to_source" | "parabolic_to_target";
}

export const EFFECTS: { [name: string] : Effect} = {
    PISTOLET_A_O: {
        key: "pistolet_a_o",
        frames: [0],
        frameRate: 8,
        scale: 0.5
    },
    PISTOLET_A_O_HIT: {
        key: "pistolet_a_o_hit",
        frames: [1,2],
        frameRate: 8,
        scale: 0.5
    },
    HYDROCANON: {
        key: "hydrocanon",
        frames: [3,4,5,6],
        frameRate: 8,
        repeat: 3,
        scale: 1,
        position: "target_ground",
        delta: 0
    },
    TREMPETTE: {
        key: "trempette",
        frames: [7,8,9,10,11,12,13,14],
        frameRate: 8,
        scale: 1,
        position: "source_ground"
    },
    BULLES_D_O: {
        key: "bulles_d_o",
        frames: [15],
        frameRate: 8,
        scale: 0.5
    },
    BULLES_D_O_HIT: {
        key: "bulles_d_o_hit",
        frames: [16,17,18],
        frameRate: 8,
        scale: 0.5
    },
    SECRETION_HIT: {
        key: "secretion_hit",
        frames: [19],
        frameRate: 1,
        scale: 1
    },
    POUDREUSE: {
        key: "poudreuse",
        frames: [20,21,22,23,24,25,26],
        frameRate: 8,
        position: "target",
    },
    HYPNOSE: {
        key: "hypnose",
        frames: [27,28,29,30,31],
        frameRate: 6,
        scale: 1,
        position: "source"
    },
    GRELON: {
        key: "grelon",
        frames: [32],
        frameRate: 8,
        scale: 1,
        depth: Z.SKILL_EFFECT_ABOVE_POKEMON
    },
    GRELON_HIT: {
        key: "grelon_hit",
        frames: [33,34,35],
        frameRate: 8,
    },
    LIGOTAGE: {
        key: "ligotage",
        frames: [36,37],
        frameRate: 6,
        repeat: 2,
        scale: 0.5,
        position: "target_ground",
        delta: -4
    },
    CHARGE_HIT: {
        key: "charge_hit",
        frames: [38],
        frameRate: 8,
        scale: 0.5,
        position: "target"
    },
    FROZEN: {
        key: "frozen",
        frames: [39],
        frameRate: 8,
        scale: 1,
        opacity: 0.5,
        depth: Z.SKILL_EFFECT_ABOVE_POKEMON,
        repeat: Infinity,
        position: "source_ground"
    },
    LANCE_FLAMMES: {
        key: "lance_flammes",
        frames: [40,41,42,43,44,45,46,47,48],
        frameRate: 8,
        scale: 1,
        position: "source",
        delta: 32
    },
    LECHOUILLE: {
        key: "lechouille",
        frames: [49,50,51,52,51,50],
        frameRate: 8,
        position: "source",
        delta: 10
    },
    DEVOREVE: {
        key: "devoreve",
        frames: [53,54],
        frameRate: 16,
        repeat: 3,
        position: "target_ground",
        delta: -4
    },
    FLAMMECHE: {
        key: "flammeche",
        frames: [55,56,57,58,59],
        frameRate: 8,
        scale: 1,
        position: "target"
    },
    BURN: {
        key: "burn",
        frames: [60,61,62,63],
        frameRate: 8,
        repeat: Infinity,
        scale: 1,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON,
        position: "source_ground"
    },
    TORGNOLES: {
        key: "torgnoles",
        frames: [64],
        frameRate: 8,
        scale: 1,
        position: "target"
    },
    CROCS_FEU: {
        key: "crocs_feu",
        frames: [65,66,67,68,69],
        frameRate: 8,
        scale: 1,
        position: "target"
    },
    CROC_DE_MORT: {
        key: "croc_de_mort",
        frames: [70,71,72,73],
        frameRate: 8,
        position: "target_ground"
    },
    POUVOIR_ANTIQUE: {
        key: "pouvoir_antique",
        frames: [74,75,76,77,78,79],
        frameRate: 8,
        position: "source_ground"
    },
    DESTRUCTION: {
        key: "destruction",
        frames: [80,81,82,83],
        frameRate: 8,
        scale: 2,
        position: "source_ground"
    },
    NITROCHARGE_HIT: {
        key: "nitrocharge_hit",
        frames: [84,85,86,87,88],
        frameRate: 8,
        position: "target"
    },
    LANCE_SOLEIL: {
        key: "lance_soleil",
        frames: [89,90,91,92,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94,93,94],
        frameRate: 8,
    },
    CRUAILE: {
        key: "cruaile",
        frames: [95,96,97,98],
        frameRate: 8,
        position: "target"
    },
    PIQURE:{
        key: "piqure",
        frames: [100,101,102,103],
        frameRate: 8,
        position: "target"
    },
    SECRETION: {
        key: "secretion",
        frames: [104,105,106],
        frameRate: 8,
    },
    POUDRE_TOXIK: {
        key: "poudre_toxik",
        frames: [107,108,109,110,111,112,113,114],
        frameRate: 8,
        scale: 1,
        position: "source_ground"
    },
    PARASPORE: {
        key: "paraspore",
        frames: [107,108,109,110,111,112,113,114],
        frameRate: 6,
        scale: 1,
        tint: 0xff9900,
        position: "source_ground"
    },
    PARALYSIE: {
        key: "paralysie",
        frames: [115,116,117,118],
        frameRate: 8,
        repeat: Infinity,
        position: "source_ground"
    },
    CHOC_MENTAL: {
        key: "choc_mental",
        frames: [119],
        frameRate: 8,
        delta: 8
    },
    JET_PIERRES: {
        key: "jet_pierres",
        frames: [120],
        frameRate: 8,
        scale: 0.5
    },
    JET_PIERRES_HIT: {
        key: "jet_pierres_hit",
        frames: [120,121,122,123,124],
        frameRate: 8,
        scale: 0.5
    },
    ECLAIR: {
        key: "eclair",
        frames: [125,126,127,128,129],
        frameRate: 16,
        pattern: "eclair"
    },
    CAGE_ECLAIR: {
        key: "elec_ball",
        frames: [130,131,132,133,134,135],
        frameRate: 8,
        repeat: 2,
        position: "source_ground"
    },
    VIVE_ATTAQUE: {
        key: "vive_attaque",
        frames: [136,137,138,139,140,141,142,143],
        frameRate: 16,
        position: "target"
    },
    POING_KARATE: {
        key: "poing_karate",
        frames: [99,144],
        frameRate: 8,
        position: "target"
    },
    DOUBLE_PIED: {
        key: "double_pied",
        frames: [145,146],
        frameRate: 8,
        position: "target"
    },
    RAFALE_PSY: {
        key: "rafale_psy",
        frames: [147],
        frameRate: 8,
        scale: 1,
        delta: 8
    },
    PROVOCATED: {
        key: "provocated",
        frames: [148],
        frameRate: 8,
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
        scale: 1,
        position: "source_ground",
        delta: -24
    },
    FURIE: {
        key: "furie",
        frames: [157,156,155,154],
        frameRate: 8,
        position: "target_ground"
    },
    PINCE_MASSE: {
        key: "pince_masse",
        frames: [158,159,158],
        frameRate: 8,
        scale: 0.5,
        position: "target",
        delta: 8
    },
    FOUET_LIANES: {
        key: "fouet_lianes",
        frames: [160,161,162,163,164],
        frameRate: 8,
        scale: 0.75,
        position: "source"
    },
    TELEPORT: {
        key: "teleport",
        frames: [165,166,167,168,169],
        frameRate: 8
    },
    ETINCELLE: {
        key: "etincelle",
        frames: [170,171,172,173,174,175,176],
        frameRate: 16,
        position: "target",
        delta: 4
    },
    DETRITUS: {
        key: "detritus",
        frames: [177,178,179],
        frameRate: 8
    },
    GUILLOTINE: {
        key: "guillotine",
        frames: [180,181,182,183],
        frameRate: 4,
        position: "target"
    },
    ULTRASON: {
        key: "ultrason",
        frames: [184,185,186,187,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188],
        frameRate: 8,
        delta: 8
    },
    SOMMEIL: {
        key: "sommeil",
        frames: [189,190,191,190],
        frameRate: 4,
        repeat: Infinity,
        position: "source_ground"
    },
    GRIFFE: {
        key: "griffe",
        frames: [192,193,194,195],
        frameRate: 8,
        scale: 1,
        position: "target"
    },
    MORSURE: {
        key: "morsure",
        frames: [198,197,196,197,198,199],
        frameRate: 12,
        scale: 0.5,
        position: "target"
    },
    VAMPIRISME: {
        key: "vampirisme",
        frames: [200,201,202],
        frameRate: 8,
        scale: 1,
        position: "source"
    },
    SOIN: {
        key: "soin",
        frames: [203,204,205,206,207,208,209,210],
        frameRate: 8,
        repeat: Infinity,
        scale: 1,
        position: "source_ground"
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
        scale: 1,
        delta: 8
    },
    POISON: {
        key: "poison",
        frames: [220,221,222,223,224,225,226,227,228,229,230,231],
        frameRate: 10,
        scale: 0.5,
        position: "target_ground"
    },
    ACIDE: {
        key: "acide",
        frames: [232,233,232,234],
        frameRate: 8,
        repeat: Infinity,
        position: "parabolic_to_target"
    },
    ACIDE_HIT: {
        key: "acide_hit",
        frames: [235,236,237,238],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON,
        position: "target_ground"
    },
    DARD_VENIN_HIT: {
        key: "dard_venin_hit",
        frames: [239],
        frameRate: 8
    },
    VOL_VIE: {
        key: "vol_vie",
        frames: [240,241,242,243],
        frameRate: 8,
        repeat: Infinity,
        position: "target_to_source"
    },
    COUD_BOUE: {
        key: "coud_boue",
        frames: [244],
        frameRate: 8,
        scale: 0.5
    },
    COUD_BOUE_HIT: {
        key: "coud_boue_hit",
        frames: [245,246,247,248,249,250],
        frameRate: 8
    },
    JET_DE_SABLE: {
        key: "jet_de_sable",
        frames: [246,247,248,249,250],
        frameRate: 8,
        tint: 0xffdd90,
        scale: 1.5,
        position: "target"
    },
    BOMB_BEURK: {
        key: "bomb_beurk",
        frames: [251,252,253,254,255,256,257,258],
        frameRate: 8,
        repeat: Infinity,
        position: "parabolic_to_target"
    },
    METRONOME: {
        key: "metronome",
        frames: [259],
        frameRate: 1,
        position: "source",
        delta: 16
    },
    BOMB_BEURK_HIT: {
        key: "bomb_beurk_hit",
        frames: [260,261,262,263,264,265],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON
    },
    OURAGAN: {
        key: "ouragan",
        frames: [266,267,268],
        frameRate: 8,
        repeat: Infinity
    },
    DANSE_FLAMMES: {
        key: "danseflammes",
        frames: [269,270,271,272],
        frameRate: 8,
        repeat: 5,
        position: "source_ground"
    },
    ARMURE: {
        key: "armure",
        frames: [273,274,275,276,277,278,279],
        frameRate: 12,
        position: "source_ground"
    },
    HATE: {
        key: "hate",
        frames: [280,281,282],
        frameRate: 8,
        position: "source_ground"
    },
    DANSE_LAMES: {
        key: "danse_lames",
        frames: [283,284,285,286,287,288],
        frameRate: 8,
        position: "source_ground"
    },
    PICPIC: {
        key: "picpic",
        frames: [289,290,291,292,293],
        frameRate: 8,
        position: "target"
    },
    DRACORAGE: {
        key: "dracorage",
        frames: [294,295,296,297],
        frameRate: 12,
        repeat: 3,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON,
        position: "target_ground",
        tint: 0xaaddff
    },
    BLIZZARD: {
        key: "blizzard",
        frames: [294,295,296,297],
        frameRate: 12,
        repeat: 3,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON,
        position: "target_ground"
    },
    DRACOCHARGE: {
        key: "dracocharge",
        frames: [298,299],
        frameRate: 8,
        repeat: Infinity,
        delta: 8
    },
    PEUR: {
        key: "peur",
        frames: [300,301,302,301],
        frameRate: 8,
        repeat: Infinity,
        position: "source_ground"
    },
    BERCEUSE: {
        key: "berceuse",
        frames: [303,304,305,304],
        frameRate: 8,
        repeat: 5,
        position: "source_ground"
    },
    ENCORE: {
        key: "encore",
        frames: [306,307,308,307],
        frameRate: 8,
        repeat: 1,
        position: "source",
        delta: 12
    },
    TONNERRE: {
        key: "tonnerre",
        frames: [309,310,311,312,313,314],
        frameRate: 8,
        position: "source_ground"
    },
    ULTIMAPOING: {
        key: "ultimapoing",
        frames: [315,316,315,316,317],
        frameRate: 8,
        position: "target"
    },
    BROUILLARD: {
        key: "brouillard",
        frames: [318,319,320,321,322,323,324],
        frameRate: 8,
        position: "source_ground"
    },
    BALAYAGE: {
        key: "balayage",
        frames: [325,326,327,328],
        frameRate: 8,
        position: "source",
        delta: 12
    },
    E_COQUE: {
        key: "e_coque",
        frames: [329,330,331,332,333,334,335,336,337,338,339,340,341,341,341,341],
        frameRate: 8,
        position: "source_ground"
    },
    RUGISSEMENT: {
        key: "rugissement",
        frames: [342,343,344,345,346],
        frameRate: 8,
        position: "source",
        delta: 12
    },
    CROCHET_VENIN: {
        key: "crochet_venin",
        frames: [347,348,349,350],
        frameRate: 8,
        position: "target"
    },
    KOUD_KORNE: {
        key: "koud_korne",
        frames: [351,352,353,354],
        frameRate: 8,
        position: "target"
    },
    MAWASHI_GERI: {
        key: "mawashi_geri",
        frames: [355,356,357,358],
        frameRate: 8,
        position: "source",
        delta: 12
    },
    EMPAL_KORNE: {
        key: "empal_korne",
        frames: [359,360,361,362,363,364,365,366,367,367,367],
        frameRate: 8,
        position: "target_ground"
    },
    ABRI: {
        key: "abri",
        frames: [368,369,370,371,372],
        frameRate: 8,
        repeat: 2,
        opacity: 0.3,
        position: "source_ground"
    },
    AMNESIE: {
        key: "amnesie",
        frames: [373,374,375,376,377,378,379,379,379],
        frameRate: 8,
        position: "source_ground",
        delta: -16
    },
    BOMB_OEUF: {
        key: "bomb_oeuf",
        frames: [380,381,382,383,384,385,386],
        frameRate: 8,
        repeat: Infinity,
        scale: 0.5,
        position: "parabolic_to_target"
    },
    ULTRALASER_START: {
        key: "ultralaser_start",
        frames: [387,388],
        frameRate: 8,
        repeat: 2
    },
    ULTRALASER_BEAM: {
        key: "ultralaser_beam",
        frames: [389,390],
        frameRate: 8,
        repeat: 2
    },
    LASER_GLACE_START: {
        key: "laser_glace_start",
        frames: [391,392],
        frameRate: 8,
        repeat: 2
    },
    LASER_GLACE_BEAM: {
        key: "laser_glace_beam",
        frames: [393,394],
        frameRate: 8,
        repeat: 2
    },
    JACKPOT_WIN: {
        key: "jackpot_win",
        frames: [395,396],
        frameRate: 8,
        repeat: 2
    },
    JACKPOT_LOSE: {
        key: "jackpot_lose",
        frames: [397,398],
        frameRate: 8,
        repeat: 2
    },
    JACKPOT_START: {
        key: "jackpot_start",
        frames: [399],
        frameRate: 2,
        position: "target_to_source"
    },
    BOMB_OEUF_HIT: {
        key: "bomb_oeuf_hit",
        frames: [400,401,402,403,404,405,406,407],
        frameRate: 8
    },
    GROBISOU: {
        key: "grobisou",
        frames: [408,409,410,411,409,408],
        frameRate: 8,
        position: "source",
        delta: 16
    },
    METEORES: {
        key: "meteores",
        frames: [412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427],
        frameRate: 8,
        repeat: Infinity
    },
    POUVOIR_LUNAIRE: {
        key: "pouvoir_lunaire",
        frames: [428,429,430,431,432,433,434,435,436],
        frameRate: 8,
        position: "target_ground"
    },
    EVOLUTION: {
        key: "evolution",
        frames: [437,438,439,440,441,442,443,444,445,446,447,448,449,450,451],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_ABOVE_POKEMON,
        position: "source_ground"
    },
    ADAPTATION: {
        key: "adaptation",
        frames: [452,453,454,455,456,457,458,459,460,461,462,463],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON,
        position: "source_ground"
    },
    TUNNEL: {
        key: "tunnel",
        frames: [464,465,466,467,468,469,469,469,468,467,466,465,464],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON,
        position: "source_ground"
    },
    PSYKO: {
        key: "psyko",
        frames: [470,471,472,473],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON,
        position: "source_ground",
        repeat: 6
    },
    DEFLAGRATION: {
        key: "deflagration",
        frames: [474,475,476,477],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON,
        position: "source_ground",
        repeat: 4
    },
    ERUPTION_PENDING: {
        key: "eruption_pending",
        frames: [478,479],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON,
        position: "source_ground",
        repeat: Infinity,
    },
    ERUPTION: {
        key: "eruption",
        frames: [480,481,482,483,484,483,482,481,480],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_BELOW_POKEMON,
        position: "source_ground"
    },
    FATAL_FOUDRE: {
        key: "fatal_foudre",
        frames: [485,486,487],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_ABOVE_POKEMON,
        position: "source_ground",
        repeat: 8
    },
    CONFUSION: {
        key: "confusion",
        frames: [488,489,490,491],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_ABOVE_POKEMON,
        position: "source_ground",        
        repeat: Infinity
    },
    CASCADE: {
        key: "cascade_skill",
        frames: [493,492,493,494,495,496,497,498,499],
        frameRate: 8,
        depth: Z.SKILL_EFFECT_ABOVE_POKEMON,
        position: "target_ground"        
    }
}