import { PokemonType, PokemonTypeRef, TYPE_COMBAT, TYPE_DRAGON, TYPE_EAU, TYPE_ELECTRIQUE, TYPE_FEE, TYPE_FEU, TYPE_GLACE, TYPE_INSECTE, TYPE_NORMAL, TYPE_PLANTE, TYPE_POISON, TYPE_PSY, TYPE_ROCHE, TYPE_SOL, TYPE_SPECTRE, TYPE_VOL } from "./types";

export type AllianceBonus = {
    description: string;
    steps: AllianceBonusStep[]
}

export type AllianceBonusStep = {
    numberRequired: number;
    ref: string;
    description: string;
}

export type AllianceState = {
    ref?: string;
    type: PokemonType;    
    stepReached: number;
    numberOfThatTypeInTeam: number;
}

const BONUS_ALLIANCE_COMBAT: AllianceBonus =  {
    description: "Les Pokémon Combat voient leur attaque et défense augmenter en fonction du nombre d'adversaires les ciblant.",
    steps: [
        { numberRequired: 2, ref: "COMBAT2", description: "+2 attaque et défense par adversaire" },
        { numberRequired: 4, ref: "COMBAT4", description: "+5 attaque et défense par adversaire" },
        { numberRequired: 6, ref: "COMBAT6", description: "+10 attaque et défense par adversaire" }
    ]
}

const BONUS_ALLIANCE_DRAGON: AllianceBonus =  {
    description: "Quand un Pokémon Dragon est le dernier Pokémon de l'équipe sur le plateau, il gagne de gros bonus à toutes ses statistiques.",
    steps: [
        { numberRequired: 1, ref: "DRAGON1", description: "+10% de HP ; +20% aux stats du dernier dragon" },
        { numberRequired: 2, ref: "DRAGON2", description: "+20% de HP ; +40% aux stats du dernier dragon" },
        { numberRequired: 3, ref: "DRAGON3", description: "+30% de HP ; +50% aux stats du dernier dragon" }
    ]
}

const BONUS_ALLIANCE_EAU: AllianceBonus =  {    
    description: "Les Pokémons Eau sont insensibles aux Brûlures. Les compétences Eau peuvent repousser la cible d'une ou plusieurs cases.",
    steps: [
        { numberRequired: 2, ref: "EAU2", description: "Repousse d'une case la cible" },
        { numberRequired: 4, ref: "EAU4", description: "Repousse de 2 cases la cible" },
        { numberRequired: 6, ref: "EAU6", description: "Repousse de 3 cases la cible" }
    ]
}

const BONUS_ALLIANCE_ELECTRIQUE: AllianceBonus =  {
    description: "Les Pokémons Electrique gagnent en Vitesse. Ils infligent des dégats électriques de choc à chaque coup reçu.",
    steps: [
        { numberRequired: 2, ref: "ELEC2", description: "+20% Vitesse ; 5 dégats de choc par coup reçu" },
        { numberRequired: 4, ref: "ELEC4", description: "+40% Vitesse ; 10 dégats de choc par coup reçu" },
        { numberRequired: 6, ref: "ELEC6", description: "+60% Vitesse ; 20 dégats de choc par coup reçu" }
    ]
}

const BONUS_ALLIANCE_FEE: AllianceBonus =  {
    description: "Les Pokémons Fée font gagner progressivement des PP à toute votre équipe.",
    steps: [
        { numberRequired: 1, ref: "FEE1", description: "+1 PP par seconde" },
        { numberRequired: 2, ref: "FEE2", description: "+2 PP par seconde" },
        { numberRequired: 3, ref: "FEE3", description: "+3 PP par seconde" }
    ]
}

const BONUS_ALLIANCE_FEU: AllianceBonus =  {
    description: "Les Pokémons Feu sont insensibles au Gel. Leurs attaques appliquent une brûlure qui inflige des dégâts sur la durée et réduit de 50% l'efficacité des soins.",
    steps: [
        { numberRequired: 2, ref: "FEU2", description: "2 brûlures par attaque" },
        { numberRequired: 4, ref: "FEU4", description: "3 brûlures par attaque" },
        { numberRequired: 6, ref: "FEU6", description: "4 brûlures par attaque" }
    ]
}

const BONUS_ALLIANCE_GLACE: AllianceBonus =  {
    description: "Les Pokémons Glace sont entourés d'une aura de gel qui ralentit les adversaires au contact.",
    steps: [
        { numberRequired: 2, ref: "GLACE2", description: "-20% de vitesse aux adversaires adjacents" },
        { numberRequired: 3, ref: "GLACE3", description: "-30% de vitesse aux adversaires adjacents" },
        { numberRequired: 4, ref: "GLACE4", description: "-40% de vitesse aux adversaires adjacents" }
    ]
}

const BONUS_ALLIANCE_INSECTE: AllianceBonus =  {
    description: "Les Pokémons Insecte grandissent et évoluent plus rapidement. Ils gagnent un bonus d'expérience à chaque combat.",
    steps: [
        { numberRequired: 2, ref: "INSECTE2", description: "+5% XP ; +20% XP si Insecte" },
        { numberRequired: 4, ref: "INSECTE4", description: "+10% XP ; +40% XP si Insecte" },
        { numberRequired: 6, ref: "INSECTE6", description: "+20% XP ; +50% XP si Insecte" }
    ]
}

const BONUS_ALLIANCE_NORMAL: AllianceBonus =  {
    description: "Les Pokémons normaux réduisent les pénalités de dégâts reçus liés aux faiblesses de types.",
    steps: [
        { numberRequired: 2, ref: "NORMAL2", description: "-30% de dégâts de faiblesse reçus" },
        { numberRequired: 4, ref: "NORMAL4", description: "-50% de dégâts de faiblesse reçus" },
        { numberRequired: 6, ref: "NORMAL6", description: "-80% de dégâts de faiblesse reçus" }
    ]
}

const BONUS_ALLIANCE_PLANTE: AllianceBonus =  {
    description: "Les Pokémons Plante ne peuvent pas être repoussés par les compétences adverses et se regénèrent naturellement.",
    steps: [
        { numberRequired: 2, ref: "PLANTE2", description: "Regen 2% des HP max par seconde" },
        { numberRequired: 4, ref: "PLANTE4", description: "Regen 4% des HP max par seconde" },
        { numberRequired: 6, ref: "PLANTE6", description: "Regen 6% des HP max par seconde" }
    ]
}

const BONUS_ALLIANCE_POISON: AllianceBonus =  {
    description: "Les Pokémons Poison empoisonnent leurs cibles, infligeant des dégâts sur la durée proportionnels à leurs PV max.",
    steps: [
        { numberRequired: 2, ref: "POISON2", description: "Dégâts de poison reçus -50%" },
        { numberRequired: 4, ref: "POISON4", description: "Dégâts de poison infligés +50%" },
        { numberRequired: 6, ref: "POISON6", description: "Dégâts de poison infligés +100%" }
    ]
}

const BONUS_ALLIANCE_PSY: AllianceBonus =  {
    description: "Les Pokémons Psy sont insensibles à la Confusion, et leurs attaques font perdre des PP à leur cible.",
    steps: [
        { numberRequired: 2, ref: "PSY2", description: "La cible perd 2PP par attaque" },
        { numberRequired: 4, ref: "PSY4", description: "La cible perd 4PP par attaque" },
        { numberRequired: 6, ref: "PSY6", description: "La cible perd 6PP par attaque" }
    ]
}

const BONUS_ALLIANCE_ROCHE: AllianceBonus =  {
    description: "Les Pokémons Roche ont une grosse défense, et peuvent devenir insensibles à certains types de dégâts.",
    steps: [
        { numberRequired: 2, ref: "ROCHE2", description: "Insensible au poison" },
        { numberRequired: 4, ref: "ROCHE4", description: "Insensible aux dégâts de choc" },
        { numberRequired: 6, ref: "ROCHE6", description: "Insensible aux brûlures" }
    ]
}

const BONUS_ALLIANCE_SOL: AllianceBonus =  {
    description: "Les Pokémons Sol creusent un tunnel pour se protéger temporairement lorsqu'ils tombent sous un certain seuil de PV.",
    steps: [
        { numberRequired: 2, ref: "SOL2", description: "Tunnel à 20% des PV" },
        { numberRequired: 4, ref: "SOL4", description: "Tunnel à 20% et 50% des PV" },
        { numberRequired: 6, ref: "SOL6", description: "Tunnel à 20%, 50% et 80% des PV" }
    ]
}

const BONUS_ALLIANCE_SPECTRE: AllianceBonus =  {
    description: "Les Pokémons Spectre sont insensibles aux attaques de type Normal et à l'altération Sommeil. Leurs attaques effrayent leur cible, réduisant leur attaque temporairement.",
    steps: [
        { numberRequired: 2, ref: "SPECTRE2", description: "2 stacks de Peur par attaque" },
        { numberRequired: 4, ref: "SPECTRE4", description: "4 stacks de Peur par attaque" },
        { numberRequired: 6, ref: "SPECTRE6", description: "6 stacks de Peur par attaque" }
    ]
}

const BONUS_ALLIANCE_VOL: AllianceBonus =  {
    description: "Les Pokémon Vol s'envolent à l'opposé du plateau au début du combat, et peuvent esquiver les attaques reçues.",
    steps: [
        { numberRequired: 2, ref: "VOL2", description: "20% de chances d'esquive" },
        { numberRequired: 4, ref: "VOL4", description: "40% de chances d'esquive" },
        { numberRequired: 6, ref: "VOL6", description: "60% de chances d'esquive" },
    ]
}

export const ALLIANCES: { [type: PokemonTypeRef]: AllianceBonus } = {
    [TYPE_COMBAT.ref]: BONUS_ALLIANCE_COMBAT,
    [TYPE_DRAGON.ref]: BONUS_ALLIANCE_DRAGON,
    [TYPE_EAU.ref]: BONUS_ALLIANCE_EAU,
    [TYPE_ELECTRIQUE.ref]: BONUS_ALLIANCE_ELECTRIQUE,
    [TYPE_FEE.ref]: BONUS_ALLIANCE_FEE,
    [TYPE_FEU.ref]: BONUS_ALLIANCE_FEU,
    [TYPE_GLACE.ref]: BONUS_ALLIANCE_GLACE,
    [TYPE_INSECTE.ref]: BONUS_ALLIANCE_INSECTE,
    [TYPE_NORMAL.ref]: BONUS_ALLIANCE_NORMAL,
    [TYPE_PLANTE.ref]: BONUS_ALLIANCE_PLANTE,
    [TYPE_POISON.ref]: BONUS_ALLIANCE_POISON,
    [TYPE_PSY.ref]: BONUS_ALLIANCE_PSY,
    [TYPE_ROCHE.ref]: BONUS_ALLIANCE_ROCHE,
    [TYPE_SOL.ref]: BONUS_ALLIANCE_SOL,
    [TYPE_SPECTRE.ref]: BONUS_ALLIANCE_SPECTRE,
    [TYPE_VOL.ref]: BONUS_ALLIANCE_VOL
}