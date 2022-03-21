import * as Phaser from "phaser";

var config = {
  type: Phaser.AUTO,
  width: screen.width,
  height: screen.height,
  backgroundColor: "#2d2d2d",
  parent: "phaser-example",
  scene: {
    create: create,
    update: update,
  },
} as Phaser.Types.Core.GameConfig;

let graphics:Phaser.GameObjects.Graphics;

const points:Array<[number,number]> = [];
const game = new Phaser.Game(config);
let size = 100;

function create (this: Phaser.Scene, data: object) {
  graphics = this.add.graphics();
  graphics.lineStyle(1, 0xffffff, 1);

  console.log(data);
};

function update(this: Phaser.Scene) {

  const pointer = game.input.activePointer;
  const mouseBoundary = new Phaser.Geom.Circle(pointer.x, pointer.y, 30);

  if (pointer) {
    const head = points.length ? points[points.length - 1] : [1, 1];
    
    const angle = Phaser.Math.Angle.Between(
      head[0],
      head[1],
      pointer.x,
      pointer.y
    );

    const newHead = Phaser.Math.RotateTo(pointer, head[0], head[1], angle, 20);
    const isHeadInsideBoundary = Phaser.Geom.Circle.ContainsPoint(mouseBoundary, newHead);

    if(isHeadInsideBoundary){
      return;
    }

    points.push([newHead.x, newHead.y]);
    if (points.length > size) {
      points.shift();
    }

    const curve = new Phaser.Curves.Spline(points);

    graphics.clear();
    curve.draw(graphics, 64);
  }
}

export default game;
