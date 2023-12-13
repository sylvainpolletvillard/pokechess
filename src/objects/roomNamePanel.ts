import { Z } from "../data/depths";
import { gameState } from "../logic/gamestate";
import { addText } from "../utils/text";
import { MyScene } from "../scenes/MyScene";

export function drawRoomNamePanel() {
  const scene = gameState.activeScene as MyScene;
  const room = gameState.currentRoom;
  const roomNameBg = scene.add.nineslice(
    scene.scale.width / 2,
    -32,
    "box2",
    undefined,
    160,
    0,
    4,
    4,
    4,
    4
  );
  roomNameBg.setOrigin(0.5, 0.5);

  const roomNameText = addText(scene.scale.width / 2, -30, room.name, {
    color: "#000",
  });
  roomNameText.setOrigin(0.5, 0.5);
  roomNameText.setScrollFactor(0);

  roomNameBg.setSize(roomNameText.width + 24, roomNameText.height + 12);
  roomNameBg.setScrollFactor(0);
  roomNameBg.setDepth(Z.MENU_TOOLTIPS);
  roomNameText.setDepth(Z.MENU_TOOLTIPS + 1);

  scene.add.tween({
    targets: [roomNameBg, roomNameText],
    duration: 400,
    y: "+=38",
    ease: "Linear",
  });
  scene.add.tween({
    targets: [roomNameBg, roomNameText],
    duration: 400,
    y: -36,
    ease: "Linear",
    delay: 2000,
  });
}
