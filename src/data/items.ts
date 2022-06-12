export interface Item {
    ref: string;
    label: string;
    desc: string;
    cost?: number;
}

export const ITEM_POKEBALL: Item = {
    ref: "pokeball",
    label: "Pokéball",
    desc: "L'outil de capture de tout dresseur et monnaie d'échange dans les magasins"
}

export const BAIE_SITRUS: Item = {
    ref: "baie_sitrus",
    label: "Baie Sitrus",
    desc: "Soigne 25% des PV max quand les PV tombent sous les 50% la première fois",
    cost: 1
}

export const BAIE_CERIZ: Item = {
    ref: "baie_ceriz",
    label: "Baie Ceriz",
    desc: "Soigne la première altération subie par le porteur",
    cost: 1
}

export const BAIE_ORAN: Item = {
    ref: "baie_oran",
    label: "Baie Oran",
    desc: "Augmente la Def de 30% quand les PV sont sous les 30%",
    cost: 1
}

export const BAIE_MEPO: Item = {
    ref: "baie_mepo",
    label: "Baie Mepo",
    desc: "Démarre le combat avec 20 PP supplémentaires",
    cost: 1
}

export const ATTAQUE_PLUS: Item = {
    ref: "attaque+",
    label: "Attaque+",
    desc: "+20% Attaque",
    cost: 2
}

export const DEFENSE_PLUS: Item = {
    ref: "defense+",
    label: "Défense+",
    desc: "+20% Défense",
    cost: 2
}

export const VITESSE_PLUS: Item = {
    ref: "vitesse+",
    label: "Vitesse+",
    desc: "+20% Vitesse",
    cost: 2
}

export const PV_PLUS: Item = {
    ref: "pv+",
    label: "PV Plus",
    desc: "+20% PV",
    cost: 2
}

export const POKEFLUTE: Item = {
    ref: "pokeflute",
    label: "Pokéflute",
    desc: "Réveille les Pokémon les plus profondément endormis",
    cost: 2
}

export const REPOUSSE: Item = {
    ref: "repousse",
    label: "Repousse",
    desc: "Fait fuir et ramener de nouveaux Pokémon sauvages",
    cost: 2
}

export const GEMME_DRACO: Item = {
    ref: "gemme_draco",
    label: "Gemme Draco",
    desc: "Donne le type Dragon au porteur",
    cost: 3
}

export const GEMME_HYDRO: Item = {
    ref: "gemme_hydro",
    label: "Gemme Hydro",
    desc: "Donne le type Eau au porteur",
    cost: 3
}

export const GEMME_FLAMME: Item = {
    ref: "gemme_flamme",
    label: "Gemme Flamme",
    desc: "Donne le type Feu au porteur",
    cost: 3
}

export const GEMME_HERBE: Item = {
    ref: "gemme_herbe",
    label: "Gemme Herbe",
    desc: "Donne le type Plante au porteur",
    cost: 3
}

export const GEMME_VOLT: Item = {
    ref: "gemme_volt",
    label: "Gemme Volt",
    desc: "Donne le type Électrique au porteur",
    cost: 3
}

export const GEMME_TERRE: Item = {
    ref: "gemme_terre",
    label: "Gemme Terre",
    desc: "Donne le type Sol au porteur",
    cost: 3
}

export const GEMME_INSECTE: Item = {
    ref: "gemme_insecte",
    label: "Gemme Insecte",
    desc: "Donne le type Insecte au porteur",
    cost: 3
}

export const GEMME_PIXIE: Item = {
    ref: "gemme_pixie",
    label: "Gemme Pixie",
    desc: "Donne le type Fée au porteur",
    cost: 3
}

export const GEMME_CIEL: Item = {
    ref: "gemme_ciel",
    label: "Gemme Ciel",
    desc: "Donne le type Vol au porteur",
    cost: 3
}

export const GEMME_POING: Item = {
    ref: "gemme_poing",
    label: "Gemme Poing",
    desc: "Donne le type Combat au porteur",
    cost: 3
}

export const GEMME_GLACE: Item = {
    ref: "gemme_glace",
    label: "Gemme Glace",
    desc: "Donne le type Glace au porteur",
    cost: 3
}

export const GEMME_PSY: Item = {
    ref: "gemme_psy",
    label: "Gemme Psy",
    desc: "Donne le type Psy au porteur",
    cost: 3
}

export const GEMME_TOXIC: Item = {
    ref: "gemme_toxic",
    label: "Gemme Toxic",
    desc: "Donne le type Poison au porteur",
    cost: 3
}

export const GEMME_ROC: Item = {
    ref: "gemme_roc",
    label: "Gemme Roc",
    desc: "Donne le type Roche au porteur",
    cost: 3
}

export const GEMME_OMBRE: Item = {
    ref: "gemme_ombre",
    label: "Gemme Ombre",
    desc: "Donne le type Spectre au porteur",
    cost: 3
}

export const GEMME_GRISE: Item = {
    ref: "gemme_grise",
    label: "Gemme Grise",
    desc: "Donne le type Normal au porteur",
    cost: 3
}

export const GRELOT_COQUE: Item = {
    ref: "grelot_coque",
    label: "Grelot Coque",
    desc: "Restaure 20% des dégâts infligés en PV",
    cost: 4
}

export const BOULE_FUMEE: Item = {
    ref: "boule_fumee",
    label: "Boule Fumée",
    desc: "Rend le Pokémon impossible à cibler pendant 3s quand les PV tombent sous les 30%",
    cost: 4
}

export const MULTI_EXP: Item = {
    ref: "multi_exp",
    label: "Multi Exp",
    desc: "Augmente les gains d'expérience de 30%",
    cost: 4
}

export const MAX_ELIXIR: Item = {
    ref: "max_elixir",
    label: "Max Elixir",
    desc: "Gagne 5PP à chaque attaque",
    cost: 4
}

export const ENCENS_FLEUR: Item = {
    ref: "encens_fleur",
    label: "Encens Fleur",
    desc: "Soigne 3% des PV par seconde du porteur et des alliés sur une case adjacente",
    cost: 5
}

export const ORBE_TOXIQUE: Item = {
    ref: "orbe_toxique",
    label: "Orbe Toxique",
    desc: "Inflige l'altération Poison au porteur et aux ennemis des cases adjacentes",
    cost: 5
}

export const ORBE_FLAMME: Item = {
    ref: "orbe_flamme",
    label: "Orbe Flamme",
    desc: "Inflige l'altération Brûlure au porteur et aux ennemis des cases adjacentes",
    cost: 5
}

export const ORBE_GLACE: Item = {
    ref: "orbe_glace",
    label: "Orbe Glace",
    desc: "Inflige l'altération Glace au porteur et aux ennemis des cases adjacentes",
    cost: 5
}

export const SUPER_BONBON: Item = {
    ref: "super_bonbon",
    label: "Super Bonbon",
    desc: "Gagne un niveau supplémentaire à chaque fin de combat"
}

export const FOSSILE_AMONITA: Item = {
    ref: "fossile_amonita",
    label: "Nautile",
    desc: "Un fossile de Pokémon antique en forme d'escargot"
}

export const FOSSILE_KABUTO: Item = {
    ref: "fossile_kabuto",
    label: "Fossile Dôme",
    desc: "Un fossile de Pokémon antique en forme de carapace"
}

export const FOSSILE_PTERA: Item = {
    ref: "fossile_ptera",
    label: "Vieil Ambre",
    desc: "Un fossile de Pokémon antique en forme d'oeuf"
}

export const FOSSILES = [FOSSILE_AMONITA, FOSSILE_KABUTO, FOSSILE_PTERA]

export const ITEM_FILET: Item = {
    ref: "filet",
    label: "Filet d'Hector",
    desc: "Récupère une Pokéball par Pokémon éliminé par son porteur"
}

export const ITEM_PARAPLUIE: Item = {
    ref: "parapluie",
    label: "Parapluie de Sally",
    desc: "Protège le porteur de toutes les altérations"
}

export const ITEMS: { [ref: string]: Item } = {
    [ITEM_POKEBALL.ref]: ITEM_POKEBALL,
    [BAIE_CERIZ.ref]: BAIE_CERIZ,
    [BAIE_ORAN.ref]: BAIE_ORAN,
    [BAIE_MEPO.ref]: BAIE_MEPO,
    [BAIE_SITRUS.ref]: BAIE_SITRUS,
    [ATTAQUE_PLUS.ref]: ATTAQUE_PLUS,
    [DEFENSE_PLUS.ref]: DEFENSE_PLUS,
    [VITESSE_PLUS.ref]: VITESSE_PLUS,
    [PV_PLUS.ref]: PV_PLUS,
    [POKEFLUTE.ref]: POKEFLUTE,
    [REPOUSSE.ref]: REPOUSSE,
    [GEMME_CIEL.ref]: GEMME_CIEL,
    [GEMME_DRACO.ref]: GEMME_DRACO,
    [GEMME_FLAMME.ref]: GEMME_FLAMME,
    [GEMME_ROC.ref]: GEMME_ROC,
    [GEMME_GLACE.ref]: GEMME_GLACE,
    [GEMME_HERBE.ref]: GEMME_HERBE,
    [GEMME_HYDRO.ref]: GEMME_HYDRO,
    [GEMME_INSECTE.ref]: GEMME_INSECTE,
    [GEMME_OMBRE.ref]: GEMME_OMBRE,
    [GEMME_PIXIE.ref]: GEMME_PIXIE,
    [GEMME_POING.ref]: GEMME_POING,
    [GEMME_PSY.ref]: GEMME_PSY,
    [GEMME_TERRE.ref]: GEMME_TERRE,
    [GEMME_TOXIC.ref]: GEMME_TOXIC,
    [GEMME_VOLT.ref]: GEMME_VOLT,
    [GEMME_GRISE.ref]: GEMME_GRISE,
    [GRELOT_COQUE.ref]: GRELOT_COQUE,
    [BOULE_FUMEE.ref]: BOULE_FUMEE,
    [MULTI_EXP.ref]: MULTI_EXP,
    [MAX_ELIXIR.ref]: MAX_ELIXIR,
    [ENCENS_FLEUR.ref]: ENCENS_FLEUR,
    [ORBE_FLAMME.ref]: ORBE_FLAMME,
    [ORBE_TOXIQUE.ref]:ORBE_TOXIQUE,
    [ORBE_GLACE.ref]: ORBE_GLACE,
    [SUPER_BONBON.ref]: SUPER_BONBON,
    [FOSSILE_AMONITA.ref]: FOSSILE_AMONITA,
    [FOSSILE_KABUTO.ref]: FOSSILE_KABUTO,
    [FOSSILE_PTERA.ref]: FOSSILE_PTERA,
    [ITEM_PARAPLUIE.ref]: ITEM_PARAPLUIE,
    [ITEM_FILET.ref]: ITEM_FILET
}

export const ITEMS_LIST: Item[] = Object.values(ITEMS)

export const ITEMS_SPRITES_INDEX = [
    ITEM_POKEBALL, BAIE_CERIZ, BAIE_MEPO, BAIE_ORAN, BAIE_SITRUS, PV_PLUS, VITESSE_PLUS, ATTAQUE_PLUS, DEFENSE_PLUS, REPOUSSE, POKEFLUTE, GEMME_DRACO,
    GEMME_POING, GEMME_CIEL, GEMME_VOLT, GEMME_HERBE, GEMME_HYDRO, GEMME_FLAMME, GEMME_TOXIC, GEMME_PSY, GEMME_INSECTE, GEMME_ROC, GEMME_OMBRE, GEMME_GLACE,
    GEMME_GRISE, GEMME_PIXIE, GEMME_TERRE, GRELOT_COQUE, BOULE_FUMEE, MULTI_EXP, MAX_ELIXIR, SUPER_BONBON, FOSSILE_AMONITA, FOSSILE_KABUTO, FOSSILE_PTERA, ENCENS_FLEUR,
    ORBE_TOXIQUE, ORBE_FLAMME, ORBE_GLACE
]