import Phaser from "phaser";
import { POKEBALLS } from "../data/pokeballs";
import { POKEMONS, type PokemonEntry } from "../data/pokemons";
import { loadSpritesheets } from "../data/spritesheets";
import { DIRECTIONS, setupAnims } from "../logic/anims";

export default class TestAnims extends Phaser.Scene {
	constructor() {
		super("TestAnimsScene");
	}

	preload() {
		loadSpritesheets(this);
	}

	create() {
		setupAnims(this.anims, true);
		const graphicsFront = this.add.graphics();
		graphicsFront.setDepth(100);
		const graphicsBack = this.add.graphics();

		POKEMONS.forEach((pokemon: PokemonEntry, dp: number) => {
			DIRECTIONS.forEach((dir, dd) => {
				const x = 30 + 35 * dd + 150 * Math.floor(dp / 15);
				const y = 15 + 35 * (dp % 15);

				graphicsBack
					.fillStyle(dd % 2 ? 0xff0066 : 0x6600ff)
					.fillRect(x - 16, y - 16, 32, 32);
				this.add.sprite(x, y, "pokemon").play(`${pokemon.ref}_${dir}`);

				graphicsFront.fillStyle(0x000000, 1).fillPoint(x, y, 4);
				graphicsFront.fillStyle(0xffffff, 1).fillPoint(x, y, 2);
			});
		});

		this.add.sprite(20, 550, "effects").play("water_bubble");
		this.add.sprite(60, 550, "effects").play("water_jet");
		this.add.sprite(100, 550, "effects").play("water_drop");
		this.add.sprite(140, 550, "effects").play("water_bubble2");
		this.add.sprite(180, 550, "effects").play("water_shield");
		this.add.sprite(220, 550, "effects").play("ice_star");
		this.add.sprite(260, 550, "effects").play("ice_square");
		this.add.sprite(300, 550, "effects").play("ice_shard");
		this.add.sprite(340, 550, "effects").play("ice_tear");
		this.add.sprite(380, 550, "effects").play("ice_shield");
		this.add.sprite(420, 550, "effects").play("ice_crystal");
		this.add.sprite(460, 550, "pokemon").play("dracaufeu_DOWN");
		this.add.sprite(460, 550, "effects").play("frozen");

		this.add.sprite(500, 550, "effects").play("fire_ground_explosion");
		this.add.sprite(540, 550, "effects").play("fire_explosion_circle");
		this.add.sprite(580, 550, "effects").play("fire_flamethrower");
		this.add.sprite(620, 550, "effects").play("fire_blaze");
		this.add.sprite(660, 550, "effects").play("fire_blast");
		this.add.sprite(700, 550, "effects").play("fire_ball");
		this.add.sprite(740, 550, "effects").play("fire_arrow");
		this.add.sprite(780, 550, "effects").play("fire_jet");
		this.add.sprite(820, 550, "effects").play("fire_claw");
		this.add.sprite(860, 550, "effects").play("fire_explosion");
		this.add.sprite(900, 550, "effects").play("fire_pierce");
		this.add.sprite(940, 550, "effects").play("fire_hit");
		this.add.sprite(980, 550, "effects").play("fire_slice");
		this.add.sprite(1020, 550, "effects").play("fire_swurl");
		this.add.sprite(1060, 550, "effects").play("energy_ball");

		this.add.sprite(1100, 550, "effects").play("paralyze");
		this.add.sprite(1140, 550, "effects").play("elec_sparks");
		this.add.sprite(1180, 550, "effects").play("elec_thunder");
		this.add.sprite(1220, 550, "effects").play("elec_ball");

		this.add.sprite(1300, 550, "effects").play("vampire_seed");
		this.add.sprite(1340, 550, "effects").play("vine_whip");
		this.add.sprite(1380, 550, "effects").play("thorn_spear");
		this.add.sprite(1420, 550, "effects").play("roots");
		this.add.sprite(1460, 550, "effects").play("poison_ball");

		this.add.sprite(30, 600, "effects").play("dark_slice");
		this.add.sprite(60, 600, "effects").play("hit_star_big");
		this.add.sprite(100, 600, "effects").play("hit_star");
		this.add.sprite(140, 600, "effects").play("claw_left");
		this.add.sprite(180, 600, "effects").play("claw_right");
		this.add.sprite(220, 600, "effects").play("fist");
		this.add.sprite(260, 600, "effects").play("paw");
		this.add.sprite(300, 600, "effects").play("foot");
		this.add.sprite(340, 600, "effects").play("hand");
		this.add.sprite(380, 600, "effects").play("provocation");
		this.add.sprite(400, 600, "effects").play("provocated");
		this.add.sprite(460, 600, "effects").play("bone");
		this.add.sprite(520, 600, "effects").play("sweep");

		this.add.sprite(30, 950, "gui").play("cursor_point");
		this.add.sprite(60, 950, "gui").play("cursor_click");
		this.add.sprite(90, 950, "gui").play("cursor_drag");
		this.add.sprite(120, 950, "gui").play("cursor_drop");
		this.add.sprite(150, 950, "gui").play("cursor_wave");

		POKEBALLS.forEach((ball, i) => {
			this.add.sprite(30 + i * 64, 700, "pokeball").play(`${ball}_launch`);
			this.add.sprite(30 + i * 64, 750, "pokeball").play(`${ball}_in`);
			this.add.sprite(30 + i * 64, 800, "pokeball").play(`${ball}_out`);
			this.add.sprite(30 + i * 64, 850, "pokeball").play(`${ball}_jiggle`);
			this.add.sprite(30 + i * 64, 900, "pokeball").play(`${ball}_catch`);
		});
	}
}
