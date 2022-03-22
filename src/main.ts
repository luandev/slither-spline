import * as Phaser from 'phaser';
import SlitherSpline from './scenes/SlitherSpline';

const config = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1600,
    height: 1200,
  },
  backgroundColor: '#2d2d2d',
  parent: 'phaser-example',
  scene: [SlitherSpline],
} as Phaser.Types.Core.GameConfig;

const game = new Phaser.Game(config);
export default game;
