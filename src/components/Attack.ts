export class AttackComponent {
    scene: Phaser.Scene;
    damage: number;
    range: number;

    constructor(scene: Phaser.Scene, damage: number, range: number) {
        this.scene = scene;
        this.damage = damage;
        this.range = range;
    }

    attack(from: Phaser.GameObjects.Sprite | Phaser.GameObjects.Container, target: Phaser.Math.Vector2): void {
        // Create a simple geometry for projectile (e.g., a circle)
        const projectile = this.scene.add.circle(from.x, from.y, 5, 0xFFFF00); // Example: Yellow circle
        this.scene.physics.add.existing(projectile); // Make it a physics body to enable movement

        // Calculate velocity to move the projectile towards the target
        const velocity = new Phaser.Math.Vector2(target.x - from.x, target.y - from.y)
            .normalize() // Normalize the vector to get the direction
            .scale(100); // Scale to desired speed

        // Apply the calculated velocity to the projectile
        (projectile.body as Phaser.Physics.Arcade.Body).setVelocity(velocity.x, velocity.y);

        // Handle projectile reaching the target or collision
        // You might need custom logic to check for collision or overlap with the target
        // This example assumes you have a way to detect when the projectile reaches its target

        // Example of removing the projectile after a certain time or upon collision
        // This is a simplified approach; you should replace it with actual collision detection logic
        this.scene.time.delayedCall(2000, () => { // Wait for 2 seconds before destroying the projectile
            projectile.destroy();
        }, [], this);

        // Omitting sound playback since we're not using sounds in this example

        // Optional: Add logic for animations or visual effects upon firing or hitting the target
    }
}
