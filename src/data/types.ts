export interface PokemonType {
    ref: string;
    label: string;
    frameIndex: number;
}

export const TYPE_COMBAT: PokemonType = {
    ref: "COMBAT",
    label: "Combat",
    frameIndex: 4
}

export const TYPE_DRAGON: PokemonType = {
    ref: "DRAGON",
    label: "Dragon",
    frameIndex: 2
}

export const TYPE_EAU: PokemonType = {
    ref: "EAU",
    label: "Eau",
    frameIndex: 15
}

export const TYPE_ELECTRIQUE: PokemonType = {
    ref: "ELECTRIQUE",
    label: "Electrique",
    frameIndex: 1
}

export const TYPE_FEE: PokemonType = {
    ref: "FEE",
    label: "Fée",
    frameIndex: 3
}

export const TYPE_FEU: PokemonType = {
    ref: "FEU",
    label: "Feu",
    frameIndex: 5
}

export const TYPE_GLACE: PokemonType = {
    ref: "GLACE",
    label: "Glace",
    frameIndex: 10
}

export const TYPE_INSECTE: PokemonType = {
    ref: "INSECTE",
    label: "Insecte",
    frameIndex: 0
}

export const TYPE_NORMAL: PokemonType = {
    ref: "NORMAL",
    label: "Normal",
    frameIndex: 11
}

export const TYPE_PLANTE: PokemonType = {
    ref: "PLANTE",
    label: "Plante",
    frameIndex: 8
}

export const TYPE_POISON: PokemonType = {
    ref: "POISON",
    label: "Poison",
    frameIndex: 12
}

export const TYPE_PSY: PokemonType = {
    ref: "PSY",
    label: "Psy",
    frameIndex: 13
}

export const TYPE_ROCHE: PokemonType = {
    ref: "ROCHE",
    label: "Roche",
    frameIndex: 14
}

export const TYPE_SOL: PokemonType = {
    ref: "SOL",
    label: "Sol",
    frameIndex: 9
}

export const TYPE_SPECTRE: PokemonType = {
    ref: "SPECTRE",
    label: "Spectre",
    frameIndex: 7
}


export const TYPE_VOL: PokemonType = {
    ref: "VOL",
    label: "Vol",
    frameIndex: 6
}

export const POKEMON_TYPES = {
    [TYPE_COMBAT.ref]: TYPE_COMBAT,
    [TYPE_DRAGON.ref]: TYPE_DRAGON,
    [TYPE_EAU.ref]: TYPE_EAU,
    [TYPE_ELECTRIQUE.ref]: TYPE_ELECTRIQUE,
    [TYPE_FEE.ref]: TYPE_FEE,
    [TYPE_FEU.ref]: TYPE_FEU,
    [TYPE_GLACE.ref]: TYPE_GLACE,
    [TYPE_INSECTE.ref]: TYPE_INSECTE,
    [TYPE_NORMAL.ref]: TYPE_NORMAL,
    [TYPE_PLANTE.ref]: TYPE_PLANTE,
    [TYPE_POISON.ref]: TYPE_POISON,
    [TYPE_PSY.ref]: TYPE_PSY,
    [TYPE_ROCHE.ref]: TYPE_ROCHE,
    [TYPE_SOL.ref]: TYPE_SOL,
    [TYPE_SPECTRE.ref]: TYPE_SPECTRE,
    [TYPE_VOL.ref]: TYPE_VOL
}