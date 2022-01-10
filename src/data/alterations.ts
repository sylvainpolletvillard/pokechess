export enum AlterationType {
    MAELSTROM = "MAELSTROM", // envoie le pokémon dans les airs
    POISON = "POISON", // perd 2% de ses HP par seconde par stack
    BRULURE = "BRULURE", // perd 10HP par seconde par stack, réduit les soins reçus de 50%
    GEL = "GEL", // réduit la vitesse de 1% par stack, max 70%
    CHOC = "CHOC", // réduit la défense de 1% par stack, max 70%
    PEUR = "PEUR", // oblige le pokémon à changer de cible, et réduit l’attaque de 20% par stack
    SOMMEIL = "SOMMEIL", // incapable d’attaquer pendant 1 frame par stack
    CONFUSION = "CONFUSION", // oblige le pokémon à changer de cible, et peut cibler un pokémon de sa propre équipe,
    SECRETION = "SECRETION" // divise par 2 la vitesse ennemie
}

export interface Alteration {
    type: AlterationType
    stacks: number;
    effectSprite?: Phaser.GameObjects.Sprite
}