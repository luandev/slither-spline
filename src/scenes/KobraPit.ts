import Phaser from 'phaser';
import { Kobra } from './Kobra';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'KobraPit',
};

export class KobraPit extends Phaser.Scene {

  private mainKobra!: Kobra;
 
  constructor() {
    super(sceneConfig);
  }
 
  public Kobras: Array<Kobra> = [];
  public worldBoundary?: Phaser.Geom.Circle;
  public graphics?: Phaser.GameObjects.Graphics;

  public init() {
    // Used to prepare data

  }

  public preload() {
    // Used for preloading assets into your scene, such as
    // • images
    // • sounds
  }

  public create() {


    // Used to add objects to your game
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.worldBoundary = new Phaser.Geom.Circle(screenCenterX, screenCenterY, 500);
    this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }});
    this.graphics!.strokeCircleShape(this.worldBoundary!);
    this.mainKobra = new Kobra(this, screenCenterX, screenCenterX);
    this.physics.add.existing(this.mainKobra);

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {

      this.mainKobra.grow(pointer.x, pointer.y);

    }, this);

  }

  // private AddKobra(x:number, y:number) {
  //   const kobra = new Kobra(this, x, y);
  //   this.physics.add.existing(kobra);
  //   this.Kobras.push(kobra);
  // }

  public update() {
  }
}