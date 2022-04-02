/* eslint-disable no-plusplus */
import Phaser from 'phaser';
import Perlin from 'phaser3-rex-plugins/plugins/perlin';

export default class SlitherSpline extends Phaser.Scene {
  graphics!: Phaser.GameObjects.Graphics;

  points: Array<Phaser.Math.Vector2> = [];

  size = 3;

  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  reticle!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  moveCam: boolean = true;

  text!: Phaser.GameObjects.Text;

  noise = new Perlin(1000);

  gameWidth: number = 0;

  gameHeight: number = 0;

  food: Array<Phaser.GameObjects.Arc> = [];

  collisionCounter: number = 0;

  gameFieldSize: number = 60;

  constructor() {
    super({

    });
  }

  // eslint-disable-next-line class-methods-use-this
  preload() {

  }

  create() {
    this.graphics = this.add.graphics();

    this.player = this.physics.add.image(1024, 1024, 'block');
    this.reticle = this.physics.add.image(800, 700, 'target');
    this.reticle.alpha = 0.8;

    this.gameWidth = this.sys.game.canvas.width;
    this.gameHeight = this.sys.game.canvas.height;
    const tileWidth = this.gameWidth / this.gameFieldSize;
    const tileHeight = this.gameHeight / this.gameFieldSize;

    for (let width = 0; width < this.gameFieldSize; width++) {
      for (let height = 0; height < this.gameFieldSize; height++) {
        const noise = this.noise.perlin2(width / 5, height / 5);
        if (noise > 0.3) {
          const food = this.scene.scene.add.circle(
            width * tileWidth,
            height * tileHeight,
            (noise * tileWidth),
          );
          food.setFillStyle(161619, 1);
          this.food.push(food);
        }
      }
    }

    // this.cameras.main.setZoom(1);
  }

  update() {
    const pointer = this.input.activePointer;
    const mouseBoundary = new Phaser.Geom.Circle(pointer.x, pointer.y, 80);

    const head = this.points.length
      ? this.points[this.points.length - 1]
      : new Phaser.Math.Vector2(this.cameras.main.centerX, this.cameras.main.centerY);

    const angle = Phaser.Math.Angle.Between(
      head.x,
      head.y,
      pointer.x,
      pointer.y,
    );

    // Navigate
    const newHead = Phaser.Math.RotateTo(this.player, head.x, head.y, angle, 50);
    const isHeadInsideBoundary = Phaser.Geom.Circle.ContainsPoint(mouseBoundary, newHead);

    if (!isHeadInsideBoundary) {
      const headCollider = new Phaser.Geom.Circle(newHead.x, newHead.y, 40);

      const collidedSelf = this.points.some(
        (point) => Phaser.Geom.Circle.ContainsPoint(headCollider, point),
      );
      const collidedFood = this.food.filter(
        (food) => Phaser.Geom.Circle.ContainsPoint(headCollider, food),
      );

      if (collidedSelf) {
        this.points = [];
        this.size = 3;
        this.collisionCounter++;
      } else {
        this.graphics.clear();
        this.graphics.lineStyle(1, 0xffffff, 1);
        this.graphics.fillStyle(0x00ff00, 1);

        this.reticle.x = pointer.x;
        this.reticle.y = pointer.y;
        this.graphics.fillCircle(this.reticle.x, this.reticle.y, 5);

        this.points.push(new Phaser.Math.Vector2(newHead.x, newHead.y));
        if (this.points.length > this.size) {
          this.points.shift();
        }

        if (collidedFood?.length > 0) {
          this.size += (collidedFood.length / 10);
          collidedFood.forEach(
            (food) => {
              food.removedFromScene();
              food.destroy();
            },
          );
        }

        this.player.x = newHead.x;
        this.player.y = newHead.y;
        if (this.points.length) {
          const curve = new Phaser.Curves.Spline(this.points);
          this.points.forEach((point) => this.graphics.fillCircle(point.x, point.y, 5));
          curve.draw(this.graphics, 1024);
        }
      }
    }
  }
}
