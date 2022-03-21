import * as Phaser from 'phaser';

export class Kobra extends Phaser.GameObjects.Container {

  bodyParts: Phaser.Geom.Point[] = [];
  alive: boolean;
  speed: number;
  moveTime: number;
  color = new Phaser.Display.Color(); 

  protected getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene,x,y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);

    // scene.events.on('update', this.update, this)
    this.alive = true;
    this.speed = 100;
    this.moveTime = 0;
    // this.grow(x,y);
    // this.move(x,y);

    // scene.time.delayedCall(this.anim.speed * 1000, this.changeFrame, [], this);
  }

  public preload()
  {
    console.log('PRELOAD')
  }

  public create()
  {
    console.log('CREATE')
  }

  public preUpdate (time, delta)
  {
    // console.log(time);
    // console.log(delta);

  }

  public grow(x:number, y:number) {
    const pos = this.first as Phaser.GameObjects.Ellipse;
    const part  = this.scene.add.ellipse((pos?.x ?? 0) + 25, (pos?.y ?? 0) + 25,25,25,100);
    this.add(part)
  }

  public move(x:number, y:number) {
    this.list.reduce((prev: number[], curr:Phaser.GameObjects.GameObject) => {
      const part = curr as Phaser.GameObjects.Ellipse;
      const position = [part.x, part.y]
      part.x = prev[0];
      part.y = prev[1];
      return position;      
    }, [x,y]);
  }
}
