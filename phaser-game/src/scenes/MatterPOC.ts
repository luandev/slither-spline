/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import Phaser from 'phaser';

export default class MatterScene extends Phaser.Scene {
  container!: Phaser.GameObjects.Container;

  world!: Phaser.Physics.Matter.World;

  constructor() {
    super({

    });
  }

  // eslint-disable-next-line class-methods-use-this
  preload() {

  }

  create() {
    this.world = this.matter.world;
    this.world.setBounds(0, 0, 1600, 1200);
    this.world.setGravity(0, 0);

    this.matter.world.setBounds(0, 0, 1600, 1200);

    const image1 = this.add.image(0, 0, 'mushroom');

    this.container = this.add.container(100, 100, [image1]);

    //  A Container has a default size of 0x0, so we need to give it a size before enabling a physics body
    this.container.setSize(128, 64);

    this.cameras.main.startFollow(this.container);

    const physicsContainer = this.matter.add.gameObject(this.container);

    physicsContainer.setFrictionAir(0.001);
    physicsContainer.setBounce(1);
    this.matter.add.image(350, 450, 'platform', undefined, { isStatic: true }).setScale(6, 0.5).setAngle(10);
    this.matter.applyForce(this.container, { x: 0.01, y: 0 });
  }

  update() {

  }
}
