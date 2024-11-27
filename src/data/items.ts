export enum ItemType {
	Holdable = 0,
	Usable = 1,
	Trade = 2,
}

export interface Item {
	type: ItemType;
	ref: string;
	cost?: number;
}

export const ITEM_POKEBALL: Item = {
	ref: "pokeball",
	type: ItemType.Trade,
};

export const BAIE_SITRUS: Item = {
	ref: "baie_sitrus",
	cost: 1,
	type: ItemType.Holdable,
};

export const BAIE_CERIZ: Item = {
	ref: "baie_ceriz",
	cost: 1,
	type: ItemType.Holdable,
};

export const BAIE_ORAN: Item = {
	ref: "baie_oran",
	cost: 1,
	type: ItemType.Holdable,
};

export const BAIE_MEPO: Item = {
	ref: "baie_mepo",
	cost: 1,
	type: ItemType.Holdable,
};

export const ATTAQUE_PLUS: Item = {
	ref: "attaque+",
	cost: 2,
	type: ItemType.Holdable,
};

export const DEFENSE_PLUS: Item = {
	ref: "defense+",
	cost: 2,
	type: ItemType.Holdable,
};

export const VITESSE_PLUS: Item = {
	ref: "vitesse+",
	cost: 2,
	type: ItemType.Holdable,
};

export const PV_PLUS: Item = {
	ref: "pv+",
	cost: 2,
	type: ItemType.Holdable,
};

export const POKEFLUTE: Item = {
	ref: "pokeflute",
	cost: 2,
	type: ItemType.Holdable,
};

export const REPOUSSE: Item = {
	ref: "repousse",
	cost: 2,
	type: ItemType.Usable,
};

export const GEMME_DRACO: Item = {
	ref: "gemme_draco",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_HYDRO: Item = {
	ref: "gemme_hydro",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_FLAMME: Item = {
	ref: "gemme_flamme",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_HERBE: Item = {
	ref: "gemme_herbe",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_VOLT: Item = {
	ref: "gemme_volt",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_TERRE: Item = {
	ref: "gemme_terre",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_INSECTE: Item = {
	ref: "gemme_insecte",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_PIXIE: Item = {
	ref: "gemme_pixie",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_CIEL: Item = {
	ref: "gemme_ciel",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_POING: Item = {
	ref: "gemme_poing",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_GLACE: Item = {
	ref: "gemme_glace",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_PSY: Item = {
	ref: "gemme_psy",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_TOXIC: Item = {
	ref: "gemme_toxic",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_ROC: Item = {
	ref: "gemme_roc",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_OMBRE: Item = {
	ref: "gemme_ombre",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMME_GRISE: Item = {
	ref: "gemme_grise",
	cost: 3,
	type: ItemType.Holdable,
};

export const GEMMES: Item[] = [
	GEMME_CIEL,
	GEMME_DRACO,
	GEMME_FLAMME,
	GEMME_GLACE,
	GEMME_GRISE,
	GEMME_HERBE,
	GEMME_HYDRO,
	GEMME_INSECTE,
	GEMME_OMBRE,
	GEMME_PIXIE,
	GEMME_POING,
	GEMME_PSY,
	GEMME_ROC,
	GEMME_TERRE,
	GEMME_TOXIC,
	GEMME_VOLT,
];

export const GRELOT_COQUE: Item = {
	ref: "grelot_coque",
	cost: 4,
	type: ItemType.Holdable,
};

export const BOULE_FUMEE: Item = {
	ref: "boule_fumee",
	cost: 4,
	type: ItemType.Holdable,
};

export const MULTI_EXP: Item = {
	ref: "multi_exp",
	cost: 4,
	type: ItemType.Holdable,
};

export const MAX_ELIXIR: Item = {
	ref: "max_elixir",
	cost: 4,
	type: ItemType.Holdable,
};

export const ENCENS_FLEUR: Item = {
	ref: "encens_fleur",
	cost: 5,
	type: ItemType.Holdable,
};

export const ORBE_TOXIQUE: Item = {
	ref: "orbe_toxique",
	cost: 5,
	type: ItemType.Holdable,
};

export const ORBE_FLAMME: Item = {
	ref: "orbe_flamme",
	cost: 5,
	type: ItemType.Holdable,
};

export const ORBE_FOUDRE: Item = {
	ref: "orbe_foudre",
	cost: 5,
	type: ItemType.Holdable,
};

export const SUPER_BONBON: Item = {
	ref: "super_bonbon",
	cost: 5,
	type: ItemType.Holdable,
};

export const FOSSILE_AMONITA: Item = {
	ref: "fossile_amonita",
	type: ItemType.Trade,
};

export const FOSSILE_KABUTO: Item = {
	ref: "fossile_kabuto",
	type: ItemType.Trade,
};

export const FOSSILE_PTERA: Item = {
	ref: "fossile_ptera",
	type: ItemType.Trade,
};

export const FOSSILES = [FOSSILE_AMONITA, FOSSILE_KABUTO, FOSSILE_PTERA];

export const ITEM_FILET: Item = {
	ref: "filet",
	type: ItemType.Holdable,
};

export const ITEM_PARAPLUIE: Item = {
	ref: "parapluie",
	type: ItemType.Holdable,
};

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
	[ORBE_TOXIQUE.ref]: ORBE_TOXIQUE,
	[ORBE_FOUDRE.ref]: ORBE_FOUDRE,
	[SUPER_BONBON.ref]: SUPER_BONBON,
	[FOSSILE_AMONITA.ref]: FOSSILE_AMONITA,
	[FOSSILE_KABUTO.ref]: FOSSILE_KABUTO,
	[FOSSILE_PTERA.ref]: FOSSILE_PTERA,
	[ITEM_PARAPLUIE.ref]: ITEM_PARAPLUIE,
	[ITEM_FILET.ref]: ITEM_FILET,
};

export const ITEMS_LIST: Item[] = Object.values(ITEMS);

export const ITEMS_SPRITES_INDEX = [
	ITEM_POKEBALL,
	BAIE_CERIZ,
	BAIE_MEPO,
	BAIE_ORAN,
	BAIE_SITRUS,
	PV_PLUS,
	VITESSE_PLUS,
	ATTAQUE_PLUS,
	DEFENSE_PLUS,
	REPOUSSE,
	POKEFLUTE,
	GEMME_DRACO,
	GEMME_POING,
	GEMME_CIEL,
	GEMME_VOLT,
	GEMME_HERBE,
	GEMME_HYDRO,
	GEMME_FLAMME,
	GEMME_TOXIC,
	GEMME_PSY,
	GEMME_INSECTE,
	GEMME_ROC,
	GEMME_OMBRE,
	GEMME_GLACE,
	GEMME_GRISE,
	GEMME_PIXIE,
	GEMME_TERRE,
	GRELOT_COQUE,
	BOULE_FUMEE,
	MULTI_EXP,
	MAX_ELIXIR,
	SUPER_BONBON,
	FOSSILE_AMONITA,
	FOSSILE_KABUTO,
	FOSSILE_PTERA,
	ENCENS_FLEUR,
	ORBE_TOXIQUE,
	ORBE_FLAMME,
	ORBE_FOUDRE,
	ITEM_FILET,
	ITEM_PARAPLUIE,
];
