import Phaser from 'phaser';
import WebFont from 'webfontloader';
import './fonts.css'
import { Tank } from "./units";

import { assets } from './assets';

class BootScene extends Phaser.Scene {

    fontsLoaded: boolean = false;

    constructor() {
        super({key: 'BootScene'});
    }

    preload() {
        this.load.image('tanks/viper/base', assets.viperBase);
        this.load.image('tanks/viper/turret', assets.viperTurret);

        WebFont.load({
            custom: {
                families: ['Oxygen'], // Specify custom font families
                urls: ['styles.css'] // Path to your CSS file that includes @font-face
            },
            active: () => {
                this.fontsLoaded = true;
                this.checkAssetsLoaded();
            }
        });

        // This event is fired when all assets in the preload queue have finished loading.
        this.load.once('complete', () => {
            this.checkAssetsLoaded();
        });
    }

    checkAssetsLoaded() {
        if (!this.load.isLoading() && this.fontsLoaded) {
            this.scene.start('TestGameScene');
        }
    }
}

class TestGameScene extends Phaser.Scene {
    tank: Tank;

    constructor() {
        super({key: 'TestGameScene'});
    }

    create() {
        // Set the scene background color to light blue
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#ADD8E6");

        // Create a tank unit instance
        this.tank = new Tank(this, 400, 300, 100, 20, 100); // Example position and stats

        // rotate the tank 90 degrees to make it face right
        this.tank.angle = 90;

        this.input.on('pointermove', (pointer: any) => {
            this.tank.rotateTurretToPoint(pointer.worldX, pointer.worldY);
        });
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        this.tank.update(time, delta);
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.RESIZE, // Resize the game to fill the whole screen
        parent: 'game', // Ensure the game scales correctly in the div with ID 'game'
        width: '100%',
        height: '100%'
    },
    scene: [BootScene, TestGameScene]
};

window.onload = () => {
    new Phaser.Game(config);
};
