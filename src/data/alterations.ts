export enum AlterationType {    
    POISON = "POISON", // perd 2% de ses HP par seconde par stack
    BRULURE = "BRULURE", // perd 0.1HP par seconde par level, réduit les soins reçus de 50%
    GEL = "GEL", // empêche la cible d’attaquer et bouger si au-dessus de 50 stacks
    PARALYSIE = "PARALYSIE", // réduit la vitesse de 1% par stack, jusqu’à max 50%
    PEUR = "PEUR", // empêche la cible d’attaquer et bouger
    SOMMEIL = "SOMMEIL", // incapable d’attaquer pendant 1 frame par stack
    CONFUSION = "CONFUSION", // oblige le pokémon à changer de cible, et peut cibler un pokémon de sa propre équipe,
    SECRETION = "SECRETION", // divise par 2 la vitesse ennemie,
    LIGOTAGE = "LIGOTAGE", // empêche la cible de se déplacer
    TOURBILLON = "TOURBILLON", // envoie le pokémon dans les airs,
    SOIN = "SOIN", // restaure les HP à un rythme de 1HP par seconde (vampirisme),
    REPOS = "REPOS", // restaure les HP à un rythme de 5% max HP par seconde, à condition que le lanceur soit endormi
    POUVOIR_ANTIQUE = "POUVOIR_ANTIQUE", // augmente l'attaque, défense et vitesse de 10% par stack
    ACIDE = "ACIDE", // divise par 2 la défense ennemie
    AVEUGLE = "AVEUGLE", // réduit de 50% la précision de l'ennemi
    EXECUTION = "EXECUTION" // met KO l'unité si moins de 30% de ses PV max
}

export interface Alteration {
    type: AlterationType
    stacks: number
    keepStacks?: boolean
    effectSprite?: Phaser.GameObjects.Sprite
    effectDelta?: number
}