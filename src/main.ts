import * as Phaser from "phaser";
import { CameraExample } from './scenes/CameraExample';
import { SlitherSpline } from './scenes/SlitherSpline';

var config = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  backgroundColor: "#2d2d2d",
  parent: "phaser-example",
  scene: [SlitherSpline]
  // scene: {
  //   create: create,
  //   update: update,
  // },
} as Phaser.Types.Core.GameConfig;

const game = new Phaser.Game(config);


export default game;
