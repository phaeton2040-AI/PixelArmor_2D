import Phaser from 'phaser';
import { HealthComponent } from "../components";
import { AttackComponent } from "../components/Attack";

export class Tank extends Phaser.GameObjects.Container {
    health: HealthComponent;
    attack: AttackComponent;

    turret: Phaser.GameObjects.Sprite; // Changed to Sprite for the turret

    lookAtRotation: number;

    constructor(scene: Phaser.Scene, x: number, y: number, health: number, damage: number, attackRange: number) {
        super(scene, x, y);

        this.health = new HealthComponent(health);
        this.attack = new AttackComponent(scene, damage, attackRange);

        this.render(scene);

        this.lookAtRotation = this.turret.rotation;
    }

    private render(scene: Phaser.Scene) {
        // Create the base of the tank using a sprite
        const base = scene.add.sprite(0, 0, 'tanks/viper/base');

        // Adjust the base sprite as needed (e.g., scaling or setting origin)
        base.setScale(.5, .5);
        base.setOrigin(0.5, 0.5); // Optionally adjust if needed

        this.add(base);
        base.setDepth(0);

        // Create the turret using a sprite and add it to the container
        this.turret = scene.add.sprite(0, 0, 'tanks/viper/turret');

        // Adjust the turret sprite as needed
        this.turret.setScale(.5, .5);
        this.turret.setOrigin(0.5, .7); // Optionally adjust if needed

        this.add(this.turret);
        this.turret.setDepth(1);

        // Add the entire tank unit to the scene
        scene.add.existing(this);
    }

    // Method to rotate the turret to a specific angle (in degrees)
    rotateTurretToPoint(x: number, y: number) {
        this.lookAtRotation = Phaser.Math.Angle.Between(this.x, this.y, x, y);
    }

    update(time: number, delta: number) {
        // Interpolation factor determines the speed of rotation, smaller values for slower rotation
        const lerpFactor = 0.05;

        // Calculate the difference in angle, ensuring we take the shortest rotation direction
        let diff = this.lookAtRotation - this.turret.rotation;

        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;

        // Apply the interpolated rotation adjustment
        this.turret.rotation += diff * lerpFactor;
    }

    // Method to incrementally rotate the turret (angleDelta in degrees)
    displayUnitInfo() {
        console.log(`Tank Unit - Health: ${this.health.health}, Damage: ${this.attack.damage}, Attack Range: ${this.attack.range}`);
    }
}
