import * as Phaser from 'phaser';
import SlitherSpline from './scenes/SlitherSpline';
import MatterScene from './scenes/MatterPOC';

const isMatterPhysics = true;

const physics = isMatterPhysics ? {
  default: 'matter',
  matter: {
    debug: true,
    gravity: {
      y: 0.3,
    },
  },
}
  : {
    default: 'arcade',
  };

const config = {
  type: Phaser.AUTO,
  physics,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1600,
    height: 1200,
  },
  backgroundColor: '#2d2d2d',
  parent: 'phaser-example',
  scene: isMatterPhysics ? [MatterScene] : [SlitherSpline],
} as Phaser.Types.Core.GameConfig;

const game = new Phaser.Game(config);
export default game;
