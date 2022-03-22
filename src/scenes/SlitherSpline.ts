import Phaser from 'phaser';
export class SlitherSpline extends Phaser.Scene {
  graphics!: Phaser.GameObjects.Graphics;
  points: Array<[number, number]> = [];
  size = 30;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  moveCam: boolean = true;
  text!: Phaser.GameObjects.Text;
  constructor() {
    super({

    });
  }

  preload() {

  }

  create(data: object) {
    this.graphics = this.add.graphics();
    console.log(data);
    // this.cameras.main.setBounds(0, 0, 1024 * 4, 1024 * 4);

    // for (let y = 0; y < 4; y++) {
    //   for (let x = 0; x < 4; x++) {
    //     this.add.image(1024 * x, 1024 * y, 'bg').setOrigin(0).setAlpha(0.75);
    //   }
    // }

    // player = this.physics.add.image(1920, 1080, 'block');
    // player = this.physics.add.image(1024, 1024, 'block');
    // player = this.physics.add.image(10, 10, 'block');
    this.player = this.physics.add.image(1024, 1024, 'block');

    // player.setCollideWorldBounds(true);

    // this.cameras.main.setZoom(0.5);
    // this.cameras.main.setDeadzone(400, 200);

    //this.cameras.main.startFollow(this.player, true);
    // this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // this.cameras.main.setZoom(0.5);

    // this.input.on('pointerdown', () => {
    //   this.moveCam = (this.moveCam) ? false : true;
    // }, this);
  }

  update() {
    const pointer = this.input.activePointer;
    // const cam = this.cameras.main;
    const mouseBoundary = new Phaser.Geom.Circle(pointer.x, pointer.y, 80);

    const head = this.points.length ? this.points[this.points.length - 1] : [0, 0];

    const angle = Phaser.Math.Angle.Between(
      head[0],
      head[1],
      pointer.x,
      pointer.y
    );

    const newHead = Phaser.Math.RotateTo(pointer, head[0], head[1], angle, 20);
    const isHeadInsideBoundary = Phaser.Geom.Circle.ContainsPoint(mouseBoundary, newHead);

    if (isHeadInsideBoundary) {
      return;
    }

    this.points.push([newHead.x, newHead.y]);
    if (this.points.length > this.size) {
      this.points.shift();
    }

    this.player.x = newHead.x;
    this.player.y = newHead.y;
    const curve = new Phaser.Curves.Spline(this.points);

    this.graphics.clear();
    this.graphics.lineStyle(1, 0xffffff, 1);
    this.graphics.fillStyle(0x00ff00, 1);
    this.points.forEach(point => this.graphics.fillCircle(point[0], point[1], 4))
    curve.draw(this.graphics, 1024);
  }
}