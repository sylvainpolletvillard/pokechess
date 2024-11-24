import Phaser from "phaser";

import { startDebugAnims } from "./debug_anims";
import { type GameState, gameState } from "./logic/gamestate";

import { i18n, i18nLoadingPromise, t } from "./i18n";
import { initVolumeControls } from "./logic/audio";
import { setupHTMLButtons } from "./logic/inputs";
import GameOverScene from "./scenes/GameOverScene";
import GameScene from "./scenes/GameScene";
import LoadingScene from "./scenes/LoadingScene";
import MapScene from "./scenes/MapScene";
import MenuScene from "./scenes/MenuScene";
import RoomScene from "./scenes/RoomScene";
import TestAnimsScene from "./scenes/TestAnims";

export class Game extends Phaser.Game {
	state: GameState;
	constructor(gameConfig: Phaser.Types.Core.GameConfig) {
		super(gameConfig);
		this.state = gameState;
		document.getElementById("infos")!.innerHTML = `
    <h1>Pokechess v 1.1</h1>
    <p class="description">${t("home.description")}</p>      
    <div id="options">
      <p>${t("home.controls")}: 
        <img alt="${t("home.gamepad")}" height="24" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS1tZGkiIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM4ODg4ODgiIGQ9Ik03IDZoMTBhNiA2IDAgMCAxIDYgNmE2IDYgMCAwIDEtNiA2Yy0xLjc4IDAtMy4zNy0uNzctNC40Ny0yaC0xLjA2Yy0xLjEgMS4yMy0yLjY5IDItNC40NyAyYTYgNiAwIDAgMS02LTZhNiA2IDAgMCAxIDYtNk02IDl2Mkg0djJoMnYyaDJ2LTJoMnYtMkg4VjlINm05LjUgM2ExLjUgMS41IDAgMCAwLTEuNSAxLjVhMS41IDEuNSAwIDAgMCAxLjUgMS41YTEuNSAxLjUgMCAwIDAgMS41LTEuNWExLjUgMS41IDAgMCAwLTEuNS0xLjVtMy0zYTEuNSAxLjUgMCAwIDAtMS41IDEuNWExLjUgMS41IDAgMCAwIDEuNSAxLjVhMS41IDEuNSAwIDAgMCAxLjUtMS41QTEuNSAxLjUgMCAwIDAgMTguNSA5WiI+PC9wYXRoPjwvc3ZnPg==" />
        <img alt="${t("home.keyboard")}" height="24" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS16b25kaWNvbnMiIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjAgMjAiPjxwYXRoIGZpbGw9IiM4ODg4ODgiIGQ9Ik0wIDZjMC0xLjEuOS0yIDItMmgxNmEyIDIgMCAwIDEgMiAydjhhMiAyIDAgMCAxLTIgMkgyYTIgMiAwIDAgMS0yLTJWNnptMiAwdjJoMlY2SDJ6bTEgM3YyaDJWOUgzem0tMSAzdjJoMnYtMkgyem0zIDB2MmgxMHYtMkg1em0xMSAwdjJoMnYtMmgtMnpNNiA5djJoMlY5SDZ6bTMgMHYyaDJWOUg5em0zIDB2MmgyVjloLTJ6bTMgMHYyaDJWOWgtMnpNNSA2djJoMlY2SDV6bTMgMHYyaDJWNkg4em0zIDB2MmgyVjZoLTJ6bTMgMHYyaDRWNmgtNHoiPjwvcGF0aD48L3N2Zz4=" />
        <img alt="${t("home.mouse")}" height="24" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS13cGYiIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB2aWV3Qm94PSIwIDAgMjYgMjYiPjxwYXRoIGZpbGw9IiM4ODg4ODgiIGQ9Ik0yMC42MjUgMy4yNWMtLjYuMDMzLTEuMTkyLjE4Ni0xLjcxOS40MzhjLTEuNDA1LjY3LTIuNTc2IDEuODU3LTMuNDY4IDIuNzVhLjguOCAwIDEgMCAxLjEyNCAxLjEyNWMuODgtLjg4IDEuOTktMS45MSAzLjAzMi0yLjQwN2MuNTIxLS4yNDguOTkyLS4zNTggMS40MzctLjMxMmMuNDQ1LjA0Ni45MDMuMjE1IDEuNDA3LjcxOGMuODQ5Ljg1Ljg5NyAxLjU2Ni41MyAyLjU2M2MtLjM2NS45OTctMS4yNzcgMi4xODUtMi4zNzQgMy4yODFjLTEuMDUgMS4wNS0xLjgzNCAyLjAyOC0yLjE4OCAzLjA2M2EyLjg4NCAyLjg4NCAwIDAgMCAuNjg4IDNjLjgyMi44MjIgMi4wMTEgMS4wMSAzLjA5My41OTNjMS4wODMtLjQxNiAyLjE2My0xLjI4NyAzLjM3NS0yLjVhLjguOCAwIDEgMC0xLjEyNS0xLjEyNGMtMS4xMzkgMS4xMzktMi4xMiAxLjg1OC0yLjgxMiAyLjEyNGMtLjY5Mi4yNjctLjk2Ny4yMjEtMS40MDYtLjIxOGMtLjQ1LS40NS0uNDk0LS43NTItLjI4Mi0xLjM3NWMuMjEzLS42MjMuODE4LTEuNDc0IDEuNzgyLTIuNDM4YzEuMTc1LTEuMTc0IDIuMjM5LTIuNDUgMi43NS0zLjg0NGMuNTEtMS4zOTIuMzI4LTMuMDE1LS45MDctNC4yNWMtLjcxNC0uNzE1LTEuNTI0LTEuMTAzLTIuMzQzLTEuMTg3YTMuNjc4IDMuNjc4IDAgMCAwLS41OTQgMHptLTEwLjY4OCAzQTYuNDcyIDYuNDcyIDAgMCAwIDUuNzIgOC4xNTZMNC42NTYgOS4yMmw0LjAzMiA0LjAzMWwxLjA5My0xLjA5NGExLjcxNCAxLjcxNCAwIDAgMSAuMzEzLTEuOTY5bDEuMDk0LTEuMDkzYTEuNzEzIDEuNzEzIDAgMCAxIDEuOTY4LS4zMTNsMS4xNTYtMS4xNTZBNi41NiA2LjU2IDAgMCAwIDkuOTM5IDYuMjV6TTE1LjUgOC43ODFMMTQuMjgxIDEwYTEuNjk2IDEuNjk2IDAgMCAxLS4zNzUgMS44MTNsLTEuMDk0IDEuMDkzYTEuNjk2IDEuNjk2IDAgMCAxLTEuODEyLjM3NWwtMS4xNTYgMS4xNTZsNC4wNjIgNC4wMzJsMS4wNjMtMS4wNjNjMi4zNTYtMi4zNTYgMi41MjItNi4wNTkuNTMxLTguNjI1em0tMy4wOTQuODEzYS43MjUuNzI1IDAgMCAwLS41LjIxOWwtMS4wOTQgMS4wOTNhLjcxNS43MTUgMCAwIDAgMCAxbC4yODIuMjgxYS43MTkuNzE5IDAgMCAwIC41LjIyYS43MjMuNzIzIDAgMCAwIC41LS4yMmwxLjA5NC0xLjA5M2EuNzIuNzIgMCAwIDAgLjIxOC0uNWEuNzIzLjcyMyAwIDAgMC0uMjE5LS41bC0uMjgtLjI4MWEuNzEzLjcxMyAwIDAgMC0uNS0uMjJ6bS04LjcxOS41OTRsLTEuNSAxLjQ2OGMtMi41NTUgMi41NTYtMi41NTUgNi43MjUgMCA5LjI4MWE2LjU0IDYuNTQgMCAwIDAgOS4yNSAwbDEuNS0xLjVsLTkuMjUtOS4yNXoiPjwvcGF0aD48L3N2Zz4=" />
      </p>
      <p>
        ${t("home.volume")}:
        <label>${t("home.music")} <input id="volume_music" type="range" min="0" max="100" value="20" /></label>
        <label>${t("home.sfx")} <input id="volume_sfx" type="range" min="0" max="100" value="20" /></label>
      </p>
      <p>
        <label>
          ${t("home.language")}:
          <select id="language_select">
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </label>
      </p>
    </div>
    `;

		initVolumeControls();
		setupHTMLButtons();
		const languageSelect = document.getElementById(
			"language_select",
		) as HTMLSelectElement;
		languageSelect.onchange = (e) => {
			i18n.changeLanguage(languageSelect.value);
		};
	}
}

function startGame() {
	const game = new Game({
		type: Phaser.AUTO,
		parent: "game",
		backgroundColor: "#CACDB8",
		scale: {
			width: 320,
			height: 320,
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
		},
		input: {
			gamepad: true,
			mouse: true,
			touch: true,
		},
		render: {
			pixelArt: true,
		},
		physics: {
			default: "arcade",
			arcade: {
				debug: false,
			},
		},
		scene: [
			LoadingScene,
			MenuScene,
			RoomScene,
			MapScene,
			GameScene,
			GameOverScene,
			TestAnimsScene,
		],
	});

	// @ts-ignore
	globalThis.game = game;
}

i18nLoadingPromise.then(() => {
	switch (window.location.pathname) {
		case "/debug":
			startDebugAnims();
			break;
		default:
			startGame();
			break;
	}
});

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("./sw.js", { scope: "./" }).then(
			(registration) => {
				console.log(
					"ServiceWorker registration successful with scope: ",
					registration.scope,
				);
			},
			(err) => {
				console.log("ServiceWorker registration failed: ", err);
			},
		);
	});
}
