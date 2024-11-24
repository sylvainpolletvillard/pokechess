import { t } from "../i18n";
import { startMusic } from "../logic/audio";
import { spawnPokemon } from "../logic/board";
import { sendBackToPokeball } from "../logic/fight";
import { GameStage, gameState } from "../logic/gamestate";
import { spawnTutoCaptureTeamStep2 } from "../logic/spawns";
import type GameScene from "../scenes/GameScene";
import type { Trainer } from "../types/trainer";
import { wait } from "../utils/helpers";
import {
	BADGE_AME,
	BADGE_CASCADE,
	BADGE_FOUDRE,
	BADGE_MARAIS,
	BADGE_PRISME,
	BADGE_ROCHE,
	BADGE_TERRE,
	BADGE_VOLCAN,
} from "./badges";
import { receiveItem } from "./dialogs/descriptions";
import { ITEM_FILET, ITEM_PARAPLUIE, ITEM_POKEBALL } from "./items";

export const PIERRE: Trainer = {
	ref: "pierre",
	name: t("trainer.pierre"),
	frameIndex: 8,
	introFrameIndex: 0,
	dialogs: {
		start: [
			t("dialog.pierre.start.0"),
			t("dialog.pierre.start.1"),
			t("dialog.pierre.start.2"),
			t("dialog.pierre.start.3"),
		],
		victory: [
			t("dialog.pierre.victory.0"),
			t("dialog.pierre.victory.1"),
			t("dialog.pierre.victory.2"),
			() => {
				gameState.receiveBadge(BADGE_ROCHE);
				return t("dialog.pierre.victory.3");
			},
			t("dialog.pierre.victory.4"),
		],
		defeat: [t("dialog.pierre.defeat.0"), t("dialog.pierre.defeat.1")],
	},
};

export const ONDINE: Trainer = {
	ref: "ondine",
	name: t("trainer.ondine"),
	frameIndex: 9,
	introFrameIndex: 1,
	dialogs: {
		start: [
			t("dialog.ondine.start.0"),
			t("dialog.ondine.start.1"),
			t("dialog.ondine.start.2"),
			t("dialog.ondine.start.3"),
		],
		victory: [
			t("dialog.ondine.victory.0"),
			t("dialog.ondine.victory.1"),
			() => {
				gameState.receiveBadge(BADGE_CASCADE);
				return t("dialog.ondine.victory.2");
			},
		],
		defeat: [t("dialog.ondine.defeat.0"), t("dialog.ondine.defeat.1")],
	},
};

export const MAJOR_BOB: Trainer = {
	ref: "major_bob",
	name: t("trainer.bob"),
	frameIndex: 10,
	introFrameIndex: 2,
	dialogs: {
		start: [
			t("dialog.bob.start.0"),
			t("dialog.bob.start.1"),
			t("dialog.bob.start.2"),
			t("dialog.bob.start.3"),
			t("dialog.bob.start.4"),
			t("dialog.bob.start.5"),
		],
		victory: [
			t("dialog.bob.victory.0"),
			t("dialog.bob.victory.1"),
			() => {
				gameState.receiveBadge(BADGE_FOUDRE);
				return t("dialog.bob.victory.2");
			},
		],
		defeat: [
			t("dialog.bob.defeat.0"),
			t("dialog.bob.defeat.1"),
			t("dialog.bob.defeat.2"),
		],
	},
};

export const ERIKA: Trainer = {
	ref: "erika",
	name: t("trainer.erika"),
	frameIndex: 11,
	introFrameIndex: 3,
	dialogs: {
		start: [
			t("dialog.erika.start.0"),
			t("dialog.erika.start.1"),
			t("dialog.erika.start.2"),
			t("dialog.erika.start.3"),
			t("dialog.erika.start.4"),
			t("dialog.erika.start.5"),
			t("dialog.erika.start.6"),
			t("dialog.erika.start.7"),
		],
		victory: [
			t("dialog.erika.victory.0"),
			t("dialog.erika.victory.1"),
			() => {
				gameState.receiveBadge(BADGE_PRISME);
				return [t("dialog.erika.victory.2"), t("dialog.erika.victory.3")];
			},
		],
		defeat: [
			t("dialog.erika.defeat.0"),
			t("dialog.erika.defeat.1"),
			t("dialog.erika.defeat.2"),
		],
	},
};

export const KOGA: Trainer = {
	ref: "koga",
	name: t("trainer.koga"),
	frameIndex: 12,
	introFrameIndex: 4,
	dialogs: {
		start: [
			t("dialog.koga.start.0"),
			t("dialog.koga.start.1"),
			t("dialog.koga.start.2"),
			t("dialog.koga.start.3"),
		],
		victory: [
			t("dialog.koga.victory.0"),
			t("dialog.koga.victory.1"),
			() => {
				gameState.receiveBadge(BADGE_AME);
				return [
					t("dialog.koga.victory.2"),
					t("dialog.koga.victory.3"),
					t("dialog.koga.victory.4"),
					t("dialog.koga.victory.5"),
				];
			},
		],
		defeat: [t("dialog.koga.defeat.0"), t("dialog.koga.defeat.1")],
	},
};

export const MORGANE: Trainer = {
	ref: "morgane",
	name: t("trainer.morgane"),
	frameIndex: 13,
	introFrameIndex: 5,
	dialogs: {
		start: [
			t("dialog.morgane.start.0"),
			t("dialog.morgane.start.1"),
			t("dialog.morgane.start.2"),
			t("dialog.morgane.start.3"),
			t("dialog.morgane.start.4"),
		],
		victory: [
			t("dialog.morgane.victory.0"),
			t("dialog.morgane.victory.1"),
			t("dialog.morgane.victory.2"),
			() => {
				gameState.receiveBadge(BADGE_MARAIS);
				return [
					t("dialog.morgane.victory.3"),
					t("dialog.morgane.victory.4"),
					t("dialog.morgane.victory.5"),
				];
			},
		],
		defeat: [t("dialog.morgane.defeat.0")],
	},
};

export const AUGUSTE: Trainer = {
	ref: "auguste",
	name: t("trainer.auguste"),
	frameIndex: 14,
	introFrameIndex: 6,
	dialogs: {
		start: [
			t("dialog.auguste.start.0"),
			t("dialog.auguste.start.1"),
			t("dialog.auguste.start.2"),
			t("dialog.auguste.start.3"),
		],
		victory: [
			t("dialog.auguste.victory.0"),
			t("dialog.auguste.victory.1"),
			() => {
				gameState.receiveBadge(BADGE_VOLCAN);
				return [t("dialog.auguste.victory.2"), t("dialog.auguste.victory.3")];
			},
		],
		defeat: [t("dialog.auguste.defeat.0")],
	},
};

export const GIOVANNI: Trainer = {
	ref: "giovanni",
	name: t("trainer.giovanni"),
	frameIndex: 15,
	introFrameIndex: 7,
	dialogs: {
		start: [
			t("dialog.giovanni.start.0"),
			t("dialog.giovanni.start.1"),
			t("dialog.giovanni.start.2"),
		],
		victory: [
			t("dialog.giovanni.victory.0"),
			t("dialog.giovanni.victory.1"),
			() => {
				gameState.receiveBadge(BADGE_TERRE);
				return [t("dialog.giovanni.victory.2"), t("dialog.giovanni.victory.3")];
			},
			t("dialog.giovanni.victory.4"),
			t("dialog.giovanni.victory.5"),
			t("dialog.giovanni.victory.6"),
			t("dialog.giovanni.victory.7"),
		],
		defeat: [t("dialog.giovanni.defeat.0"), t("dialog.giovanni.defeat.1")],
	},
};

export enum HECTOR_DIALOG_STATE {
	MET = 0,
	BEATEN = 1,
}
export const HECTOR: Trainer = {
	ref: "hector",
	name: t("trainer.hector"),
	frameIndex: 16,
	introFrameIndex: 8,
	dialogs: {
		start: [
			() => {
				gameState.dialogStates.hector = HECTOR_DIALOG_STATE.MET;
				return t("dialog.hector.start.0");
			},
			t("dialog.hector.start.1"),
			t("dialog.hector.start.2"),
			t("dialog.hector.start.3"),
			t("dialog.hector.start.4"),
			t("dialog.hector.start.5"),
		],
		victory: [
			t("dialog.hector.victory.0"),
			t("dialog.hector.victory.1"),
			t("dialog.hector.victory.2"),
			() => {
				gameState.dialogStates.hector = HECTOR_DIALOG_STATE.BEATEN;
				return receiveItem(ITEM_FILET).then(() => t("dialog.hector.victory.3"));
			},
			t("dialog.hector.victory.4"),
			t("dialog.hector.victory.5"),
		],
		defeat: [
			t("dialog.hector.defeat.0"),
			t("dialog.hector.defeat.1"),
			t("dialog.hector.defeat.2"),
		],
	},
};

export enum SALLY_DIALOG_STATE {
	MET = 0,
	BEATEN = 1,
}
export const SALLY: Trainer = {
	ref: "sally",
	name: t("trainer.sally"),
	frameIndex: 17,
	introFrameIndex: 9,
	dialogs: {
		start: [
			() => {
				gameState.dialogStates.sally = SALLY_DIALOG_STATE.MET;
				return t("dialog.sally.start.0");
			},
			t("dialog.sally.start.1"),
			t("dialog.sally.start.2"),
			t("dialog.sally.start.3"),
			t("dialog.sally.start.4"),
			t("dialog.sally.start.5"),
		],
		victory: [
			t("dialog.sally.victory.0"),
			t("dialog.sally.victory.1"),
			t("dialog.sally.victory.2"),
			t("dialog.sally.victory.3"),
			() => {
				gameState.dialogStates.sally = SALLY_DIALOG_STATE.BEATEN;
				return receiveItem(ITEM_PARAPLUIE).then(() =>
					t("dialog.sally.victory.4"),
				);
			},
			t("dialog.sally.victory.5"),
		],
		defeat: [
			t("dialog.sally.defeat.0"),
			t("dialog.sally.defeat.1"),
			t("dialog.sally.defeat.2"),
		],
	},
};

export const CHAMPIONS = [
	PIERRE,
	ONDINE,
	MAJOR_BOB,
	ERIKA,
	KOGA,
	MORGANE,
	GIOVANNI,
	AUGUSTE,
	SALLY,
	HECTOR,
];

export const OLGA: Trainer = {
	ref: "olga",
	name: t("trainer.olga"),
	frameIndex: 45,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.olga.start.0"),
			t("dialog.olga.start.1"),
			t("dialog.olga.start.2"),
			t("dialog.olga.start.3"),
			t("dialog.olga.start.4"),
			t("dialog.olga.start.5"),
		],
		victory: [t("dialog.olga.victory.0"), t("dialog.olga.victory.1")],
		defeat: [t("dialog.olga.defeat.0")],
	},
};

export const ALDO: Trainer = {
	ref: "aldo",
	name: t("trainer.aldo"),
	frameIndex: 46,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.aldo.start.0"),
			t("dialog.aldo.start.1"),
			t("dialog.aldo.start.2"),
			t("dialog.aldo.start.3"),
			t("dialog.aldo.start.4"),
		],
		victory: [t("dialog.aldo.victory.0")],
		defeat: [t("dialog.aldo.defeat.0")],
	},
};

export const AGATHA: Trainer = {
	ref: "agatha",
	name: t("trainer.agatha"),
	frameIndex: 47,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.agatha.start.0"),
			t("dialog.agatha.start.1"),
			t("dialog.agatha.start.2"),
			t("dialog.agatha.start.3"),
			t("dialog.agatha.start.4"),
			t("dialog.agatha.start.5"),
			t("dialog.agatha.start.6"),
			t("dialog.agatha.start.7"),
		],
		victory: [t("dialog.agatha.victory.0"), t("dialog.agatha.victory.1")],
		defeat: [t("dialog.agatha.defeat.0")],
	},
};

export const PETER: Trainer = {
	ref: "peter",
	name: t("trainer.peter"),
	frameIndex: 48,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.peter.start.0"),
			t("dialog.peter.start.1"),
			t("dialog.peter.start.2"),
			t("dialog.peter.start.3"),
			t("dialog.peter.start.4"),
			t("dialog.peter.start.5"),
			t("dialog.peter.start.6"),
			t("dialog.peter.start.7"),
		],
		victory: [
			t("dialog.peter.victory.0"),
			t("dialog.peter.victory.1"),
			t("dialog.peter.victory.2"),
			t("dialog.peter.victory.3"),
			t("dialog.peter.victory.4"),
			t("dialog.peter.victory.5"),
			t("dialog.peter.victory.6"),
		],
		defeat: [t("dialog.peter.defeat.0")],
	},
};

export const RIVAL: Trainer = {
	ref: "rival",
	name: "Blue",
	frameIndex: 49,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.rival.start.0"),
			t("dialog.rival.start.1"),
			t("dialog.rival.start.2"),
			t("dialog.rival.start.3"),
			t("dialog.rival.start.4"),
			t("dialog.rival.start.5"),
			t("dialog.rival.start.6"),
		],
		victory: [
			t("dialog.rival.victory.0"),
			t("dialog.rival.victory.1"),
			t("dialog.rival.victory.2"),
		],
		defeat: [
			t("dialog.rival.defeat.0"),
			t("dialog.rival.defeat.1"),
			t("dialog.rival.defeat.2"),
		],
	},
};

export const CHAMPIONS_LIGUE = [OLGA, ALDO, AGATHA, PETER, RIVAL];

export const ASSISTANT_TUTO_DIALOG_STATE = {
	BEFORE_WILD: 0,
	AFTER_WILD: 1,
	AFTER_CAPTURE_SELF: 2,
};

export const ASSISTANT_TUTO: Trainer = {
	ref: "assistant_tuto",
	name: t("trainer.assistant_tuto"),
	frameIndex: 19,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.assistant_tuto.start.0"),
			t("dialog.assistant_tuto.start.1"),
			() => {
				gameState.dialogStates.assistant_tuto =
					ASSISTANT_TUTO_DIALOG_STATE.BEFORE_WILD;
				return receiveItem(ITEM_POKEBALL, 5);
			},
			t("dialog.assistant_tuto.start.2"),
			{
				OUI: () => [t("dialog.assistant_tuto.start.yes0")],
				NON: () => [
					t("dialog.assistant_tuto.start.no0"),
					t("dialog.assistant_tuto.start.no1"),
					t("dialog.assistant_tuto.start.no2"),
					t("dialog.assistant_tuto.start.no3"),
					t("dialog.assistant_tuto.start.no4"),
				],
			},
		],
		victory: [t("dialog.assistant_tuto.victory.0")],
		defeat: [
			() => {
				for (const pokemon of gameState.board.otherTeam)
					sendBackToPokeball(pokemon);
				// make scientist capture remaining wild Pokémon
				return t("dialog.assistant_tuto.defeat.0");
			},
			t("dialog.assistant_tuto.defeat.1"),
		],
		step2: [
			() => {
				startMusic("music_guide");
				return t("dialog.assistant_tuto.step2.0");
			},
			t("dialog.assistant_tuto.step2.1"),
			t("dialog.assistant_tuto.step2.2"),
			t("dialog.assistant_tuto.step2.3"),
			() => {
				const playerPokemon = gameState.player.team[0].entry;
				for (const pokemon of gameState.board.otherTeam)
					sendBackToPokeball(pokemon);
				gameState.dialogStates.assistant_tuto =
					ASSISTANT_TUTO_DIALOG_STATE.AFTER_WILD;
				wait(500).then(() => {
					const game = gameState.activeScene as GameScene;
					gameState.stage = GameStage.CAPTURE;
					gameState.board.otherTeam = spawnTutoCaptureTeamStep2(playerPokemon);
					spawnPokemon(gameState.board.otherTeam[0], game);
				});
				return t("dialog.assistant_tuto.step2.4", {
					name: t("pokemon." + playerPokemon.ref),
				});
			},
		],
		step3: [
			t("dialog.assistant_tuto.step3.0"),
			t("dialog.assistant_tuto.step3.1"),
			t("dialog.assistant_tuto.step3.2"),
		],
	},
};

export const SBIRE_ROCKET: Trainer = {
	ref: "sbire_rocket",
	name: t("trainer.sbire_rocket"),
	frameIndex: 18,
	introFrameIndex: null,
	dialogs: {
		start: [t("dialog.sbire_rocket.start.0"), t("dialog.sbire_rocket.start.1")],
		victory: [t("dialog.sbire_rocket.victory.0")],
		defeat: [t("dialog.sbire_rocket.defeat.0")],
	},
};

export const SBIRE_ROCKET_TUTO: Trainer = {
	ref: "sbire_rocket",
	name: t("trainer.sbire_rocket"),
	frameIndex: 18,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.sbire_rocket_tuto.start.0"),
			t("dialog.sbire_rocket_tuto.start.1"),
			t("dialog.sbire_rocket_tuto.start.2"),
			t("dialog.sbire_rocket_tuto.start.3"),
		],
		victory: [
			t("dialog.sbire_rocket_tuto.victory.0"),
			t("dialog.sbire_rocket_tuto.victory.1"),
			t("dialog.sbire_rocket_tuto.victory.2"),
		],
		defeat: [t("dialog.sbire_rocket_tuto.defeat.0")],
	},
};

export const DRESSEUR_COL_DE_MONTAGNE: Trainer = {
	ref: "dresseur_col_de_montagne",
	name: t("trainer.dresseur_col_de_montagne"),
	frameIndex: 20,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_col_de_montagne.start.0"),
			t("dialog.dresseur_col_de_montagne.start.1"),
			t("dialog.dresseur_col_de_montagne.start.2"),
		],
		victory: [t("dialog.dresseur_col_de_montagne.victory.0")],
		defeat: [t("dialog.dresseur_col_de_montagne.defeat.0")],
	},
};

export const DRESSEUR_DOJO: Trainer = {
	ref: "dresseur_dojo",
	name: t("trainer.dresseur_dojo"),
	frameIndex: 21,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_dojo.start.0"),
			t("dialog.dresseur_dojo.start.1"),
			t("dialog.dresseur_dojo.start.2"),
		],
		victory: [
			t("dialog.dresseur_dojo.victory.0"),
			t("dialog.dresseur_dojo.victory.1"),
		],
		defeat: [t("dialog.dresseur_dojo.defeat.0")],
	},
};

export const DRESSEUR_FALAISES: Trainer = {
	ref: "dresseur_falaises",
	name: t("trainer.dresseur_falaises"),
	frameIndex: 22,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_falaises.start.0"),
			t("dialog.dresseur_falaises.start.1"),
			t("dialog.dresseur_falaises.start.2"),
		],
		victory: [t("dialog.dresseur_falaises.victory.0")],
		defeat: [t("dialog.dresseur_falaises.defeat.0")],
	},
};

export const DRESSEUR_SAFRANIA: Trainer = {
	ref: "dresseur_safrania",
	name: t("trainer.dresseur_safrania"),
	frameIndex: 23,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_safrania.start.0"),
			t("dialog.dresseur_safrania.start.1"),
			t("dialog.dresseur_safrania.start.2"),
		],
		victory: [t("dialog.dresseur_safrania.victory.0")],
		defeat: [t("dialog.dresseur_safrania.defeat.0")],
	},
};

export const DRESSEUR_PISTE_CYCLABLE: Trainer = {
	ref: "dresseur_piste_cyclable",
	name: t("trainer.dresseur_piste_cyclable"),
	frameIndex: 24,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_piste_cyclable.start.0"),
			t("dialog.dresseur_piste_cyclable.start.1"),
			t("dialog.dresseur_piste_cyclable.start.2"),
		],
		victory: [t("dialog.dresseur_piste_cyclable.victory.0")],
		defeat: [t("dialog.dresseur_piste_cyclable.defeat.0")],
	},
};

export const DRESSEUR_ILES_ECUME: Trainer = {
	ref: "dresseur_iles_ecume",
	name: t("trainer.dresseur_iles_ecume"),
	frameIndex: 25,
	introFrameIndex: null,
	dialogs: {
		start: [t("dialog.dresseur_iles_ecume.start.0")],
		victory: [t("dialog.dresseur_iles_ecume.victory.0")],
		defeat: [t("dialog.dresseur_iles_ecume.defeat.0")],
	},
};

export const DRESSEUR_CENTRALE: Trainer = {
	ref: "dresseur_centrale",
	name: t("trainer.dresseur_centrale"),
	frameIndex: 26,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_centrale.start.0"),
			t("dialog.dresseur_centrale.start.1"),
			t("dialog.dresseur_centrale.start.2"),
		],
		victory: [t("dialog.dresseur_centrale.victory.0")],
		defeat: [t("dialog.dresseur_centrale.defeat.0")],
	},
};

export const DRESSEUR_FORET_JADE: Trainer = {
	ref: "dresseur_foret_jade",
	name: t("trainer.dresseur_foret_jade"),
	frameIndex: 27,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_foret_jade.start.0"),
			t("dialog.dresseur_foret_jade.start.1"),
			t("dialog.dresseur_foret_jade.start.2"),
		],
		victory: [t("dialog.dresseur_foret_jade.victory.0")],
		defeat: [t("dialog.dresseur_foret_jade.defeat.0")],
	},
};

export const DRESSEUR_AZURIA: Trainer = {
	ref: "dresseur_azuria",
	name: t("trainer.dresseur_azuria"),
	frameIndex: 28,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_azuria.start.0"),
			t("dialog.dresseur_azuria.start.1"),
		],
		victory: [t("dialog.dresseur_azuria.victory.0")],
		defeat: [t("dialog.dresseur_azuria.defeat.0")],
	},
};

export const DRESSEUR_LAVANVILLE: Trainer = {
	ref: "dresseur_lavanville",
	name: t("trainer.dresseur_lavanville"),
	frameIndex: 29,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_lavanville.start.0"),
			t("dialog.dresseur_lavanville.start.1"),
		],
		victory: [t("dialog.dresseur_lavanville.victory.0")],
		defeat: [t("dialog.dresseur_lavanville.defeat.0")],
	},
};

export const DRESSEUR_MONT_SELENITE: Trainer = {
	ref: "dresseur_mont_selenite",
	name: t("trainer.dresseur_mont_selenite"),
	frameIndex: 30,
	introFrameIndex: null,
	dialogs: {
		start: [t("dialog.dresseur_mont_selenite.start.0")],
		victory: [t("dialog.dresseur_mont_selenite.victory.0")],
		defeat: [t("dialog.dresseur_mont_selenite.defeat.0")],
	},
};

export const DRESSEUR_OCEANE: Trainer = {
	ref: "dresseur_oceane",
	name: t("trainer.dresseur_oceane"),
	frameIndex: 31,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_oceane.start.0"),
			t("dialog.dresseur_oceane.start.1"),
			t("dialog.dresseur_oceane.start.2"),
			t("dialog.dresseur_oceane.start.3"),
		],
		victory: [t("dialog.dresseur_oceane.victory.0")],
		defeat: [
			t("dialog.dresseur_oceane.defeat.0"),
			t("dialog.dresseur_oceane.defeat.1"),
		],
	},
};

export const DRESSEUR_MR_PSY: Trainer = {
	ref: "mr_psy",
	name: t("trainer.mr_psy"),
	frameIndex: 32,
	introFrameIndex: null,
	dialogs: {
		start: [t("dialog.mr_psy.start.0"), t("dialog.mr_psy.start.1")],
		victory: [t("dialog.mr_psy.victory.0")],
		defeat: [
			t("dialog.mr_psy.defeat.0"),
			t("dialog.mr_psy.defeat.1"),
			t("dialog.mr_psy.defeat.2"),
		],
	},
};

export const DRESSEUR_CHAMPS_VERDOYANTS: Trainer = {
	ref: "dresseur_champs_verdoyants",
	name: t("trainer.dresseur_champs_verdoyants"),
	frameIndex: 33,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_champs_verdoyants.start.0"),
			t("dialog.dresseur_champs_verdoyants.start.1"),
		],
		victory: [
			t("dialog.dresseur_champs_verdoyants.victory.0"),
			t("dialog.dresseur_champs_verdoyants.victory.1"),
		],
		defeat: [
			t("dialog.dresseur_champs_verdoyants.defeat.0"),
			t("dialog.dresseur_champs_verdoyants.defeat.1"),
			t("dialog.dresseur_champs_verdoyants.defeat.2"),
		],
	},
};

export const DRESSEUR_CAMP_NOMADE: Trainer = {
	ref: "dresseur_camp_nomade",
	name: t("trainer.dresseur_camp_nomade"),
	frameIndex: 34,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_camp_nomade.start.0"),
			t("dialog.dresseur_camp_nomade.start.1"),
			t("dialog.dresseur_camp_nomade.start.2"),
		],
		victory: [t("dialog.dresseur_camp_nomade.victory.0")],
		defeat: [t("dialog.dresseur_camp_nomade.defeat.0")],
	},
};

export const DRESSEUR_CELADOPOLE: Trainer = {
	ref: "dresseur_celadopole",
	name: t("trainer.dresseur_celadopole"),
	frameIndex: 35,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_celadopole.start.0"),
			t("dialog.dresseur_celadopole.start.1"),
			t("dialog.dresseur_celadopole.start.2"),
		],
		victory: [
			t("dialog.dresseur_celadopole.victory.0"),
			t("dialog.dresseur_celadopole.victory.1"),
		],
		defeat: [t("dialog.dresseur_celadopole.defeat.0")],
	},
};

export const DRESSEUR_ARGENTA: Trainer = {
	ref: "dresseur_argenta",
	name: t("trainer.dresseur_argenta"),
	frameIndex: 36,
	introFrameIndex: null,
	dialogs: {
		start: [t("dialog.dresseur_argenta.start.0")],
		victory: [t("dialog.dresseur_argenta.victory.0")],
		defeat: [t("dialog.dresseur_argenta.defeat.0")],
	},
};

export const DRESSEUR_GROTTE_AZUREE: Trainer = {
	ref: "dresseur_grotte_azuree",
	name: t("trainer.dresseur_grotte_azuree"),
	frameIndex: 37,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_grotte_azuree.start.0"),
			t("dialog.dresseur_grotte_azuree.start.1"),
		],
		victory: [t("dialog.dresseur_grotte_azuree.victory.0")],
		defeat: [
			t("dialog.dresseur_grotte_azuree.defeat.0"),
			t("dialog.dresseur_grotte_azuree.defeat.1"),
		],
	},
};

export const DRESSEUR_CARMIN: Trainer = {
	ref: "dresseur_carmin",
	name: t("trainer.dresseur_carmin"),
	frameIndex: 38,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_carmin.start.0"),
			t("dialog.dresseur_carmin.start.1"),
			t("dialog.dresseur_carmin.start.2"),
		],
		victory: [t("dialog.dresseur_carmin.victory.0")],
		defeat: [t("dialog.dresseur_carmin.defeat.0")],
	},
};

export const DRESSEUR_TOUR_POKEMON: Trainer = {
	ref: "dresseur_tour_pokemon",
	name: t("trainer.dresseur_tour_pokemon"),
	frameIndex: 39,
	introFrameIndex: null,
	dialogs: {
		start: [t("dialog.dresseur_tour_pokemon.start.0")],
		victory: [t("dialog.dresseur_tour_pokemon.victory.0")],
		defeat: [
			t("dialog.dresseur_tour_pokemon.defeat.0"),
			t("dialog.dresseur_tour_pokemon.defeat.1"),
		],
	},
};

export const DRESSEUR_PENSION_DIALOG_STATE = {
	hello: 0,
	has_met: 1,
	has_deposed: 2,
};

export const DRESSEUR_PENSION: Trainer = {
	ref: "dresseur_pension",
	name: t("trainer.dresseur_pension"),
	frameIndex: 40,
	introFrameIndex: null,
	dialogs: {
		start() {
			if (
				gameState.dialogStates.pension === DRESSEUR_PENSION_DIALOG_STATE.has_met
			)
				return [t("dialog.dresseur_pension.start.0")];

			if (
				gameState.dialogStates.pension ===
				DRESSEUR_PENSION_DIALOG_STATE.has_deposed
			)
				return [t("dialog.dresseur_pension.start.1")];

			gameState.dialogStates.pension = DRESSEUR_PENSION_DIALOG_STATE.has_met;
			return [
				t("dialog.dresseur_pension.start.2"),
				t("dialog.dresseur_pension.start.3"),
				t("dialog.dresseur_pension.start.4"),
				t("dialog.dresseur_pension.start.5"),
				t("dialog.dresseur_pension.start.6"),
			];
		},
		bye() {
			if (
				gameState.dialogStates.pension ===
				DRESSEUR_PENSION_DIALOG_STATE.has_deposed
			)
				return [t("dialog.dresseur_pension.bye.0")];
			return [t("dialog.dresseur_pension.bye.1")];
		},
	},
};

export const DRESSEUR_CAVE_TAUPIQUEUR: Trainer = {
	ref: "dresseur_cave_taupiqueur",
	name: t("trainer.dresseur_cave_taupiqueur"),
	frameIndex: 41,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_cave_taupiqueur.start.0"),
			t("dialog.dresseur_cave_taupiqueur.start.1"),
		],
		victory: [
			t("dialog.dresseur_cave_taupiqueur.victory.0"),
			t("dialog.dresseur_cave_taupiqueur.victory.1"),
		],
		defeat: [t("dialog.dresseur_cave_taupiqueur.defeat.0")],
	},
};

export const DRESSEUR_COLLINE_ROYALE: Trainer = {
	ref: "dresseur_colline_royale",
	name: t("trainer.dresseur_colline_royale"),
	frameIndex: 42,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_colline_royale.start.0"),
			t("dialog.dresseur_colline_royale.start.1"),
			t("dialog.dresseur_colline_royale.start.2"),
			t("dialog.dresseur_colline_royale.start.3"),
		],
		victory: [t("dialog.dresseur_colline_royale.victory.0")],
		defeat: [
			t("dialog.dresseur_colline_royale.defeat.0"),
			t("dialog.dresseur_colline_royale.defeat.1"),
		],
	},
};

export const DRESSEUR_MONT_BRAISE: Trainer = {
	ref: "dresseur_mont_braise",
	name: t("trainer.dresseur_mont_braise"),
	frameIndex: 43,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_mont_braise.start.0"),
			t("dialog.dresseur_mont_braise.start.1"),
			t("dialog.dresseur_mont_braise.start.2"),
		],
		victory: [t("dialog.dresseur_mont_braise.victory.0")],
		defeat: [t("dialog.dresseur_mont_braise.defeat.0")],
	},
};

export const DRESSEUR_PARMANIE: Trainer = {
	ref: "sbire_rocket",
	name: t("trainer.sbire_rocket"),
	frameIndex: 44,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_parmanie.start.0"),
			t("dialog.dresseur_parmanie.start.1"),
		],
		victory: [t("dialog.dresseur_parmanie.victory.0")],
		defeat: [t("dialog.dresseur_parmanie.defeat.0")],
	},
};

export const DRESSEUR_CRAMOISILE: Trainer = {
	ref: "dresseur_cramoisile",
	name: t("trainer.dresseur_cramoisile"),
	frameIndex: 19,
	introFrameIndex: null,
	dialogs: {
		start: [
			t("dialog.dresseur_cramoisile.start.0"),
			t("dialog.dresseur_cramoisile.start.1"),
		],
		victory: [t("dialog.dresseur_cramoisile.victory.0")],
		defeat: [t("dialog.dresseur_cramoisile.defeat.0")],
	},
};
